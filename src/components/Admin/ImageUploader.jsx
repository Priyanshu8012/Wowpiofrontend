import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, RefreshCw, Film } from 'lucide-react';
import apiClient from '../../api/apiClient.js';
import { isVideoUrl, resolveMediaUrl } from '../../utils/media.js';

/**
 * Image + video uploader for admin (GIF / MP4 / WebM / MOV).
 * onUploadSuccess(url, mediaType)
 */
export default function ImageUploader({
  currentImage,
  onUploadSuccess,
  fallbackImage = '',
  fallbackLabel = 'Default live image',
  mediaType: mediaTypeProp,
  allowVideo = true,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const hasCustom = Boolean(currentImage);
  const previewSrc = resolveMediaUrl(currentImage) || fallbackImage || '';
  const showingFallback = !hasCustom && Boolean(fallbackImage);
  const isVideo = hasCustom && isVideoUrl(currentImage, mediaTypeProp);

  const accept = allowVideo
    ? 'image/*,video/mp4,video/webm,video/quicktime,.gif,.mp4,.webm,.mov,.m4v'
    : 'image/*';

  const handleUpload = async (file) => {
    if (!file) return;

    const isVid = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v)$/i.test(file.name);
    const isImg = file.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name);

    if (!isVid && !isImg) {
      setError('Use an image (jpg, png, webp, gif) or video (mp4, webm, mov).');
      return;
    }
    if (!allowVideo && isVid) {
      setError('Video upload is not enabled here.');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError('File too large. Max 50MB.');
      return;
    }

    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await apiClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = data.imageUrl || data.mediaUrl;
      const type = data.mediaType || (isVid ? 'video' : 'image');
      onUploadSuccess(url, type);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  if (previewSrc) {
    return (
      <div className="w-full space-y-3">
        <div className="group relative h-56 w-full overflow-hidden rounded-xl border border-white/10 bg-[#121212]">
          {isVideo ? (
            <video
              src={previewSrc}
              className="h-full w-full object-contain"
              muted
              loop
              playsInline
              autoPlay
              controls
            />
          ) : (
            <img src={previewSrc} alt="Current media" className="h-full w-full object-contain p-4" />
          )}

          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span
              className={`rounded-md px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.14em] ${
                showingFallback ? 'bg-white/10 text-white/70' : 'bg-[#C9A259] text-[#0C0C0C]'
              }`}
            >
              {showingFallback ? fallbackLabel : isVideo ? 'Video upload' : 'Custom upload'}
            </span>
            {isVideo && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#1E4D6B] px-2 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                <Film className="h-3 w-3" />
                MP4 / WebM
              </span>
            )}
          </div>

          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/55 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-4 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-[#0C0C0C] hover:bg-[#A8893F]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Replace
            </button>
            {hasCustom && (
              <button
                type="button"
                onClick={() => onUploadSuccess('', 'image')}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:bg-white/15"
                aria-label="Remove custom media"
              >
                <X className="h-3.5 w-3.5" />
                Reset
              </button>
            )}
          </div>

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <Loader2 className="h-8 w-8 animate-spin text-[#C9A259]" />
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleUpload(e.target.files[0])}
          accept={accept}
          className="hidden"
        />

        <p className="text-xs text-white/40">
          {allowVideo
            ? 'Images (jpg, png, webp, gif) or short videos (mp4, webm, mov) · max 50MB. Hover to replace.'
            : 'Upload an image. Hover to replace or reset.'}
        </p>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleUpload(e.dataTransfer.files[0]);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#121212] transition-colors hover:border-[#C9A259]/45 hover:bg-[#C9A259]/5"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleUpload(e.target.files[0])}
          accept={accept}
          className="hidden"
        />
        {uploading ? (
          <Loader2 className="h-8 w-8 animate-spin text-[#C9A259]" />
        ) : (
          <>
            <Upload className="mb-2 h-7 w-7 text-white/40" />
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
              {allowVideo ? 'Upload image or video' : 'Upload image'}
            </p>
            <p className="mt-1 text-xs text-white/35">
              {allowVideo ? 'JPG, PNG, GIF, MP4, WebM · max 50MB' : 'Click or drag & drop'}
            </p>
            {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
