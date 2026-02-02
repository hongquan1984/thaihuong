
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
      title: 'COLLAGEN GOLD',
      subtitle: '[DẦU GỘI PHỤC HỒI CHUYÊN SÂU]',
      tag: 'BEST SELLER',
      price: '550.000đ',
      oldPrice: '680.000đ'
    },
    {
      image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=1200',
      title: 'KERATIN SILK',
      subtitle: '[TINH DẦU DƯỠNG SIÊU MƯỢT]',
      tag: 'NEW ARRIVAL',
      price: '420.000đ',
      oldPrice: '550.000đ'
    },
    {
      image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=80&w=1200',
      title: 'HAIR RECOVERY MASK',
      subtitle: '[MẶT NẠ Ủ TÓC TÁI TẠO]',
      tag: 'TREATMENT',
      price: '650.000đ',
      oldPrice: '790.000đ'
    }
  ];

  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <section className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Gallery Thumbnails & Main Image */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex md:flex-col gap-4 order-2 md:order-1">
            {slides.map((slide, i) => (
              <button 
                key={i} 
                onClick={() => setActiveIndex(i)} 
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${activeIndex === i ? 'border-orange-500 scale-110 shadow-2xl shadow-orange-500/20' : 'border-gray-100 opacity-40 hover:opacity-100'}`}
              >
                <img src={slide.image} className="w-full h-full object-cover" alt="Thumb" />
              </button>
            ))}
          </div>

          <div className="flex-1 relative order-1 md:order-2 group w-full">
            <div className="relative overflow-hidden rounded-[60px] shadow-[0_60px_100px_-20px_rgba(0,0,0,0.08)] bg-gray-50 border-[10px] border-white aspect-square md:aspect-auto md:h-[650px]">
              <img 
                key={activeIndex} 
                src={currentSlide.image} 
                className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000 transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="absolute -bottom-6 -right-6">
               <div className="bg-orange-500 text-white px-10 py-6 rounded-3xl shadow-2xl font-black text-xs uppercase tracking-widest transform rotate-3">
                  100% Organic Italy
               </div>
            </div>
          </div>
        </div>

        {/* Content Info */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <span className="text-orange-500 font-black text-[12px] uppercase tracking-[0.4em] block">{currentSlide.tag}</span>
            <h2 className="text-[5rem] font-black text-gray-900 leading-[0.9] tracking-tighter uppercase">
              {currentSlide.title}
            </h2>
            <p className="text-gray-400 font-bold text-sm tracking-widest italic uppercase">
              {currentSlide.subtitle}
            </p>
          </div>

          <div className="space-y-8 p-10 bg-orange-50/50 rounded-[40px] border border-orange-100/50">
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-black text-gray-900 tracking-tighter">{currentSlide.price}</span>
              <span className="text-xl text-gray-300 line-through font-bold">{currentSlide.oldPrice}</span>
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                 <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <span className="text-sm font-bold text-gray-600">Phục hồi hư tổn chỉ sau 1 lần gội</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <span className="text-sm font-bold text-gray-600">Lưu hương nước hoa Ý sang trọng</span>
               </div>
            </div>

            <button className="w-full bg-gray-900 hover:bg-orange-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all duration-300 shadow-xl shadow-gray-200">
              Đặt hàng ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSlider;
