import { useState, useRef, FormEvent } from 'react';
import { Search, Clipboard, X, Loader2, ArrowRight, Video, Music, Sparkles, AlertCircle } from 'lucide-react';
import { QUICK_SAMPLES } from '../services/youtubeApi';

interface HeroSectionProps {
  url: string;
  setUrl: (url: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
  onSubmit: (e?: FormEvent) => void;
  onSelectSample: (sampleUrl: string) => void;
}

export default function HeroSection({
  url,
  setUrl,
  isLoading,
  errorMessage,
  onSubmit,
  onSelectSample,
}: HeroSectionProps) {
  const [pasteNotice, setPasteNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          setPasteNotice('Pasted from clipboard!');
          setTimeout(() => setPasteNotice(null), 2500);
          inputRef.current?.focus();
        }
      } else {
        setPasteNotice('Use Ctrl+V or Cmd+V to paste');
        setTimeout(() => setPasteNotice(null), 2500);
      }
    } catch {
      setPasteNotice('Clipboard permission required');
      setTimeout(() => setPasteNotice(null), 2500);
    }
  };

  const handleClear = () => {
    setUrl('');
    inputRef.current?.focus();
  };

  return (
    <section id="downloader" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle status tag without pill clutter */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>High-Speed YouTube Stream Extraction</span>
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-[1.12]">
          Download YouTube Videos Easily
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Paste a YouTube link and choose from available video or audio formats.
        </p>

        {/* Input Box Card */}
        <div className="mt-9 max-w-3xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e);
            }}
            className="relative p-2 sm:p-2.5 rounded-2xl glass-card border border-white/15 shadow-2xl shadow-black/80 transition-all focus-within:border-red-500/50 focus-within:ring-4 focus-within:ring-red-500/10"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1 flex items-center min-w-0">
                <Search className="w-5 h-5 text-neutral-400 ml-3.5 mr-2 shrink-0 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste YouTube URL here..."
                  aria-label="YouTube video URL"
                  className="w-full bg-transparent py-3 pr-20 text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none truncate"
                  autoComplete="off"
                  spellCheck="false"
                />

                {/* Right utility buttons inside input */}
                <div className="absolute right-2 flex items-center gap-1">
                  {url && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                      title="Clear URL"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors inline-flex items-center gap-1 text-xs"
                    title="Paste from clipboard"
                  >
                    <Clipboard className="w-4 h-4" />
                    <span className="hidden sm:inline">Paste</span>
                  </button>
                </div>
              </div>

              {/* Prominent Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="red-gradient-btn px-6 py-3.5 sm:py-3.5 text-sm sm:text-base font-semibold text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/30 shrink-0 select-none whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Retrieving Options...</span>
                  </>
                ) : (
                  <>
                    <span>Get Download Options</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Toast / Paste notification */}
          {pasteNotice && (
            <p className="mt-2 text-xs text-emerald-400 text-center animate-fade-in">
              {pasteNotice}
            </p>
          )}

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="mt-4 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-sm flex items-start gap-2.5 text-left">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">{errorMessage}</p>
                <p className="text-xs text-red-300/80 mt-0.5">
                  Supported formats include: <code className="text-neutral-200">youtube.com/watch?v=...</code>, <code className="text-neutral-200">youtu.be/...</code>, Shorts, and Embeds.
                </p>
              </div>
            </div>
          )}

          {/* Quick Demo Sample URLs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-neutral-400 flex items-center gap-1 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Quick Demo:
            </span>
            {QUICK_SAMPLES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSample(sample.url)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all text-left truncate max-w-[220px] cursor-pointer"
                title={`Test with ${sample.title}`}
              >
                {sample.title}
              </button>
            ))}
          </div>

          {/* Supported Formats Bar below hero input */}
          <div id="formats" className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-red-400" />
              <span className="font-semibold text-white">Supported Formats:</span>
              <span className="text-neutral-400">MP4 (1080p / 720p / 480p / 360p)</span>
            </div>
            <span className="text-neutral-600 hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">WebM (60fps High-Efficiency)</span>
            </div>
            <span className="text-neutral-600 hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-red-400" />
              <span className="text-neutral-400">MP3 Audio (up to 320 kbps)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
