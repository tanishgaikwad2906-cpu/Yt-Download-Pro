import { Copy, ClipboardCheck, Sliders, DownloadCloud } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Copy a YouTube video URL',
      description: 'Navigate to YouTube on your browser or mobile app, open your desired video, and copy the browser address bar link or share URL.',
      icon: Copy,
    },
    {
      num: '02',
      title: 'Paste into the downloader',
      description: 'Paste the link into the URL input above and tap "Get Download Options". The engine validates and indexes available stream tracks.',
      icon: ClipboardCheck,
    },
    {
      num: '03',
      title: 'Select format and quality',
      description: 'Choose your desired resolution (1080p, 720p, 480p, 360p) and format (MP4, WebM, or high-bitrate MP3 Audio).',
      icon: Sliders,
    },
    {
      num: '04',
      title: 'Download authorized content',
      description: 'Click download to save the stream directly to your device. Ensure you have the rights or permission for the content.',
      icon: DownloadCloud,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
            Quick 4-Step Workflow
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
            How It Works
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Simple, streamlined media extraction designed for speed and reliability on any screen.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden group"
              >
                {/* Step number watermark/badge */}
                <div className="font-display text-4xl font-extrabold text-white/10 group-hover:text-red-500/20 transition-colors mb-4">
                  {step.num}
                </div>

                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-semibold text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
