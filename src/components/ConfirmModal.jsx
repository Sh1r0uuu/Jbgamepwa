import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, isDanger = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-white/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-sm border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0 overflow-hidden transform transition-all scale-100">
        
        <div className="p-8 text-center">
          <div className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-black ${isDanger ? 'bg-red-100 text-red-600' : 'bg-neutral-100 text-black'}`}>
            <AlertTriangle size={32} strokeWidth={2.5} />
          </div>
          
          <h3 className="text-2xl font-black text-black mb-3 uppercase tracking-tight">{title}</h3>
          <p className="text-neutral-500 text-sm font-medium leading-relaxed">{message}</p>
        </div>

        <div className="flex border-t-2 border-black">
          <button 
            onClick={onClose}
            className="flex-1 py-4 text-sm font-bold text-black hover:bg-neutral-100 transition-colors uppercase tracking-widest"
          >
            Cancel
          </button>
          <div className="w-[2px] bg-black"></div>
          <button 
            onClick={onConfirm}
            className={`flex-1 py-4 text-sm font-black text-white uppercase tracking-widest transition-colors ${isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-neutral-800'}`}
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}