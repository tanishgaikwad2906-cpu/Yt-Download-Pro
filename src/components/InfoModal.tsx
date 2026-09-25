import { useState } from 'react';
import { X, Shield, FileText, HelpCircle, Mail, Copyright, CheckCircle2, Send } from 'lucide-react';
import { ModalType } from '../types';

interface InfoModalProps {
  type: ModalType;
  onClose: () => void;
}

export default function InfoModal({ type, onClose }: InfoModalProps) {
  const [contactSent, setContactSent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  if (!type) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactMessage.trim()) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      onClose();
    }, 2500);
  };

  const getTitleAndIcon = () => {
    switch (type) {
      case 'about':
        return { title: 'About YT Download Pro', icon: HelpCircle };
      case 'privacy':
        return { title: 'Privacy Policy', icon: Shield };
      case 'terms':
        return { title: 'Terms of Service', icon: FileText };
      case 'copyright':
        return { title: 'Copyright & DMCA Policy', icon: Copyright };
      case 'contact':
        return { title: 'Contact Support', icon: Mail };
      default:
        return { title: 'Information', icon: HelpCircle };
    }
  };

  const { title, icon: Icon } = getTitleAndIcon();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative max-h-[85vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto py-5 pr-2 space-y-4 text-sm text-neutral-300 leading-relaxed font-sans">
          {type === 'about' && (
            <div className="space-y-4">
              <p>
                <strong>YT Download Pro</strong> is a high-speed web utility designed to simplify the extraction of video formats, metadata, and audio streams for authorized media creators, students, archivists, and personal listeners.
              </p>
              <h4 className="text-base font-semibold text-white">Our Mission</h4>
              <p>
                We believe accessing high-definition public media and open-source video content should be fast, seamless, and free of the malware, deceptive popups, and aggressive advertising that plague the web.
              </p>
              <h4 className="text-base font-semibold text-white">Core Commitments</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
                <li>Zero account signups or intrusive user tracking</li>
                <li>Ephemeral memory processing: submitted URLs are never retained in our databases</li>
                <li>Honoring content owners: We do not bypass DRM, encryption, or private video authentication</li>
                <li>Ultra-fast streaming resolutions from 360p up to 1080p Full HD and 320kbps MP3 audio</li>
              </ul>
            </div>
          )}

          {type === 'privacy' && (
            <div className="space-y-4">
              <p>
                At <strong>YT Download Pro</strong>, user privacy is our foundational operating principle. We follow a strict zero-retention policy for submitted media URLs.
              </p>
              <h4 className="text-base font-semibold text-white">1. Zero URL Persistence</h4>
              <p>
                When you submit a video URL, it is processed in ephemeral server memory exclusively to query public metadata. We do not store, log, or index the URLs you submit in any database or file system.
              </p>
              <h4 className="text-base font-semibold text-white">2. Rate Limiting Data</h4>
              <p>
                To prevent automated abuse and DDoS disruption, our system maintains an in-memory sliding window counter tied to IP addresses for a maximum duration of 60 seconds. This data is purged automatically every minute.
              </p>
              <h4 className="text-base font-semibold text-white">3. Cookies & Tracking</h4>
              <p>
                We do not employ third-party tracking pixels, advertising identifiers, or user profiling cookies. Local browser storage is strictly used for client interface preferences.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-4">
              <p>
                By accessing or using YT Download Pro, you agree to comply with and be bound by these Terms of Service.
              </p>
              <h4 className="text-base font-semibold text-white">1. Authorized Use Only</h4>
              <p>
                Users are solely responsible for ensuring they possess the necessary copyright licenses, authorization, or explicit legal permission (such as Creative Commons, public domain, or Fair Use) to download and store video and audio media.
              </p>
              <h4 className="text-base font-semibold text-white">2. YouTube Terms Compliance</h4>
              <p>
                YT Download Pro does not circumvent digital rights management (DRM), access control mechanisms, or authentication barriers. You may not use this service to access paid, rented, restricted, or private content.
              </p>
              <h4 className="text-base font-semibold text-white">3. Abuse Protection</h4>
              <p>
                Automated scraping, bot querying, or attempting to overload our server infrastructure is strictly prohibited.
              </p>
            </div>
          )}

          {type === 'copyright' && (
            <div className="space-y-4">
              <p>
                YT Download Pro respects the intellectual property rights of content creators and copyright owners worldwide.
              </p>
              <h4 className="text-base font-semibold text-white">DMCA Compliance & Takedown</h4>
              <p>
                If you are a copyright owner or an agent thereof and believe that any content made accessible through our platform infringes upon your copyright, you may submit a formal notification pursuant to the Digital Millennium Copyright Act (DMCA).
              </p>
              <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-1 text-xs">
                <p className="font-semibold text-white">DMCA Agent Contact:</p>
                <p>Email: copyright@ytdownloadpro.app</p>
                <p>Response SLA: Under 24 business hours</p>
              </div>
              <p className="text-xs text-neutral-400">
                Please include the original work title, source link, authorization proof, and your contact credentials.
              </p>
            </div>
          )}

          {type === 'contact' && (
            <div>
              {contactSent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Sent Successfully</h4>
                  <p className="text-neutral-400 text-xs max-w-sm mx-auto">
                    Thank you for reaching out. Our engineering team reviews inquiries within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3.5">
                  <p className="text-xs text-neutral-400">
                    Have feedback, technical questions, or an inquiry? Submit the form below.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe your question or feedback..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full red-gradient-btn py-3 rounded-xl font-semibold text-white text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/30"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
