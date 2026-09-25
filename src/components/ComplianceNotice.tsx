import { ShieldAlert, BookOpen, ExternalLink } from 'lucide-react';
import { ModalType } from '../types';

interface ComplianceNoticeProps {
  onOpenModal: (type: ModalType) => void;
}

export default function ComplianceNotice({ onOpenModal }: ComplianceNoticeProps) {
  return (
    <section className="py-12 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Compliance, Copyright & Fair Use Notice
                </h4>
                <p className="mt-1 text-xs text-neutral-300 leading-relaxed max-w-2xl">
                  YT Download Pro is built for downloading public, personal, and creative commons content. Users are responsible for ensuring they possess the necessary rights or explicit permission from the copyright holder. Our platform strictly honors YouTube Terms of Service and does not bypass DRM or private content access restrictions.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => onOpenModal('terms')}
                className="w-full md:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Terms of Service</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenModal('copyright')}
                className="w-full md:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>DMCA Policy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
