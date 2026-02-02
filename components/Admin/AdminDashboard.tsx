
import React, { useState, useEffect } from 'react';
import { supabase, uploadImage } from '../../lib/supabase';

interface AdminDashboardProps {
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('site_content').select('*');
      if (data) {
        const contentMap = data.reduce((acc: any, item: any) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
        setFormData(contentMap);
      }
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
      value
    }));

    const { error } = await supabase.from('site_content').upsert(updates);
    setSaving(false);
    if (error) alert(error.message);
    else alert("Content saved successfully!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
          <span className="text-orange-500">●</span> HANMI CMS
        </h2>
        <nav className="space-y-2">
          {['hero', 'product', 'specs', 'footer'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-2 rounded capitalize transition-colors ${
                activeTab === tab ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              {tab} Section
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-8 border-t border-gray-800">
          <button onClick={onExit} className="text-sm text-gray-400 hover:text-white">← Quay lại trang chủ</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Quản trị nội dung: {activeTab.toUpperCase()}</h1>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-all"
          >
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
          {activeTab === 'hero' && (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Tiêu đề lớn</label>
                  <input 
                    className="w-full p-3 border rounded-lg" 
                    value={formData.hero_title || ''} 
                    onChange={(e) => handleChange('hero_title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Thương hiệu</label>
                  <input 
                    className="w-full p-3 border rounded-lg" 
                    value={formData.hero_brand || ''} 
                    onChange={(e) => handleChange('hero_brand', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Giá khuyến mãi</label>
                <input 
                  className="w-full p-3 border rounded-lg" 
                  value={formData.hero_price || ''} 
                  onChange={(e) => handleChange('hero_price', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Ảnh Model 1</label>
                  <input type="file" onChange={(e) => handleFileUpload('hero_img1', e)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                  {formData.hero_img1 && <img src={formData.hero_img1} className="h-20 w-auto rounded mt-2 border" />}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Ảnh Model 2</label>
                  <input type="file" onChange={(e) => handleFileUpload('hero_img2', e)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                  {formData.hero_img2 && <img src={formData.hero_img2} className="h-20 w-auto rounded mt-2 border" />}
                </div>
              </div>
            </>
          )}

          {activeTab === 'product' && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Tên Bộ Sản Phẩm</label>
                <input 
                  className="w-full p-3 border rounded-lg" 
                  value={formData.prod_name || ''} 
                  onChange={(e) => handleChange('prod_name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Mô tả phụ</label>
                <textarea 
                  className="w-full p-3 border rounded-lg h-32" 
                  value={formData.prod_desc || ''} 
                  onChange={(e) => handleChange('prod_desc', e.target.value)}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
