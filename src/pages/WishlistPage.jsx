import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import wishlistService from '../services/wishlistService';
import userService from '../services/userService';
import { Heart, ShoppingBag, Trash2, User, Ghost, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = userService.getUser();
    if (!user) {
        toast.error("Anda harus login untuk melihat Wishlist");
        navigate('/login');
        return;
    }
    const data = wishlistService.getWishlist();
    setWishlist(data);
  }, [navigate]);

  const handleRemove = (e, account) => {
    e.stopPropagation(); 
    wishlistService.toggleWishlist(account);
    setWishlist(wishlistService.getWishlist());
    toast.success("Removed from Wishlist");
  };

  return (
    <div className="min-h-screen bg-white text-black pb-24 px-6 pt-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 border-b-2 border-black pb-6">
        <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              MY WISHLIST<span className="text-red-600">.</span>
            </h1>
            <p className="text-neutral-500 text-xs font-bold tracking-widest mt-2">
              {wishlist.length} SAVED ITEMS
            </p>
        </div>
        <div className="p-3 bg-red-50 border-2 border-red-100 rounded-full">
            <Heart size={28} className="text-red-600 fill-current animate-pulse" />
        </div>
      </div>

      {/* List Akun */}
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((account) => (
            <div 
              key={account.id} 
              onClick={() => navigate(`/account/${account.id}`)}
              className="group bg-white border-2 border-neutral-100 hover:border-black transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col relative"
            >
              {/* Gambar */}
              <div className="h-48 bg-neutral-100 relative overflow-hidden border-b-2 border-neutral-100 group-hover:border-black transition-colors">
                <img 
                  src={account.image_url || "https://placehold.co/600x400"} 
                  alt={account.title} 
                  className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ${account.is_sold ? 'opacity-50' : ''}`}
                />
                
                {/* Badge Game */}
                <span className="absolute bottom-3 left-3 bg-white text-black text-[10px] font-black px-3 py-1 border-2 border-black uppercase">
                  {account.games?.name}
                </span>
                
                {/* Tombol Hapus */}
                <button 
                    onClick={(e) => handleRemove(e, account)}
                    className="absolute top-3 right-3 p-2 bg-white text-black border-2 border-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-all z-20"
                    title="Remove"
                >
                    <Trash2 size={16} />
                </button>

                {account.is_sold && (
                  <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-red-600 font-black text-xl border-4 border-red-600 px-4 py-1 -rotate-12 tracking-widest uppercase">
                      SOLD OUT
                    </span>
                  </div>
                )}
              </div>

              {/* Detail */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-black text-lg text-black mb-1 line-clamp-1 group-hover:text-red-600 transition-colors uppercase">
                  {account.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 mb-4 pb-4 border-b border-neutral-100 uppercase tracking-wider">
                    <User size={14} /> <span>{account.sellers?.name || "Seller"}</span>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <span className={`font-black text-xl ${account.is_sold ? 'text-neutral-300 line-through' : 'text-black'}`}>
                    Rp {parseInt(account.price).toLocaleString('id-ID')}
                  </span>
                  
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
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-32 text-neutral-400">
            <div className="w-24 h-24 bg-neutral-50 border-2 border-neutral-200 rounded-full flex items-center justify-center mb-6">
              <Ghost size={40} className="text-neutral-300" />
            </div>
            <p className="text-xl font-black text-black uppercase tracking-widest">Empty List</p>
            <p className="text-xs font-bold text-neutral-400 mb-8 uppercase tracking-wide">Save your favorite items here.</p>
            <button onClick={() => navigate('/explore')} className="px-8 py-3 bg-black text-white font-bold uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg">
              Explore Now
            </button>
        </div>
      )}
    </div>
  );
}