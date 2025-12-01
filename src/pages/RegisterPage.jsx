import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService"; // Perbaikan import
import { UserPlus, ArrowLeft } from "lucide-react";
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    whatsapp_number: "" 
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Menggunakan userService
      await userService.register(form);
      toast.success("Registrasi Berhasil! Silakan Login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Gagal Mendaftar. Username mungkin sudah dipakai.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6 font-sans py-10">
      <div className="bg-[#1E293B] p-8 rounded-3xl border border-white/10 w-full max-w-sm shadow-2xl shadow-violet-900/20">
        
        <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm">
            <ArrowLeft size={16} /> Kembali ke Login
        </button>

        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg">
                <UserPlus className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-black text-white">Daftar Akun</h1>
            <p className="text-slate-400 text-sm">Bergabunglah dengan komunitas GGEZ</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nama Lengkap</label>
            <input name="name" className="w-full p-3 bg-[#0F172A] text-white rounded-xl border border-white/10 focus:border-green-500 focus:outline-none mt-1" placeholder="Nama Anda" onChange={handleChange} required />
          </div>
          
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Username</label>
            <input name="username" className="w-full p-3 bg-[#0F172A] text-white rounded-xl border border-white/10 focus:border-green-500 focus:outline-none mt-1" placeholder="Username unik" onChange={handleChange} required />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nomor WhatsApp</label>
            <input name="whatsapp_number" type="tel" className="w-full p-3 bg-[#0F172A] text-white rounded-xl border border-white/10 focus:border-green-500 focus:outline-none mt-1" placeholder="628..." onChange={handleChange} required />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
            <input name="password" type="password" className="w-full p-3 bg-[#0F172A] text-white rounded-xl border border-white/10 focus:border-green-500 focus:outline-none mt-1" placeholder="••••••" onChange={handleChange} required />
          </div>

          <button disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white py-4 rounded-xl font-bold flex justify-center gap-2 shadow-lg shadow-green-600/20 transition-all active:scale-95 disabled:opacity-50 mt-6">
            {loading ? "Mendaftar..." : "Buat Akun Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
}