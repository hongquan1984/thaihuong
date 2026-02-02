
import React, { useEffect, useRef } from 'react';

interface HeroProps {
  data?: any;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const content = {
    title: data?.hero_title || 'TINH HOA CHĂM SÓC TÓC CHUẨN SALON Ý',
    titleSize: data?.hero_title_size || '12px',
    brand: data?.hero_brand || 'THÁI HƯƠNG PROFESSIONAL',
    brandSize: data?.hero_brand_size || '5rem',
    secondaryBrand: data?.hero_brand2 || 'ITALY HAIR CARE',
    secondaryBrandSize: data?.hero_brand2_size || '4rem',
    description: data?.hero_desc || 'Giải pháp phục hồi tóc hư tổn chuyên sâu với công nghệ Collagen tươi và Keratin tinh khiết từ Italia. Mang lại mái tóc suôn mượt, óng ả ngay lần gội đầu tiên.',
    price: data?.hero_price || '1.250.000đ',
    oldPrice: data?.hero_old_price || '1.580.000đ',
    img1: data?.hero_img1 || 'https://images.unsplash.com/photo-1527799822394-30a5c07e0c40?auto=format&fit=crop&q=80&w=800',
    videoUrl: data?.hero_video || 'https://player.vimeo.com/external/494252666.sd.mp4?s=72312154670233e466d79a29e7f539951684c30c&profile_id=164&oauth2_token_id=57447761',
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [content.videoUrl]);

  return (
    <section className="relative min-h-screen flex items-center bg-[#fef9f5] overflow-hidden pt-20 pb-12">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fdf2e9] rounded-l-[120px] z-0 hidden lg:block translate-x-12 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left: Professional Text Layout */}
        <div className="flex flex-col items-start space-y-6 lg:max-w-xl">
          {/* Top Badge */}
          <div className="inline-flex items-center px-6 py-2 bg-orange-100/50 rounded-full border border-orange-100">
            <span 
              className="font-black text-orange-600 uppercase tracking-[0.15em]"
              style={{ fontSize: content.titleSize }}
            >
              {content.title}
            </span>
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] ml-1">CÔNG NGHỆ PHỤC HỒI TỪ Ý</p>
            
            <h1 
              className="font-black text-orange-500 leading-[0.9] tracking-tighter uppercase"
              style={{ fontSize: content.brandSize }}
            >
              {content.brand}
            </h1>

            {/* Separator Section */}
            <div className="flex items-center gap-4 py-4 w-full">
              <div className="h-[1px] flex-1 bg-gray-200"></div>
              <span className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.2em] italic whitespace-nowrap">
                Premium Hair Solution
              </span>
              <div className="h-[1px] flex-1 bg-gray-200"></div>
            </div>

            <h2 
              className="font-black text-orange-500 leading-[0.9] tracking-tighter uppercase"
              style={{ fontSize: content.secondaryBrandSize }}
            >
              {content.secondaryBrand}
            </h2>
            
            <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.3em] pt-4">
              DẦU GỘI - XẢ - TINH DẦU - COLLAGEN
            </p>
          </div>

          <p className="text-gray-500 text-[15px] leading-relaxed max-w-lg">
            {content.description}
          </p>

          {/* Pricing & Button Pill */}
          <div className="pt-6 w-full sm:w-auto">
            <div className="bg-white px-6 py-4 rounded-[35px] shadow-2xl shadow-orange-500/10 border border-orange-50 flex items-center gap-8 justify-between sm:justify-start">
              <div className="flex flex-col pl-4">
                <span className="text-[11px] text-gray-300 line-through font-bold tracking-wider">{content.oldPrice}</span>
                <span className="text-3xl font-black text-gray-900 tracking-tight">{content.price}</span>
              </div>
              <div className="h-10 w-[1px] bg-gray-100 hidden sm:block"></div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-[28px] font-black text-[12px] uppercase tracking-widest transition-all hover:shadow-xl hover:shadow-orange-500/30 active:scale-95">
                MUA TRỌN BỘ
              </button>
            </div>
          </div>
        </div>

        {/* Right: Media Section */}
        <div className="relative">
          <div className="relative z-10 w-full aspect-[4/5] rounded-[65px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(255,165,0,0.15)] border-[15px] border-white bg-white transition-transform duration-700">
            <video 
              ref={videoRef}
              autoPlay 
              muted 
              loop 
              playsInline
              key={content.videoUrl}
              className="w-full h-full object-cover"
            >
              <source src={content.videoUrl} type="video/mp4" />
            </video>
            
            <div className="absolute bottom-10 left-8 right-8">
               <div className="bg-white/30 backdrop-blur-2xl p-6 rounded-[40px] border border-white/40 flex items-center justify-between shadow-2xl">
                  <div>
                    <p className="text-[9px] font-black text-white/80 uppercase tracking-[0.2em] mb-1">Dành cho tóc hư tổn</p>
                    <h4 className="text-xl font-black text-white tracking-tight uppercase">MỀM MƯỢT TỨC THÌ</h4>
                  </div>
                  <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center text-orange-500 shadow-xl transition-transform hover:scale-110 cursor-pointer">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
               </div>
            </div>
          </div>

          <div className="absolute -top-12 -right-8 w-44 h-44 rounded-[45px] overflow-hidden shadow-2xl border-[6px] border-white z-20 hidden lg:block animate-float">
             <img src={content.img1} className="w-full h-full object-cover" alt="Thái Hương Hair Care" />
          </div>

          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-300/20 rounded-full blur-[80px] z-0"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-200/10 rounded-full blur-[60px] z-0"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(-25px) rotate(-5deg); }
        }
        .animate-float { animation: float 7s infinite ease-in-out; }
      `}} />
    </section>
  );
};

export default Hero;
