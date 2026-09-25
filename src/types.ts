export interface DownloadOption {
  id: string;
  format: 'MP4' | 'WebM' | 'Audio';
  quality: string;
  resolution: string;
  fps: number | null;
  codec: string;
  fileSize: string;
  bytes: number;
  isRecommended: boolean;
  type: 'video' | 'audio';
}

export interface VideoMetadata {
  id: string;
  title: string;
  channel: string;
  channelUrl: string;
  thumbnail: string;
  fallbackThumbnail?: string;
  duration: string;
  durationSeconds: number;
  originalUrl: string;
  options: DownloadOption[];
  disclaimer: string;
}

export type FormatFilter = 'ALL' | 'MP4' | 'WebM' | 'Audio';

export interface DownloadSession {
  option: DownloadOption;
  video: VideoMetadata;
  status: 'preparing' | 'downloading' | 'completed' | 'error';
  progress: number;
  speed: string;
  downloadedBytes: number;
  totalBytes: number;
  error?: string;
}

export type ModalType = 'about' | 'privacy' | 'terms' | 'copyright' | 'contact' | null;

export interface QuickSample {
  title: string;
  channel: string;
  url: string;
  duration: string;
}
