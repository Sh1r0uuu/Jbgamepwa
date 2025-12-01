import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { UserPlus, ArrowLeft, ShieldCheck } from "lucide-react";
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

    if (!form.name || !form.username || !form.password || !form.whatsapp_number) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      await userService.register(form);
      toast.success("REGISTRATION SUCCESSFUL!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Registration Failed. Username might be taken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-neutral-100 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-neutral-500 hover:text-black mb-8 text-xs font-bold uppercase tracking-widest transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Login
        </button>

        <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-black text-white mx-auto flex items-center justify-center mb-4 shadow-lg">
              <UserPlus size={32} />
            </div>
            <h1 className="text-3xl font-black text-black uppercase tracking-tighter">
              JOIN <span className="text-red-600">KAI.</span>
            </h1>
            <p className="text-neutral-500 text-xs font-bold tracking-widest mt-2 uppercase">Create your account</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="group">
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Full Name</label>
              <input
                name="name"
                className="w-full p-3 bg-neutral-50 border-2 border-neutral-200 text-black font-bold focus:border-black focus:bg-white outline-none transition-all placeholder-neutral-300"
                placeholder="YOUR NAME"
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Username</label>
              <input
                name="username"
                className="w-full p-3 bg-neutral-50 border-2 border-neutral-200 text-black font-bold focus:border-black focus:bg-white outline-none transition-all placeholder-neutral-300"
                placeholder="UNIQUE USERNAME"
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">WhatsApp Number</label>
              <input
                name="whatsapp_number"
                type="tel"
                className="w-full p-3 bg-neutral-50 border-2 border-neutral-200 text-black font-bold focus:border-black focus:bg-white outline-none transition-all placeholder-neutral-300 font-mono"
                placeholder="0812..."
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Password</label>
              <input
                name="password"
                type="password"
                className="w-full p-3 bg-neutral-50 border-2 border-neutral-200 text-black font-bold focus:border-black focus:bg-white outline-none transition-all placeholder-neutral-300"
                placeholder="••••••"
                onChange={handleChange}
                required
              />
            </div>

            <button disabled={loading} className="w-full bg-black hover:bg-red-600 text-white py-4 font-black uppercase tracking-widest shadow-lg hover:shadow-none hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8 border-2 border-black">
              {loading ? "CREATING ACCOUNT..." : "REGISTER NOW"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-neutral-100 text-center">
            <div className="flex items-center justify-center gap-2 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck size={14} /> Secure Registration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}