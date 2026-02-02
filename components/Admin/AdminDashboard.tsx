
import React, { useState, useEffect } from 'react';
import { supabase, uploadImage } from '../../lib/supabase';

interface SlideItem {
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  buyLink?: string; // Thêm link mua hàng
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
          
          if (contentMap.home_slides) {
            setSlides(JSON.parse(contentMap.home_slides));
          }
          
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
      } catch (err: any) {
        alert(`Lỗi tải ảnh: ${err.message}`);
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
        alert(`Lỗi tải ảnh slide: ${err.message}`);
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
      setDbStatus('offline');
    } else {
      alert("Nội dung đã được cập nhật thành công!");
      setDbStatus('online');
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Đang tải...</div>;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-72 bg-gray-900 text-white p-8 flex flex-col">
        <div className="mb-12 flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
             <svg viewBox="0 0 100 100" className="w-6 h-6 fill-white"><path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" /></svg>
          </div>
          <h2 className="text-lg font-black tracking-tighter uppercase">HANMI</h2>
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
                activeTab === tab.id ? 'bg-orange-500 text-white shadow-xl' : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </nav>
        <button onClick={onExit} className="mt-auto w-full text-center py-4 rounded-xl text-xs font-black text-red-500 hover:bg-red-500/10 transition-colors uppercase tracking-widest border border-red-500/20">Đăng xuất</button>
      </aside>

      <main className="flex-1 overflow-y-auto p-12 bg-[#f8fafc]">
        <header className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Hệ thống quản trị</p>
            <h1 className="text-4xl font-black text-gray-900 capitalize">Chỉnh sửa {activeTab}</h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl transition-all"
          >
            {saving ? 'Đang lưu...' : 'Lưu tất cả thay đổi'}
          </button>
        </header>

        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 space-y-10">
          {activeTab === 'slides' && (
            <div className="space-y-12">
              <div className="flex justify-between items-center bg-orange-50 p-6 rounded-[24px]">
                 <div>
                   <h3 className="text-xl font-black text-gray-900 uppercase italic">DANH SÁCH SLIDE ẢNH</h3>
                   <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Thiết lập hình ảnh và link mua hàng cho trang chủ</p>
                 </div>
                 <label className="bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-xs uppercase cursor-pointer hover:bg-black transition-colors">
                    + THÊM SLIDE MỚI
                    <input type="file" className="hidden" accept="image/*" onChange={addSlide} />
                 </label>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {slides.map((slide, idx) => (
                  <div key={idx} className="flex gap-8 p-8 border-2 border-gray-50 rounded-[32px] hover:border-orange-100 transition-all relative group bg-white shadow-sm">
                    <button onClick={() => removeSlide(idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 font-black text-xs uppercase tracking-widest">XÓA SLIDE</button>
                    
                    <div className="w-48 aspect-square rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
                      <img src={slide.image} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Tiêu đề slide</label>
                        <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold" value={slide.title} onChange={(e) => updateSlideField(idx, 'title', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Nhãn sản phẩm (Tag)</label>
                        <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-black text-orange-500" value={slide.tag} onChange={(e) => updateSlideField(idx, 'tag', e.target.value)} />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Link mua hàng (URL)</label>
                        <input className="w-full p-4 bg-gray-50 border border-orange-200 focus:border-orange-500 outline-none rounded-xl font-medium text-blue-600" value={slide.buyLink || ''} onChange={(e) => updateSlideField(idx, 'buyLink', e.target.value)} placeholder="Ví dụ: https://shopee.vn/product-link-123" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Mô tả phụ</label>
                        <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl" value={slide.subtitle} onChange={(e) => updateSlideField(idx, 'subtitle', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* ... other tabs ... */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
