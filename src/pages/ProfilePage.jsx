import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import { LogOut, User, Phone, Mail, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    whatsapp_number: '',
    bio: ''
  });

  useEffect(() => {
    const currentUser = userService.getUser();
    setUser(currentUser);

    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        whatsapp_number: currentUser.whatsapp_number || '',
        bio: currentUser.bio || ''
      });
    }
  }, []);

  const handleLogout = () => {
    if (confirm("Yakin ingin keluar?")) {
      userService.logout();
      navigate('/login');
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = await userService.updateProfile(user.id, formData);
      setUser(updatedUser);
      setIsEditing(false);
      toast.success("PROFIL DIPERBARUI");
    } catch (error) {
      toast.error("GAGAL UPDATE");
    }
  };

  if (!user) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-black gap-6 px-6 text-center">
        <div className="w-24 h-24 border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <User size={40} className="text-black"/>
        </div>
        <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Access Denied</h2>
            <p className="text-neutral-500 text-sm mt-2 font-medium">Silakan login untuk mengakses profil.</p>
        </div>
        <button onClick={() => navigate('/login')} className="bg-black text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg">
            LOGIN NOW
        </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black pb-24 font-sans pt-8">
      <div className="max-w-lg mx-auto px-6">
        <h1 className="text-4xl font-black text-center mb-12 tracking-tighter">
          MY PROFILE<span className="text-red-600">.</span>
        </h1>

        <div className="relative mb-12 text-center">
            <div className="w-32 h-32 mx-auto bg-white border-2 border-black p-1 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] mb-6">
                <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-4xl font-black text-black">
                    {user.name ? user.name.charAt(0) : "U"}
                </div>
            </div>
            
            {isEditing ? (
              <input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="text-center font-black text-2xl p-2 border-b-2 border-black outline-none w-full bg-transparent uppercase"
              />
            ) : (
              <h2 className="text-2xl font-black text-black uppercase tracking-wide">{user.name}</h2>
            )}
            
            <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em] mt-2 border-t border-neutral-200 inline-block pt-2 px-4">{user.role}</p>
        </div>

        <div className="space-y-6 border-t-2 border-black pt-8">
            {/* WhatsApp */}
            <div className="group">
                <div className="flex items-center gap-3 mb-2">
                    <Phone className="text-black w-4 h-4" />
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">WhatsApp</p>
                </div>
                {isEditing ? (
                <input 
                    value={formData.whatsapp_number}
                    onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})}
                    className="w-full bg-neutral-50 border-2 border-neutral-200 p-3 font-medium focus:border-black outline-none transition-colors"
                />
                ) : (
                <p className="text-lg font-bold font-mono border-b border-neutral-100 pb-2">{user.whatsapp_number}</p>
                )}
            </div>

            {/* Bio */}
            <div className="group">
                <div className="flex items-center gap-3 mb-2">
                    <User className="text-black w-4 h-4" />
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Bio</p>
                </div>
                {isEditing ? (
                <textarea 
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full bg-neutral-50 border-2 border-neutral-200 p-3 font-medium focus:border-black outline-none transition-colors resize-none"
                    rows="3"
                />
                ) : (
                <p className="text-base font-medium text-neutral-600 border-b border-neutral-100 pb-2">{user.bio || "-"}</p>
                )}
            </div>

            {/* Username (Read Only) */}
            <div className="opacity-50">
                <div className="flex items-center gap-3 mb-2">
                    <Mail className="text-black w-4 h-4" />
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Username</p>
                </div>
                <p className="text-lg font-bold font-mono text-neutral-800">@{user.username}</p>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col gap-4">
          {isEditing ? (
            <div className="flex gap-4">
                <button onClick={handleSave} className="flex-1 bg-black text-white py-3 font-bold uppercase tracking-widest hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                    <Save size={18}/> SAVE
                </button>
                <button onClick={() => setIsEditing(false)} className="flex-1 bg-white text-black border-2 border-black py-3 font-bold uppercase tracking-widest hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2">
                    <X size={18}/> CANCEL
                </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="w-full bg-white text-black border-2 border-black py-3 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 flex items-center justify-center gap-2">
              <Edit2 size={18}/> EDIT PROFILE
            </button>
          )}

          <button onClick={handleLogout} className="w-full text-red-600 py-3 font-bold uppercase tracking-widest hover:bg-red-50 transition-colors flex items-center justify-center gap-2 mt-4 text-xs border border-transparent hover:border-red-100">
             <LogOut size={16} /> Logout Session
          </button>
        </div>

      </div>
    </div>
  );
}