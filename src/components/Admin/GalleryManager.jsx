import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';
import { getGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../../api/gallery.api.js';
import ImageUploader from './ImageUploader.jsx';
import { API_ORIGIN } from '../../config/api.js';

export default function GalleryManager() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        bgClass: '',
        imageUrl: '',
        mediaType: 'image',
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await getGalleryItems();
            setItems(data);
        } catch (error) {
            console.error('Failed to fetch gallery items', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item._id);
        setFormData({
            title: item.title,
            category: item.category,
            description: item.description,
            bgClass: item.bgClass || '',
            imageUrl: item.imageUrl,
            mediaType: item.mediaType || 'image',
        });
    };

    const handleAddNew = () => {
        setEditingItem('new');
        setFormData({
            title: '',
            category: 'Source',
            description: '',
            bgClass: '',
            imageUrl: '',
            mediaType: 'image',
        });
    };

    const handleSave = async () => {
        try {
            if (editingItem === 'new') {
                await createGalleryItem(formData);
            } else {
                await updateGalleryItem(editingItem, formData);
            }
            setEditingItem(null);
            fetchItems();
        } catch (error) {
            console.error('Failed to save gallery item', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
        try {
            await deleteGalleryItem(id);
            fetchItems();
        } catch (error) {
            console.error('Failed to delete gallery item', error);
        }
    };

    if (loading) return <div className="text-white/60">Loading gallery...</div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white font-heading">Gallery Media</h2>
                {editingItem === null && (
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-primary-navy font-semibold rounded-full hover:bg-accent-cyan/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Media
                    </button>
                )}
            </div>

            {editingItem !== null ? (
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-6 font-heading">
                        {editingItem === 'new' ? 'Add New Gallery Item' : 'Edit Gallery Item'}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-medium text-white/60 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                    placeholder="e.g. Himalayan Aquifer"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-white/60 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-primary-navy border border-white/10 rounded-lg p-2.5 text-sm text-white focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                    >
                                        <option value="Source">Source</option>
                                        <option value="Production">Production</option>
                                        <option value="Lifestyle">Lifestyle</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-white/60 mb-1">Background CSS (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.bgClass}
                                        onChange={(e) => setFormData({ ...formData, bgClass: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                        placeholder="e.g. bg-gradient-to-tr from-blue-50..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-white/60 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white min-h-[100px] focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                    placeholder="Image context description..."
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <label className="block text-xs font-medium text-white/60 mb-1">
                              Image or video
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
                        </div>
                    </div>
                    
                    <div className="mt-8 flex gap-3">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-2.5 bg-accent-cyan text-primary-navy font-bold rounded-full hover:bg-accent-cyan/90 transition-colors"
                        >
                            <Save className="w-4 h-4" /> Save Media
                        </button>
                        <button
                            onClick={() => setEditingItem(null)}
                            className="px-6 py-2.5 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.length === 0 && (
                        <p className="text-white/40 italic col-span-full">No gallery items found. Add one to get started.</p>
                    )}
                    {items.map((item) => (
                        <div key={item._id} className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-white/20 transition-colors">
                            <div className="relative h-48 bg-black">
                                {item.imageUrl ? (
                                    item.mediaType === 'video' || /\.(mp4|webm|mov|m4v)$/i.test(item.imageUrl) ? (
                                      <video
                                        src={`${API_ORIGIN}${item.imageUrl}`}
                                        className="h-full w-full object-cover opacity-90"
                                        muted
                                        loop
                                        playsInline
                                        autoPlay
                                      />
                                    ) : (
                                      <img src={`${API_ORIGIN}${item.imageUrl}`} alt={item.title} className="w-full h-full object-cover opacity-80" />
                                    )
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/30">No media</div>
                                )}
                                <div className="absolute top-3 left-3 bg-primary-navy/80 backdrop-blur-md text-accent-cyan text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                                    {item.mediaType === 'video' ? 'Video' : item.category}
                                </div>
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-1.5 bg-primary-navy/80 backdrop-blur-md text-white/70 hover:text-white rounded transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-1.5 bg-primary-navy/80 backdrop-blur-md text-red-400/70 hover:text-red-400 rounded transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-5 flex-1">
                                <h4 className="text-white font-heading font-bold text-lg mb-2">{item.title}</h4>
                                <p className="text-sm text-white/60 line-clamp-2">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
