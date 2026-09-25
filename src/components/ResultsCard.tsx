import { useState, useMemo } from 'react';
import { 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Film, 
  Music, 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  Check, 
  Layers
} from 'lucide-react';
import { DownloadOption, FormatFilter, VideoMetadata } from '../types';

interface ResultsCardProps {
  video: VideoMetadata;
  onDownload: (option: DownloadOption) => void;
  onReset: () => void;
}

export default function ResultsCard({ video, onDownload, onReset }: ResultsCardProps) {
  const [selectedFormat, setSelectedFormat] = useState<FormatFilter>('ALL');
  const [selectedOptionId, setSelectedOptionId] = useState<string>(() => {
    // Default to first recommended or 1080p option
    const recommended = video.options.find((opt) => opt.isRecommended) || video.options[0];
    return recommended ? recommended.id : '';
  });
  const [imgError, setImgError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter options based on selected format tab
  const filteredOptions = useMemo(() => {
    if (selectedFormat === 'ALL') return video.options;
    return video.options.filter((opt) => opt.format === selectedFormat);
  }, [video.options, selectedFormat]);

  // Current selected option
  const currentOption = useMemo(() => {
    const found = video.options.find((opt) => opt.id === selectedOptionId);
    if (found) return found;
    return filteredOptions[0] || video.options[0];
  }, [video.options, selectedOptionId, filteredOptions]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(video.originalUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Main Glassmorphism Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden">
        {/* Ambient background highlight */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[100px] pointer-events-none" />

        {/* Top Video Metadata Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center border-b border-white/10 pb-8">
          {/* Thumbnail preview */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 shadow-lg aspect-video">
            <img
              src={imgError ? (video.fallbackThumbnail || video.thumbnail) : video.thumbnail}
              alt={video.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Scrim overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Duration Badge */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-white font-mono-nums text-xs font-semibold flex items-center gap-1 border border-white/15">
              <Clock className="w-3 h-3 text-red-400" />
              <span>{video.duration}</span>
            </div>

            {/* Watch Link Icon */}
            <a
              href={video.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 hover:bg-red-600 text-white backdrop-blur-md transition-colors border border-white/10"
              title="Open video on YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Video Information */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Channel and source */}
              <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                <span className="font-medium text-neutral-300 hover:text-white">
                  {video.channel}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-neutral-500">ID: {video.id}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Available
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug line-clamp-2">
                {video.title}
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-neutral-400 line-clamp-2">
                Select your desired file format and quality below. High-definition MP4 and audio extracts are ready for immediate download.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
              </button>

              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>New Video URL</span>
              </button>

              <a
                href={video.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Format Selector Bar */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-500" />
                <span>Select Quality & Format</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Choose between standard MP4 video, lightweight WebM, or audio-only MP3.
              </p>
            </div>

            {/* Interactive Format Tabs */}
            <div className="flex items-center gap-1 p-1 bg-neutral-900/90 rounded-xl border border-white/10 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedFormat('ALL')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedFormat === 'ALL'
                    ? 'bg-red-600 text-white shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All Formats
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('MP4')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  selectedFormat === 'MP4'
                    ? 'bg-red-600 text-white shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Film className="w-3 h-3" />
                <span>MP4 Video</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('WebM')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedFormat === 'WebM'
                    ? 'bg-red-600 text-white shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                WebM
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('Audio')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  selectedFormat === 'Audio'
                    ? 'bg-red-600 text-white shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Music className="w-3 h-3" />
                <span>Audio (MP3)</span>
              </button>
            </div>
          </div>

          {/* Quality Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
            {filteredOptions.map((opt) => {
              const isSelected = opt.id === currentOption?.id;

              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-red-950/20 border-red-500/60 ring-2 ring-red-500/20 shadow-lg'
                      : 'bg-neutral-900/50 border-white/10 hover:border-white/20 hover:bg-neutral-900/80'
                  }`}
                >
                  {/* Top row: Format & Recommended Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-white uppercase tracking-wider">
                      {opt.format}
                    </span>

                    {opt.isRecommended && (
                      <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Best Quality
                      </span>
                    )}
                  </div>

                  {/* Quality title */}
                  <div className="font-semibold text-white text-base">
                    {opt.quality}
                  </div>

                  {/* Specs & Resolution */}
                  <div className="mt-1 text-xs text-neutral-400 flex items-center gap-2">
                    <span>{opt.resolution}</span>
                    <span aria-hidden="true">·</span>
                    <span>{opt.codec}</span>
                  </div>

                  {/* Size and check */}
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="font-mono-nums font-semibold text-neutral-200">
                      ~ {opt.fileSize}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-red-600 text-white'
                          : 'border border-neutral-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Download Action Area */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fast direct processing · Zero server storage · Safe metadata stream</span>
          </div>

          {/* Prominent Download Button */}
          {currentOption && (
            <button
              type="button"
              onClick={() => onDownload(currentOption)}
              className="w-full sm:w-auto red-gradient-btn px-8 py-4 rounded-xl font-bold text-base text-white flex items-center justify-center gap-3 shadow-xl shadow-red-600/30 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-5 h-5" />
              <span>
                Download {currentOption.format} ({currentOption.quality}) • {currentOption.fileSize}
              </span>
            </button>
          )}
        </div>

        {/* Small Notice */}
        <p className="mt-4 text-[11px] text-neutral-500 text-center">
          Notice: Please download only content you have permission or authorized rights to download in compliance with YouTube&apos;s Terms of Service and applicable copyright laws.
        </p>
      </div>
    </section>
  );
}
