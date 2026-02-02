
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
            try {
              setSlides(JSON.parse(contentMap.home_slides));
            } catch (e) {
              setSlides([]);
            }
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

  const addSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setSaving(true);
        const url = await uploadFile(file);
        const newSlide: SlideItem = {
          image: url,
          title: 'SẢN PHẨM MỚI',
          subtitle: '[THÊM MÔ TẢ TẠI ĐÂY]',
          tag: 'DANH MỤC',
          buyLink: '#',
          price: '899.000đ',
          oldPrice: '1.070.000đ'
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
      {/* Sidebar */}
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
            { id: 'slides', label: 'Quản lý Slide', icon: '🖼️' },
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

      {/* Main Content */}
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
          
          {/* TAB HERO */}
          {activeTab === 'hero' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-in fade-in duration-300">
              <div className="space-y-8">
                <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 space-y-6">
                  <h3 className="text-xs font-black text-orange-500 uppercase tracking-[0.2em] italic underline decoration-2 underline-offset-4">1. Nội dung văn bản</h3>
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
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mô tả ngắn</label>
                      <textarea className="w-full p-4 bg-white border border-gray-200 rounded-2xl font-medium outline-none h-32 resize-none" value={formData.hero_desc || ''} onChange={(e) => handleChange('hero_desc', e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="bg-orange-50/30 p-8 rounded-[32px] border border-orange-100 space-y-4">
                   <h3 className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] italic underline decoration-2 underline-offset-4">2. Cấu hình Kích cỡ chữ</h3>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Cỡ chữ Brand 1 (VD: 4.5rem)</label>
                        <input className="w-full p-4 bg-white border border-gray-200 rounded-xl text-xs font-bold" value={formData.hero_brand_size || ''} onChange={(e) => handleChange('hero_brand_size', e.target.value)} />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Cỡ chữ Brand 2 (VD: 3.5rem)</label>
                        <input className="w-full p-4 bg-white border border-gray-200 rounded-xl text-xs font-bold" value={formData.hero_brand2_size || ''} onChange={(e) => handleChange('hero_brand2_size', e.target.value)} />
                     </div>
                   </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="p-8 bg-gray-900 rounded-[32px] shadow-2xl space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-black text-orange-400 uppercase tracking-widest">Video Hero (MP4)</label>
                    {uploadingVideo && <span className="text-[10px] text-orange-400 animate-pulse font-bold">Đang tải...</span>}
                  </div>
                  {formData.hero_video && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/50">
                       <video src={formData.hero_video} className="w-full h-full object-cover opacity-50" muted />
                    </div>
                  )}
                  <label className="block w-full bg-orange-600 hover:bg-orange-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase text-center cursor-pointer transition-all">
                    {uploadingVideo ? 'ĐANG TẢI...' : 'TẢI VIDEO LÊN SUPABASE'}
                    <input type="file" className="hidden" accept="video/mp4" onChange={handleVideoUpload} disabled={uploadingVideo} />
                  </label>
                </div>
                <div className="p-8 border-2 border-dashed border-gray-100 rounded-[32px] bg-gray-50 flex flex-col items-center gap-4">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ảnh Floating (Thỏi nhỏ)</label>
                   <img src={formData.hero_img1} className="w-32 h-32 object-cover rounded-2xl shadow-xl border-4 border-white" />
                   <div className="flex flex-col items-center gap-2">
                     <label className="bg-white px-6 py-2 rounded-full border border-gray-200 text-[10px] font-black uppercase cursor-pointer hover:bg-gray-50">
                        Chọn ảnh mới
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload('hero_img1', e)} />
                     </label>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB SLIDES */}
          {activeTab === 'slides' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="flex justify-between items-center bg-orange-50 p-8 rounded-[32px] border border-orange-100">
                 <div>
                   <h3 className="text-xl font-black text-gray-900 uppercase italic">QUẢN LÝ DANH SÁCH SLIDE</h3>
                   <p className="text-xs text-orange-600/60 font-bold uppercase tracking-widest mt-1">Các sản phẩm hiển thị dưới phần Hero</p>
                 </div>
                 <label className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase cursor-pointer hover:bg-black transition-all shadow-xl">
                    + THÊM SẢN PHẨM MỚI
                    <input type="file" className="hidden" accept="image/*" onChange={addSlide} />
                 </label>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {slides.map((slide, idx) => (
                  <div key={idx} className="flex flex-col lg:flex-row gap-8 p-8 border border-gray-100 rounded-[40px] bg-white relative group shadow-sm hover:shadow-lg transition-all">
                    <button onClick={() => removeSlide(idx)} className="absolute top-6 right-8 text-red-500 hover:text-red-700 font-black text-[10px] uppercase tracking-widest bg-red-50 px-4 py-2 rounded-full">XÓA SLIDE</button>
                    <div className="w-44 h-44 flex-shrink-0 group relative">
                       <img src={slide.image} className="w-full h-full object-cover rounded-[32px] shadow-lg border-4 border-gray-50" />
                       <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[32px] cursor-pointer">
                          <span className="text-white text-[9px] font-black uppercase">Đổi ảnh</span>
                          <input type="file" className="hidden" onChange={async (e) => {
                             const file = e.target.files?.[0];
                             if (file) {
                               const url = await uploadFile(file);
                               updateSlideField(idx, 'image', url);
                             }
                          }} />
                       </label>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Tiêu đề sản phẩm</label>
                        <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold" value={slide.title} onChange={(e) => updateSlideField(idx, 'title', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Thương hiệu / Nhãn</label>
                        <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-orange-600" value={slide.tag} onChange={(e) => updateSlideField(idx, 'tag', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Giá khuyến mãi</label>
                        <input className="w-full p-4 bg-orange-50 border border-orange-100 rounded-2xl font-black text-gray-900" value={slide.price || ''} onChange={(e) => updateSlideField(idx, 'price', e.target.value)} placeholder="VD: 899.000đ" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Giá gốc (Gạch chân)</label>
                        <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-400" value={slide.oldPrice || ''} onChange={(e) => updateSlideField(idx, 'oldPrice', e.target.value)} placeholder="VD: 1.070.000đ" />
                      </div>
                      <div className="col-span-1 md:col-span-2 space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Link mua hàng (Shopee/Lazada/Facebook...)</label>
                        <input className="w-full p-4 bg-blue-50/30 border border-blue-100 rounded-2xl text-blue-600 font-medium text-sm" value={slide.buyLink || ''} onChange={(e) => updateSlideField(idx, 'buyLink', e.target.value)} placeholder="https://shopee.vn/..." />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB PRODUCT */}
          {activeTab === 'product' && (
            <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl">
              <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tên bộ sản phẩm (Dùng cho phần thông tin chi tiết)</label>
                  <input className="w-full p-5 bg-white border border-gray-100 rounded-3xl font-bold text-xl outline-none shadow-sm focus:border-orange-500" value={formData.prod_name || ''} onChange={(e) => handleChange('prod_name', e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Giá khuyến mãi mặc định (Hero)</label>
                    <input className="w-full p-5 bg-white border border-gray-100 rounded-3xl font-black text-2xl text-orange-600 outline-none shadow-sm" value={formData.hero_price || ''} onChange={(e) => handleChange('hero_price', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Giá gốc mặc định (Hero)</label>
                    <input className="w-full p-5 bg-white border border-gray-100 rounded-3xl font-bold text-xl text-gray-400 outline-none shadow-sm" value={formData.hero_old_price || ''} onChange={(e) => handleChange('hero_old_price', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB SPECS */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in duration-300">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ưu điểm nổi bật (Mỗi dòng 1 ý)</label>
                  <span className="text-[9px] text-orange-500 font-bold uppercase tracking-widest">Hiển thị dạng danh sách</span>
                </div>
                <textarea 
                  className="w-full p-8 bg-gray-50 border border-gray-100 rounded-[40px] h-[500px] resize-none leading-relaxed text-sm outline-none shadow-inner focus:border-orange-500 font-medium" 
                  value={formData.specs_benefits || ''} 
                  onChange={(e) => handleChange('specs_benefits', e.target.value)}
                  placeholder="Ví dụ:&#10;Dưỡng da trắng sáng&#10;Phục hồi collagen&#10;Chống nắng phổ rộng..."
                />
              </div>
              <div className="lg:col-span-5 space-y-8">
                <div className="p-10 border-2 border-dashed border-gray-100 rounded-[50px] bg-gray-50 flex flex-col items-center gap-8">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ảnh minh họa chi tiết (Specs)</label>
                  <div className="relative group w-full flex justify-center">
                    <img src={formData.specs_img} className="h-80 rounded-[40px] shadow-2xl border-8 border-white object-cover transition-transform duration-500 group-hover:scale-105" />
                    <label className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px] flex items-center justify-center cursor-pointer">
                       <span className="text-white text-[10px] font-black uppercase">Thay đổi ảnh</span>
                       <input type="file" className="hidden" onChange={(e) => handleFileUpload('specs_img', e)} />
                    </label>
                  </div>
                </div>
                <div className="bg-orange-50 p-8 rounded-[32px] border border-orange-100">
                   <p className="text-[10px] text-orange-800 font-bold leading-relaxed italic">
                     * Mẹo: Sử dụng ảnh có độ phân giải cao, chụp cận cảnh sản phẩm hoặc kết cấu của sản phẩm để tăng tính thuyết phục.
                   </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB FOOTER */}
          {activeTab === 'footer' && (
            <div className="space-y-12 animate-in fade-in duration-300 max-w-3xl">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Slogan cuối trang</label>
                  <textarea className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[32px] h-32 outline-none shadow-sm focus:border-orange-500 font-medium" value={formData.footer_info || ''} onChange={(e) => handleChange('footer_info', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Thông tin liên hệ (Email, Phone, Address)</label>
                  <input className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[32px] font-bold outline-none shadow-sm focus:border-orange-500" value={formData.footer_contact || ''} onChange={(e) => handleChange('footer_contact', e.target.value)} placeholder="VD: Hotline: 09xx.xxx.xxx | Email: info@hanmi.vn" />
                </div>
              </div>
              
              <div className="p-8 bg-gray-900 rounded-[40px] border border-white/5 space-y-4 shadow-2xl">
                 <h4 className="text-orange-500 font-black text-xs uppercase tracking-[0.2em]">Thông báo quan trọng</h4>
                 <ul className="text-gray-400 text-[11px] space-y-3 font-medium">
                   <li className="flex gap-2"><span>•</span> Bạn cần bấm nút "Lưu tất cả thay đổi" để những gì bạn vừa chỉnh sửa xuất hiện trên trang web.</li>
                   <li className="flex gap-2"><span>•</span> Đối với ảnh Slide, bạn có thể chỉnh sửa trực tiếp trên từng ô sản phẩm.</li>
                   <li className="flex gap-2"><span>•</span> Mật khẩu đăng nhập mặc định là: 123456789.</li>
                 </ul>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
