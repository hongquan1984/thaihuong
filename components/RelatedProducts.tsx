
import React, { useRef } from 'react';

interface CrossSellProduct {
  image: string;
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  soldCount: string;
  progress: number;
  buyLink: string;
}

interface RelatedProductsProps {
  data?: any;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ data }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const products: CrossSellProduct[] = data?.cross_sell_products 
    ? JSON.parse(data.cross_sell_products) 
    : [
      {
        name: 'THỎI MỜ NÁM GIOVENTÙ',
        price: '624.000đ',
        oldPrice: '780.000đ',
        discount: '-20%',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400',
        soldCount: '4,357',
        progress: 85,
        buyLink: '#'
      },
      {
        name: 'KEM KHÓA ẨM DERMALIN',
        price: '576.000đ',
        oldPrice: '720.000đ',
        discount: '-20%',
        image: 'https://images.unsplash.com/photo-1594125356779-780c102a9042?auto=format&fit=crop&q=80&w=400',
        soldCount: '4,207',
        progress: 80,
        buyLink: '#'
      },
      {
        name: 'KEM BODY TONE UP SOL.C',
        price: '640.000đ',
        oldPrice: '800.000đ',
        discount: '-20%',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=400',
        soldCount: '2,980',
        progress: 60,
        buyLink: '#'
      },
      {
        name: 'MẶT NẠ TẨY DA CHẾT SOL.C',
        price: '640.000đ',
        oldPrice: '800.000đ',
        discount: '-20%',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400',
        soldCount: '2,341',
        progress: 50,
        buyLink: '#'
      }
    ];

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <section className="py-12 relative">
      <div className="flex justify-between items-center mb-10 px-4">
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase italic">
          SẢN PHẨM THƯỜNG ĐƯỢC MUA CÙNG
        </h3>
        <div className="flex gap-2">
           <button onClick={scrollLeft} className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm text-gray-400 hover:text-orange-500 hover:border-orange-100 transition-all">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
           </button>
           <button onClick={scrollRight} className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm text-gray-400 hover:text-orange-500 hover:border-orange-100 transition-all">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
           </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 pb-12"
      >
        {products.map((p, i) => (
          <div 
            key={i} 
            className="group flex flex-col min-w-[280px] md:min-w-[300px] bg-white p-5 rounded-[40px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(255,165,0,0.15)] transition-all border border-gray-50 snap-start"
          >
            <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-[30px] border border-gray-50">
              <span className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-[11px] font-black px-3 py-1.5 rounded-[12px] shadow-lg shadow-orange-500/20">{p.discount}</span>
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            
            <h4 className="text-center font-black text-[13px] text-gray-800 uppercase tracking-tighter leading-tight h-10 line-clamp-2 px-4 mb-4">{p.name}</h4>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-orange-500 font-black text-lg tracking-tight">{p.price}</span>
              <span className="text-gray-300 line-through text-[11px] font-bold">{p.oldPrice}</span>
            </div>
            
            <div className="flex gap-2 w-full mt-auto mb-6">
               <button 
                onClick={() => p.buyLink && window.open(p.buyLink, '_blank')}
                className="flex-1 bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all"
               >
                 Mua ngay
               </button>
               <button className="flex-1 bg-orange-500 text-white hover:bg-orange-600 py-3 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-orange-500/20">
                 Thêm vào giỏ
               </button>
            </div>
            
            <div className="w-full px-2">
               <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest italic">Cung cấp bởi Hanmi</span>
                  <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Đã bán {p.soldCount}</span>
               </div>
               <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                 <div 
                   className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all duration-1000"
                   style={{ width: `${p.progress}%` }}
                 ></div>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default RelatedProducts;
