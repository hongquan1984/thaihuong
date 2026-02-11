
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
  
  const slides: SlideItem[] = data?.home_slides ? JSON.parse(data.home_slides) : [
    {
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=1200',
      title: 'dầu cặp top haneda',
      subtitle: 'mô tả ngắn cho slide này',
      tag: 'DẦU CẶP TOP HANEDA',
      price: '1.000.000đ',
      oldPrice: '1.200.000đ'
    },
    {
      image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=1200',
      title: 'tinh chất keratin italy',
      subtitle: 'dưỡng tóc siêu mềm mượt chuyên sâu',
      tag: 'KERATIN ESSENCE',
      price: '850.000đ',
      oldPrice: '990.000đ'
    }
  ];

  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <section className="py-4 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
        {/* Main Image & Thumbnails */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative group w-full">
            {/* Image Container with Fixed Height and Contain Logic */}
            <div className="relative overflow-hidden rounded-[40px] md:rounded-[60px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] bg-gray-50 border-[6px] md:border-[10px] border-white h-[450px] md:h-[650px] flex items-center justify-center p-6 md:p-12">
              <img 
                key={activeIndex} 
                src={currentSlide.image} 
                className="max-w-full max-h-full object-contain animate-in fade-in zoom-in duration-700" 
                alt={currentSlide.title}
              />
              
              {/* Subtle background glow to make product pop when contained */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-50/30 to-transparent -z-10"></div>
            </div>
            
            <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 z-20">
               <div className="bg-[#e91e63] text-white px-5 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-[30px] shadow-2xl font-black text-[9px] md:text-xs uppercase tracking-widest transform rotate-2">
                  SẢN PHẨM HỮU CƠ 100%
               </div>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-2">
            {slides.map((slide, i) => (
              <button 
                key={i} 
                onClick={() => setActiveIndex(i)} 
                className={`relative min-w-[70px] h-20 md:min-w-[100px] md:h-28 rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-white flex items-center justify-center p-2 ${activeIndex === i ? 'border-[#e91e63] scale-105 shadow-xl' : 'border-gray-100 opacity-60'}`}
              >
                <img src={slide.image} className="max-w-full max-h-full object-contain" alt="Thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Info */}
        <div className="lg:col-span-5 pt-4 space-y-6 md:space-y-10">
          <div className="space-y-4">
            <span className="text-[#e91e63] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] block">{currentSlide.tag}</span>
            <h2 className="font-script text-[4.5rem] md:text-[6.5rem] text-gray-900 leading-[0.85] tracking-tight lowercase break-words">
              {currentSlide.title}
            </h2>
            <p className="text-gray-400 font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase">
              {currentSlide.subtitle}
            </p>
          </div>

          <div className="bg-[#fff5f7] p-8 md:p-12 rounded-[40px] md:rounded-[50px] space-y-8 shadow-sm">
            <div className="space-y-1">
              <span className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter block">
                {currentSlide.price}
              </span>
              {currentSlide.oldPrice && (
                <span className="text-gray-300 line-through font-bold text-lg md:text-xl ml-1">{currentSlide.oldPrice}</span>
              )}
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                 <div className="w-6 h-6 bg-[#22c55e] rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <span className="text-xs md:text-sm font-bold text-gray-600">Phục hồi hư tổn chỉ sau 1 lần gội</span>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-6 h-6 bg-[#22c55e] rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <span className="text-xs md:text-sm font-bold text-gray-600">Lưu hương nước hoa Ý sang trọng</span>
               </div>
            </div>

            <button className="w-full bg-[#e91e63] hover:bg-black text-white py-5 md:py-6 rounded-2xl md:rounded-[30px] font-black text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 shadow-xl shadow-pink-200 active:scale-95">
              Đặt hàng ngay
            </button>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default FeatureSlider;
