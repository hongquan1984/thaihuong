
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
    img1: data?.hero_img1 || 'https://picsum.photos/seed/hanmi1/400/600',
    img2: data?.hero_img2 || 'https://picsum.photos/seed/hanmi2/400/600',
  };

  return (
    <section className="relative overflow-hidden bg-[#fdf2e9]">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 flex flex-col md:flex-row items-center">
        <div className="relative z-10 w-full md:w-1/2 text-left mb-12 md:mb-0">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
            {content.title}
          </h2>
          <div className="mt-4">
            <p className="text-sm text-gray-500 uppercase tracking-widest">Với xịt chống nắng</p>
            <h1 className="text-5xl md:text-7xl font-black text-orange-500 leading-tight">{content.brand}</h1>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 uppercase tracking-widest">Và thỏi Collagen tươi</p>
            <h3 className="text-4xl md:text-5xl font-black text-orange-500 tracking-tighter">{content.secondaryBrand}</h3>
            <p className="text-xl font-bold text-gray-700 mt-1">ĐA CHỨC NĂNG</p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-orange-100">
              <span className="text-gray-400 line-through text-sm block">{content.oldPrice}</span>
              <span className="text-2xl font-bold text-orange-500">{content.price}</span>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-orange-200 transition-all transform hover:-translate-y-1">
              Đặt Mua Ngay
            </button>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 flex justify-center items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[500px] md:h-[500px] bg-white rounded-full opacity-60"></div>
          <div className="relative flex gap-4">
             <img 
               src={content.img1} 
               alt="Model 1" 
               className="w-40 md:w-64 rounded-t-full shadow-2xl relative -bottom-8 object-cover"
             />
             <img 
               src={content.img2} 
               alt="Model 2" 
               className="w-40 md:w-64 rounded-t-full shadow-2xl z-10 object-cover"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
