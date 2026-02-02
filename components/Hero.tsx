
import React from 'react';

interface HeroProps {
  data?: any;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const content = {
    title: data?.hero_title || 'BẢO VỆ DA - NGĂN LÃO HÓA',
    brand: data?.hero_brand || 'WIICARE',
    secondaryBrand: data?.hero_brand2 || 'GIOVENTÙ',
    price: data?.hero_price || '899.000đ',
    oldPrice: data?.hero_old_price || '1.070.000đ',
    img1: data?.hero_img1 || 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    img2: data?.hero_img2 || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    bgImg: data?.hero_bg_img || '', // Tùy chọn ảnh nền lớn
  };

  return (
    <section className="relative min-h-screen flex items-center bg-[#fbf1e9] overflow-hidden">
      {/* Background Big Image (Optional) */}
      {content.bgImg && (
        <div className="absolute inset-0 z-0">
          <img src={content.bgImg} className="w-full h-full object-cover opacity-30" alt="background" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf1e9] via-transparent to-transparent"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 w-full flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left Content Area */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <h2 className="text-xl md:text-2xl font-bold text-[#1e293b] mb-6 tracking-tight animate-in fade-in slide-in-from-left duration-700">
            {content.title}
          </h2>
          
          <div className="mb-4 group">
            <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">
              VỚI XỊT CHỐNG NẮNG
            </p>
            <h1 className="text-6xl md:text-8xl font-black text-[#f97316] leading-none tracking-tighter transition-all hover:scale-105 duration-500">
              {content.brand}
            </h1>
          </div>

          <div className="mb-10">
            <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">
              VÀ THỎI COLLAGEN TƯƠI
            </p>
            <h3 className="text-4xl md:text-6xl font-black text-[#f97316] leading-tight">
              {content.secondaryBrand}
            </h3>
            <p className="text-lg md:text-xl font-bold text-[#1e3a5f] mt-1 tracking-wider uppercase opacity-80">
              ĐA CHỨC NĂNG
            </p>
          </div>

          {/* Pricing Pill */}
          <div className="flex items-center gap-0 bg-white p-2 md:p-3 rounded-full shadow-[0_20px_50px_rgba(249,115,22,0.15)] border border-white animate-bounce-slow">
            <div className="px-6 py-1 border-r border-gray-100 flex flex-col justify-center">
              <span className="text-[10px] text-gray-400 line-through decoration-gray-300">
                {content.oldPrice}
              </span>
              <span className="text-xl md:text-2xl font-black text-[#f97316]">
                {content.price}
              </span>
            </div>
            <button className="bg-[#f97316] hover:bg-[#ea580c] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 ml-4 shadow-lg shadow-orange-500/30">
              Đặt Mua Ngay
            </button>
          </div>
        </div>

        {/* Right Visual Area */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center py-12 md:py-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-white/60 rounded-full blur-2xl animate-pulse-slow"></div>
          
          <div className="relative flex items-end gap-4 md:gap-6 z-10">
            <div className="w-36 md:w-60 h-56 md:h-[400px] overflow-hidden rounded-t-[100px] md:rounded-t-[160px] shadow-2xl transform translate-y-12 transition-transform hover:translate-y-8 duration-700">
              <img 
                src={content.img1} 
                alt="Feature 1" 
                className="w-full h-full object-cover grayscale-[0.1]"
              />
            </div>
            <div className="w-40 md:w-64 h-64 md:h-[450px] overflow-hidden rounded-t-[100px] md:rounded-t-[160px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-4 duration-700">
              <img 
                src={content.img2} 
                alt="Feature 2" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
        .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
      `}} />
    </section>
  );
};

export default Hero;
