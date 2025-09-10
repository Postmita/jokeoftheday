'use client';

import { useState, useEffect } from 'react';
import AdSense from '@/components/AdSense';

export default function Home() {
  const [joke, setJoke] = useState("Why don't skeletons fight each other? They don't have the guts.");
  const [loading, setLoading] = useState(true);
  const [jokes, setJokes] = useState<string[]>([]);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const fetchJokeOfTheDay = async () => {
      try {
        const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQACDgcn4qtWSMm6rqhxlpjnqOK6KWBEYrH0iReHGnn-qzZmVb3GMN_iLS51aNaiFkvU8_Nk_ItvM3-/pub?output=tsv");
        const tsv = await response.text();
        const rows = tsv.split("\n").map(r => r.split("\t"));
        const jokesArr = rows.slice(1).map(r => r[0]).filter(joke => joke && joke.trim()); // skip header row and filter empty jokes
        setJokes(jokesArr);

        if (jokesArr.length > 0) {
          const today = new Date();
          const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
          const jokeIndex = dayOfYear % jokesArr.length;
          setJoke(jokesArr[jokeIndex]);
        }
      } catch (error) {
        console.error('Error fetching joke:', error);
        // Keep the fallback joke if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchJokeOfTheDay();
  }, []);
// Handler for random joke button
  const handleRandomJoke = () => {
    if (jokes.length > 0) {
      let randomIndex = Math.floor(Math.random() * jokes.length);
      setJoke(jokes[randomIndex]);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 p-4">
      {/* Header */}
      <header className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-100">Joke of the Day</h1>
      </header>

      {/* Main joke area */}
      <main className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-6 mt-4">
        {loading ? (
          <div className="text-lg text-gray-300 text-center">Loading today's joke...</div>
        ) : (
          <>
            <p className="text-lg text-gray-100 text-center">{joke}</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                onClick={handleRandomJoke}
                disabled={loading || jokes.length === 0}
              >
                Random Joke
              </button>
            </div>
          </>
        )}

        {/* AdSense 300x250 Rectangle Ad */}
        <div className="flex justify-center mt-6">
          <AdSense 
            adSlot="1234567890"
            style={{ width: '300px', height: '250px' }}
          />
        </div>
      </main>

      {/* Footer with banner ad */}
      <footer className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-4 mt-4 text-center">
        {/* AdSense 728x90 Leaderboard Ad */}
        <div className="flex justify-center">
          <AdSense 
            adSlot="0987654321"
            style={{ width: '728px', height: '90px' }}
          />
        </div>
          <button
          className="text-xs text-gray-400 underline"
          onClick={() => setShowPrivacy(!showPrivacy)}
        >
          Privacy Policy
        </button>
          {showPrivacy && (
          <div className="mt-2 text-xs text-gray-300 bg-gray-700 rounded p-2">
            <strong>Privacy Policy:</strong> This site uses Google AdSense to serve ads. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">Google Ad Settings</a>.
          </div>
        )}
      </footer>
    </div>
  );
}