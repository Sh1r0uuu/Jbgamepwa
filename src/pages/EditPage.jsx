import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import accountService from "../services/accountService";
import { Save, ArrowLeft, Link, Edit3 } from "lucide-react";
import toast from 'react-hot-toast';

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", game_id: "", price: "", description: "", image_url: "" });

  useEffect(() => {
    const loadData = async () => {
      try {
        const g = await accountService.getGames(); setGames(g || []);
        const a = await accountService.getById(id);
        if (a) setFormData({ title: a.title, game_id: a.game_id, price: a.price, description: a.description, image_url: a.image_url });
      } catch (err) { toast.error("Gagal load data"); navigate("/"); } finally { setLoading(false); }
    };
    loadData();
  }, [id, navigate]);

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
    try { await accountService.update(id, formData); toast.success("Update Berhasil!"); navigate(`/account/${id}`); } 
    catch (error) { toast.error("Gagal"); } finally { setLoading(false); }
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-black font-bold tracking-widest animate-pulse">LOADING DATA...</div>;

  return (
    <div className="min-h-screen bg-white text-black pb-24 px-4 pt-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-neutral-500 hover:text-black mb-6 font-bold uppercase tracking-wider text-xs group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Cancel Edit
        </button>
        
        <h1 className="text-3xl font-black text-black mb-8 uppercase tracking-tighter flex items-center gap-3">
            <Edit3 size={32} className="text-red-600"/> EDIT DETAILS
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Title</label>
                <input className="w-full bg-neutral-50 p-4 border-2 border-neutral-200 text-black font-bold outline-none focus:border-black transition-all" name="title" value={formData.title} onChange={handleChange} required/>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Game</label>
                    <select name="game_id" value={formData.game_id} required className="w-full bg-neutral-50 p-4 border-2 border-neutral-200 text-black font-bold outline-none focus:border-black" onChange={handleChange}>
                        <option value="">-- Select --</option>
                        {games.map((g) => (<option key={g.id} value={g.id}>{g.name}</option>))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Price</label>
                    <input 
                        type="text" name="price" 
                        className="w-full bg-neutral-50 p-4 border-2 border-neutral-200 text-black font-black outline-none focus:border-black" 
                        value={formatDisplayPrice(formData.price)} onChange={handleChange} required
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Description</label>
                <textarea className="w-full bg-neutral-50 p-4 border-2 border-neutral-200 text-black font-medium outline-none focus:border-black resize-none" rows="5" value={formData.description} onChange={handleChange} required></textarea>
            </div>
            
            <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Image URL</label>
                <div className="flex gap-0">
                    <div className="bg-neutral-200 p-4 border-y-2 border-l-2 border-neutral-200 flex items-center justify-center"><Link size={20} className="text-neutral-500" /></div>
                    <input type="url" name="image_url" className="w-full bg-neutral-50 p-4 border-2 border-neutral-200 text-black font-bold text-sm outline-none focus:border-black" value={formData.image_url} onChange={handleChange} required/>
                </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] hover:shadow-none hover:translate-y-1 transition-all flex items-center justify-center gap-2 border-2 border-black">
                {loading ? "SAVING..." : <><Save size={20} /> SAVE CHANGES</>} 
            </button>
        </form>
      </div>
    </div>
  );
}