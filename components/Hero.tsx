
import React from 'react';

interface HeroProps {
  data?: any;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const content = {
    title: data?.hero_title || 'BẢO VỆ DA - NGĂN LÃO HÓA',
    brand: data?.hero_brand || 'THÁI HƯƠNG COSMETIC',
    secondaryBrand: data?.hero_brand2 || 'COLAGEN SHAMPOO',
    price: data?.hero_price || '899.000đ',
    oldPrice: data?.hero_old_price || '1.070.000đ',
    img1: data?.hero_img1 || 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    videoUrl: data?.hero_video || 'https://player.vimeo.com/external/494252666.sd.mp4?s=72312154670233e466d79a29e7f539951684c30c&profile_id=164&oauth2_token_id=57447761',
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#fdf8f4] overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#fbf1e9] rounded-l-[100px] z-0 hidden lg:block translate-x-12"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content Area */}
        <div className="flex flex-col items-start text-left space-y-6">
          <div className="inline-block px-4 py-1.5 bg-orange-100 rounded-full">
            <p className="text-[11px] font-black text-orange-600 uppercase tracking-[0.2em]">
              {content.title}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">VỚI XỊT CHỐNG NẮNG</p>
            <h1 className="text-4xl md:text-6xl font-black text-orange-500 leading-tight tracking-tighter">
              {content.brand}
            </h1>
            <div className="flex items-center gap-4 py-2">
               <div className="h-[1px] w-12 bg-gray-200"></div>
               <span className="text-xs font-bold text-gray-300 uppercase tracking-widest italic">Và thỏi collagen tươi</span>
               <div className="h-[1px] w-12 bg-gray-200"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-orange-500 leading-tight tracking-tighter">
              {content.secondaryBrand}
            </h2>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em] pt-2">ĐA CHỨC NĂNG</p>
          </div>

          <p className="text-gray-500 text-sm max-w-md leading-relaxed">
            Giải pháp toàn diện giúp bảo vệ làn da khỏi tác hại của tia UV đồng thời cấp ẩm và ngăn ngừa lão hóa chuyên sâu từ Collagen tươi hữu cơ.
          </p>

          {/* New Compact Pricing Pill */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <div className="bg-white px-8 py-4 rounded-3xl shadow-xl shadow-orange-500/5 border border-orange-50 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-300 line-through font-bold">{content.oldPrice}</span>
                <span className="text-2xl font-black text-gray-900">{content.price}</span>
              </div>
              <div className="h-8 w-[1px] bg-gray-100"></div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-orange-500/40 active:scale-95">
                ĐẶT MUA NGAY
              </button>
            </div>
          </div>
        </div>

        {/* Right Visual Area: Video + Overlay */}
        <div className="relative group">
          {/* Main Video Container */}
          <div className="relative z-10 w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-white bg-gray-100 transition-transform duration-700 group-hover:scale-[1.02]">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={content.videoUrl} type="video/mp4" />
            </video>
            
            {/* Glass Overlay Tag */}
            <div className="absolute bottom-8 left-8 right-8">
               <div className="bg-white/40 backdrop-blur-xl p-5 rounded-[30px] border border-white/40 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest opacity-80">Chuyên gia khuyên dùng</p>
                    <h4 className="text-lg font-black text-white tracking-tight">KẾT CẤU MỎNG NHẸ</h4>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </div>
               </div>
            </div>
          </div>

          {/* Decorative Floating Image */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white z-20 hidden md:block animate-float">
             <img src={content.img1} className="w-full h-full object-cover" alt="Detail" />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl z-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-orange-100 rounded-full opacity-20 pointer-events-none"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-20px) rotate(-3deg); }
        }
        .animate-float { animation: float 6s infinite ease-in-out; }
      `}} />
    </section>
  );
};

export default Hero;
