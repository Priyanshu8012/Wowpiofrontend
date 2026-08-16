import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, GripVertical, Save } from 'lucide-react';
import { getAllBanners, createBanner, updateBanner, deleteBanner, reorderBanners } from '../../api/banner.api.js';
import ImageUploader from './ImageUploader.jsx';

export default function BannerManager() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingBanner, setEditingBanner] = useState(null);
    const [formData, setFormData] = useState({
        eyebrow: '',
        title: '',
        copy: '',
        ctaText: '',
        imageUrl: '',
        mediaType: 'image',
        isActive: true
    });

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            setLoading(true);
            const data = await getAllBanners();
            setBanners(data);
        } catch (error) {
            console.error('Failed to fetch banners', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (banner) => {
        setEditingBanner(banner._id);
        setFormData({
            eyebrow: banner.eyebrow,
            title: banner.title,
            copy: banner.copy,
            ctaText: banner.ctaText,
            imageUrl: banner.imageUrl,
            mediaType: banner.mediaType || 'image',
            isActive: banner.isActive
        });
    };

    const handleAddNew = () => {
        setEditingBanner('new');
        setFormData({
            eyebrow: '',
            title: '',
            copy: '',
            ctaText: '',
            imageUrl: '',
            mediaType: 'image',
            isActive: true
        });
    };

    const handleSave = async () => {
        try {
            if (editingBanner === 'new') {
                await createBanner({ ...formData, order: banners.length });
            } else {
                await updateBanner(editingBanner, formData);
            }
            setEditingBanner(null);
            fetchBanners();
        } catch (error) {
            console.error('Failed to save banner', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this slide?')) return;
        try {
            await deleteBanner(id);
            fetchBanners();
        } catch (error) {
            console.error('Failed to delete banner', error);
        }
    };

    const moveSlide = async (index, direction) => {
        const newBanners = [...banners];
        if (direction === -1 && index > 0) {
            [newBanners[index], newBanners[index - 1]] = [newBanners[index - 1], newBanners[index]];
        } else if (direction === 1 && index < newBanners.length - 1) {
            [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
        } else {
            return; // invalid move
        }
        
        setBanners(newBanners);
        // Save new order to backend
        const updates = newBanners.map((b, i) => ({ id: b._id, order: i }));
        try {
            await reorderBanners(updates);
        } catch (error) {
            console.error('Failed to reorder', error);
        }
    };

    if (loading) return <div className="text-white/60">Loading slides...</div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white font-heading">Banner Slides</h2>
                {editingBanner === null && (
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-primary-navy font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Slide
                    </button>
                )}
            </div>

            {editingBanner !== null ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
                    <h3 className="text-xl font-semibold text-white mb-6">
                        {editingBanner === 'new' ? 'Create New Slide' : 'Edit Slide'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs text-white/60 mb-1">Eyebrow text</label>
                                <input
                                    type="text"
                                    value={formData.eyebrow}
                                    onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white"
                                    placeholder="e.g. Sourced at 4,200ft"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-white/60 mb-1">Main Title</label>
                                <textarea
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white min-h-[80px]"
                                    placeholder="Water, the way\nnature intended."
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-white/60 mb-1">Copy / Description</label>
                                <textarea
                                    value={formData.copy}
                                    onChange={(e) => setFormData({ ...formData, copy: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white min-h-[80px]"
                                    placeholder="Description text..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-white/60 mb-1">CTA Button Text</label>
                                <input
                                    type="text"
                                    value={formData.ctaText}
                                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white"
                                    placeholder="e.g. Explore Bottles"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="rounded bg-white/5 border-white/10 text-accent-cyan"
                                />
                                <label htmlFor="isActive" className="text-sm text-white">Active (visible on site)</label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-white/60 mb-1">
                              Background image or video
                            </label>
                            <ImageUploader
                                currentImage={formData.imageUrl}
                                mediaType={formData.mediaType}
                                allowVideo
                                onUploadSuccess={(url, type) =>
                                  setFormData({
                                    ...formData,
                                    imageUrl: url,
                                    mediaType: type || 'image',
                                  })
                                }
                            />
                            <div className="mt-3 rounded-xl border border-[#C9A259]/25 bg-[#C9A259]/8 px-3.5 py-3 text-[11px] leading-relaxed text-white/70">
                              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#C9A259]">
                                Best size
                              </p>
                              <p className="mt-1.5">
                                <span className="font-semibold text-white">1920 × 1080 px</span> (Full HD, 16:9) —
                                best for desktop + mobile banner.
                              </p>
                              <p className="mt-1">
                                Also good: <span className="text-white/90">2560 × 1440</span> (sharper) · keep file under{' '}
                                <span className="text-white/90">2–3 MB</span> (image) or{' '}
                                <span className="text-white/90">8–15 MB</span> (short video).
                              </p>
                              <p className="mt-1 text-white/45">
                                Tip: keep main subject on the right; text sits on the left side of the slide.
                              </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex gap-3">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-2 bg-accent-cyan text-primary-navy font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
                        >
                            <Save className="w-4 h-4" /> Save Slide
                        </button>
                        <button
                            onClick={() => setEditingBanner(null)}
                            className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {banners.length === 0 && (
                        <p className="text-white/40 italic">No banner slides found. Add one to get started.</p>
                    )}
                    {banners.map((banner, index) => (
                        <div key={banner._id} className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.05] transition-colors">
                            <div className="flex flex-col gap-1 text-white/40">
                                <button onClick={() => moveSlide(index, -1)} disabled={index === 0} className="hover:text-white disabled:opacity-30">▲</button>
                                <button onClick={() => moveSlide(index, 1)} disabled={index === banners.length - 1} className="hover:text-white disabled:opacity-30">▼</button>
                            </div>
                            
                            <div className="w-24 h-16 rounded overflow-hidden bg-black flex-shrink-0 relative">
                                {banner.imageUrl ? (
                                    banner.mediaType === 'video' || /\.(mp4|webm|mov|m4v)$/i.test(banner.imageUrl) ? (
                                      <video
                                        src={`http://localhost:5000${banner.imageUrl}`}
                                        className="h-full w-full object-cover"
                                        muted
                                        playsInline
                                      />
                                    ) : (
                                      <img src={`http://localhost:5000${banner.imageUrl}`} alt="thumb" className="w-full h-full object-cover" />
                                    )
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-white/30">No media</div>
                                )}
                                {!banner.isActive && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[10px] font-bold text-white">HIDDEN</div>
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-semibold truncate">{banner.title.replace('\n', ' ')}</h4>
                                <p className="text-sm text-white/50 truncate">{banner.eyebrow} • {banner.ctaText}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(banner)}
                                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                                    title="Edit"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(banner._id)}
                                    className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
