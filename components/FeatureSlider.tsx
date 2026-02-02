
import React, { useState, useEffect } from 'react';

interface SlideItem {
  image: string;
  title: string;
  subtitle: string;
  tag: string;
}

interface FeatureSliderProps {
  data?: any;
}

const FeatureSlider: React.FC<FeatureSliderProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Lấy danh sách slides từ data hoặc dùng mặc định nếu chưa có
  const slides: SlideItem[] = data?.home_slides ? JSON.parse(data.home_slides) : [
    {
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
      title: 'BỘ ĐÔI BẢO VỆ DA - NGĂN LÃO HÓA',
      subtitle: '[THÁI HƯƠNG COSMETIC + COLAGEN SHAMPOO]',
      tag: 'THÁI HƯƠNG COSMETIC SUN'
    },
    {
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200',
      title: 'TINH CHẤT PHỤC HỒI CHUYÊN SÂU',
      subtitle: 'Cấp ẩm tức thì, làm dịu làn da nhạy cảm',
      tag: 'RECOVERY SERUM'
    }
  ];

  if (slides.length === 0) return null;

  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-700">
      {/* Thumbnails & Main Image Group */}
      <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
        {/* Thumbnails (Left side on desktop) */}
        <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-20 md:w-24 aspect-square rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                activeIndex === i ? 'border-orange-500 scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={slide.image} className="w-full h-full object-cover" alt={`Thumb ${i}`} />
              {activeIndex === i && (
                <div className="absolute inset-0 bg-orange-500/10 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Main Image View */}
        <div className="flex-1 relative order-1 md:order-2 group">
          <div className="overflow-hidden rounded-[32px] shadow-2xl bg-gray-100 aspect-square md:aspect-auto md:h-[600px]">
            <img 
              key={activeIndex}
              src={currentSlide.image} 
              alt={currentSlide.title} 
              className="w-full h-full object-cover animate-in fade-in zoom-in duration-500"
            />
          </div>
          
          {/* Overlay Tag like in image */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white shadow-xl max-w-sm transform transition-transform group-hover:translate-y-[-5px]">
               <h4 className="font-black text-orange-600 text-lg uppercase tracking-tight">{currentSlide.tag}</h4>
               <p className="text-xs text-gray-500 font-medium mt-1">Sản phẩm chất lượng cao được tin dùng</p>
               <div className="absolute bottom-4 right-4 bg-gray-900 rounded-full p-2 text-white">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Content (Right side) */}
      <div className="lg:col-span-5 flex flex-col justify-center h-full space-y-8 py-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tighter mb-4">
            {currentSlide.title}
          </h2>
          <p className="text-orange-500 font-black text-sm uppercase tracking-widest">
            {currentSlide.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-full w-[85%] rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400 font-bold whitespace-nowrap uppercase tracking-widest">Đã bán 1,235+</span>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-black text-gray-900 tracking-tighter">899.000đ</span>
            <span className="bg-orange-100 text-orange-600 text-xs font-black px-3 py-1.5 rounded-lg uppercase">-20% OFF</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-orange-500/40 transition-all hover:-translate-y-1 active:translate-y-0">
            THÊM VÀO GIỎ HÀNG
          </button>
          
          <div className="flex gap-4">
            <button className="flex-1 py-4 border-2 border-gray-100 rounded-2xl flex justify-center items-center hover:bg-gray-50 transition-colors">
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-1">
                <span className="text-lg font-bold px-3 opacity-30 cursor-pointer">-</span>
                <span className="text-lg font-black px-4">1</span>
                <span className="text-lg font-bold px-3 opacity-30 cursor-pointer">+</span>
              </div>
            </button>
            <button className="p-4 border-2 border-gray-100 rounded-2xl text-gray-300 hover:text-red-500 hover:border-red-100 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-10 border-t border-gray-100">
           <div className="flex items-center gap-4 group">
             <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-orange-500 transition-colors group-hover:bg-orange-500 group-hover:text-white">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
               </svg>
             </div>
             <div>
               <h5 className="font-black text-[10px] uppercase tracking-widest text-gray-900">FREESHIP</h5>
               <p className="text-[10px] text-gray-400 font-bold uppercase">Toàn quốc từ 499k</p>
             </div>
           </div>
           <div className="flex items-center gap-4 group">
             <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-orange-500 transition-colors group-hover:bg-orange-500 group-hover:text-white">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
             </div>
             <div>
               <h5 className="font-black text-[10px] uppercase tracking-widest text-gray-900">ĐỔI TRẢ</h5>
               <p className="text-[10px] text-gray-400 font-bold uppercase">Trong vòng 7 ngày</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSlider;
