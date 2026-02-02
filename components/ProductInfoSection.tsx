
import React from 'react';

interface ProductInfoSectionProps {
  data?: any;
}

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ data }) => {
  const brandName = data?.hero_brand2 || 'GIOVENTÙ';
  const specsImg = data?.specs_img || 'https://picsum.photos/seed/stickinfo/400/600';
  
  const defaultBenefits = [
    "Sửa giúp da căng bóng, mềm mịn tức thì",
    "Ngăn ngừa lão hóa da, tái tạo và nâng đỡ cấu trúc da",
    "5 loại Ceramide làm trắng da, phục hồi sắc tố melanin",
    "Cải thiện nếp nhăn khóe mắt và vết chân chim quanh mắt",
    "100% thành phần thiên nhiên, hữu cơ",
    "Collagen dạng thỏi tiện lợi, dễ dàng sử dụng",
    "Đa chức năng: Sử dụng dưỡng da mặt - môi - mông",
    "Độ pH = 5.5, dịu nhẹ phù hợp với mọi làn da da nhạy cảm, treatment",
    "Sử dụng ngay cả trên nền makeup, giảm việc khô da, mốc lớp makeup, làm nền đẹp hơn"
  ];

  const benefits = data?.specs_benefits 
    ? data.specs_benefits.split('\n').filter((i: string) => i.trim() !== '')
    : defaultBenefits;

  return (
    <section className="bg-gray-50 rounded-2xl p-8 lg:p-12 overflow-hidden relative">
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Thông tin sản phẩm</p>
        <h3 className="text-2xl font-black text-orange-500 mb-8 uppercase">THỎI COLLAGEN TƯƠI ĐA CHỨC NĂNG {brandName}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Visual Overlay */}
          <div className="lg:col-span-4 relative flex justify-center">
            <div className="bg-orange-400 w-full max-w-[280px] h-[400px] rounded-2xl absolute -bottom-10 -left-6 z-0 opacity-80"></div>
            <img 
              src={specsImg} 
              alt="Collagen stick" 
              className="relative z-10 w-full max-w-[280px] rounded-xl shadow-2xl border-4 border-white object-cover aspect-[2/3]"
            />
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h4 className="text-lg font-bold text-gray-800 border-l-4 border-orange-500 pl-4 mb-4">ƯU ĐIỂM NỔI BẬT:</h4>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                {benefits.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-800 border-l-4 border-orange-500 pl-4 mb-4">HƯỚNG DẪN SỬ DỤNG:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Độ tuổi sử dụng: &gt; 6 tuổi</li>
                <li>• Sau khi sử dụng toner vào buổi sáng. Sau khi rửa mặt vào buổi tối</li>
                <li>• Thoa đều sản phẩm theo chiều đi lên</li>
                <li>• Lưu ý: Thoa nhiều hơn lên vùng có nếp nhăn</li>
              </ul>
            </div>
            
            <div className="pt-8 border-t border-gray-200">
               <h4 className="text-sm font-bold text-gray-800 mb-2">THÀNH PHẦN CÔNG BỐ:</h4>
               <p className="text-[11px] text-gray-400 leading-relaxed italic">
                 Silica Silylate, Octyldodecanol, Caprylic/Capric Triglyceride, Synthetic Wax, Polybutene, Microcrystalline Wax, Methyl Methacrylate, Glycerin, Crosspolymer, Dipropylene Glycol, Fragrance, Alpha-Isomethyl Ionone, Nước tinh khiết, Ethylene/Propylene Copolymer, Ethylhexylglycerin, Caprylyl Glycol, Hydrogenated Lecithin, Polyglyceryl-10 Oleate, Eclipta Prostrata Extract, Benzotriazolyl Dodecyl p-Cresol 0,25, Adenosine, Melia Azadirachta Leaf Extract, Simmondsia Chinensis (Jojoba) Seed Oil, Cetearyl Alcohol, Moringa Oleifera Seed Oil, Stearic Acid, Tocopheryl Acetate, Collagen Extract, Ceramide NP, Ceramide NS, Cholesterol, Phytosphingosine, Ceramide AP, Ceramide AS, Hyaluronic, Ceramide EOP, Linalool, Benzyl Benzoate, Hexyl Cinnamal, Limonene
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfoSection;
