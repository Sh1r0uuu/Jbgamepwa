import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import accountService from '../services/accountService';
import userService from '../services/userService';
import { ArrowLeft, MessageCircle, Gamepad2, ShieldCheck, Edit, Trash2, ZoomIn, X, RefreshCw, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../components/ConfirmModal';
import FavoriteButton from '../components/FavoriteButton';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const currentUser = userService.getUser();
  
  // State Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSoldModal, setShowSoldModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await accountService.getById(id);
        setAccount(response);
      } catch (err) { 
        console.error(err); 
        toast.error("Gagal memuat data akun");
      } finally { 
        setLoading(false); 
      }
    };
    fetchDetail();
  }, [id]);

  const isOwner = currentUser && account && currentUser.id === account.seller_id;

  const handleBuy = () => {
    if (!account) return;
    const message = `Halo, saya tertarik dengan akun *${account.title}*...`;
    window.open(`https://wa.me/${account.sellers?.whatsapp_number}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const confirmDelete = async () => {
    try { 
        await accountService.delete(id); 
        setShowDeleteModal(false); 
        toast.success("Akun dihapus"); 
        navigate('/'); 
    } catch (e) { 
        toast.error("Gagal hapus"); 
    }
  };

  const confirmSold = async () => {
    try {
        const updated = { ...account, is_sold: true };
        await accountService.update(id, updated);
        setAccount(updated);
        setShowSoldModal(false);
        toast.success("Status Sold Out!");
    } catch(e) { 
        toast.error("Gagal update"); 
    }
  };

  const confirmRestock = async () => {
    try {
        const updated = { ...account, is_sold: false };
        await accountService.update(id, updated);
        setAccount(updated);
        setShowRestockModal(false);
        toast.success("Akun berhasil di-restock!");
    } catch(e) { 
        toast.error("Gagal restock"); 
    }
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-black font-bold tracking-widest animate-pulse">LOADING...</div>;
  if (!account) return <div className="min-h-screen bg-white flex items-center justify-center text-red-600 font-bold">DATA NOT FOUND</div>;

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-32 font-sans">
      <ConfirmModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={confirmDelete} title="DELETE ACCOUNT?" message="This action cannot be undone." isDanger={true}/>
      <ConfirmModal isOpen={showSoldModal} onClose={() => setShowSoldModal(false)} onConfirm={confirmSold} title="MARK AS SOLD?" message="Item will be labeled as SOLD OUT."/>
      <ConfirmModal isOpen={showRestockModal} onClose={() => setShowRestockModal(false)} onConfirm={confirmRestock} title="RESTOCK ITEM?" message="Item will be available for sale again." isDanger={false}/>

      {/* Image Zoom Overlay */}
      {isImageOpen && (
        <div className="fixed inset-0 z-[60] bg-white/95 flex items-center justify-center p-4 backdrop-blur-xl cursor-zoom-out" onClick={() => setIsImageOpen(false)}>
            <button className="absolute top-4 right-4 p-3 bg-black text-white rounded-full hover:bg-red-600 transition-colors"><X size={24} /></button>
            <img src={account.image_url} alt={account.title} className="max-w-full max-h-full shadow-[0_0_50px_rgba(0,0,0,0.2)] object-contain scale-100" onClick={(e) => e.stopPropagation()}/>
        </div>
      )}

      {/* Navbar Floating */}
      <div className="fixed top-0 left-0 right-0 p-4 z-30 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
            <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white border-2 border-neutral-100 shadow-md rounded-full flex items-center justify-center hover:border-black transition-all text-black">
                <ArrowLeft size={20} />
            </button>
        </div>
        <div className="pointer-events-auto flex gap-3 items-center">
            <div className="bg-white rounded-full shadow-md border-2 border-neutral-100 p-1">
                 <FavoriteButton account={account} className="text-black hover:text-red-600" />
            </div>
            {isOwner && (
                <>
                <button onClick={() => navigate(`/edit/${id}`)} className="w-10 h-10 bg-white border-2 border-neutral-100 shadow-md rounded-full flex items-center justify-center hover:border-black hover:text-black text-neutral-500 transition-all"><Edit size={18}/></button>
                <button onClick={() => setShowDeleteModal(true)} className="w-10 h-10 bg-white border-2 border-red-100 shadow-md rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white text-red-500 transition-all"><Trash2 size={18}/></button>
                </>
            )}
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[45vh] md:h-[60vh] group cursor-pointer bg-neutral-100" onClick={() => setIsImageOpen(true)}>
        <img src={account.image_url} alt={account.title} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/30 backdrop-blur-[2px]">
            <div className="bg-black text-white px-4 py-2 font-bold tracking-widest text-xs flex items-center gap-2">
                <ZoomIn size={16} /> VIEW IMAGE
            </div>
        </div>

        {account.is_sold && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                <span className="text-red-600 font-black text-4xl border-4 border-red-600 px-8 py-2 -rotate-12 tracking-widest uppercase shadow-xl">SOLD OUT</span>
            </div>
        )}
      </div>

      {/* Content Info */}
      <div className="px-6 -mt-12 relative z-10 max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-black text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg">
                <Gamepad2 size={14} /> {account.games?.name}
            </span>
            <span className="bg-white text-black border-2 border-neutral-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={14} className="text-red-600"/> Verified
            </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 text-black uppercase tracking-tight">{account.title}</h1>
        
        {/* Price Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-neutral-50 p-6 border-l-4 border-red-600 mb-8 shadow-sm">
           <div>
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-1">Current Price</p>
              <p className="text-3xl font-black text-black">Rp {parseInt(account.price).toLocaleString('id-ID')}</p>
           </div>
           <div className="mt-4 md:mt-0 flex items-center gap-3 border-t md:border-t-0 md:border-l border-neutral-200 pt-4 md:pt-0 md:pl-6">
              <div className="text-right hidden md:block">
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Seller</p>
                  <p className="text-sm font-black text-black">{account.sellers?.name}</p>
              </div>
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-lg font-bold">
                  {account.sellers?.name?.charAt(0)}
              </div>
              <div className="md:hidden">
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Seller</p>
                  <p className="text-sm font-black text-black">{account.sellers?.name}</p>
              </div>
           </div>
        </div>

        {/* Description */}
        <div className="mb-10">
          <h3 className="font-black text-xl mb-4 text-black flex items-center gap-2 uppercase border-b-2 border-neutral-100 pb-2">
             Specification
          </h3>
          <div className="text-neutral-600 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium">
            {account.description}
          </div>
        </div>

        {/* Owner Actions */}
        {isOwner && (
            <div className="mb-8">
                {!account.is_sold ? (
                    <button onClick={() => setShowSoldModal(true)} className="w-full py-4 border-2 border-black text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all text-sm">
                        Mark As Sold
                    </button>
                ) : (
                    <button onClick={() => setShowRestockModal(true)} className="w-full py-4 border-2 border-dashed border-green-600 text-green-600 font-bold uppercase tracking-widest hover:bg-green-50 transition-all text-sm flex items-center justify-center gap-2">
                        <RefreshCw size={18} /> Restock Item
                    </button>
                )}
            </div>
        )}
      </div>

      {/* Footer / Tombol Beli (FIXED: Ditambah margin-bottom untuk Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-neutral-100 p-4 z-40 pb-safe md:pb-6 mb-16 md:mb-0">
        <div className="max-w-2xl mx-auto flex gap-3">
            <button className="p-4 border-2 border-neutral-200 text-neutral-400 hover:border-black hover:text-black transition-colors">
                <Share2 size={24} />
            </button>
            <button onClick={handleBuy} disabled={account.is_sold} className={`flex-1 font-black uppercase tracking-widest py-4 flex items-center justify-center gap-2 text-sm transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 border-2 border-black ${account.is_sold ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed border-neutral-300 shadow-none' : 'bg-red-600 text-white border-black'}`}>
                <MessageCircle size={20} /> {account.is_sold ? 'SOLD OUT' : 'CONTACT SELLER'}
            </button>
        </div>
      </div>
    </div>
  );
}