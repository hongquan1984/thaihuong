
import React from 'react';

interface ProductInfoSectionProps {
  data?: any;
}

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ data }) => {
  const brandName = data?.hero_brand2 || 'ITALY CARE';
  const specsImg = data?.specs_img || 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400';
  
  const defaultBenefits = [
    "Công nghệ Keratin thủy phân tái tạo lõi tóc",
    "Chiết xuất thảo mộc hữu cơ từ vùng Tuscany",
    "Cân bằng độ pH 5.5 an toàn cho mọi loại da",
    "Khóa dưỡng chất chuyên sâu trên 48 giờ",
    "Lưu hương nước hoa Ý sang trọng"
  ];

  const benefits: string[] = data?.specs_benefits 
    ? data.specs_benefits.split('\n').filter((i: string) => i.trim() !== '')
    : defaultBenefits;

  return (
    <section className="bg-white py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-pink-50 rounded-[100px] blur-3xl transform rotate-12 -z-10"></div>
            <div className="relative rounded-[60px] md:rounded-[80px] overflow-hidden border-[10px] md:border-[15px] border-white shadow-2xl">
               <img 
                src={specsImg} 
                className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-1000" 
                alt="Product Spec" 
               />
               <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-2xl border border-white">
                     <p className="text-[9px] md:text-[10px] font-black text-[#e91e63] uppercase tracking-widest mb-1">Công nghệ</p>
                     <p className="font-black text-gray-900 uppercase text-xs md:text-base">Độc quyền từ Italy</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-8 md:space-y-12 order-1 lg:order-2">
            <div className="space-y-4">
              <h3 className="font-script text-5xl md:text-6xl text-gray-900 leading-tight lowercase">
                Công nghệ đột phá <br className="hidden md:block"/> đánh thức vẻ đẹp
              </h3>
              <div className="w-16 md:w-24 h-1 md:h-1.5 bg-[#e91e63] rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {benefits.map((benefit: string, idx: number) => (
                <div key={idx} className="flex items-center gap-4 md:gap-6 group">
                   <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center text-[#e91e63] group-hover:bg-[#e91e63] group-hover:text-white transition-all duration-300 shadow-sm">
                      <span className="font-black text-base md:text-lg">0{idx + 1}</span>
                   </div>
                   <p className="text-gray-600 font-bold uppercase text-[10px] md:text-[12px] tracking-widest leading-tight">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 md:pt-10 border-t border-gray-100">
               <div className="flex flex-wrap items-center gap-4 md:gap-8 opacity-40">
                  <span className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.5em]">Tự nhiên</span>
                  <span className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.5em]">An toàn</span>
                  <span className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.5em]">Chuyên sâu</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfoSection;
