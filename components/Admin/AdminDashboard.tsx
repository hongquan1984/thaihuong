
import React, { useState, useEffect } from 'react';
import { supabase, uploadImage } from '../../lib/supabase';

interface AdminDashboardProps {
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('site_content').select('*');
        if (data) {
          const contentMap = data.reduce((acc: any, item: any) => {
            acc[item.key] = item.value;
            return acc;
          }, {});
          setFormData(contentMap);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setSaving(true);
        const url = await uploadImage(file);
        handleChange(key, url);
      } catch (err) {
        alert("Upload failed: " + err);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const updates = Object.entries(formData).map(([key, value]) => ({
      key,
      value: typeof value === 'string' ? value : JSON.stringify(value)
    }));

    const { error } = await supabase.from('site_content').upsert(updates);
    setSaving(false);
    if (error) {
      alert("Lỗi khi lưu: " + error.message);
    } else {
      alert("Nội dung đã được cập nhật thành công!");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
             <svg viewBox="0 0 100 100" className="w-5 h-5 fill-white">
                <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
             </svg>
          </div>
          <h2 className="text-lg font-bold tracking-wider">HANMI CMS</h2>
        </div>

        <nav className="space-y-1 flex-1">
          {[
            { id: 'hero', label: 'Trang đầu (Hero)' },
            { id: 'product', label: 'Thông tin sản phẩm' },
            { id: 'specs', label: 'Ưu điểm & Specs' },
            { id: 'footer', label: 'Chân trang & MXH' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/20' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-800 space-y-4">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">TH</div>
            <span className="text-xs text-gray-300 font-medium">thaihuong</span>
          </div>
          <button 
            onClick={onExit} 
            className="w-full text-center py-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10 bg-[#f8fafc]">
        <header className="flex justify-between items-center mb-10">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Cập nhật nội dung</p>
            <h1 className="text-3xl font-black text-gray-900 capitalize">{activeTab} Section</h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-bold shadow-xl shadow-orange-200 transition-all flex items-center gap-2"
          >
            {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          {activeTab === 'hero' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tiêu đề chính</label>
                  <input 
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" 
                    value={formData.hero_title || ''} 
                    onChange={(e) => handleChange('hero_title', e.target.value)}
                    placeholder="BẢO VỆ DA - NGĂN LÃO HÓA"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tên thương hiệu 1</label>
                  <input 
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" 
                    value={formData.hero_brand || ''} 
                    onChange={(e) => handleChange('hero_brand', e.target.value)}
                    placeholder="WIICARE"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tên thương hiệu 2</label>
                  <input 
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" 
                    value={formData.hero_brand2 || ''} 
                    onChange={(e) => handleChange('hero_brand2', e.target.value)}
                    placeholder="GIOVENTÙ"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hình ảnh banner 1</label>
                  <div className="flex items-center gap-4 p-4 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    {formData.hero_img1 && <img src={formData.hero_img1} className="h-16 w-16 object-cover rounded-lg border border-gray-100 shadow-sm" />}
                    <input type="file" onChange={(e) => handleFileUpload('hero_img1', e)} className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hình ảnh banner 2</label>
                  <div className="flex items-center gap-4 p-4 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    {formData.hero_img2 && <img src={formData.hero_img2} className="h-16 w-16 object-cover rounded-lg border border-gray-100 shadow-sm" />}
                    <input type="file" onChange={(e) => handleFileUpload('hero_img2', e)} className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'product' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tên sản phẩm chính</label>
                <input 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all" 
                  value={formData.prod_name || ''} 
                  onChange={(e) => handleChange('prod_name', e.target.value)}
                  placeholder="WIICARE SUN"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Giá cũ</label>
                  <input className="w-full p-3 border border-gray-200 rounded-xl" value={formData.hero_old_price || ''} onChange={(e) => handleChange('hero_old_price', e.target.value)} placeholder="1.070.000đ" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Giá khuyến mãi</label>
                  <input className="w-full p-3 border border-gray-200 rounded-xl" value={formData.hero_price || ''} onChange={(e) => handleChange('hero_price', e.target.value)} placeholder="899.000đ" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mô tả sản phẩm</label>
                <textarea 
                  className="w-full p-3 border border-gray-200 rounded-xl h-32" 
                  value={formData.prod_desc || ''} 
                  onChange={(e) => handleChange('prod_desc', e.target.value)}
                  placeholder="Mô tả ngắn về bộ sản phẩm..."
                />
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ảnh thỏi Collagen (Specs section)</label>
                <div className="flex items-center gap-4 p-4 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  {formData.specs_img && <img src={formData.specs_img} className="h-16 w-16 object-cover rounded-lg border border-gray-100 shadow-sm" />}
                  <input type="file" onChange={(e) => handleFileUpload('specs_img', e)} className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Danh sách ưu điểm (Mỗi dòng 1 ý)</label>
                <textarea 
                  className="w-full p-3 border border-gray-200 rounded-xl h-48" 
                  value={formData.specs_benefits || ''} 
                  onChange={(e) => handleChange('specs_benefits', e.target.value)}
                  placeholder="Giúp da căng bóng&#10;Ngăn ngừa lão hóa&#10;..."
                />
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Thông tin Footer</label>
                <textarea 
                  className="w-full p-3 border border-gray-200 rounded-xl h-24" 
                  value={formData.footer_info || ''} 
                  onChange={(e) => handleChange('footer_info', e.target.value)}
                  placeholder="Vẻ đẹp bền vững bắt nguồn từ sự thấu hiểu..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Địa chỉ / Liên hệ</label>
                <input 
                  className="w-full p-3 border border-gray-200 rounded-xl" 
                  value={formData.footer_contact || ''} 
                  onChange={(e) => handleChange('footer_contact', e.target.value)}
                  placeholder="Địa chỉ công ty, số điện thoại..."
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
