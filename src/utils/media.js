const API_BASE = 'http://localhost:5000';
const VIDEO_EXT = /\.(mp4|webm|mov|m4v)(\?|$)/i;

export function isVideoUrl(url = '', mediaType) {
  if (mediaType === 'video') return true;
  if (mediaType === 'image') return false;
  return VIDEO_EXT.test(String(url));
}

export function resolveMediaUrl(url, { local = false } = {}) {
  if (!url) return '';
  if (local || url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:') || url.startsWith('/assets')) {
    return url;
  }
  if (url.startsWith('/uploads')) return `${API_BASE}${url}`;
  return url.startsWith('/') ? `${API_BASE}${url}` : url;
}
