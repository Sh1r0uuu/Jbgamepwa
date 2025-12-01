import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import accountService from '../services/accountService';
import { Search, AlertCircle, Filter, ShoppingBag, ArrowRight, X } from 'lucide-react'; 

export default function ExplorePage() {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => { if (location.state?.search) { setSearch(location.state.search); } }, [location.state]);
  
  useEffect(() => {
    const fetchData = async () => {
      try { setLoading(true); const data = await accountService.getAll(); setAccounts(data || []); setFilteredAccounts(data || []); } 
      catch (err) { console.error("Gagal ambil data", err); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!accounts) return;
    const results = accounts.filter(acc => {
      const searchTerm = search.toLowerCase();
      return acc.title?.toLowerCase().includes(searchTerm) || acc.games?.name?.toLowerCase().includes(searchTerm);
    });
    setFilteredAccounts(results);
  }, [search, accounts]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-24 font-sans">
      
      {/* --- HEADER (White & Sharp) --- */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b-2 border-neutral-100 px-4 pt-6 pb-4 md:px-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-black uppercase">
              Explore<span className="text-red-600">.</span>
            </h1>
            <p className="text-neutral-500 text-xs font-bold tracking-widest mt-1 uppercase">
              Find Your Next Account
            </p>
          </div>
        </div>

        {/* Search Bar (Boxy Style) */}
        <div className="relative group">
            <div className="relative flex items-center border-2 border-neutral-200 group-focus-within:border-black transition-colors bg-neutral-50">
                <div className="pl-4 text-neutral-400 group-focus-within:text-red-600 transition-colors">
                  <Search size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="SEARCH KEYWORD..." 
                  className="w-full p-4 bg-transparent text-black font-bold text-sm focus:outline-none placeholder-neutral-400 uppercase tracking-wide" 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button onClick={() => setSearch('')} className="pr-4 text-neutral-400 hover:text-red-600">
                    <X size={20} />
                  </button>
                )}
            </div>
        </div>
      </div>

      {/* --- CONTENT --- */}
      <div className="px-4 md:px-6 mt-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-neutral-200 border-t-red-600 rounded-full animate-spin"></div>
            <p className="text-black font-bold text-xs tracking-[0.3em] animate-pulse">SCANNING DATABASE...</p>
          </div>
        )}

        {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAccounts.length > 0 ? (
                filteredAccounts.map((account) => (
                <div 
                  key={account.id} 
                  onClick={() => navigate(`/account/${account.id}`)} 
                  className="group bg-white border border-neutral-200 hover:border-black transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] flex flex-col"
                >
                    {/* Image */}
                    <div className="h-56 bg-neutral-100 relative overflow-hidden border-b border-neutral-100 group-hover:border-black transition-colors">
                        <img 
                          src={account.image_url || "https://placehold.co/600x400?text=No+Image"} 
                          alt={account.title} 
                          className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ${account.is_sold ? 'opacity-50' : ''}`}
                        />
                        
                        <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-black px-3 py-1 border border-black shadow-sm uppercase tracking-wider">
                          {account.games?.name}
                        </span>

                        {account.is_sold && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                             <span className="text-red-600 font-black text-2xl border-4 border-red-600 px-4 py-2 -rotate-12 tracking-widest uppercase">SOLD</span>
                          </div>
                        )}
                    </div>
                    
                    {/* Details */}
                    <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-6 h-6 bg-black text-white flex items-center justify-center text-[10px] font-bold rounded-sm">
                            {account.sellers?.name ? account.sellers.name.charAt(0) : 'U'}
                          </div>
                          <span className="text-xs font-bold text-neutral-500 uppercase">{account.sellers?.name}</span>
                        </div>

                        <h3 className="font-black text-lg text-black mb-4 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
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
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-32 text-neutral-400">
                  <AlertCircle size={48} className="mb-4 text-neutral-300" strokeWidth={1.5} />
                  <p className="text-lg font-bold text-black uppercase tracking-wider">No Results Found</p>
                  <p className="text-sm mt-2">Try searching for something else.</p>
                </div>
            )}
            </div>
        )}
      </div>
    </div>
  );
}