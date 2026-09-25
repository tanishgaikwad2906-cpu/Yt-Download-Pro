import { Youtube, ShieldCheck } from 'lucide-react';
import { ModalType } from '../types';

interface FooterProps {
  onOpenModal: (type: ModalType) => void;
}

export default function Footer({ onOpenModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#07080c] py-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
              <Youtube className="w-4 h-4 fill-current" />
            </span>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              YT Download <span className="text-red-500 font-extrabold">Pro</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => onOpenModal('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => onOpenModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => onOpenModal('copyright')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Copyright
            </button>
            <button
              type="button"
              onClick={() => onOpenModal('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Safe Badge */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted & Privacy Protected</span>
          </div>
        </div>

        {/* Mandatory Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 text-center sm:text-left">
          <p className="max-w-xl">
            Disclaimer: Users are responsible for ensuring they have the necessary rights or permission to download content. YT Download Pro is not affiliated with or endorsed by YouTube or Google LLC.
          </p>

          <p className="font-mono-nums">
            © {currentYear} YT Download Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
