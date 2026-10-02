import React from 'react';
import { Sparkles, CheckCircle2, Flame, Info, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useUser();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => {
        const isXP = toast.type === 'xp';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl shadow-xl border
              transition-all duration-300 transform translate-y-0 text-xs font-semibold
              ${isXP 
                ? 'bg-[#1C1917] text-white border-amber-500/40 shadow-amber-950/20' 
                : isSuccess 
                  ? 'bg-emerald-900 text-white border-emerald-500/40' 
                  : 'bg-white text-[#1C1917] border-[#E7E5E4]'
              }
            `}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {isXP && (
                <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
                </span>
              )}
              {isSuccess && (
                <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              )}
              {!isXP && !isSuccess && (
                <span className="w-7 h-7 rounded-xl bg-[#0F2B5C]/10 text-[#0F2B5C] flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4" />
                </span>
              )}

              <span className="truncate leading-snug">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/20 text-stone-400 hover:text-white transition shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
