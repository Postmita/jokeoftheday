export default function Home() {
  // For now, hardcoded joke
  const joke = "Why don’t skeletons fight each other? They don’t have the guts.";

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 p-4">
      {/* Header */}
      <header className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-100">Joke of the Day</h1>
      </header>

      {/* Main joke area */}
      <main className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-6 mt-4">
        <p className="text-lg text-gray-100 text-center">{joke}</p>

        {/* Ad placeholder below joke */}
        <div className="bg-gray-700 text-gray-400 text-sm text-center mt-6 py-8 rounded">
          Ad space — 300x250
        </div>
      </main>

      {/* Footer with another ad */}
      <footer className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-4 mt-4 text-center">
        <div className="bg-gray-700 text-gray-400 text-sm py-8 rounded">
          Ad space — 728x90
        </div>
      </footer>
    </div>
  );
}