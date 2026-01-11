'use client';

import { useState } from 'react';

interface Suggestion {
  song: {
    title: string;
    artist: string;
  };
  restaurant: {
    name: string;
    cuisine: string;
    vibe: string;
  };
}

export default function Home() {
  const [name, setName] = useState('');
  const [mood, setMood] = useState('');
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mood) return;

    setLoading(true);
    try {
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mood }),
      });
      const data = await response.json();
      setSuggestion(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setName('');
    setMood('');
    setSuggestion(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Jazz & Dine
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tel Aviv Mood Matcher
            </p>
          </div>

          {!suggestion ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    What's your name?
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="mood" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How are you feeling today?
                  </label>
                  <select
                    id="mood"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    required
                  >
                    <option value="">Select your mood</option>
                    <option value="happy">Happy & Energetic</option>
                    <option value="relaxed">Relaxed & Calm</option>
                    <option value="romantic">Romantic & Dreamy</option>
                    <option value="melancholy">Melancholy & Reflective</option>
                    <option value="adventurous">Adventurous & Curious</option>
                    <option value="nostalgic">Nostalgic & Sentimental</option>
                    <option value="ilovesushi">I Love Sushi</option>
                    <option value="partytime">I'm an Alcoholic and I Wanna Party</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Finding your perfect match...' : 'Get My Suggestions'}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Hey {name}! Here's what we picked for you:
                </h2>

                <div className="space-y-6">
                  <div className="border-l-4 border-purple-500 pl-6 py-4">
                    <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">
                      Your Jazz Song
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {suggestion.song.title}
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      by {suggestion.song.artist}
                    </p>
                    <div className="flex gap-3 mt-3">
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(suggestion.song.title + ' ' + suggestion.song.artist)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        Listen on YouTube
                      </a>
                      <a
                        href={`https://open.spotify.com/search/${encodeURIComponent(suggestion.song.title + ' ' + suggestion.song.artist)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                        Find on Spotify
                      </a>
                    </div>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-6 py-4">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      Your Tel Aviv Restaurant
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {suggestion.restaurant.name}
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {suggestion.restaurant.cuisine}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {suggestion.restaurant.vibe}
                    </p>
                    <div className="flex gap-3 mt-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(suggestion.restaurant.name + ' Tel Aviv')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Open in Maps
                      </a>
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(suggestion.restaurant.name + ' Tel Aviv restaurant')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.5 2C7.8 2 4 5.8 4 10.5c0 1.4.3 2.7.9 3.9L2 22l7.7-2.9c1.2.6 2.5.9 3.9.9 4.7 0 8.5-3.8 8.5-8.5S17.2 2 12.5 2zm0 15c-1.2 0-2.3-.3-3.3-.9l-.2-.1-2.5.9.9-2.4-.1-.2c-.6-1-.9-2.1-.9-3.3 0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5z"/>
                          <circle cx="12.5" cy="10.5" r="1"/>
                          <circle cx="16" cy="10.5" r="1"/>
                          <circle cx="9" cy="10.5" r="1"/>
                        </svg>
                        Find Website & Info
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={resetForm}
                className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-4 px-6 rounded-lg shadow-lg transform transition hover:scale-105"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
