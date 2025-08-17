'use client';

import { useState, useEffect } from 'react';
import AdSense from '@/components/AdSense';

export default function Home() {
  const [joke, setJoke] = useState("Why don't skeletons fight each other? They don't have the guts.");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJokeOfTheDay = async () => {
      try {
        const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQACDgcn4qtWSMm6rqhxlpjnqOK6KWBEYrH0iReHGnn-qzZmVb3GMN_iLS51aNaiFkvU8_Nk_ItvM3-/pub?output=tsv");
        const tsv = await response.text();
        const rows = tsv.split("\n").map(r => r.split("\t"));
        const jokes = rows.slice(1).map(r => r[0]).filter(joke => joke && joke.trim()); // skip header row and filter empty jokes
        
        if (jokes.length > 0) {
          // Get today's date and use it to select a consistent joke for the day
          const today = new Date();
          const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
          const jokeIndex = dayOfYear % jokes.length;
          setJoke(jokes[jokeIndex]);
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
          <p className="text-lg text-gray-100 text-center">{joke}</p>
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
      </footer>
    </div>
  );
}