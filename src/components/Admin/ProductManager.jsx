import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/product.api.js';
import ImageUploader from './ImageUploader.jsx';
import { API_ORIGIN } from '../../config/api.js';

export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        size: '',
        category: '',
        description: '',
        price: '',
        originalPrice: '',
        badge: '',
        isJar: false,
        imageUrl: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product._id);
        setFormData({
            name: product.name,
            size: product.size,
            category: product.category,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice || '',
            badge: product.badge || '',
            isJar: product.isJar,
            imageUrl: product.imageUrl
        });
    };

    const handleAddNew = () => {
        setEditingProduct('new');
        setFormData({
            name: '',
            size: '',
            category: 'Daily',
            description: '',
            price: '',
            originalPrice: '',
            badge: '',
            isJar: false,
            imageUrl: ''
        });
    };

    const handleSave = async () => {
        try {
            if (editingProduct === 'new') {
                await createProduct(formData);
            } else {
                await updateProduct(editingProduct, formData);
            }
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Failed to save product', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    if (loading) return <div className="text-white/60">Loading products...</div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white font-heading">Products List</h2>
                {editingProduct === null && (
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-primary-navy font-semibold rounded-full hover:bg-accent-cyan/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Product
                    </button>
                )}
            </div>

            {editingProduct !== null ? (
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-6 font-heading">
                        {editingProduct === 'new' ? 'Create New Product' : 'Edit Product'}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-medium text-white/60 mb-1">Product Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                    placeholder="e.g. WOWPIO Active"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-white/60 mb-1">Size / Volume</label>
                                    <input
                                        type="text"
                                        value={formData.size}
                                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                        placeholder="e.g. 500ml"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-white/60 mb-1">Price</label>
                                    <input
                                        type="text"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                        placeholder="e.g. ₹39,599"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-white/60 mb-1">M.R.P. Price (Optional Strikethrough)</label>
                                    <input
                                        type="text"
                                        value={formData.originalPrice}
                                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                        placeholder="e.g. ₹43,999"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-white/60 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-primary-navy border border-white/10 rounded-lg p-2.5 text-sm text-white focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                    >
                                        <option value="Conference">Conference</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Bulk">Bulk</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-white/60 mb-1">Badge (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.badge}
                                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                        placeholder="e.g. Best Seller"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-white/60 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white min-h-[100px] focus:ring-1 focus:ring-accent-cyan focus:outline-none"
                                    placeholder="Product description..."
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="isJar"
                                    checked={formData.isJar}
                                    onChange={(e) => setFormData({ ...formData, isJar: e.target.checked })}
                                    className="rounded bg-white/5 border-white/10 text-accent-cyan focus:ring-accent-cyan"
                                />
                                <label htmlFor="isJar" className="text-sm text-white/80 cursor-pointer">This is a Box/Jar (Applies special CSS layout)</label>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <label className="block text-xs font-medium text-white/60 mb-1">Product Image</label>
                            <ImageUploader
                                currentImage={formData.imageUrl}
                                allowVideo={false}
                                onUploadSuccess={(url) => setFormData({ ...formData, imageUrl: url })}
                            />
                        </div>
                    </div>
                    
                    <div className="mt-8 flex gap-3">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-2.5 bg-accent-cyan text-primary-navy font-bold rounded-full hover:bg-accent-cyan/90 transition-colors"
                        >
                            <Save className="w-4 h-4" /> Save Product
                        </button>
                        <button
                            onClick={() => setEditingProduct(null)}
                            className="px-6 py-2.5 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.length === 0 && (
                        <p className="text-white/40 italic col-span-full">No products found. Add one to get started.</p>
                    )}
                    {products.map((product) => (
                        <div key={product._id} className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/[0.06] transition-colors flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded">
                                    {product.category}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="p-1.5 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 mb-4 flex-grow">
                                <div className="w-20 h-24 bg-white/5 rounded-lg flex items-center justify-center shrink-0 p-2 border border-white/5">
                                    {product.imageUrl ? (
                                        <img src={`${API_ORIGIN}${product.imageUrl}`} alt={product.name} className="max-w-full max-h-full object-contain filter drop-shadow-md" />
                                    ) : (
                                        <span className="text-[10px] text-white/30">No Img</span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-white font-heading font-bold text-lg truncate">{product.name}</h4>
                                    <p className="text-sm text-white/60 truncate">{product.size}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-lg font-bold text-accent-cyan">{product.price}</p>
                                        {product.originalPrice && (
                                            <p className="text-sm text-white/40 line-through">{product.originalPrice}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-xs text-white/50 line-clamp-2">
                                {product.description}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
