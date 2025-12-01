import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import accountService from '../services/accountService';
import userService from '../services/userService'; 
import FavoriteButton from '../components/FavoriteButton'; 
import toast from 'react-hot-toast'; 
import { ShoppingBag, Gamepad2, Rocket, ShieldCheck, Zap, Search, Flame, Trophy, User, Circle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- DATA GAME ---
  const popularGames = [
    { name: "Mobile Legends", img: "/images/games/mobile-legends.jpg", hot: true },
    { name: "Valorant", img: "/images/games/valorant.jpg", hot: true },
    { name: "PUBG Mobile", img: "/images/games/pubg-mobile.jpg", hot: false },
    { name: "Genshin Impact", img: "/images/games/genshin-impact.jpg", hot: false },
    { name: "Free Fire", img: "/images/games/free-fire.jpg", hot: false },
    { name: "Honkai: Star Rail", img: "/images/games/honkai-star-rail.jpg", hot: true },
    { name: "Wuthering Waves", img: "/images/games/wuthering-waves.jpg", hot: true },
    { name: "Clash of Clans", img: "/images/games/clash-of-clans.jpg", hot: false },
    { name: "CODM", img: "/images/games/codm.jpg", hot: false },
    { name: "Clash Royale", img: "/images/games/clash-royale.jpg", hot: false },
  ];
   
  const [showAllGames, setShowAllGames] = useState(false);
  const displayedGames = showAllGames ? popularGames : popularGames.slice(0, 5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await accountService.getAll();
        setAccounts(data || []);
      } catch (err) {
        console.error("Gagal mengambil data akun:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSellClick = () => {
    const user = userService.getUser();
    if (user) {
      navigate('/jual');
    } else {
      toast.error("Silakan login dulu untuk menjual akun!");
      navigate('/login');
    }
  };

  const handleGameClick = (gameName) => {
    navigate('/explore', { state: { search: gameName } });
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 z-50 relative">
      <img 
        src="/app-logo-192.png" 
        alt="Loading" 
        className="w-24 h-24 object-contain animate-bounce drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
      />
      <div className="text-center">
        <h2 className="text-2xl font-black text-black tracking-tighter font-japan animate-pulse">
          KAI<span className="text-red-600">改</span>
        </h2>
        <p className="text-neutral-400 font-bold tracking-[0.5em] text-[10px] mt-2">
          SYSTEM INITIALIZING
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-24 font-sans overflow-x-hidden selection:bg-red-600 selection:text-white">
      
      {/* --- JAPANESE BACKGROUND MOTIF --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-red-600/5 rounded-full blur-3xl"></div>
         <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
      </div>

      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
          
          {/* Logo Mobile */}
          <div className="flex md:hidden items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/app-logo-192.png" alt="Logo" className="h-8 w-auto object-contain" onError={(e) => {e.target.style.display='none'}} />
            <h1 className="text-2xl font-black tracking-tighter text-black flex items-center gap-1 font-japan">
              KAI<span className="text-red-600">改</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 md:mx-0 relative group">
            <div className="relative flex items-center">
                <input 
                type="text" 
                placeholder="Cari akun..." 
                className="w-full bg-neutral-100 text-black border-2 border-transparent group-hover:border-neutral-300 focus:bg-white focus:border-red-600 rounded-none px-12 py-2.5 text-sm font-medium focus:outline-none transition-all placeholder-neutral-400"
                onClick={() => navigate('/explore')}
                readOnly
                />
                <Search className="absolute left-4 text-neutral-400 group-focus-within:text-red-600 transition-colors" size={18} />
            </div>
          </div>

          {/* User Profile */}
          <div className="ml-4">
              <div className="w-10 h-10 border-2 border-neutral-200 hover:border-red-600 cursor-pointer transition-colors overflow-hidden group relative" onClick={() => navigate('/profil')}>
                <div className="w-full h-full bg-neutral-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                    <User size={20} className="text-black group-hover:text-red-600"/>
                </div>
              </div>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-36 pb-20 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center relative">
          
          <div className="hidden md:block absolute left-0 top-0 text-neutral-200 font-black text-9xl opacity-50 select-none font-japan" style={{writingMode: 'vertical-rl'}}>
            ゲーム
          </div>
          <div className="hidden md:block absolute right-0 top-20 text-red-50 font-black text-9xl opacity-50 select-none font-japan" style={{writingMode: 'vertical-rl'}}>
            ストア
          </div>

          <div className="inline-flex items-center gap-3 px-4 py-1 border border-black text-black text-xs font-bold tracking-widest mb-8 uppercase bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Circle size={10} className="fill-red-600 text-red-600 animate-pulse"/> 
            Premium Gaming Market
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-black mb-6 leading-tight tracking-tighter font-japan">
            LEVEL <span className="text-red-600">UP</span> <br/>
            YOUR GAME
          </h1>
          
          <p className="text-neutral-500 text-base md:text-xl max-w-xl mx-auto mb-12 font-medium leading-relaxed">
            Pasar akun game terpercaya #1 di Indonesia. <br/>
            <span className="text-black bg-red-100 px-1">Aman</span>, <span className="text-black bg-red-100 px-1">Cepat</span>, dan <span className="text-black bg-red-100 px-1">Legal</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button onClick={() => navigate('/explore')} className="group px-8 py-4 bg-black text-white font-bold text-sm tracking-widest hover:bg-red-600 transition-all hover:-translate-y-1 flex items-center gap-3 shadow-lg">
              EXPLORE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </button>
            
            <button onClick={handleSellClick} className="px-8 py-4 bg-white text-black border-2 border-black font-bold text-sm tracking-widest hover:bg-neutral-100 transition-all hover:-translate-y-1 flex items-center gap-3">
              START SELLING
            </button>
          </div>
        </div>
      </section>

      {/* --- POPULAR GAMES --- */}
      <section className="py-16 relative z-10 border-y border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 flex items-center justify-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-black tracking-tight uppercase">Top Games</h3>
                        <div className="h-1 w-full bg-black mt-1"></div>
                    </div>
                </div>
                
                {popularGames.length > 5 && (
                    <button onClick={() => setShowAllGames(!showAllGames)} className="text-xs font-black text-black hover:text-red-600 flex items-center gap-1 transition-colors uppercase tracking-wider border-b-2 border-transparent hover:border-red-600 pb-1">
                      {showAllGames ? "Close" : "View All"} {showAllGames ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {displayedGames.map((game, index) => (
                <div 
                  key={index}
                  onClick={() => handleGameClick(game.name)}
                  className="group relative h-64 bg-white border-2 border-black cursor-pointer hover:-translate-y-1.5 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]"
                >
                  <div className="h-full w-full overflow-hidden relative">
                    <img 
                        src={game.img} 
                        alt={game.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        onError={(e) => { e.target.src = "https://placehold.co/300x400/eee/000?text=GAME"; }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_#000_20%)] bg-[size:3px_3px] opacity-10 group-hover:opacity-0 transition-opacity"></div>
                  </div>

                  {game.hot && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black px-3 py-1 border-l-2 border-b-2 border-black">
                        HOT
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 w-full bg-white border-t-2 border-black p-3">
                    <h4 className="text-sm font-black text-black tracking-wider uppercase truncate">
                        {game.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Safe Transaction", desc: "Sistem anti-fraud dengan jaminan uang kembali.", icon: ShieldCheck },
                    { title: "Instant Delivery", desc: "Data akun dikirim otomatis setelah pembayaran.", icon: Zap },
                    { title: "Best Price", desc: "Harga bersaing langsung dari penjual terverifikasi.", icon: ShoppingBag }
                ].map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center group p-6 hover:bg-neutral-50 rounded-xl transition-colors">
                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors shadow-lg">
                            <feature.icon size={28} />
                        </div>
                        <h4 className="text-lg font-black text-black mb-2 uppercase tracking-wide">{feature.title}</h4>
                        <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- NEW ARRIVALS (UPDATED: Matches Explore Style) --- */}
      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black text-black flex items-center gap-3 tracking-tighter">
                <span className="w-4 h-8 bg-red-600 block transform -skew-x-12"></span> 
                NEW ARRIVALS
            </h2>
          </div>
          <button onClick={() => navigate('/explore')} className="group text-black font-bold text-sm flex items-center gap-2 border-b-2 border-black pb-1 hover:text-red-600 hover:border-red-600 transition-all">
            VIEW ALL <Rocket size={14} className="group-hover:translate-x-1 transition-transform"/>
          </button>
        </div>
        
        {accounts.length === 0 ? (
           <div className="border-2 border-dashed border-neutral-300 rounded-lg p-16 text-center bg-neutral-50">
             <Gamepad2 size={48} className="mx-auto text-neutral-400 mb-4" />
             <p className="text-neutral-500 font-medium mb-6">No accounts available.</p>
             <button onClick={handleSellClick} className="px-6 py-3 bg-black text-white font-bold text-sm hover:bg-neutral-800 transition-colors">
                BE THE FIRST SELLER
             </button>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accounts.map((account) => (
              <div 
                  key={account.id} 
                  onClick={() => navigate(`/account/${account.id}`)} 
                  className="group bg-white border border-neutral-200 hover:border-black transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] flex flex-col"
                >
                
                {/* Image Area (Explore Style) */}
                <div className="h-56 bg-neutral-100 relative overflow-hidden border-b border-neutral-100 group-hover:border-black transition-colors">
                  <img 
                    src={account.image_url || "https://placehold.co/600x400?text=No+Image"} 
                    alt={account.title} 
                    className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ${account.is_sold ? 'opacity-50' : ''}`}
                  />
                  
                  {/* Tag Game (Top Left) */}
                  <div className="absolute top-3 left-3 bg-white text-black text-[10px] font-black px-3 py-1 border border-black shadow-sm uppercase tracking-wider">
                     {account.games?.name}
                  </div>
                  
                  {/* Favorite Button (Top Right) - Light Theme */}
                  <div className="absolute top-2 right-2 z-20">
                      <FavoriteButton account={account} theme="light" />
                  </div>
                  
                  {account.is_sold && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                        <span className="text-red-600 font-black text-2xl border-4 border-red-600 px-4 py-2 -rotate-12 tracking-widest uppercase">SOLD OUT</span>
                    </div>
                  )}
                </div>

                {/* Content Area (Explore Style) */}
                <div className="p-5 flex flex-col flex-1">
                  
                  {/* Seller Info (Inside Content) */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 bg-black text-white flex items-center justify-center text-[10px] font-bold rounded-sm">
                      {account.sellers?.name ? account.sellers.name.charAt(0) : 'U'}
                    </div>
                    <span className="text-xs font-bold text-neutral-500 uppercase">{account.sellers?.name}</span>
                  </div>

                  <h3 className="font-black text-lg text-black mb-4 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors uppercase">
                    {account.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 border-t-2 border-neutral-100 group-hover:border-black transition-colors flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold mb-0.5">Price</p>
                      <p className={`text-xl font-black ${account.is_sold ? 'text-neutral-300 line-through' : 'text-black'}`}>
                        Rp {parseInt(account.price).toLocaleString('id-ID')}
                      </p>
                    </div>
                    {!account.is_sold && (
                        <button className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                            <ArrowRight size={20} />
                        </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}