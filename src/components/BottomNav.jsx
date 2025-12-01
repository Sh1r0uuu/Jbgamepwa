import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, User, Heart } from 'lucide-react';
import userService from '../services/userService';
import toast from 'react-hot-toast';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const user = userService.getUser();

  const handleSellClick = () => {
    if (user) {
      navigate('/jual');
    } else {
      toast.error("Silakan login untuk menjual akun!");
      navigate('/login');
    }
  };

  if (['/login', '/register'].includes(location.pathname)) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t-2 border-neutral-100 z-50 pb-safe h-16">
      <div className="flex justify-around items-center h-full max-w-md mx-auto px-4 relative">
        
        <NavItem 
            icon={<Home size={22} />} 
            active={isActive('/')} 
            onClick={() => navigate('/')} 
        />

        <NavItem 
            icon={<Search size={22} />} 
            active={isActive('/explore')} 
            onClick={() => navigate('/explore')} 
        />

        {/* Floating Sell Button (Black & Red) */}
        <button onClick={handleSellClick} className="relative -top-6 group">
          <div className="bg-black text-white p-3.5 shadow-[0_8px_20px_rgba(220,38,38,0.4)] border-4 border-white transform transition-transform group-active:scale-95 group-hover:bg-red-600">
             {/* Bentuk Diamond/Kotak Miring ala Jepang */}
             <div className="absolute inset-0 bg-black transform rotate-45 -z-10 group-hover:bg-red-600 transition-colors"></div>
             <PlusSquare size={24} strokeWidth={2.5} />
          </div>
        </button>

        <NavItem 
            icon={<Heart size={22} />} 
            active={isActive('/wishlist')} 
            onClick={() => navigate('/wishlist')} 
        />

        <NavItem 
            icon={<User size={22} />} 
            active={isActive('/profil')} 
            onClick={() => navigate('/profil')} 
        />

      </div>
    </div>
  );
}

// Komponen Helper untuk Item Navigasi
function NavItem({ icon, active, onClick }) {
    return (
        <button 
            onClick={onClick} 
            className={`flex flex-col items-center justify-center w-12 h-12 transition-all duration-300 relative ${
                active ? 'text-black' : 'text-neutral-300 hover:text-neutral-500'
            }`}
        >
            <div className={`transform transition-transform ${active ? 'scale-110 translate-y-[-2px]' : ''}`}>
                {icon}
            </div>
            {/* Dot Indikator Merah */}
            {active && (
                <div className="absolute bottom-1 w-1 h-1 bg-red-600 rounded-full animate-fade-in"></div>
            )}
        </button>
    );
}