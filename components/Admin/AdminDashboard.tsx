
import React, { useState, useEffect } from 'react';
import { supabase, uploadImage } from '../../lib/supabase';

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
        const url = await uploadImage(file);
        handleChange(key, url);
        alert("Tải lên thành công!");
      } catch (err: any) {
        alert(`Lỗi: ${err.message}`);
      } finally {
        setSaving(false);
      }
    }
  };

  const addSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setSaving(true);
        const url = await uploadImage(file);
        const newSlide: SlideItem = {
          image: url,
          title: 'TIÊU ĐỀ SLIDE MỚI',
          subtitle: 'Mô tả ngắn cho slide này',
          tag: 'TÊN SẢN PHẨM',
          buyLink: '#'
        };
        const updatedSlides = [...slides, newSlide];
        setSlides(updatedSlides);
        handleChange('home_slides', JSON.stringify(updatedSlides));
      } catch (err: any) {
        alert(`Lỗi: ${err.message}`);
      } finally {
        setSaving(false);
      }
    }
  };

  const removeSlide = (index: number) => {
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
    handleChange('home_slides', JSON.stringify(updated));
  };

  const updateSlideField = (index: number, field: keyof SlideItem, value: string) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: value };
    setSlides(updated);
    handleChange('home_slides', JSON.stringify(updated));
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
            disabled={saving}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl transition-all flex items-center gap-3"
          >
            {saving ? 'Đang lưu...' : 'Lưu tất cả thay đổi'}
          </button>
        </header>

        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-10 min-h-[500px]">
          
          {activeTab === 'hero' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in duration-300">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tiêu đề Hero</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:border-orange-500" value={formData.hero_title || ''} onChange={(e) => handleChange('hero_title', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thương hiệu 1</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:border-orange-500" value={formData.hero_brand || ''} onChange={(e) => handleChange('hero_brand', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thương hiệu 2</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:border-orange-500" value={formData.hero_brand2 || ''} onChange={(e) => handleChange('hero_brand2', e.target.value)} />
                </div>
                <div className="space-y-2 pt-4">
                  <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Link Video Hero (MP4)</label>
                  <input className="w-full p-4 bg-orange-50 border border-orange-100 rounded-2xl font-medium outline-none focus:border-orange-500 text-blue-600" value={formData.hero_video || ''} onChange={(e) => handleChange('hero_video', e.target.value)} placeholder="Dán link mp4 trực tiếp..." />
                </div>
              </div>
              <div className="space-y-8">
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

          {activeTab === 'slides' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="flex justify-between items-center bg-orange-50 p-8 rounded-[32px] border border-orange-100">
                 <div>
                   <h3 className="text-xl font-black text-gray-900 uppercase italic">SLIDE SẢN PHẨM</h3>
                   <p className="text-xs text-orange-600/60 font-bold uppercase tracking-widest mt-1">Cập nhật danh sách hiển thị dưới Hero</p>
                 </div>
                 <label className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase cursor-pointer hover:bg-black transition-all shadow-xl">
                    + THÊM SLIDE
                    <input type="file" className="hidden" accept="image/*" onChange={addSlide} />
                 </label>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {slides.map((slide, idx) => (
                  <div key={idx} className="flex flex-col lg:flex-row gap-8 p-8 border border-gray-100 rounded-[40px] bg-white relative group shadow-sm hover:shadow-lg transition-all">
                    <button onClick={() => removeSlide(idx)} className="absolute top-6 right-8 text-red-500 hover:text-red-700 font-black text-[10px] uppercase tracking-widest bg-red-50 px-4 py-2 rounded-full">XÓA</button>
                    <img src={slide.image} className="w-40 h-40 object-cover rounded-[32px] shadow-lg border-4 border-gray-50 flex-shrink-0" />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input className="p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold" value={slide.title} onChange={(e) => updateSlideField(idx, 'title', e.target.value)} placeholder="Tiêu đề" />
                      <input className="p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-orange-600" value={slide.tag} onChange={(e) => updateSlideField(idx, 'tag', e.target.value)} placeholder="Tag" />
                      <input className="col-span-1 md:col-span-2 p-4 bg-gray-50 border border-orange-100 rounded-2xl text-blue-600" value={slide.buyLink || ''} onChange={(e) => updateSlideField(idx, 'buyLink', e.target.value)} placeholder="Link mua hàng..." />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'product' && (
            <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tên bộ sản phẩm</label>
                <input className="w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl font-bold text-xl outline-none" value={formData.prod_name || ''} onChange={(e) => handleChange('prod_name', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Giá khuyến mãi</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-orange-600" value={formData.hero_price || ''} onChange={(e) => handleChange('hero_price', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Giá gốc</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-400" value={formData.hero_old_price || ''} onChange={(e) => handleChange('hero_old_price', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in duration-300">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ưu điểm (Mỗi dòng 1 ý)</label>
                <textarea className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[32px] h-[400px] resize-none leading-relaxed text-sm outline-none focus:border-orange-500" value={formData.specs_benefits || ''} onChange={(e) => handleChange('specs_benefits', e.target.value)} />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ảnh thỏi Collagen chi tiết</label>
                <div className="p-8 border-2 border-dashed border-gray-100 rounded-[40px] bg-gray-50 flex flex-col items-center gap-6">
                  <img src={formData.specs_img} className="h-64 rounded-3xl shadow-2xl border-4 border-white object-cover" />
                  <input type="file" onChange={(e) => handleFileUpload('specs_img', e)} className="text-sm" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thông điệp cuối trang</label>
                <textarea className="w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl h-32 outline-none" value={formData.footer_info || ''} onChange={(e) => handleChange('footer_info', e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thông tin liên hệ</label>
                <input className="w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl font-bold outline-none" value={formData.footer_contact || ''} onChange={(e) => handleChange('footer_contact', e.target.value)} />
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
