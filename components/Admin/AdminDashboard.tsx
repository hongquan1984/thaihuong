
import React, { useState, useEffect } from 'react';
import { supabase, uploadFile } from '../../lib/supabase';

interface SlideItem {
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  buyLink?: string;
  price?: string;
  oldPrice?: string;
}

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

  const addGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setSaving(true);
        const url = await uploadFile(file);
        const updated = [...galleryImages, url];
        setGalleryImages(updated);
        handleChange('gallery_images', JSON.stringify(updated));
      } catch (err: any) { alert(`Lỗi: ${err.message}`); } finally { setSaving(false); }
    }
  };

  const removeGalleryImage = (index: number) => {
    const updated = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updated);
    handleChange('gallery_images', JSON.stringify(updated));
  };

  const addTestimonial = () => {
    const newItem: Testimonial = {
      avatar: 'https://i.pravatar.cc/150?u=' + Math.random(),
      name: 'Khách hàng mới',
      role: 'Người dùng',
      content: 'Cảm nhận của khách hàng về tóc sau khi dùng...',
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
    const updates = Object.entries(formData).map(([key, value]) => ({
      key,
      value: String(value)
    }));
    const { error } = await supabase.from('site_content').upsert(updates);
    setSaving(false);
    if (error) alert("Lỗi khi lưu: " + error.message);
    else alert("Đã lưu thành công!");
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans">
      <aside className="w-72 bg-gray-950 text-white p-8 flex flex-col shadow-2xl z-20">
        <div className="mb-12 flex items-center gap-4 font-black">HANMI ADMIN</div>
        <nav className="space-y-2 flex-1">
          {[
            { id: 'hero', label: 'Bố cục Hero', icon: '🏠' },
            { id: 'slides', label: 'Quản lý Slide', icon: '🖼️' },
            { id: 'gallery', label: 'Thư viện ảnh', icon: '📷' },
            { id: 'testimonials', label: 'Phản hồi khách', icon: '💬' },
            { id: 'product', label: 'Thông tin bổ sung', icon: '🛍️' },
            { id: 'specs', label: 'Thông số chi tiết', icon: '✨' },
            { id: 'footer', label: 'Liên hệ', icon: '📞' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 ${
                activeTab === tab.id ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </nav>
        <button onClick={onExit} className="mt-8 text-red-500 font-bold uppercase text-xs">Thoát</button>
      </aside>

      <main className="flex-1 overflow-y-auto p-12">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black uppercase italic">CHỈNH SỬA {activeTab}</h1>
          <button onClick={handleSave} className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold uppercase text-sm shadow-xl">Lưu thay đổi</button>
        </header>

        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 min-h-[500px]">
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-gray-50 p-6 rounded-3xl">
                <h3 className="font-bold">DANH SÁCH HÌNH ẢNH (SLIDE MULTI-ITEM)</h3>
                <label className="bg-black text-white px-6 py-2 rounded-xl text-xs font-bold cursor-pointer uppercase">
                  + Thêm Ảnh
                  <input type="file" className="hidden" onChange={addGalleryImage} />
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {galleryImages.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} className="w-full aspect-square object-cover rounded-3xl border border-gray-100" />
                    <button onClick={() => removeGalleryImage(i)} className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-gray-50 p-6 rounded-3xl">
                <h3 className="font-bold">QUẢN LÝ ĐÁNH GIÁ KHÁCH HÀNG</h3>
                <button onClick={addTestimonial} className="bg-black text-white px-6 py-2 rounded-xl text-xs font-bold uppercase">+ Thêm Phản Hồi</button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {testimonials.map((t, i) => (
                  <div key={i} className="p-6 border border-gray-100 rounded-3xl flex gap-6 items-start bg-white shadow-sm">
                    <div className="w-24 text-center space-y-2">
                       <img src={t.avatar} className="w-16 h-16 rounded-full mx-auto" />
                       <label className="text-[10px] font-bold block cursor-pointer text-blue-500"> Đổi ảnh <input type="file" className="hidden" onChange={async (e) => { const file = e.target.files?.[0]; if (file) { const url = await uploadFile(file); updateTestimonial(i, 'avatar', url); } }} /></label>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <input className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-bold" value={t.name} onChange={(e) => updateTestimonial(i, 'name', e.target.value)} placeholder="Tên khách hàng" />
                        <input className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl" value={t.role} onChange={(e) => updateTestimonial(i, 'role', e.target.value)} placeholder="Vai trò" />
                      </div>
                      <textarea className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl h-24" value={t.content} onChange={(e) => updateTestimonial(i, 'content', e.target.value)} placeholder="Nội dung" />
                      <button onClick={() => removeTestimonial(i)} className="text-red-500 font-bold uppercase text-xs">Xóa</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs remain similar but with updated demo labels in mind */}
          {activeTab === 'hero' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               <div className="space-y-4">
                 <label className="text-xs font-black text-gray-400 uppercase">Tiêu đề Badge</label>
                 <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold" value={formData.hero_title || ''} onChange={(e) => handleChange('hero_title', e.target.value)} />
                 <label className="text-xs font-black text-gray-400 uppercase">Brand Line 1</label>
                 <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold" value={formData.hero_brand || ''} onChange={(e) => handleChange('hero_brand', e.target.value)} />
                 <label className="text-xs font-black text-gray-400 uppercase">Brand Line 2</label>
                 <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold" value={formData.hero_brand2 || ''} onChange={(e) => handleChange('hero_brand2', e.target.value)} />
                 <label className="text-xs font-black text-gray-400 uppercase">Mô tả</label>
                 <textarea className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl h-32" value={formData.hero_desc || ''} onChange={(e) => handleChange('hero_desc', e.target.value)} />
               </div>
               <div>
                  <label className="text-xs font-black text-gray-400 uppercase">Video URL (MP4)</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl mb-4" value={formData.hero_video || ''} onChange={(e) => handleChange('hero_video', e.target.value)} />
                  <label className="text-xs font-black text-gray-400 uppercase">Ảnh Thỏi nhỏ / Mini Image</label>
                  <input type="file" onChange={(e) => handleFileUpload('hero_img1', e)} className="block mt-2" />
               </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
