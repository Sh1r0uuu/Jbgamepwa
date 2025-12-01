import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import wishlistService from '../services/wishlistService';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function FavoriteButton({ account, className = "", theme = "dark" }) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = userService.getUser();
    if (user && account && account.id) {
       const status = wishlistService.isWishlisted(account.id);
       setIsLiked(status);
    }
  }, [account]);

  const handleToggle = (e) => {
    e.stopPropagation(); 
    
    const user = userService.getUser();
    if (!user) {
        toast.error("Silakan login untuk menyimpan ke Wishlist!");
        navigate('/login');
        return;
    }

    const isAdded = wishlistService.toggleWishlist(account);
    setIsLiked(isAdded); 

    if (isAdded) {
        toast.success("Disimpan ke Wishlist", { 
            icon: '❤️', 
            style: { background: '#fff', color: '#000', border: '2px solid #000' } 
        });
    } else {
        toast.success("Dihapus dari Wishlist", { 
            icon: '💔',
            style: { background: '#fff', color: '#000', border: '2px solid #000' } 
        });
    }
  };

  // Konfigurasi Style
  const styles = {
    dark: {
        liked: 'bg-pink-500/20 text-pink-500 border-pink-500/50',
        unliked: 'bg-black/40 text-slate-300 hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-500/30 border-transparent'
    },
    light: {
        liked: 'bg-red-50 text-red-600 border-red-200 shadow-sm',
        // UPDATE DISINI: Ubah unliked menjadi transparan total atau putih bersih tanpa blur
        unliked: 'bg-white text-neutral-400 border border-neutral-200 hover:text-red-600 hover:border-red-600 hover:shadow-md'
    }
  };

  const currentStyle = styles[theme] || styles.dark;

  return (
    <button 
      onClick={handleToggle}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 z-20 ${className} ${
        isLiked ? currentStyle.liked : currentStyle.unliked
      }`}
      title={isLiked ? "Hapus dari Wishlist" : "Tambah ke Wishlist"}
    >
      <Heart size={16} className={isLiked ? "fill-current" : ""} strokeWidth={2.5} />
    </button>
  );
}