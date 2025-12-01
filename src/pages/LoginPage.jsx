import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService"; 
import { LogIn, Gamepad2, User } from "lucide-react"; // Tambah icon User
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userService.login(form.username, form.password);
      toast.success("Login Berhasil! Selamat datang.");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      toast.error("Login Gagal! Periksa username/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6 font-sans">
      <div className="bg-[#1E293B] p-8 rounded-3xl border border-white/10 w-full max-w-sm shadow-2xl shadow-violet-900/20">
        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg">
                <Gamepad2 className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-black text-white">Welcome Back</h1>
            <p className="text-slate-400 text-sm">Login untuk mulai berjualan</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Username</label>
            <input className="w-full p-4 bg-[#0F172A] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none mt-1" placeholder="Username Anda" onChange={e=>setForm({...form, username:e.target.value})} required />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
            <input className="w-full p-4 bg-[#0F172A] text-white rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none mt-1" type="password" placeholder="••••••" onChange={e=>setForm({...form, password:e.target.value})} required />
          </div>
          
          <button disabled={loading} className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-white py-4 rounded-xl font-bold flex justify-center gap-2 shadow-lg shadow-violet-600/20 transition-all active:scale-95 disabled:opacity-50">
            <LogIn size={20}/> {loading ? "Memproses..." : "Masuk Sekarang"}
          </button>
        </form>

        {/* --- TOMBOL GUEST MODE --- */}
        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-slate-500 text-xs">ATAU</span>
            <div className="flex-grow border-t border-white/10"></div>
        </div>

        <button 
            onClick={() => navigate('/')} 
            className="w-full bg-[#0F172A] border border-white/10 hover:bg-white/5 text-slate-300 py-3 rounded-xl font-bold flex justify-center gap-2 transition-all active:scale-95"
        >
            <User size={20} /> Masuk sebagai Tamu
        </button>
        
        <div className="mt-6 text-center pt-4">
            <p className="text-slate-400 text-sm mb-2">Belum punya akun?</p>
            <button onClick={() => navigate('/register')} className="text-violet-400 font-bold hover:text-violet-300 hover:underline transition-all">
                Daftar Akun Baru
            </button>
        </div>
      </div>
    </div>
  );
}