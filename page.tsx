'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  // Funcția de cumpărare credite cu Stripe
  const handleBuyCredits = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'user_123' }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  // Funcția de generare muzică
  const handleGenerate = async () => {
    if (!prompt) return alert('Introdu un prompt!');
    setLoading(true);

    const res = await fetch('/api/generate-music', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.error) {
      alert(data.error);
    } else {
      setAudioUrl(data.audioUrl);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">Generator Muzică AI</h1>

      {/* Secțiunea de Cumpărare Credite */}
      <div className="bg-slate-800 p-6 rounded-xl mb-8 text-center border border-slate-700 max-w-md w-full">
        <p className="mb-4 text-slate-300">Cumpără credite pentru a genera melodii noi.</p>
        <button
          onClick={handleBuyCredits}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition w-full"
        >
          Cumpără 50 Credite ($10)
        </button>
      </div>

      {/* Secțiunea de Generare */}
      <div className="bg-slate-800 p-6 rounded-xl w-full max-w-md border border-slate-700">
        <label className="block mb-2 font-medium">Descrie melodia dorită:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex: Melodie Pop energetică cu chitară și ritm de vară..."
          className="w-full p-3 rounded bg-slate-900 text-white border border-slate-700 mb-4 focus:outline-none h-28"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold py-3 rounded-lg transition"
        >
          {loading ? 'Se generează muzica...' : 'Generează Melodia'}
        </button>

        {audioUrl && (
          <div className="mt-6">
            <p className="font-semibold mb-2">Melodia ta este gata:</p>
            <audio controls src={audioUrl} className="w-full" />
          </div>
        )}
      </div>
    </main>
  );
}