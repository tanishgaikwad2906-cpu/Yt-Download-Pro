import { Youtube, ShieldCheck, Sparkles } from 'lucide-react';
import { ModalType } from '../types';

interface HeaderProps {
  onOpenModal: (type: ModalType) => void;
  onTrySample: () => void;
}

export default function Header({ onOpenModal, onTrySample }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#090a0f]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="/" 
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white group select-none"
        >
          <span className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            <Youtube className="w-5 h-5 fill-current" />
          </span>
          <span className="font-display font-bold text-xl tracking-tight">
            YT Download <span className="text-red-500 font-extrabold">Pro</span>
          </span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a href="#downloader" className="hover:text-white transition-colors">Downloader</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#formats" className="hover:text-white transition-colors">Formats</a>
          <button 
            onClick={() => onOpenModal('terms')} 
            className="hover:text-white transition-colors text-left cursor-pointer"
          >
            Compliance & Rights
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onTrySample}
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Try Sample</span>
          </button>

          <button
            onClick={() => onOpenModal('privacy')}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-800/90 hover:bg-neutral-700/90 rounded-full border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
            title="Zero storage & privacy notice"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xs:inline">Safe & Private</span>
            <span className="xs:hidden">Safe</span>
          </button>
        </div>
      </div>
    </header>
  );
}
