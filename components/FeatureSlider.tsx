
import React, { useState, useRef, useEffect } from 'react';

interface SlideItem {
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  buyLink?: string;
  price?: string;
  oldPrice?: string;
}

interface FeatureSliderProps {
  data?: any;
}

const FeatureSlider: React.FC<FeatureSliderProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const slides: SlideItem[] = data?.home_slides ? JSON.parse(data.home_slides) : [
    {
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=1200',
      title: 'Collagen Vàng',
      subtitle: '[DẦU GỘI PHỤC HỒI CHUYÊN SÂU]',
      tag: 'BÁN CHẠY NHẤT',
      price: '550.000đ',
      oldPrice: '680.000đ'
    },
    {
      image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=1200',
      title: 'Tinh Chất Keratin',
      subtitle: '[TINH DẦU DƯỠNG SIÊU MƯỢT]',
      tag: 'HÀNG MỚI VỀ',
      price: '420.000đ',
      oldPrice: '550.000đ'
    },
    {
      image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=80&w=1200',
      title: 'Mặt Nạ Tóc Phục Hồi',
      subtitle: '[MẶT NẠ Ủ TÓC TÁI TẠO]',
      tag: 'DÒNG ĐẶC TRỊ',
      price: '650.000đ',
      oldPrice: '790.000đ'
    }
  ];

  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <section className="py-6 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
        {/* Gallery Thumbnails & Main Image */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <div className="flex md:flex-col gap-3 md:gap-4 order-2 md:order-1">
            {slides.map((slide, i) => (
              <button 
                key={i} 
                onClick={() => setActiveIndex(i)} 
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${activeIndex === i ? 'border-[#e91e63] scale-110 shadow-2xl shadow-pink-500/20' : 'border-gray-100 opacity-40 hover:opacity-100'}`}
              >
                <img src={slide.image} className="w-full h-full object-cover" alt="Ảnh nhỏ" />
              </button>
            ))}
          </div>

          <div className="flex-1 relative order-1 md:order-2 group w-full">
            <div className="relative overflow-hidden rounded-[40px] md:rounded-[60px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] bg-gray-50 border-[6px] md:border-[10px] border-white aspect-square md:aspect-auto md:h-[650px]">
              <img 
                key={activeIndex} 
                src={currentSlide.image} 
                className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000 transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6">
               <div className="bg-[#e91e63] text-white px-6 md:px-10 py-3 md:py-6 rounded-2xl md:rounded-3xl shadow-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transform rotate-3">
                  Sản Phẩm Hữu Cơ 100%
               </div>
            </div>
          </div>
        </div>

        {/* Content Info */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <span className="text-[#e91e63] font-black text-[10px] md:text-[12px] uppercase tracking-[0.4em] block">{currentSlide.tag}</span>
            <h2 className="font-script text-[4rem] md:text-[5rem] text-gray-900 leading-[0.9] tracking-normal lowercase">
              {currentSlide.title}
            </h2>
            <p className="text-gray-400 font-bold text-xs md:text-sm tracking-widest italic uppercase">
              {currentSlide.subtitle}
            </p>
          </div>

          <div className="space-y-6 md:space-y-8 p-6 md:p-10 bg-pink-50/50 rounded-[30px] md:rounded-[40px] border border-pink-100/50">
            <div className="flex items-baseline gap-3 md:gap-4">
              <span className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">{currentSlide.price}</span>
              <span className="text-lg md:text-xl text-gray-300 line-through font-bold">{currentSlide.oldPrice}</span>
            </div>
            
            <div className="space-y-3 md:space-y-4">
               <div className="flex items-center gap-3">
                 <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <span className="text-xs md:text-sm font-bold text-gray-600">Phục hồi hư tổn chỉ sau 1 lần gội</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <span className="text-xs md:text-sm font-bold text-gray-600">Lưu hương nước hoa Ý sang trọng</span>
               </div>
            </div>

            <button className="w-full bg-[#e91e63] hover:bg-black text-white py-4 md:py-6 rounded-2xl md:rounded-3xl font-black text-[10px] md:text-xs uppercase tracking-[0.3em] transition-all duration-300 shadow-xl shadow-pink-100">
              Đặt hàng ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSlider;
