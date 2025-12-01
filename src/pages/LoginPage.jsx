import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService"; 
import { LogIn, User, ArrowRight } from "lucide-react";
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
      toast.success("LOGIN SUCCESSFUL");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      toast.error("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-neutral-50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-sm relative z-10">
        
        {/* Main Card */}
        <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-black tracking-tighter mb-2">
                    KAI<span className="text-red-600">.</span>
                </h1>
                <p className="text-neutral-500 text-xs font-bold tracking-[0.2em] uppercase">
                    Welcome Back
                </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="group">
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Username</label>
                    <input 
                        className="w-full p-3 bg-neutral-50 border-2 border-neutral-200 text-black font-bold focus:border-black focus:bg-white outline-none transition-all placeholder-neutral-300" 
                        placeholder="ENTER USERNAME" 
                        onChange={e=>setForm({...form, username:e.target.value})} 
                        required 
                    />
                </div>
                
                <div className="group">
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Password</label>
                    <input 
                        className="w-full p-3 bg-neutral-50 border-2 border-neutral-200 text-black font-bold focus:border-black focus:bg-white outline-none transition-all placeholder-neutral-300" 
                        type="password" 
                        placeholder="••••••" 
                        onChange={e=>setForm({...form, password:e.target.value})} 
                        required 
                    />
                </div>
                
                <button 
                    disabled={loading} 
                    className="w-full bg-black hover:bg-red-600 text-white py-4 font-black uppercase tracking-widest shadow-lg hover:shadow-none hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8 border-2 border-black"
                >
                    {loading ? "AUTHENTICATING..." : <><LogIn size={18} /> LOGIN</>}
                </button>
            </form>

            {/* Divider */}
            <div className="relative flex py-8 items-center">
                <div className="flex-grow border-t-2 border-neutral-100"></div>
                <span className="flex-shrink-0 mx-4 text-neutral-300 text-[10px] font-bold uppercase tracking-widest">OR</span>
                <div className="flex-grow border-t-2 border-neutral-100"></div>
            </div>

            {/* Guest Button */}
            <button 
                onClick={() => navigate('/')} 
                className="w-full bg-white border-2 border-neutral-200 hover:border-black text-neutral-500 hover:text-black py-3 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            >
                <User size={16} /> Continue as Guest
            </button>
        </div>

        {/* Register Link */}
        <div className="mt-8 text-center">
            <p className="text-neutral-400 text-xs font-medium uppercase tracking-wide">
                Don't have an account?
            </p>
            <button 
                onClick={() => navigate('/register')} 
                className="text-black font-black text-sm hover:text-red-600 hover:underline transition-all mt-1 flex items-center justify-center gap-1 mx-auto"
            >
                CREATE ACCOUNT <ArrowRight size={14} />
            </button>
        </div>

      </div>
    </div>
  );
}