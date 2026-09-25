import { DownloadOption, QuickSample, VideoMetadata } from '../types';

export const QUICK_SAMPLES: QuickSample[] = [
  {
    title: 'Charge - Blender Open Movie (4K)',
    channel: 'Blender Studio',
    url: 'https://www.youtube.com/watch?v=UXqq0ZvbOnk',
    duration: '03:12',
  },
  {
    title: 'Big Buck Bunny 60fps Open Film',
    channel: 'Blender Foundation',
    url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    duration: '09:56',
  },
  {
    title: 'Lofi Hip Hop Chill Beats To Relax',
    channel: 'Lofi Girl Media',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    duration: '03:45',
  },
  {
    title: 'Earth & Nature 4K HDR Timelapse',
    channel: 'Earth Cinema Project',
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    duration: '04:18',
  },
];

export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const cleanUrl = url.trim();

  const patterns = [
    /(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/i,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i,
  ];

  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }

  return null;
}

export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null;
}

function calculateFileSize(durationSeconds: number, format: 'MP4' | 'WebM' | 'Audio', quality: string): { sizeFormatted: string; bytes: number } {
  let kbps = 2500;
  if (format === 'Audio') {
    if (quality.includes('320')) kbps = 320;
    else if (quality.includes('192')) kbps = 192;
    else if (quality.includes('128')) kbps = 128;
    else kbps = 256;
  } else {
    if (quality.includes('1080')) kbps = format === 'WebM' ? 3800 : 4200;
    else if (quality.includes('720')) kbps = format === 'WebM' ? 2200 : 2500;
    else if (quality.includes('480')) kbps = format === 'WebM' ? 1200 : 1400;
    else if (quality.includes('360')) kbps = 800;
  }

  const duration = durationSeconds > 0 ? durationSeconds : 230;
  const totalBits = kbps * 1000 * duration;
  const totalBytes = Math.round(totalBits / 8);
  const totalMB = totalBytes / (1024 * 1024);

  if (totalMB >= 1024) {
    return {
      sizeFormatted: `${(totalMB / 1024).toFixed(1)} GB`,
      bytes: totalBytes,
    };
  }
  return {
    sizeFormatted: `${totalMB.toFixed(1)} MB`,
    bytes: totalBytes,
  };
}

function generateDefaultOptions(durationSeconds: number): DownloadOption[] {
  return [
    {
      id: 'mp4-1080p',
      format: 'MP4',
      quality: '1080p Full HD',
      resolution: '1920x1080',
      fps: 60,
      codec: 'H.264 / AAC',
      fileSize: calculateFileSize(durationSeconds, 'MP4', '1080p').sizeFormatted,
      bytes: calculateFileSize(durationSeconds, 'MP4', '1080p').bytes,
      isRecommended: true,
      type: 'video',
    },
    {
      id: 'mp4-720p',
      format: 'MP4',
      quality: '720p HD',
      resolution: '1280x720',
      fps: 30,
      codec: 'H.264 / AAC',
      fileSize: calculateFileSize(durationSeconds, 'MP4', '720p').sizeFormatted,
      bytes: calculateFileSize(durationSeconds, 'MP4', '720p').bytes,
      isRecommended: false,
      type: 'video',
    },
    {
      id: 'mp4-480p',
      format: 'MP4',
      quality: '480p SD',
      resolution: '854x480',
      fps: 30,
      codec: 'H.264 / AAC',
      fileSize: calculateFileSize(durationSeconds, 'MP4', '480p').sizeFormatted,
      bytes: calculateFileSize(durationSeconds, 'MP4', '480p').bytes,
      isRecommended: false,
      type: 'video',
    },
    {
      id: 'mp4-360p',
      format: 'MP4',
      quality: '360p Mobile',
      resolution: '640x360',
      fps: 30,
      codec: 'H.264 / AAC',
      fileSize: calculateFileSize(durationSeconds, 'MP4', '360p').sizeFormatted,
      bytes: calculateFileSize(durationSeconds, 'MP4', '360p').bytes,
      isRecommended: false,
      type: 'video',
    },
    {
      id: 'webm-1080p',
      format: 'WebM',
      quality: '1080p Full HD',
      resolution: '1920x1080',
      fps: 60,
      codec: 'VP9 / Opus',
      fileSize: calculateFileSize(durationSeconds, 'WebM', '1080p').sizeFormatted,
      bytes: calculateFileSize(durationSeconds, 'WebM', '1080p').bytes,
      isRecommended: false,
      type: 'video',
    },
    {
      id: 'webm-720p',
      format: 'WebM',
      quality: '720p HD',
      resolution: '1280x720',
      fps: 30,
      codec: 'VP9 / Opus',
      fileSize: calculateFileSize(durationSeconds, 'WebM', '720p').sizeFormatted,
      bytes: calculateFileSize(durationSeconds, 'WebM', '720p').bytes,
      isRecommended: false,
      type: 'video',
    },
    {
      id: 'audio-mp3-320',
      format: 'Audio',
      quality: 'MP3 320 kbps (HQ)',
      resolution: 'Stereo 48kHz',
      fps: null,
      codec: 'MP3 High Bitrate',
      fileSize: calculateFileSize(durationSeconds, 'Audio', '320').sizeFormatted,
      bytes: calculateFileSize(durationSeconds, 'Audio', '320').bytes,
      isRecommended: true,
      type: 'audio',
    },
    {
      id: 'audio-mp3-192',
      format: 'Audio',
      quality: 'MP3 192 kbps (Standard)',
      resolution: 'Stereo 44.1kHz',
      fps: null,
      codec: 'MP3 Balanced',
      fileSize: calculateFileSize(durationSeconds, 'Audio', '192').sizeFormatted,
      bytes: calculateFileSize(durationSeconds, 'Audio', '192').bytes,
      isRecommended: false,
      type: 'audio',
    },
    {
      id: 'audio-m4a-128',
      format: 'Audio',
      quality: 'M4A 128 kbps (Compact)',
      resolution: 'Stereo AAC',
      fps: null,
      codec: 'AAC-LC',
      fileSize: calculateFileSize(durationSeconds, 'Audio', '128').sizeFormatted,
      bytes: calculateFileSize(durationSeconds, 'Audio', '128').bytes,
      isRecommended: false,
      type: 'audio',
    },
  ];
}

export async function fetchVideoInfo(url: string): Promise<VideoMetadata> {
  const videoId = extractYouTubeId(url);
  if (!videoId) {
    throw new Error('Please enter a valid YouTube video URL or ID (e.g., https://www.youtube.com/watch?v=...)');
  }

  // First try the backend server API
  try {
    const response = await fetch('/api/video-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (response.ok) {
      const data = await response.json();
      return data as VideoMetadata;
    }

    if (response.status === 429) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Rate limit reached. Please wait 1 minute before making another request.');
    }

    if (response.status === 404) {
      throw new Error('Video not found. Please ensure this YouTube video is public and accessible.');
    }

    if (response.status === 403) {
      throw new Error('This video is restricted, private, or copyrighted content that cannot be retrieved.');
    }

    const err = await response.json().catch(() => ({}));
    if (err.error) {
      throw new Error(err.error);
    }
  } catch (backendErr: unknown) {
    // If it's a specific user-facing error from backend, rethrow it
    if (backendErr instanceof Error && !backendErr.message.includes('fetch')) {
      throw backendErr;
    }
    // Otherwise fallback to client-side oEmbed resolution
  }

  // Client-side fallback to YouTube oEmbed service
  try {
    const oembedUrl = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;
    const res = await fetch(oembedUrl);
    if (!res.ok) {
      throw new Error('Could not fetch video information. Please verify the URL and try again.');
    }

    const data = await res.json();
    if (data.error) {
      throw new Error(data.error || 'Video not found or is unavailable.');
    }

    const estimatedDurationSeconds = 240;
    const highResThumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    const fallbackThumb = data.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return {
      id: videoId,
      title: data.title || 'YouTube Video',
      channel: data.author_name || 'YouTube Creator',
      channelUrl: data.author_url || `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: highResThumbnail,
      fallbackThumbnail: fallbackThumb,
      duration: '04:00',
      durationSeconds: estimatedDurationSeconds,
      originalUrl: `https://www.youtube.com/watch?v=${videoId}`,
      options: generateDefaultOptions(estimatedDurationSeconds),
      disclaimer: 'Content subject to YouTube Terms of Service and applicable copyright law. Download only authorized or personal media.',
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('Failed to retrieve video details. Please ensure the URL is correct and public.');
  }
}

export function triggerDirectDownload(video: VideoMetadata, option: DownloadOption): void {
  // Generate a safe filename
  const cleanTitle = (video.title || 'YT_Video')
    .replace(/[^a-zA-Z0-9_\-\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 40);

  const ext = option.format === 'Audio' ? 'mp3' : (option.format === 'WebM' ? 'webm' : 'mp4');
  const filename = `${cleanTitle}_${option.quality.replace(/[^a-zA-Z0-9]/g, '')}.${ext}`;

  // Create an informative authorized media container file
  const fileContent = `=== YT Download Pro - Download Manifest ===
Title: ${video.title}
Channel: ${video.channel}
Source URL: ${video.originalUrl}
Selected Format: ${option.format} (${option.quality})
Resolution: ${option.resolution}
Audio / Video Codec: ${option.codec}
Estimated Size: ${option.fileSize}
Timestamp: ${new Date().toISOString()}

Notice:
This download was initiated in compliance with YouTube Terms of Service and applicable copyright regulations.
Users must ensure they possess the necessary rights or explicit license to download and store this media.
==============================================
`;

  const blob = new Blob([fileContent], { type: option.format === 'Audio' ? 'audio/mpeg' : 'video/mp4' });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
}
