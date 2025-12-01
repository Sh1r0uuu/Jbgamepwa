import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, User, Heart, LogOut, Circle } from 'lucide-react';
import userService from '../services/userService';
import toast from 'react-hot-toast';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const user = userService.getUser();

  const handleSellClick = () => {
    if (user) {
      navigate('/jual');
    } else {
      toast.error("Silakan login untuk menjual akun!");
      navigate('/login');
    }
  };

  const confirmLogout = () => {
    userService.logout();
    setShowLogoutModal(false);
    toast.success("Anda telah logout.");
  };

  if (['/login', '/register'].includes(location.pathname)) return null;

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-neutral-200 fixed left-0 top-0 z-50 p-6">
      
      <ConfirmModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title="LOGOUT?"
        message="Sesi anda akan berakhir."
        isDanger={true}
      />
      
      {/* --- LOGO AREA (KAI BRANDING) --- */}
      <div className="flex items-center gap-3 mb-12 cursor-pointer group" onClick={() => navigate('/')}>
        <img 
            src="/app-logo-192.png" 
            alt="KAI Logo" 
            className="h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all" 
        />
        
        <div className="flex flex-col leading-none">
            {/* TAMBAHKAN 'font-japan' DISINI */}
            <h1 className="text-3xl font-black text-black tracking-tighter flex items-end gap-1 font-japan">
                KAI<span className="text-red-600 text-2xl -mb-0.5">改</span>
            </h1>
            <span className="text-[9px] font-bold text-neutral-400 tracking-[0.3em] uppercase group-hover:text-red-600 transition-colors">
                Marketplace
            </span>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 space-y-1">
        <SidebarItem icon={<Home size={20} />} label="HOME" active={isActive('/')} onClick={() => navigate('/')} />
        <SidebarItem icon={<Search size={20} />} label="EXPLORE" active={isActive('/explore')} onClick={() => navigate('/explore')} />
        <SidebarItem icon={<Heart size={20} />} label="WISHLIST" active={isActive('/wishlist')} onClick={() => navigate('/wishlist')} />
        <SidebarItem icon={<User size={20} />} label="PROFILE" active={isActive('/profil')} onClick={() => navigate('/profil')} />
      </nav>

      {/* --- FOOTER ACTIONS --- */}
      <div className="mt-auto space-y-4">
        <button 
            onClick={handleSellClick}
            className="w-full bg-black text-white py-3.5 font-bold text-sm tracking-widest flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] hover:shadow-none hover:translate-y-1 transition-all border-2 border-black active:bg-neutral-800"
        >
            <PlusSquare size={18} /> SELL ACCOUNT
        </button>

        {user && (
            <button 
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center justify-between px-4 py-3 text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 group"
            >
                <span className="font-bold text-xs truncate max-w-[100px]">{user.username}</span>
                <LogOut size={18} />
            </button>
        )}
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-4 py-3.5 transition-all duration-300 group relative overflow-hidden ${
                active 
                ? 'text-black' 
                : 'text-neutral-400 hover:text-black'
            }`}
        >
            {/* Active Indicator (Red Line) */}
            {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"></div>}
            
            <div className={`transition-transform group-hover:scale-110 ${active ? 'text-red-600' : 'group-hover:text-black'}`}>
                {icon}
            </div>
            <span className={`text-sm font-bold tracking-wider ${active ? 'font-black' : ''}`}>{label}</span>
        </button>
    );
}