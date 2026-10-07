import React, { useState, useEffect } from 'react';
import {
  X,
  Code,
  List,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Check,
  RotateCcw,
  Save,
  Search,
  ExternalLink,
  Sparkles,
  Tag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

export const AdminProductManager: React.FC = () => {
  const {
    language,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    setAllProducts,
    resetProductsToDefault,
    isAdminOpen,
    setIsAdminOpen,
    showToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'table' | 'json'>('table');
  const [jsonText, setJsonText] = useState('');
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Edit / Add modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Sync products to JSON text when opening or when products change
  useEffect(() => {
    if (isAdminOpen) {
      setJsonText(JSON.stringify(products, null, 2));
    }
  }, [isAdminOpen, products]);

  if (!isAdminOpen) return null;

  const handleCopyJson = () => {
    navigator.clipboard?.writeText(jsonText);
    setCopied(true);
    showToast('Products JSON copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        showToast('JSON must be an array of products.', 'error');
        return;
      }
      setAllProducts(parsed as Product[]);
      showToast('Products successfully updated from JSON!', 'success');
    } catch (err: any) {
      showToast(`Invalid JSON syntax: ${err.message}`, 'error');
    }
  };

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isAddingNew) {
      addProduct(editingProduct);
    } else {
      updateProduct(editingProduct);
    }

    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleOpenAddNew = () => {
    const newId = 'prod-custom-' + Date.now();
    setEditingProduct({
      id: newId,
      nameEn: 'New Fashion Item',
      nameBn: 'নতুন ফ্যাশন পণ্য',
      category: 'women',
      subcategory: 'Three Piece',
      subcategoryBn: 'থ্রি-পিস',
      price: 1950,
      oldPrice: 2250,
      discountBadge: '৳300 OFF',
      discountBadgeBn: '৳৩০০ ছাড়',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      stockCount: 20,
      descriptionEn: 'High quality collection from Sojib Fashion.',
      descriptionBn: 'সজীব ফ্যাশনের প্রিমিয়াম কালেকশন।'
    });
    setIsAddingNew(true);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.nameEn.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.nameBn.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C2185B] text-white flex items-center justify-center font-bold">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Sojib Fashion — Product Manager
              </h2>
              <p className="text-xs text-gray-400">
                Manage your product catalogue live or copy the full JSON for <span className="text-rose-400 font-mono">src/data/products.json</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switchers */}
            <div className="flex bg-gray-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('table')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'table' ? 'bg-[#C2185B] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table View</span>
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'json' ? 'bg-[#C2185B] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Raw JSON</span>
              </button>
            </div>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'table' ? (
            /* TABLE VIEW */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search by name, category, or ID..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C2185B]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenAddNew}
                    className="px-4 py-2 bg-[#C2185B] hover:bg-[#AD1457] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                  <button
                    onClick={resetProductsToDefault}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    title="Reset to default mockProducts"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-600">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Product</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Old Price</th>
                        <th className="p-3">Discount</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.nameEn}
                                className="w-10 h-12 object-cover object-top rounded-lg bg-gray-100 shrink-0"
                              />
                              <div>
                                <p className="font-bold text-gray-900 line-clamp-1">{p.nameEn}</p>
                                <p className="text-[11px] text-gray-500 line-clamp-1">{p.nameBn}</p>
                                <span className="font-mono text-[10px] text-gray-400">ID: {p.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="bg-rose-50 text-[#C2185B] font-semibold text-[10px] px-2 py-0.5 rounded-full uppercase">
                              {p.category}
                            </span>
                            <span className="block text-[11px] text-gray-500 mt-0.5">
                              {p.subcategory}
                            </span>
                          </td>
                          <td className="p-3 font-black text-gray-900">
                            ৳{p.price.toLocaleString()}
                          </td>
                          <td className="p-3 text-gray-400 line-through">
                            {p.oldPrice ? `৳${p.oldPrice.toLocaleString()}` : '—'}
                          </td>
                          <td className="p-3">
                            <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md text-[10px]">
                              {p.discountBadge || '৳300 OFF'}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`font-semibold ${p.inStock ? 'text-emerald-600' : 'text-red-500'}`}>
                              {p.inStock ? `In Stock (${p.stockCount || 10})` : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingProduct({ ...p });
                                  setIsAddingNew(false);
                                }}
                                className="p-1.5 bg-gray-100 hover:bg-rose-50 hover:text-[#C2185B] rounded-lg cursor-pointer transition-colors"
                                title="Edit product"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${p.nameEn}"?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="p-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer transition-colors"
                                title="Delete product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* RAW JSON VIEW & EXPORT */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                <div className="text-xs text-gray-600">
                  <span className="font-bold text-gray-900 block">Edit Product Catalog JSON</span>
                  <span>You can edit the JSON directly here, copy it to clipboard, or apply it to update the app live.</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="px-3.5 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                  </button>

                  <button
                    onClick={handleApplyJson}
                    className="px-4 py-2 bg-[#C2185B] hover:bg-[#AD1457] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Apply Live</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={18}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="w-full font-mono text-xs p-4 bg-gray-950 text-emerald-400 rounded-2xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                spellCheck={false}
              />
            </div>
          )}
        </div>
      </div>

      {/* EDIT / ADD MODAL DIALOG */}
      {editingProduct && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#C2185B]" />
                <span>{isAddingNew ? 'Add New Product' : `Edit "${editingProduct.nameEn}"`}</span>
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProductForm} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Product ID</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.id}
                    onChange={(e) => setEditingProduct({ ...editingProduct, id: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <option value="women">Women's Clothing (women)</option>
                    <option value="skincare">Skincare & Beauty (skincare)</option>
                    <option value="men">Men's Clothing (men)</option>
                    <option value="shoes">Ladies Shoes (shoes)</option>
                    <option value="bags">Designer Bags (bags)</option>
                    <option value="personal-care">Personal Care (personal-care)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Name (English)</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.nameEn}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nameEn: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Name (Bangla)</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.nameBn}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nameBn: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Price (৳ BDT)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Old Price (৳ BDT)</label>
                  <input
                    type="number"
                    value={editingProduct.oldPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, oldPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Discount Badge</label>
                  <input
                    type="text"
                    value={editingProduct.discountBadge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, discountBadge: e.target.value })}
                    placeholder="৳300 OFF"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Subcategory (English)</label>
                  <input
                    type="text"
                    value={editingProduct.subcategory}
                    onChange={(e) => setEditingProduct({ ...editingProduct, subcategory: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Subcategory (Bangla)</label>
                  <input
                    type="text"
                    value={editingProduct.subcategoryBn}
                    onChange={(e) => setEditingProduct({ ...editingProduct, subcategoryBn: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={editingProduct.descriptionEn}
                  onChange={(e) => setEditingProduct({ ...editingProduct, descriptionEn: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="rounded text-[#C2185B]"
                  />
                  <span>In Stock</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C2185B] hover:bg-[#AD1457] text-white rounded-xl font-bold cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
