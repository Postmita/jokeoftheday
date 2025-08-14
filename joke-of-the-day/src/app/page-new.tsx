import AdSense from '@/components/AdSense';

export default function Home() {
  // For now, hardcoded joke
  const joke = "Why don't skeletons fight each other? They don't have the guts.";

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 p-4">
      {/* Header */}
      <header className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-100">Joke of the Day</h1>
      </header>

      {/* Main joke area */}
      <main className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-6 mt-4">
        <p className="text-lg text-gray-100 text-center">{joke}</p>

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
