import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let bg = 'bg-gray-900 text-white';
        if (toast.type === 'error') {
          Icon = AlertCircle;
          bg = 'bg-red-600 text-white';
        } else if (toast.type === 'info') {
          Icon = Info;
          bg = 'bg-gray-800 text-white';
        }

        return (
          <div
            key={toast.id}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold backdrop-blur-xs animate-in fade-in slide-in-from-bottom-2 duration-200 ${bg}`}
          >
            <Icon className="w-4 h-4 shrink-0 text-emerald-400" />
            <span className="leading-snug">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
