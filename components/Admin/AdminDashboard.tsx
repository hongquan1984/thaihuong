
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
  const [dbStatus, setDbStatus] = useState<'online' | 'offline'>('offline');

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
          setDbStatus('online');
        } else {
          setDbStatus('offline');
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setDbStatus('offline');
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
        alert("Upload thất bại: " + err);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const updates = Object.entries(formData).map(([key, value]) => ({
      key,
      value: String(value)
    }));

    const { error } = await supabase.from('site_content').upsert(updates);
    setSaving(false);
    if (error) {
      alert("Lỗi khi lưu: " + error.message);
      setDbStatus('offline');
    } else {
      alert("Nội dung đã được cập nhật thành công!");
      setDbStatus('online');
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="text-gray-500 font-medium">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white p-8 flex flex-col">
        <div className="mb-12 flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
             <svg viewBox="0 0 100 100" className="w-6 h-6 fill-white">
                <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
             </svg>
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tighter uppercase leading-none">HANMI</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Management</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'hero', label: 'Bố cục Hero (Đầu trang)', icon: '🏠' },
            { id: 'product', label: 'Chi tiết sản phẩm', icon: '🛍️' },
            { id: 'specs', label: 'Thông số & Ưu điểm', icon: '✨' },
            { id: 'footer', label: 'Liên hệ & Footer', icon: '📞' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 ${
                activeTab === tab.id 
                ? 'bg-orange-500 text-white shadow-xl shadow-orange-900/30' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">HQ</div>
            <div>
              <p className="text-xs font-bold text-white">Quân Hồng</p>
              <p className="text-[10px] text-gray-500 truncate w-32">hongquan0508@gmail.com</p>
            </div>
          </div>
          <button 
            onClick={onExit} 
            className="w-full text-center py-4 rounded-xl text-xs font-black text-red-500 hover:bg-red-500/10 transition-colors uppercase tracking-widest border border-red-500/20"
          >
            Đăng xuất ngay
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12 bg-[#f8fafc]">
        <header className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">Trang quản trị nội dung</p>
              <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                dbStatus === 'online' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dbStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                {dbStatus === 'online' ? 'CSDL: Trực tuyến' : 'CSDL: Ngoại tuyến'}
              </span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 capitalize">Chỉnh sửa {activeTab}</h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-orange-500/30 transition-all flex items-center gap-3 hover:-translate-y-1 active:translate-y-0"
          >
            {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {saving ? 'Đang lưu dữ liệu...' : 'Lưu tất cả thay đổi'}
          </button>
        </header>

        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 space-y-10">
          {activeTab === 'hero' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tiêu đề Hero</label>
                  <input 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-medium" 
                    value={formData.hero_title || ''} 
                    onChange={(e) => handleChange('hero_title', e.target.value)}
                    placeholder="BẢO VỆ DA - NGĂN LÃO HÓA"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tên thương hiệu chính</label>
                  <input 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-medium" 
                    value={formData.hero_brand || ''} 
                    onChange={(e) => handleChange('hero_brand', e.target.value)}
                    placeholder="WIICARE"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tên sản phẩm phụ</label>
                  <input 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-medium" 
                    value={formData.hero_brand2 || ''} 
                    onChange={(e) => handleChange('hero_brand2', e.target.value)}
                    placeholder="GIOVENTÙ"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ảnh Banner Trái (Dạng vòm)</label>
                  <div className="flex flex-col gap-4 p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                    {formData.hero_img1 && (
                      <div className="relative w-24 h-32 rounded-lg overflow-hidden border border-white shadow-md">
                        <img src={formData.hero_img1} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <input type="file" onChange={(e) => handleFileUpload('hero_img1', e)} className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-orange-500 file:text-white hover:file:bg-orange-600 transition-all cursor-pointer" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ảnh Banner Phải (Dạng vòm)</label>
                  <div className="flex flex-col gap-4 p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                    {formData.hero_img2 && (
                      <div className="relative w-24 h-32 rounded-lg overflow-hidden border border-white shadow-md">
                        <img src={formData.hero_img2} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <input type="file" onChange={(e) => handleFileUpload('hero_img2', e)} className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-orange-500 file:text-white hover:file:bg-orange-600 transition-all cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'product' && (
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tên đầy đủ bộ sản phẩm</label>
                <input 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-lg" 
                  value={formData.prod_name || ''} 
                  onChange={(e) => handleChange('prod_name', e.target.value)}
                  placeholder="BỘ ĐÔI BẢO VỆ DA - NGĂN LÃO HÓA"
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Giá gốc (Gạch bỏ)</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl" value={formData.hero_old_price || ''} onChange={(e) => handleChange('hero_old_price', e.target.value)} placeholder="1.070.000đ" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Giá khuyến mãi hiện tại</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-orange-500 font-black text-xl" value={formData.hero_price || ''} onChange={(e) => handleChange('hero_price', e.target.value)} placeholder="899.000đ" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mô tả ngắn trang chủ</label>
                <textarea 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl h-32 resize-none" 
                  value={formData.prod_desc || ''} 
                  onChange={(e) => handleChange('prod_desc', e.target.value)}
                  placeholder="Nhập mô tả bộ đôi sản phẩm..."
                />
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ảnh thỏi Collagen chi tiết (Phần thông số)</label>
                <div className="flex flex-col gap-4 p-8 border-2 border-dashed border-gray-200 rounded-[32px] bg-gray-50/50 items-center justify-center">
                  {formData.specs_img && (
                    <img src={formData.specs_img} className="h-64 rounded-3xl border-4 border-white shadow-2xl object-cover mb-4" />
                  )}
                  <input type="file" onChange={(e) => handleFileUpload('specs_img', e)} className="text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ưu điểm nổi bật (Xuống dòng cho mỗi ý)</label>
                <textarea 
                  className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[32px] h-64 resize-none leading-relaxed text-sm" 
                  value={formData.specs_benefits || ''} 
                  onChange={(e) => handleChange('specs_benefits', e.target.value)}
                  placeholder="Mỗi dòng là một ưu điểm..."
                />
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thông điệp cuối trang</label>
                <textarea 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl h-24" 
                  value={formData.footer_info || ''} 
                  onChange={(e) => handleChange('footer_info', e.target.value)}
                  placeholder="Vẻ đẹp bền vững bắt nguồn từ..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thông tin liên hệ / Địa chỉ</label>
                <input 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl" 
                  value={formData.footer_contact || ''} 
                  onChange={(e) => handleChange('footer_contact', e.target.value)}
                  placeholder="Nhập địa chỉ, số điện thoại hoặc link MXH..."
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
