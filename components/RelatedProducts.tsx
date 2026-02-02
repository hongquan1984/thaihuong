
import React from 'react';

const products = [
  {
    name: 'THỎI MỜ NÁM GIOVENTÙ',
    price: 624000,
    original: 780000,
    discount: 20,
    img: 'https://picsum.photos/seed/rel1/300/300',
    sold: 4357
  },
  {
    name: 'KEM KHÓA ẨM CAO CẤP DERMALIN',
    price: 576000,
    original: 720000,
    discount: 20,
    img: 'https://picsum.photos/seed/rel2/300/300',
    sold: 4207
  },
  {
    name: 'KEM BODY TONE UP CAO CẤP SOL.C',
    price: 640000,
    original: 800000,
    discount: 20,
    img: 'https://picsum.photos/seed/rel3/300/300',
    sold: 2980
  },
  {
    name: 'MẶT NẠ TẨY DA CHẾT CAO CẤP SOL.C',
    price: 640000,
    original: 800000,
    discount: 20,
    img: 'https://picsum.photos/seed/rel4/300/300',
    sold: 2341
  },
];

const RelatedProducts: React.FC = () => {
  return (
    <section>
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-10 tracking-tight uppercase">
        Sản Phẩm Thường Được Mua Cùng
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <div key={i} className="group flex flex-col items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-50">
            <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
              <span className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">-{p.discount}%</span>
              <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h4 className="text-center font-bold text-xs text-gray-600 line-clamp-2 h-8 mb-2 px-2">{p.name}</h4>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange-500 font-bold text-sm">{p.price.toLocaleString()}đ</span>
              <span className="text-gray-400 line-through text-[10px]">{p.original.toLocaleString()}đ</span>
            </div>
            <div className="flex gap-2 w-full mt-auto">
               <button className="flex-1 bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 py-2 rounded text-[10px] font-bold transition-colors">Mua ngay</button>
               <button className="flex-1 bg-orange-500 text-white hover:bg-orange-600 py-2 rounded text-[10px] font-bold transition-colors shadow-sm">Thêm vào giỏ</button>
            </div>
            <div className="w-full mt-4 flex items-center gap-2">
               <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                 <div className="bg-orange-400 h-full w-[80%]"></div>
               </div>
               <span className="text-[9px] text-gray-400 font-medium italic whitespace-nowrap">Đã bán {p.sold.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
