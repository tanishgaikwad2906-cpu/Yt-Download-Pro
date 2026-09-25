import { 
  Zap, 
  Smartphone, 
  SlidersHorizontal, 
  Gauge, 
  UserCheck, 
  ShieldCheck, 
  EyeOff, 
  FileCheck2 
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      title: 'Simple Interface',
      description: 'Zero bloat, zero popup spam, and zero intrusive ads. Get exactly what you came for with a clean, focused user experience.',
      icon: Zap,
    },
    {
      title: 'Mobile Responsive',
      description: 'Fully responsive UI tailored for smartphones, tablets, and high-resolution desktop displays with fluid touch controls.',
      icon: Smartphone,
    },
    {
      title: 'Multiple Format Options',
      description: 'Support for MP4 video (1080p Full HD, 720p, 480p, 360p), modern WebM, and isolated studio-grade MP3 audio tracks.',
      icon: SlidersHorizontal,
    },
    {
      title: 'Fast Metadata Retrieval',
      description: 'Direct server-side stream resolution parses titles, high-resolution thumbnails, and file size estimations in milliseconds.',
      icon: Gauge,
    },
    {
      title: 'No Unnecessary Registration',
      description: 'No account creation, email sign-ups, or subscriptions required. Simply paste your link and download without friction.',
      icon: UserCheck,
    },
    {
      title: 'Privacy & Zero URL Storage',
      description: 'We respect digital privacy. Video URLs are parsed in ephemeral memory and discarded immediately without persistent storage.',
      icon: EyeOff,
    },
    {
      title: 'Rate Limiting & Abuse Shield',
      description: 'Protected by automated rate limiting to prevent server overload, ensuring 24/7 high availability and fast speeds for all users.',
      icon: ShieldCheck,
    },
    {
      title: 'Compliant & Safe',
      description: 'Strictly adheres to YouTube access limitations, DRM protection, and intellectual property terms of service.',
      icon: FileCheck2,
    },
  ];

  return (
    <section id="features" className="py-20 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
            Engineered For Performance
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
            Features Built For Clarity & Speed
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Everything you need in a modern video downloader, with none of the usual web clutter.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover p-5 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
