import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getHeroData, updateHeroData } from '../../api/hero.api.js';
import ImageUploader from './ImageUploader.jsx';
import bottleImgDefault from '../../assets/wowpio-bottle.png';

export default function HeroManager() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        mediaType: 'image',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        fetchHeroData();
    }, []);

    const fetchHeroData = async () => {
        try {
            setLoading(true);
            const data = await getHeroData();
            if (data) {
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    imageUrl: data.imageUrl || '',
                    mediaType: data.mediaType || 'image',
                });
            }
        } catch (error) {
            console.error('Failed to fetch hero data', error);
            setErrorMsg('Failed to load hero section data.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setErrorMsg('');
            setSuccessMsg('');
            
            await updateHeroData(formData);
            
            setSuccessMsg('Hero section updated successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (error) {
            console.error('Failed to save hero data', error);
            setErrorMsg('Failed to save changes. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-white/60">Loading Hero Section Data...</div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white font-heading">Hero Section Settings</h2>
            </div>

            {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <p>{errorMsg}</p>
                </div>
            )}

            {successMsg && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <p>{successMsg}</p>
                </div>
            )}

            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6">
                        <div>
                            <label className="block text-xs font-medium text-white/60 mb-2">
                                Main Headline 
                                <span className="ml-2 text-[10px] text-accent-cyan">Tip: "Feel" and "&" will automatically be highlighted</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                placeholder="e.g. Purity You Can Trust & Feel"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-medium text-white/60 mb-2">Description Paragraph</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white min-h-[150px] focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                placeholder="Write the main description that appears below the headline..."
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <label className="block text-xs font-medium text-white/60 mb-1">
                          Hero media (image or video)
                        </label>
                        <ImageUploader
                            currentImage={formData.imageUrl}
                            mediaType={formData.mediaType}
                            fallbackImage={bottleImgDefault}
                            fallbackLabel="Currently on website"
                            allowVideo
                            onUploadSuccess={(url, type) =>
                              setFormData({
                                ...formData,
                                imageUrl: url,
                                mediaType: type || 'image',
                              })
                            }
                        />
                        <p className="text-[10px] text-white/40 mt-1">
                          PNG bottle, GIF, or short MP4/WebM · max 50MB.
                        </p>
                    </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`flex items-center gap-2 rounded-xl bg-[#C9A259] px-8 py-3 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0C0C0C] transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#A8893F]'}`}
                    >
                        <Save className="w-4 h-4" /> 
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
