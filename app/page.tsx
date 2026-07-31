import Link from 'next/link';

export default function Home() {
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
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#141414]/80 backdrop-blur border-b border-yellow-600/20 sticky top-0 z-50">
        <div className="flex items-center gap-2 text-2xl font-black text-yellow-500 tracking-wider">
          📢 manele.io
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wide text-gray-300">
          <Link href="/" className="hover:text-yellow-500 transition">ACASĂ</Link>
          <Link href="#generator" className="bg-yellow-600/20 text-yellow-400 border border-yellow-500/40 px-4 py-1.5 rounded-full hover:bg-yellow-500 hover:text-black transition">FĂ O MANEA</Link>
          <Link href="#top" className="hover:text-yellow-500 transition">TOPUL MANELIȘTILOR</Link>
          <Link href="#feed" className="hover:text-yellow-500 transition">FEED</Link>
          <Link href="#tarife" className="hover:text-yellow-500 transition">TARIFE</Link>
          <Link href="#login" className="hover:text-yellow-500 transition">LOGIN/REGISTER</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Main Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-800 p-8 md:p-12 shadow-2xl border border-yellow-500/30">
          <div className="relative z-10 max-w-lg space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
              FĂ-ȚI MANEAUA MAI JOS!
            </h1>
            <p className="text-black/80 font-medium text-lg">
              Creează-ți propria manea în 2 minute!
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#generator" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-full shadow-md transition transform hover:scale-105">
                FĂ O MANEA!
              </a>
              <a href="#tarife" className="bg-black/40 hover:bg-black/60 text-yellow-400 font-bold px-6 py-3 rounded-full border border-yellow-400/30 transition transform hover:scale-105">
                FĂ-ȚI ABONAMENT!
              </a>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categorii.map((cat, index) => (
            <div key={index} className="relative group overflow-hidden rounded-2xl border border-yellow-600/30 h-64 bg-zinc-900 flex flex-col justify-end p-6 shadow-lg">
              <img 
                src={cat.img} 
                alt={cat.titlu}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="relative z-10 text-center space-y-4">
                <h3 className="text-xl md:text-2xl font-black text-yellow-400 tracking-wide drop-shadow">
                  {cat.titlu}
                </h3>
                <div>
                  <a href="#generator" className="inline-block bg-yellow-500/90 hover:bg-yellow-400 text-black font-bold text-sm px-6 py-2 rounded-full transition shadow">
                    FĂ O MANEA!
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
