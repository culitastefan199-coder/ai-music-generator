'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Functia de generare manea
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setAudioUrl(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
      } else {
        alert('Eroare la generare! Încearcă din nou.');
      }
    } catch (err) {
      console.error(err);
      alert('A apărut o eroare la conexiunea cu serverul.');
    } finally {
      setLoading(false);
    }
  };

  const categorii = [
    {
      titlu: 'MANELE DE JALE',
      img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    },
    {
      titlu: 'MANELE DE OPULENȚĂ',
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    },
    {
      titlu: 'MANELE LIVE',
      img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    },
    {
      titlu: 'TRAPANELE',
      img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-sans selection:bg-yellow-500 selection:text-black">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-[#121212]/90 backdrop-blur border-b border-yellow-600/20 sticky top-0 z-40">
        <div className="flex items-center gap-2 text-2xl font-black text-yellow-500 tracking-wider cursor-pointer">
          📢 manele.io
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wide text-gray-300">
          <Link href="/" className="hover:text-yellow-500 transition">ACASĂ</Link>
          <a href="#generator" className="bg-gradient-to-r from-yellow-600 to-amber-500 text-black px-4 py-1.5 rounded-full font-bold hover:brightness-110 transition shadow">
            FĂ O MANEA
          </a>
          <a href="#categorii" className="hover:text-yellow-500 transition">TOPUL MANELIȘTILOR</a>
          <a href="#tarife" className="hover:text-yellow-500 transition">TARIFE</a>
          <button 
            onClick={() => setShowAuthModal(true)} 
            className="hover:text-yellow-500 transition border border-yellow-500/30 px-4 py-1.5 rounded-full"
          >
            LOGIN / REGISTER
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Banner Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 p-8 md:p-12 shadow-2xl border border-yellow-400/30">
          <div className="relative z-10 max-w-xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-tight uppercase">
              Fă-ți maneaua mai jos!
            </h1>
            <p className="text-black/90 font-bold text-lg">
              Creează-ți propria manea cu Inteligență Artificială în 2 minute!
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#generator" className="bg-black text-yellow-400 hover:bg-zinc-900 font-extrabold px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105">
                FĂ O MANEA!
              </a>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="bg-yellow-400/20 hover:bg-yellow-400/30 text-black border border-black/30 font-extrabold px-6 py-3 rounded-full transition transform hover:scale-105"
              >
                ÎNREGISTREAZĂ-TE
              </button>
            </div>
          </div>
        </div>

        {/* SECȚIUNE GENERATOR AI */}
        <section id="generator" className="scroll-mt-24 bg-[#141414] border border-yellow-500/30 rounded-3xl p-6 md:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-yellow-400 tracking-wide uppercase">
              🎼 Studio Generare Manea AI
            </h2>
            <p className="text-gray-400 text-sm">
              Scrie versurile, stilul sau despre cine este vorba în manea (ex: "Manea ritmată despre frăție și bani, cu vioară și acordeon").
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4 max-w-2xl mx-auto">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Manea de jale lentă despre dragoste pierdută și nopți albe..."
              rows={4}
              className="w-full bg-zinc-900/90 text-white placeholder-gray-500 border border-yellow-500/30 rounded-2xl p-4 focus:outline-none focus:border-yellow-400 transition"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:brightness-110 text-black font-black text-lg py-4 rounded-2xl transition shadow-xl transform active:scale-95 disabled:opacity-50"
            >
              {loading ? '🎵 Se compune maneaua... (Așteaptă puțin)' : '🔥 Generează Maneaua Acum!'}
            </button>
          </form>

          {/* Player Audio când e gata melodia */}
          {audioUrl && (
            <div className="max-w-xl mx-auto bg-zinc-900 border border-yellow-500/50 p-6 rounded-2xl text-center space-y-4">
              <h3 className="text-xl font-bold text-yellow-400">🎉 Maneaua ta este gata!</h3>
              <audio controls src={audioUrl} className="w-full rounded-lg" />
              <a 
                href={audioUrl} 
                download="manea-ai.mp3"
                className="inline-block bg-yellow-500 text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-400 transition"
              >
                ⬇️ Descarcă Melodia MP3
              </a>
            </div>
          )}
        </section>

        {/* GRID CATEGORII */}
        <section id="categorii" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categorii.map((cat, index) => (
            <div key={index} className="relative group overflow-hidden rounded-3xl border border-yellow-600/30 h-64 bg-zinc-900 flex flex-col justify-end p-6 shadow-xl">
              <img 
                src={cat.img} 
                alt={cat.titlu}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="relative z-10 text-center space-y-4">
                <h3 className="text-2xl font-black text-yellow-400 tracking-wide drop-shadow-md">
                  {cat.titlu}
                </h3>
                <div>
                  <a href="#generator" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-sm px-6 py-2.5 rounded-full transition shadow-lg">
                    FĂ O MANEA!
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* MODAL PENTRU LOGIN / REGISTER */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#141414] border border-yellow-500/40 w-full max-w-md p-6 rounded-3xl shadow-2xl relative space-y-6">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 text-xl font-bold"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-2xl font-black text-yellow-400">
                {isLogin ? 'Autentificare' : 'Înregistrare Cont'}
              </h3>
              <p className="text-xs text-gray-400">
                {isLogin ? 'Intră în contul tău pentru a genera manele' : 'Creează-ți cont gratuit pe manele.io'}
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Cont salvat cu succes!'); setShowAuthModal(false); }} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-xs font-bold text-gray-300">Nume / Pseudonim</label>
                  <input type="text" placeholder="Ex: Nicolae Guță Fan" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-sm focus:border-yellow-400 outline-none mt-1" required />
                </div>
              )}
              <div>
                <label className="text-xs font-bold text-gray-300">Email</label>
                <input type="email" placeholder="nume@domain.com" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-sm focus:border-yellow-400 outline-none mt-1" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300">Parolă</label>
                <input type="password" placeholder="••••••••" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-sm focus:border-yellow-400 outline-none mt-1" required />
              </div>

              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-3 rounded-xl transition shadow-lg">
                {isLogin ? 'LOG IN' : 'CREEAZĂ CONT'}
              </button>
            </form>

            <div className="text-center text-xs text-gray-400">
              {isLogin ? 'Nu ai cont încă?' : 'Ai deja cont?'} {' '}
              <button onClick={() => setIsLogin(!isLogin)} className="text-yellow-400 font-bold underline">
                {isLogin ? 'Înregistrează-te' : 'Conectează-te'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
