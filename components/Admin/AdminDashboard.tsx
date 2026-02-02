
import React, { useState, useEffect } from 'react';
import { supabase, uploadFile } from '../../lib/supabase';

interface SlideItem {
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  buyLink?: string;
}

interface AdminDashboardProps {
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState<any>({});
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
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
          
          if (contentMap.home_slides) {
            setSlides(JSON.parse(contentMap.home_slides));
          }
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
        const url = await uploadFile(file);
        handleChange(key, url);
        alert("Tải lên thành công!");
      } catch (err: any) {
        alert(`Lỗi: ${err.message}`);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert("File quá lớn! Vui lòng chọn video dưới 50MB.");
        return;
      }
      try {
        setUploadingVideo(true);
        const url = await uploadFile(file);
        handleChange('hero_video', url);
        alert("Tải video lên Supabase thành công!");
      } catch (err: any) {
        alert(`Lỗi tải video: ${err.message}`);
      } finally {
        setUploadingVideo(false);
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
    } else {
      alert("Nội dung đã được cập nhật thành công!");
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-gray-950">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans">
      <aside className="w-72 bg-gray-950 text-white p-8 flex flex-col shadow-2xl z-20">
        <div className="mb-12 flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
             <svg viewBox="0 0 100 100" className="w-6 h-6 fill-white"><path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" /></svg>
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tighter uppercase leading-none">HANMI</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Quản trị hệ thống</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'hero', label: 'Bố cục Hero', icon: '🏠' },
            { id: 'slides', label: 'Quản lý Slide Ảnh', icon: '🖼️' },
            { id: 'product', label: 'Thông tin bổ sung', icon: '🛍️' },
            { id: 'specs', label: 'Thông số chi tiết', icon: '✨' },
            { id: 'footer', label: 'Liên hệ', icon: '📞' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 ${
                activeTab === tab.id ? 'bg-orange-500 text-white shadow-xl shadow-orange-900/40' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>{tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-8">
          <button onClick={onExit} className="w-full text-center py-4 rounded-xl text-xs font-black text-red-500 hover:bg-red-500/10 transition-colors uppercase tracking-widest border border-red-500/20">Đăng xuất</button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Cài đặt giao diện</p>
            <h1 className="text-4xl font-black text-gray-900 capitalize">Chỉnh sửa {activeTab}</h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving || uploadingVideo}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl transition-all flex items-center gap-3"
          >
            {(saving || uploadingVideo) ? 'Đang xử lý...' : 'Lưu tất cả thay đổi'}
          </button>
        </header>

        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-10 min-h-[500px]">
          
          {activeTab === 'hero' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-in fade-in duration-300">
              {/* Nội dung Text */}
              <div className="space-y-8">
                <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 space-y-6">
                  <h3 className="text-xs font-black text-orange-500 uppercase tracking-[0.2em] mb-4 italic underline decoration-2 underline-offset-4">1. Nội dung văn bản</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tiêu đề Badge (Top)</label>
                      <input className="w-full p-4 bg-white border border-gray-200 rounded-2xl font-bold outline-none focus:border-orange-500" value={formData.hero_title || ''} onChange={(e) => handleChange('hero_title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thương hiệu 1 (Dòng trên)</label>
                      <input className="w-full p-4 bg-white border border-gray-200 rounded-2xl font-bold outline-none focus:border-orange-500" value={formData.hero_brand || ''} onChange={(e) => handleChange('hero_brand', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thương hiệu 2 (Dòng dưới)</label>
                      <input className="w-full p-4 bg-white border border-gray-200 rounded-2xl font-bold outline-none focus:border-orange-500" value={formData.hero_brand2 || ''} onChange={(e) => handleChange('hero_brand2', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mô tả ngắn (Description)</label>
                      <textarea className="w-full p-4 bg-white border border-gray-200 rounded-2xl font-medium outline-none focus:border-orange-500 h-32 resize-none" value={formData.hero_desc || ''} onChange={(e) => handleChange('hero_desc', e.target.value)} placeholder="Nhập mô tả sản phẩm tại đây..." />
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50/30 p-8 rounded-[32px] border border-orange-100 space-y-6">
                  <h3 className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] mb-4 italic underline decoration-2 underline-offset-4">2. Cấu hình Kích cỡ chữ (Font-size)</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Size Brand 1 (VD: 70px)</label>
                      <input className="w-full p-4 bg-white border border-gray-200 rounded-2xl font-black text-orange-600" value={formData.hero_brand_size || '70px'} onChange={(e) => handleChange('hero_brand_size', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Size Brand 2 (VD: 60px)</label>
                      <input className="w-full p-4 bg-white border border-gray-200 rounded-2xl font-black text-orange-600" value={formData.hero_brand2_size || '60px'} onChange={(e) => handleChange('hero_brand2_size', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Size Badge (VD: 12px)</label>
                      <input className="w-full p-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-600" value={formData.hero_title_size || '12px'} onChange={(e) => handleChange('hero_title_size', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Media & Others */}
              <div className="space-y-8">
                <div className="p-8 bg-gray-900 rounded-[32px] shadow-2xl space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-black text-orange-400 uppercase tracking-widest">Media: Video Hero</label>
                    {uploadingVideo && <span className="text-[10px] text-orange-400 animate-pulse font-bold">Đang tải video...</span>}
                  </div>
                  
                  {formData.hero_video && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border-4 border-white/10 shadow-xl">
                       <video src={formData.hero_video} className="w-full h-full object-cover opacity-60" muted />
                    </div>
                  )}

                  <div className="flex gap-4">
                    <label className="flex-1 bg-orange-600 hover:bg-orange-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase text-center cursor-pointer transition-all">
                      {uploadingVideo ? 'ĐANG TẢI...' : 'TẢI VIDEO MỚI (MP4)'}
                      <input type="file" className="hidden" accept="video/mp4" onChange={handleVideoUpload} disabled={uploadingVideo} />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ảnh Floating (Thỏi nhỏ)</label>
                  <div className="flex items-center gap-6 p-6 border-2 border-dashed border-gray-100 rounded-[32px] bg-gray-50">
                    <img src={formData.hero_img1} className="w-24 h-24 object-cover rounded-2xl shadow-md" />
                    <input type="file" onChange={(e) => handleFileUpload('hero_img1', e)} className="text-xs" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* ... giữ nguyên các tab khác ... */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
