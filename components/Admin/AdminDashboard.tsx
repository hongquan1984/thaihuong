
import React, { useState, useEffect } from 'react';
import { supabase, uploadFile } from '../../lib/supabase';

// Cấu trúc dữ liệu cho Slide
interface SlideItem {
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  buyLink?: string;
  price?: string;
  oldPrice?: string;
}

// Cấu trúc dữ liệu cho Phản hồi
interface Testimonial {
  avatar: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface AdminDashboardProps {
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState<any>({});
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Tải dữ liệu từ Supabase
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('site_content').select('*');
        if (error) {
          if (error.code === 'PGRST116' || error.message.includes('relation "public.site_content" does not exist')) {
            console.warn("Bảng site_content chưa tồn tại. Vui lòng vào tab CSDL để lấy mã khởi tạo.");
          } else {
            throw error;
          }
        }
        
        if (data) {
          const contentMap = data.reduce((acc: any, item: any) => {
            acc[item.key] = item.value;
            return acc;
          }, {});
          setFormData(contentMap);
          
          if (contentMap.home_slides) {
            try { setSlides(JSON.parse(contentMap.home_slides)); } catch (e) { setSlides([]); }
          }
          if (contentMap.gallery_images) {
            try { setGalleryImages(JSON.parse(contentMap.gallery_images)); } catch (e) { setGalleryImages([]); }
          }
          if (contentMap.testimonials) {
            try { setTestimonials(JSON.parse(contentMap.testimonials)); } catch (e) { setTestimonials([]); }
          }
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleGenericFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const url = await uploadFile(file);
      callback(url);
    } catch (err: any) {
      alert(`Không thể tải ảnh: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const addGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length === 0) return;
    setSaving(true);
    try {
      const newUrls = await Promise.all(files.map(file => uploadFile(file)));
      const updated = [...galleryImages, ...newUrls];
      setGalleryImages(updated);
      handleChange('gallery_images', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    const updated = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updated);
    handleChange('gallery_images', JSON.stringify(updated));
  };

  const addSlide = () => {
    const newSlide: SlideItem = { 
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d', 
      title: 'TIÊU ĐỀ SLIDE MỚI', 
      subtitle: 'TÊN SẢN PHẨM', 
      tag: 'DANH MỤC', 
      price: '0đ', 
      oldPrice: '0đ',
      buyLink: '#' 
    };
    const updated = [...slides, newSlide];
    setSlides(updated);
    handleChange('home_slides', JSON.stringify(updated));
  };

  const updateSlide = (index: number, field: keyof SlideItem, value: any) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: value };
    setSlides(updated);
    handleChange('home_slides', JSON.stringify(updated));
  };

  const removeSlide = (index: number) => {
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
    handleChange('home_slides', JSON.stringify(updated));
  };

  const addTestimonial = () => {
    const newItem = { avatar: 'https://i.pravatar.cc/150', name: 'Khách hàng', role: 'Vai trò', content: 'Nội dung...', rating: 5 };
    const updated = [...testimonials, newItem];
    setTestimonials(updated);
    handleChange('testimonials', JSON.stringify(updated));
  };

  const updateTestimonial = (index: number, field: keyof Testimonial, value: any) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
    handleChange('testimonials', JSON.stringify(updated));
  };

  const removeTestimonial = (index: number) => {
    const updated = testimonials.filter((_, i) => i !== index);
    setTestimonials(updated);
    handleChange('testimonials', JSON.stringify(updated));
  };

  const handleSave = async () => {
    if (Object.keys(formData).length === 0) {
      alert("Không có dữ liệu mới để lưu.");
      return;
    }
    setSaving(true);
    try {
      const updates = Object.entries(formData).map(([key, value]) => ({
        key,
        value: String(value)
      }));
      const { error } = await supabase.from('site_content').upsert(updates);
      if (error) {
        if (error.message.includes('relation "public.site_content" does not exist')) {
          throw new Error("Lỗi: Bảng 'site_content' chưa được tạo trong Supabase. Vui lòng vào tab 'Cấu hình CSDL' để xử lý.");
        }
        throw error;
      }
      alert("Đã xuất bản thành công!");
    } catch (err: any) {
      alert(err.message || "Lỗi khi kết nối Supabase.");
    } finally {
      setSaving(false);
    }
  };

  const sqlCode = `-- COPY ĐOẠN MÃ NÀY VÀ DÁN VÀO SQL EDITOR TRÊN SUPABASE:

-- 1. Tạo bảng lưu trữ nội dung
CREATE TABLE IF NOT EXISTS public.site_content (
    key text PRIMARY KEY,
    value text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Bật bảo mật Row Level Security (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 3. Tạo chính sách cho phép mọi người xem dữ liệu
CREATE POLICY "Allow public read" ON public.site_content FOR SELECT USING (true);

-- 4. Tạo chính sách cho phép mọi người sửa dữ liệu (Bạn có thể giới hạn sau)
CREATE POLICY "Allow public modify" ON public.site_content FOR ALL USING (true) WITH CHECK (true);`;

  if (loading) return <div className="h-screen flex items-center justify-center font-black text-orange-500 uppercase tracking-widest bg-[#fef9f5]">Đang tải...</div>;

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-gray-900 overflow-hidden">
      <aside className="w-72 bg-gray-950 text-white p-8 flex flex-col shadow-2xl z-20">
        <div className="mb-12 flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black italic">TH</div>
          <span className="font-black text-xl italic tracking-tighter">ADMIN PANEL</span>
        </div>
        <nav className="space-y-2 flex-1">
          {[
            { id: 'hero', label: 'Bố cục Hero', icon: '🏠' },
            { id: 'slides', label: 'Quản lý Slide', icon: '🖼️' },
            { id: 'gallery', label: 'Thư viện ảnh', icon: '📷' },
            { id: 'testimonials', label: 'Phản hồi khách', icon: '💬' },
            { id: 'product', label: 'Thông tin sản phẩm', icon: '🛍️' },
            { id: 'database', label: 'Cấu hình CSDL', icon: '⚙️' }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 ${activeTab === tab.id ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-white/5'}`}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </nav>
        <button onClick={onExit} className="mt-8 bg-red-500/10 text-red-500 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest">Thoát</button>
      </aside>

      <main className="flex-1 overflow-y-auto p-12 relative">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">CHỈNH SỬA {activeTab}</h1>
            <p className="text-gray-400 text-xs font-bold uppercase mt-2">Đồng bộ trực tiếp lên hệ thống</p>
          </div>
          {activeTab !== 'database' && (
            <button onClick={handleSave} disabled={saving} className="bg-orange-500 text-white px-12 py-5 rounded-[20px] font-black uppercase text-xs tracking-widest shadow-2xl transition-all">
              {saving ? 'Đang lưu...' : 'Lưu & Xuất bản'}
            </button>
          )}
        </header>

        <div className="bg-white p-10 rounded-[45px] shadow-sm border border-gray-100 min-h-[600px]">
          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-2xl">
                <h4 className="font-black text-orange-800 uppercase text-sm mb-2">Hướng dẫn khắc phục lỗi lưu dữ liệu</h4>
                <p className="text-orange-700 text-sm">Nếu bạn nhấn "Lưu" mà bị báo lỗi "Failed to fetch", đó là do bảng dữ liệu chưa tồn tại trong Supabase của bạn. Hãy copy đoạn mã dưới đây và chạy trong SQL Editor của Supabase.</p>
              </div>
              <div className="relative group">
                <pre className="bg-gray-900 text-green-400 p-8 rounded-3xl overflow-x-auto text-xs leading-loose font-mono">
                  {sqlCode}
                </pre>
                <button 
                  onClick={() => { navigator.clipboard.writeText(sqlCode); alert("Đã copy mã SQL!"); }}
                  className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-[10px] font-bold"
                >
                  COPY MÃ SQL
                </button>
              </div>
              <div className="text-gray-400 text-[10px] uppercase font-bold text-center">Sau khi chạy mã trên Supabase, hãy quay lại các tab khác và nhấn Lưu.</div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-6">
                <div><label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Tiêu đề Badge</label><input className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-orange-500 transition-all font-bold" value={formData.hero_title || ''} onChange={(e) => handleChange('hero_title', e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Thương hiệu 1</label><input className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 font-black text-orange-500" value={formData.hero_brand || ''} onChange={(e) => handleChange('hero_brand', e.target.value)} /></div>
                  <div><label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Thương hiệu 2</label><input className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 font-black text-orange-500" value={formData.hero_brand2 || ''} onChange={(e) => handleChange('hero_brand2', e.target.value)} /></div>
                </div>
                <div><label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Mô tả</label><textarea className="w-full p-4 bg-gray-50 rounded-2xl h-40" value={formData.hero_desc || ''} onChange={(e) => handleChange('hero_desc', e.target.value)} /></div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Video (.mp4)</label>
                  <div className="flex gap-2">
                    <input className="flex-1 p-4 bg-gray-50 rounded-2xl text-xs" value={formData.hero_video || ''} onChange={(e) => handleChange('hero_video', e.target.value)} />
                    <label className="bg-black text-white px-6 py-4 rounded-2xl font-bold text-[10px] uppercase cursor-pointer">Tải lên<input type="file" className="hidden" accept="video/mp4" onChange={(e) => handleGenericFileUpload(e, url => handleChange('hero_video', url))} /></label>
                  </div>
                </div>
                <div>
                   <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Ảnh đại diện</label>
                   <div className="p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center gap-4">
                     <img src={formData.hero_img1 || ''} className="w-20 h-20 object-cover rounded-xl bg-white" />
                     <label className="cursor-pointer font-bold text-xs text-orange-500">Thay ảnh<input type="file" className="hidden" onChange={(e) => handleGenericFileUpload(e, url => handleChange('hero_img1', url))} /></label>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'slides' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-gray-400 uppercase text-[10px] tracking-widest">Danh sách Slide</h3>
                <button onClick={addSlide} className="bg-black text-white px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest">+ Thêm Slide</button>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {slides.map((slide, idx) => (
                  <div key={idx} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 relative group">
                    <button onClick={() => removeSlide(idx)} className="absolute top-6 right-6 text-red-500 font-bold">×</button>
                    <div className="flex gap-6 mb-4">
                      <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                        <img src={slide.image} className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] text-white font-black cursor-pointer uppercase"><input type="file" className="hidden" onChange={(e) => handleGenericFileUpload(e, url => updateSlide(idx, 'image', url))} />Đổi ảnh</label>
                      </div>
                      <div className="flex-1 space-y-3">
                        <input className="w-full p-3 bg-white border border-gray-100 rounded-xl font-bold" value={slide.title} onChange={(e) => updateSlide(idx, 'title', e.target.value)} placeholder="Tên SP" />
                        <input className="w-full p-3 bg-white border border-gray-100 rounded-xl text-[10px]" value={slide.tag} onChange={(e) => updateSlide(idx, 'tag', e.target.value)} placeholder="Nhãn" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input className="w-full p-3 bg-white border border-gray-100 rounded-xl font-bold text-sm" value={slide.price} onChange={(e) => updateSlide(idx, 'price', e.target.value)} placeholder="Giá KM" />
                      <input className="w-full p-3 bg-white border border-gray-100 rounded-xl text-gray-400 text-sm" value={slide.oldPrice} onChange={(e) => updateSlide(idx, 'oldPrice', e.target.value)} placeholder="Giá gốc" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Link đặt hàng (TikTok/Shopee)</label>
                       <input className="w-full p-3 bg-white border border-gray-100 rounded-xl text-xs text-blue-500 font-medium" value={slide.buyLink || ''} onChange={(e) => updateSlide(idx, 'buyLink', e.target.value)} placeholder="Dán link tại đây..." />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <label className="block w-full py-20 border-2 border-dashed border-gray-200 bg-gray-50 rounded-[40px] text-center cursor-pointer hover:border-orange-500 transition-all">
                <span className="font-black text-sm uppercase tracking-widest block">Tải ảnh lên thư viện</span>
                <input type="file" className="hidden" multiple onChange={addGalleryImage} />
              </label>
              <div className="grid grid-cols-5 gap-6">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/5] rounded-[30px] overflow-hidden group shadow-md border-2 border-white">
                    <img src={img} className="w-full h-full object-cover" />
                    <button onClick={() => removeGalleryImage(idx)} className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 text-white font-black text-[10px]">XOÁ</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="grid grid-cols-2 gap-8">
              {testimonials.map((item, idx) => (
                <div key={idx} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 space-y-4 relative">
                  <button onClick={() => removeTestimonial(idx)} className="absolute top-6 right-6 text-red-500 font-bold">×</button>
                  <div className="flex items-center gap-4">
                    <img src={item.avatar} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1">
                      <input className="w-full font-black text-gray-800 bg-white p-2 rounded-lg text-sm" value={item.name} onChange={(e) => updateTestimonial(idx, 'name', e.target.value)} />
                      <input className="w-full text-[10px] font-bold text-gray-400 bg-white p-1 rounded mt-1" value={item.role} onChange={(e) => updateTestimonial(idx, 'role', e.target.value)} />
                    </div>
                  </div>
                  <textarea className="w-full text-xs p-4 bg-white rounded-2xl border border-gray-100 h-24 italic" value={item.content} onChange={(e) => updateTestimonial(idx, 'content', e.target.value)} />
                </div>
              ))}
              <button onClick={addTestimonial} className="p-10 border-2 border-dashed border-gray-200 rounded-[40px] font-black text-gray-300 uppercase tracking-widest">+ Thêm đánh giá</button>
            </div>
          )}

          {activeTab === 'product' && (
            <div className="grid grid-cols-2 gap-12">
               <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Lợi ích sản phẩm (Mỗi dòng 1 ý)</label>
                  <textarea className="w-full p-6 bg-gray-50 rounded-[30px] h-[400px] text-sm leading-loose" value={formData.specs_benefits || ''} onChange={(e) => handleChange('specs_benefits', e.target.value)} />
               </div>
               <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Ảnh minh họa chi tiết</label>
                  <div className="p-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[40px] text-center">
                    <img src={formData.specs_img || ''} className="max-h-60 mx-auto rounded-2xl mb-6 shadow-xl" />
                    <label className="bg-black text-white px-8 py-3 rounded-xl font-bold text-[10px] cursor-pointer"><input type="file" className="hidden" onChange={(e) => handleGenericFileUpload(e, url => handleChange('specs_img', url))} />Đổi ảnh</label>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
