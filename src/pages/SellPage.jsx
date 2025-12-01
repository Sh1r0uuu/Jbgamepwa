import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import accountService from "../services/accountService";
import userService from "../services/userService";
import { Send, Gamepad2, Link, User, PlusSquare } from "lucide-react";
import toast from 'react-hot-toast';

export default function SellPage() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "", 
    game_id: "", 
    price: "", 
    description: "", 
    image_url: "", 
    seller_name: "", 
    seller_wa: "",
    seller_id: ""
  });

  useEffect(() => {
    const user = userService.getUser();
    if (!user) {
      toast.error("Anda harus login untuk menjual akun!");
      navigate("/login");
    } else {
        setFormData(prev => ({
            ...prev, 
            seller_name: user.name, 
            seller_wa: user.whatsapp_number,
            seller_id: user.id 
        }));
    }
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await accountService.getGames();
        setGames(data || []);
      } catch (err) { console.error("Gagal ambil game", err); }
    };
    fetchGames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
        const rawValue = value.replace(/\D/g, '');
        setFormData({ ...formData, price: rawValue });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const formatDisplayPrice = (price) => {
    if (!price) return "";
    return parseInt(price).toLocaleString('id-ID');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.game_id) { toast.error("Pilih game!"); setLoading(false); return; }
      await accountService.create(formData);
      toast.success("Berhasil memposting akun!");
      navigate("/"); 
    } catch (error) {
      toast.error("Gagal posting: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black pb-24 px-4 pt-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-black mb-8 uppercase tracking-tighter flex items-center gap-3">
            <span className="bg-red-600 text-white p-2"><PlusSquare size={32} /></span>
            SELL ACCOUNT
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Judul */}
          <div className="group">
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Title / Judul Iklan</label>
            <input 
              type="text" name="title" required placeholder="Contoh: Akun ML Sultan Full Skin..." 
              className="w-full bg-neutral-50 p-4 border-2 border-neutral-200 text-black font-bold outline-none focus:border-black transition-all placeholder-neutral-400"
              onChange={handleChange} 
            />
          </div>

          {/* Game & Harga */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Game Category</label>
              <div className="relative">
                  <select name="game_id" required className="w-full bg-neutral-50 p-4 border-2 border-neutral-200 text-black font-bold outline-none focus:border-black appearance-none" onChange={handleChange}>
                    <option value="">-- SELECT GAME --</option>
                    {games.map((g) => (<option key={g.id} value={g.id}>{g.name}</option>))}
                  </select>
                  <Gamepad2 className="absolute right-4 top-4 text-neutral-400 pointer-events-none" size={20} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Price (IDR)</label>
              <input 
                  type="text" name="price" required placeholder="50.000"
                  className="w-full bg-neutral-50 p-4 border-2 border-neutral-200 text-black font-black outline-none focus:border-black" 
                  value={formatDisplayPrice(formData.price)} onChange={handleChange} 
              />
            </div>
          </div>

          {/* Spesifikasi */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Description / Spek</label>
            <textarea name="description" required rows="5" placeholder="Jelaskan detail akun selengkap-lengkapnya..." className="w-full bg-neutral-50 p-4 border-2 border-neutral-200 text-black font-medium outline-none focus:border-black resize-none" onChange={handleChange}></textarea>
          </div>

          {/* Link Gambar */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Image URL</label>
            <div className="flex gap-0">
              <div className="bg-neutral-200 p-4 border-y-2 border-l-2 border-neutral-200 flex items-center justify-center"><Link size={20} className="text-neutral-500" /></div>
              <input type="url" name="image_url" required placeholder="https://..." className="w-full bg-neutral-50 p-4 border-2 border-neutral-200 text-black text-sm font-bold outline-none focus:border-black" onChange={handleChange} />
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">*Gunakan link gambar langsung (direct link)</p>
          </div>

          {/* Info Penjual (Read Only) */}
          <div className="bg-black text-white p-6 border-2 border-black relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-600 text-[10px] font-black px-3 py-1 uppercase tracking-widest">
              Verified Seller
            </div>
            <h3 className="font-black text-neutral-400 mb-4 text-sm uppercase flex items-center gap-2 tracking-widest">
              <User size={16}/> Seller Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                  <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Name</label>
                  <p className="font-bold text-lg">{formData.seller_name}</p>
              </div>
              <div>
                  <label className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">WhatsApp</label>
                  <p className="font-mono text-lg">{formData.seller_wa}</p>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-lg py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-widest border-2 border-black">
            {loading ? "PROCESSING..." : (<> <Send size={20} /> POST ADVERTISEMENT </>)}
          </button>

        </form>
      </div>
    </div>
  );
}