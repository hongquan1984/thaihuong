
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
      title: 'DẦU GỘI COLLAGEN PHỤC HỒI',
      subtitle: '[NHẬP KHẨU NGUYÊN CHAI TỪ ITALIA]',
      tag: 'HANMI ITALY GOLD',
      buyLink: '#',
      price: '550.000đ',
      oldPrice: '680.000đ'
    },
    {
      image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=1200',
      title: 'TINH DẦU DƯỠNG TÓC KERATIN',
      subtitle: '[SIÊU MƯỢT, KHÔNG BẾT DÍNH]',
      tag: 'HANMI SILK OIL',
      buyLink: '#',
      price: '420.000đ',
      oldPrice: '550.000đ'
    },
    {
      image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=80&w=1200',
      title: 'MẶT NẠ Ủ TÓC CHUYÊN SÂU',
      subtitle: '[TÁI TẠO CẤU TRÚC TÓC HƯ TỔN]',
      tag: 'HANMI HAIR MASK',
      buyLink: '#',
      price: '650.000đ',
      oldPrice: '790.000đ'
    }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      const activeThumb = scrollRef.current.children[activeIndex] as HTMLElement;
      if (activeThumb) {
        scrollRef.current.scrollTo({
          top: activeThumb.offsetTop - scrollRef.current.offsetHeight / 2 + activeThumb.offsetHeight / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  if (slides.length === 0) return null;

  const currentSlide = slides[activeIndex] || slides[0];

  const handleBuyNow = () => {
    if (currentSlide.buyLink && currentSlide.buyLink !== '#' && currentSlide.buyLink.trim() !== '') {
      window.open(currentSlide.buyLink, '_blank', 'noopener,noreferrer');
    } else {
      alert("Sản phẩm này hiện đang cập nhật link mua hàng!");
    }
  };

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -150, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 150, behavior: 'smooth' });
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-700">
      <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
        <div className="relative flex flex-row md:flex-col items-center order-2 md:order-1">
          <button onClick={scrollUp} className="hidden md:flex mb-2 text-gray-400 hover:text-orange-500 transition-colors z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>
          </button>
          <div ref={scrollRef} className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto scrollbar-hide snap-y snap-mandatory scroll-smooth" style={{ maxHeight: 'calc(600px - 60px)', width: 'auto' }}>
            {slides.map((slide, i) => (
              <button key={i} onClick={() => setActiveIndex(i)} className={`relative w-20 md:w-28 aspect-square rounded-[20px] overflow-hidden border-2 transition-all flex-shrink-0 snap-start ${activeIndex === i ? 'border-orange-500 scale-105 shadow-xl shadow-orange-500/20' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                <img src={slide.image} className="w-full h-full object-cover" alt={`Thumb ${i}`} />
              </button>
            ))}
          </div>
          <button onClick={scrollDown} className="hidden md:flex mt-2 text-gray-400 hover:text-orange-500 transition-colors z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

        <div className="flex-1 relative order-1 md:order-2 group">
          <div className="overflow-hidden rounded-[45px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] bg-gray-100 aspect-square md:aspect-auto md:h-[600px] border-[12px] border-white">
            <img key={activeIndex} src={currentSlide.image} className="w-full h-full object-cover animate-in fade-in zoom-in duration-500" />
          </div>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-white/90 backdrop-blur-xl p-7 rounded-[35px] border border-white/50 shadow-2xl max-w-xs transform transition-all group-hover:translate-y-[-10px]">
               <h4 className="font-black text-orange-600 text-lg uppercase tracking-tight">{currentSlide.tag}</h4>
               <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Sản phẩm từ Italia</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center h-full space-y-8 py-6 pl-0 lg:pl-10">
        <div className="space-y-4">
          <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-full">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Italian Professional Hair</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1] tracking-tighter uppercase">
            {currentSlide.title}
          </h2>
          <p className="text-orange-500 font-black text-[13px] uppercase tracking-[0.2em] italic">
            {currentSlide.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-full w-[85%] rounded-full"></div>
            </div>
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Bestseller Ý</span>
          </div>
          <div className="flex items-baseline gap-5">
            <span className="text-6xl font-black text-gray-900 tracking-tighter">{currentSlide.price}</span>
            <span className="text-2xl text-gray-200 line-through font-bold">{currentSlide.oldPrice}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button onClick={handleBuyNow} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-[28px] font-black text-sm uppercase tracking-[0.3em] shadow-2xl transition-all">
            MUA NGAY
          </button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}} />
    </section>
  );
};

export default FeatureSlider;
