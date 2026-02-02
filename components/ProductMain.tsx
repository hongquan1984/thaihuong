
import React, { useState } from 'react';

// Define props interface to fix TypeScript error
interface ProductMainProps {
  data?: any;
}

const ProductMain: React.FC<ProductMainProps> = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const images = [
    'https://picsum.photos/seed/prod1/600/600',
    'https://picsum.photos/seed/prod2/600/600',
    'https://picsum.photos/seed/prod3/600/600',
    'https://picsum.photos/seed/prod4/600/600',
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start py-12">
      {/* Product Image Gallery */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-20">
          {images.map((img, i) => (
            <img key={i} src={img} className="w-full aspect-square object-cover rounded-2xl border border-gray-200 cursor-pointer hover:border-[#e91e63] transition-colors" alt="Thumbnail" />
          ))}
        </div>
        <div className="flex-1 relative group">
          <img src={images[0]} alt="Main product" className="w-full rounded-[40px] shadow-2xl border-4 border-white" />
          <div className="absolute inset-x-0 bottom-4 px-4">
            <div className="bg-white/90 p-5 rounded-[30px] backdrop-blur-sm border border-pink-100 shadow-xl">
               <h4 className="font-black text-[#e91e63] uppercase text-xs tracking-widest">{data?.hero_brand || 'WIICARE'} SUN</h4>
               <p className="text-[10px] text-gray-600 font-bold uppercase mt-1">Khả năng chống nắng phổ rộng SPF 50+, PA++++</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Purchase Info */}
      <div className="space-y-8">
        <div>
          <h2 className="font-script text-5xl text-gray-900 leading-tight lowercase">
            {data?.prod_name || 'Bộ đôi bảo vệ da - Ngăn lão hóa'}
          </h2>
          <p className="text-[#e91e63] font-black text-xs uppercase tracking-[0.3em] mt-3">
            [{data?.hero_brand || 'WIICARE'} + {data?.hero_brand2 || 'GIOVENTÙ'}]
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#e91e63] h-full w-3/4"></div>
          </div>
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest whitespace-nowrap">Đã bán 1.235</span>
        </div>

        <div className="flex items-baseline gap-4">
          <span className="text-5xl font-black text-gray-900 tracking-tighter">{data?.hero_price || '899.000đ'}</span>
          <span className="bg-pink-100 text-[#e91e63] text-[10px] font-black px-3 py-1.5 rounded-xl uppercase">-20%</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button className="flex-1 bg-[#e91e63] hover:bg-black text-white py-5 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-pink-100 transition-all active:scale-[0.98]">
            THÊM VÀO GIỎ
          </button>
          
          <button className="p-5 border border-gray-100 rounded-[25px] text-gray-300 hover:text-[#e91e63] hover:border-pink-200 transition-colors shadow-sm bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <div className="flex items-center border border-gray-100 rounded-[25px] bg-white px-2">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-4 text-gray-400 font-bold hover:text-[#e91e63] transition-colors">-</button>
            <span className="px-2 font-black text-gray-800 w-8 text-center">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-4 text-gray-400 font-bold hover:text-[#e91e63] transition-colors">+</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-t border-gray-50">
           <div className="flex items-start gap-4">
             <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#e91e63] shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
               </svg>
             </div>
             <div>
               <h5 className="font-black text-gray-900 text-[11px] uppercase tracking-wider mb-1">MIỄN PHÍ GIAO HÀNG</h5>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Đơn hàng trên 499k</p>
             </div>
           </div>
           <div className="flex items-start gap-4">
             <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#e91e63] shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
             </div>
             <div>
               <h5 className="font-black text-gray-900 text-[11px] uppercase tracking-wider mb-1">ĐỔI TRẢ DỄ DÀNG</h5>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Kèm video lúc nhận hàng</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ProductMain;
