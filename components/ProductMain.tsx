
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
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* Product Image Gallery */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-20">
          {images.map((img, i) => (
            <img key={i} src={img} className="w-full aspect-square object-cover rounded border border-gray-200 cursor-pointer hover:border-orange-400 transition-colors" />
          ))}
        </div>
        <div className="flex-1 relative group">
          <img src={images[0]} alt="Main product" className="w-full rounded-lg shadow-md" />
          <div className="absolute inset-x-0 bottom-4 px-4">
            <div className="bg-white/90 p-3 rounded-md backdrop-blur-sm border border-orange-100">
               <h4 className="font-bold text-orange-600">{data?.hero_brand || 'WIICARE'} SUN</h4>
               <p className="text-xs text-gray-600">Khả năng chống nắng phổ rộng SPF 50+, PA++++</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Purchase Info */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 leading-tight">
            {data?.prod_name || 'BỘ ĐÔI BẢO VỆ DA - NGĂN LÃO HÓA'}
          </h2>
          <p className="text-orange-500 font-medium text-sm mt-1">
            [{data?.hero_brand || 'WIICARE'} + {data?.hero_brand2 || 'GIOVENTÙ'}]
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-orange-400 h-full w-3/4"></div>
          </div>
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Đã bán 1,235</span>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-gray-900">{data?.hero_price || '899,000đ'}</span>
          <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded">-20%</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]">
            THÊM VÀO GIỎ
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <div className="flex items-center border border-gray-200 rounded-lg">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-50">-</button>
            <span className="px-4 font-medium">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-gray-50">+</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-t border-gray-100">
           <div className="flex items-start gap-3">
             <div className="p-2 bg-gray-50 rounded text-orange-500">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
               </svg>
             </div>
             <div>
               <h5 className="font-bold text-sm">MIỄN PHÍ GIAO HÀNG TOÀN QUỐC</h5>
               <p className="text-xs text-gray-400">Áp dụng cho đơn hàng giá trị trên 499k</p>
             </div>
           </div>
           <div className="flex items-start gap-3">
             <div className="p-2 bg-gray-50 rounded text-orange-500">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
             </div>
             <div>
               <h5 className="font-bold text-sm">ĐỔI TRẢ DỄ DÀNG</h5>
               <p className="text-xs text-gray-400">Vui lòng quay lại clip khi nhận hàng</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ProductMain;
