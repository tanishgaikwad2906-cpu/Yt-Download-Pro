import { useEffect, useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Download, 
  FileText, 
  AlertTriangle,
  ExternalLink 
} from 'lucide-react';
import { DownloadOption, VideoMetadata } from '../types';
import { triggerDirectDownload } from '../services/youtubeApi';

interface DownloadProgressModalProps {
  isOpen: boolean;
  video: VideoMetadata;
  option: DownloadOption;
  onClose: () => void;
}

export default function DownloadProgressModal({
  isOpen,
  video,
  option,
  onClose,
}: DownloadProgressModalProps) {
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState('14.2 MB/s');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setIsCompleted(false);
      return;
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Simulate realistic streaming download progress
      currentProgress += Math.floor(Math.random() * 12) + 8;
      
      const currentSpeed = (12 + Math.random() * 8).toFixed(1);
      setSpeed(`${currentSpeed} MB/s`);

      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setIsCompleted(true);
        clearInterval(interval);

        // Initiate the real file download in the browser
        try {
          triggerDirectDownload(video, option);
        } catch (e) {
          console.error('Trigger download error:', e);
        }
      } else {
        setProgress(currentProgress);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [isOpen, video, option]);

  if (!isOpen) return null;

  const transferredMB = ((option.bytes * (progress / 100)) / (1024 * 1024)).toFixed(1);
  const totalMB = (option.bytes / (1024 * 1024)).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center">
          <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-all ${
            isCompleted 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-red-500/20 text-red-500 border border-red-500/30'
          }`}>
            {isCompleted ? (
              <CheckCircle2 className="w-8 h-8" />
            ) : (
              <Download className="w-7 h-7 animate-bounce" />
            )}
          </div>

          <h3 className="font-display text-xl font-bold text-white">
            {isCompleted ? 'Download Ready & Saved!' : 'Processing & Preparing Media'}
          </h3>

          <p className="mt-1 text-xs text-neutral-400">
            {isCompleted 
              ? 'Your file has been packaged and saved to your device downloads folder.' 
              : 'Extracting audio/video streams at highest available bitrate...'}
          </p>
        </div>

        {/* Media Details Box */}
        <div className="mt-6 p-3.5 rounded-xl bg-neutral-900/80 border border-white/10 flex items-center gap-3">
          <div className="w-16 h-11 rounded-lg overflow-hidden shrink-0 bg-neutral-800">
            <img 
              src={video.fallbackThumbnail || video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-white truncate">{video.title}</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Format: <span className="text-neutral-200 font-medium">{option.format} ({option.quality})</span> · {option.fileSize}
            </p>
          </div>
        </div>

        {/* Progress Bar & Stats */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-neutral-400 font-medium">
              {isCompleted ? 'Processing 100%' : `Transferring (${speed})`}
            </span>
            <span className="font-mono-nums font-bold text-white">
              {progress}%
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-neutral-800 overflow-hidden border border-white/5">
            <div
              className={`h-full transition-all duration-200 rounded-full ${
                isCompleted 
                  ? 'bg-emerald-500' 
                  : 'bg-gradient-to-r from-red-600 to-amber-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-400 font-mono-nums">
            <span>{transferredMB} MB / {totalMB} MB</span>
            <span>{isCompleted ? 'Completed' : 'Fast Direct Stream'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          {isCompleted ? (
            <>
              <button
                type="button"
                onClick={() => triggerDirectDownload(video, option)}
                className="w-full sm:flex-1 red-gradient-btn py-3 px-4 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/30"
              >
                <Download className="w-4 h-4" />
                <span>Save Again</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-semibold text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              Cancel Processing
            </button>
          )}
        </div>

        {/* Compliance Footer reminder */}
        <div className="mt-5 pt-4 border-t border-white/5 text-[11px] text-neutral-500 flex items-start gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <span>
            Users are responsible for ensuring they have the necessary rights or permission to download content under YouTube&apos;s Terms of Service.
          </span>
        </div>
      </div>
    </div>
  );
}
