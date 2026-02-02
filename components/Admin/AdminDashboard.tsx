
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
        if (error) throw error;
        
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

  // Xử lý tải tệp chung
  const handleGenericFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const url = await uploadFile(file);
      callback(url);
    } catch (err: any) {
      alert(`Lỗi tải tệp: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Quản lý Gallery
  const addGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleGenericFileUpload(e, (url) => {
      const updated = [...galleryImages, url];
      setGalleryImages(updated);
      handleChange('gallery_images', JSON.stringify(updated));
    });
  };

  const removeGalleryImage = (index: number) => {
    const updated = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updated);
    handleChange('gallery_images', JSON.stringify(updated));
  };

  // Quản lý Slides
  const addSlide = () => {
    const newSlide: SlideItem = {
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=1200',
      title: 'Sản phẩm mới',
      subtitle: '[Mô tả sản phẩm]',
      tag: 'THÁI HƯƠNG PREMIUM',
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

  // Quản lý Phản hồi
  const addTestimonial = () => {
    const newItem: Testimonial = {
      avatar: 'https://i.pravatar.cc/150?u=' + Math.random(),
      name: 'Khách hàng mới',
      role: 'Người dùng',
      content: 'Cảm nhận tuyệt vời về sản phẩm Thái Hương...',
      rating: 5
    };
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
    setSaving(true);
    try {
      const updates = Object.entries(formData).map(([key, value]) => ({
        key,
        value: String(value)
      }));
      const { error } = await supabase.from('site_content').upsert(updates);
      if (error) throw error;
      alert("Đã lưu thành công!");
    } catch (err: any) {
      alert("Lỗi khi lưu: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black text-orange-500 uppercase tracking-widest bg-[#fef9f5]">Đang khởi tạo hệ thống...</div>;

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-950 text-white p-8 flex flex-col shadow-2xl z-20">
        <div className="mb-12 flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black text-white italic">TH</div>
          <span className="font-black text-xl italic tracking-tighter text-white">ADMIN PANEL</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          {[
            { id: 'hero', label: 'Bố cục Hero', icon: '🏠' },
            { id: 'slides', label: 'Quản lý Slide', icon: '🖼️' },
            { id: 'gallery', label: 'Thư viện ảnh', icon: '📷' },
            { id: 'testimonials', label: 'Phản hồi khách', icon: '💬' },
            { id: 'product', label: 'Thông tin sản phẩm', icon: '🛍️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 ${
                activeTab === tab.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>{tab.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/10">
          <button onClick={onExit} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Thoát hệ thống
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12 bg-gray-50/50 relative">
        {saving && (
          <div className="fixed top-0 left-0 right-0 h-1 bg-orange-500 animate-pulse z-50"></div>
        )}
        
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black uppercase italic text-gray-900 tracking-tighter">CHỈNH SỬA {activeTab}</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Dữ liệu được cập nhật trực tiếp lên website Thái Hương</p>
          </div>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className={`bg-orange-500 text-white px-12 py-5 rounded-[20px] font-black uppercase text-xs tracking-widest shadow-2xl shadow-orange-500/30 transition-all active:scale-95 ${saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600 hover:-translate-y-1'}`}
          >
            {saving ? 'Đang đồng bộ...' : 'Lưu & Xuất bản'}
          </button>
        </header>

        <div className="bg-white p-10 rounded-[45px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-100 min-h-[600px]">
          
          {/* TAB: HERO */}
          {activeTab === 'hero' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Tiêu đề Badge</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 transition-all font-bold" value={formData.hero_title || ''} onChange={(e) => handleChange('hero_title', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Dòng Thương hiệu 1</label>
                    <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 transition-all font-black text-orange-500" value={formData.hero_brand || ''} onChange={(e) => handleChange('hero_brand', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Dòng Thương hiệu 2</label>
                    <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 transition-all font-black text-orange-500" value={formData.hero_brand2 || ''} onChange={(e) => handleChange('hero_brand2', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Mô tả chi tiết</label>
                  <textarea className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 transition-all h-40 text-sm leading-relaxed" value={formData.hero_desc || ''} onChange={(e) => handleChange('hero_desc', e.target.value)} />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Giá KM</label>
                    <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 transition-all font-bold" value={formData.hero_price || ''} onChange={(e) => handleChange('hero_price', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Giá Gốc</label>
                    <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 transition-all font-bold text-gray-400" value={formData.hero_old_price || ''} onChange={(e) => handleChange('hero_old_price', e.target.value)} />
                  </div>
                </div>
                
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Video Hero (.mp4)</label>
                  <div className="flex gap-2">
                    <input className="flex-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 transition-all text-xs" value={formData.hero_video || ''} onChange={(e) => handleChange('hero_video', e.target.value)} placeholder="Dán URL hoặc tải lên..." />
                    <label className="bg-black text-white px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:bg-orange-500 transition-all whitespace-nowrap flex items-center">
                      Tải Video
                      <input type="file" className="hidden" accept="video/mp4" onChange={(e) => handleGenericFileUpload(e, url => handleChange('hero_video', url))} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Ảnh phụ (Pill Image)</label>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[30px] group hover:border-orange-500 transition-all">
                    {formData.hero_img1 ? (
                      <img src={formData.hero_img1} className="w-24 h-24 rounded-2xl object-cover shadow-xl" />
                    ) : (
                      <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-gray-200">IMG</div>
                    )}
                    <label className="flex-1 cursor-pointer">
                      <span className="block text-xs font-bold text-gray-600">Chọn ảnh mới để thay thế</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 block">Khuyên dùng: 800x1000px</span>
                      <input type="file" className="hidden" onChange={(e) => handleGenericFileUpload(e, url => handleChange('hero_img1', url))} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SLIDES */}
          {activeTab === 'slides' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-gray-400 uppercase text-[10px] tracking-[0.3em]">Danh sách Slide Sản Phẩm</h3>
                <button onClick={addSlide} className="bg-black text-white px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all">+ Thêm Sản Phẩm</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {slides.map((slide, idx) => (
                  <div key={idx} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 relative group animate-in slide-in-from-bottom-4 duration-500">
                    <button onClick={() => removeSlide(idx)} className="absolute top-6 right-6 w-10 h-10 bg-white shadow-xl rounded-full text-red-500 flex items-center justify-center font-bold hover:bg-red-500 hover:text-white transition-all">×</button>
                    
                    <div className="flex gap-6 mb-6">
                      <div className="relative group/img">
                        <img src={slide.image} className="w-28 h-28 rounded-3xl object-cover shadow-lg border-2 border-white" />
                        <label className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 rounded-3xl cursor-pointer transition-all text-[8px] font-black uppercase tracking-widest">
                          Đổi Ảnh
                          <input type="file" className="hidden" onChange={(e) => handleGenericFileUpload(e, url => updateSlide(idx, 'image', url))} />
                        </label>
                      </div>
                      <div className="flex-1 space-y-3">
                        <input className="w-full p-3 bg-white border border-gray-100 rounded-xl font-bold" value={slide.title} onChange={(e) => updateSlide(idx, 'title', e.target.value)} placeholder="Tên sản phẩm" />
                        <input className="w-full p-3 bg-white border border-gray-100 rounded-xl text-xs" value={slide.tag} onChange={(e) => updateSlide(idx, 'tag', e.target.value)} placeholder="Nhãn hiệu (VD: THÁI HƯƠNG GOLD)" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-[9px] font-black text-gray-300 uppercase block mb-1 ml-2">Giá KM</label>
                        <input className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm font-bold" value={slide.price || ''} onChange={(e) => updateSlide(idx, 'price', e.target.value)} placeholder="Giá bán" />
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-gray-300 uppercase block mb-1 ml-2">Giá Gốc</label>
                        <input className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm" value={slide.oldPrice || ''} onChange={(e) => updateSlide(idx, 'oldPrice', e.target.value)} placeholder="Giá gốc" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <input className="w-full p-3 bg-white border border-gray-100 rounded-xl text-xs italic" value={slide.subtitle} onChange={(e) => updateSlide(idx, 'subtitle', e.target.value)} placeholder="Slogan / Mô tả nhanh" />
                      <input className="w-full p-3 bg-white border border-gray-100 rounded-xl text-xs text-blue-500 font-medium" value={slide.buyLink || ''} onChange={(e) => updateSlide(idx, 'buyLink', e.target.value)} placeholder="Link liên kết mua hàng (Shopee, Lazada, ...)" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div className="bg-gray-50 p-10 rounded-[40px] border-2 border-dashed border-gray-200 text-center group hover:border-orange-500 transition-all">
                <label className="cursor-pointer block">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <span className="font-black text-sm uppercase tracking-widest block">Tải ảnh lên thư viện</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Ảnh sẽ tự động chạy ở phần thư viện cuối trang</span>
                  <input type="file" className="hidden" multiple onChange={addGalleryImage} />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/5] rounded-[30px] overflow-hidden group shadow-lg border-2 border-white">
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-red-500/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                      <button onClick={() => removeGalleryImage(idx)} className="text-white font-black uppercase text-xs tracking-widest border-2 border-white px-6 py-2 rounded-xl">XOÁ ẢNH</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-gray-400 uppercase text-[10px] tracking-[0.3em]">Đánh giá từ người dùng</h3>
                <button onClick={addTestimonial} className="bg-black text-white px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all">+ Thêm Phản Hồi</button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {testimonials.map((item, idx) => (
                  <div key={idx} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 space-y-6 animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-6">
                      <div className="relative group/avatar">
                        <img src={item.avatar} className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
                        <label className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 rounded-2xl cursor-pointer transition-all text-[8px] font-black uppercase">
                          Ảnh
                          <input type="file" className="hidden" onChange={(e) => handleGenericFileUpload(e, url => updateTestimonial(idx, 'avatar', url))} />
                        </label>
                      </div>
                      <div className="flex-1">
                        <input className="w-full font-black text-gray-800 bg-white p-3 rounded-xl border border-gray-100 mb-2" value={item.name} onChange={(e) => updateTestimonial(idx, 'name', e.target.value)} placeholder="Tên khách hàng" />
                        <input className="w-full text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white p-2 rounded-lg border border-gray-100" value={item.role} onChange={(e) => updateTestimonial(idx, 'role', e.target.value)} placeholder="Vai trò / Chức danh" />
                      </div>
                      <button onClick={() => removeTestimonial(idx)} className="text-red-400 hover:text-red-600 font-bold text-2xl">×</button>
                    </div>
                    <textarea className="w-full text-sm p-4 bg-white rounded-2xl border border-gray-100 h-32 leading-relaxed italic" value={item.content} onChange={(e) => updateTestimonial(idx, 'content', e.target.value)} placeholder="Nội dung khách hàng chia sẻ..." />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PRODUCT DETAILS */}
          {activeTab === 'product' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Thông số / Lợi ích sản phẩm</label>
                  <p className="text-[10px] text-gray-300 italic mb-2 uppercase tracking-tight">* Nhập mỗi dòng 1 lợi ích khác nhau</p>
                  <textarea className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[30px] outline-none focus:border-orange-500 transition-all h-[500px] text-sm leading-loose" value={formData.specs_benefits || ''} onChange={(e) => handleChange('specs_benefits', e.target.value)} />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Ảnh Minh Họa Thông Số</label>
                  <div className="p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[40px] text-center group hover:border-orange-500 transition-all">
                    {formData.specs_img ? (
                      <div className="relative inline-block">
                        <img src={formData.specs_img} alt="Specs detail" className="max-h-[300px] rounded-3xl shadow-2xl border-4 border-white mb-6" />
                        <label className="absolute bottom-2 right-2 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-orange-500 transition-all">
                          Thay Ảnh
                          <input type="file" className="hidden" onChange={(e) => handleGenericFileUpload(e, url => handleChange('specs_img', url))} />
                        </label>
                      </div>
                    ) : (
                      <label className="cursor-pointer block py-20">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-xl text-orange-500 mb-4">
                           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <span className="font-black text-xs uppercase tracking-widest block">Tải ảnh mô tả chi tiết</span>
                        <input type="file" className="hidden" onChange={(e) => handleGenericFileUpload(e, url => handleChange('specs_img', url))} />
                      </label>
                    )}
                  </div>
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
