
import React from 'react';

interface ProductInfoSectionProps {
  data?: any;
}

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ data }) => {
  const brandName = data?.hero_brand2 || 'ITALY HAIR RECOVERY';
  const specsImg = data?.specs_img || 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400';
  
  const defaultBenefits = [
    "Công nghệ Keratin thủy phân giúp tái tạo biểu bì tóc ngay lập tức",
    "Chiết xuất tinh dầu Argan và Silk Protein từ vùng Tuscany, Italia",
    "Phục hồi tóc hư tổn nặng do uốn, nhuộm, tẩy nhiều lần",
    "Khóa màu tóc nhuộm, giữ cho màu bền và rực rỡ hơn",
    "Dưỡng ẩm sâu, loại bỏ tình trạng tóc chẻ ngọn và khô xơ",
    "Tạo màng bảo vệ tóc khỏi tia UV và nhiệt độ từ máy sấy",
    "Hương thơm nước hoa Ý sang trọng, lưu hương lên đến 48 giờ",
    "Độ pH trung tính, an toàn tuyệt đối cho da đầu nhạy cảm",
    "Kết cấu kem mịn, không gây bết dính hay nặng tóc"
  ];

  const benefits = data?.specs_benefits 
    ? data.specs_benefits.split('\n').filter((i: string) => i.trim() !== '')
    : defaultBenefits;

  return (
    <section className="bg-gray-50 rounded-2xl p-8 lg:p-12 overflow-hidden relative">
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Chi tiết sản phẩm</p>
        <h3 className="text-2xl font-black text-orange-500 mb-8 uppercase">BỘ SẢN PHẨM PHỤC HỒI CAO CẤP {brandName}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 relative flex justify-center">
            <div className="bg-orange-400 w-full max-w-[280px] h-[400px] rounded-2xl absolute -bottom-10 -left-6 z-0 opacity-80"></div>
            <img 
              src={specsImg} 
              alt="Hair product details" 
              className="relative z-10 w-full max-w-[280px] rounded-xl shadow-2xl border-4 border-white object-cover aspect-[2/3]"
            />
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div>
              <h4 className="text-lg font-bold text-gray-800 border-l-4 border-orange-500 pl-4 mb-4">LỢI ÍCH VƯỢT TRỘI:</h4>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                {benefits.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-800 border-l-4 border-orange-500 pl-4 mb-4">QUY TRÌNH CHUẨN SALON Ý:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• BƯỚC 1: Làm sạch tóc với dầu gội Collagen Thái Hương</li>
                <li>• BƯỚC 2: Thoa dầu xả Keratin, massage nhẹ nhàng trong 3-5 phút</li>
                <li>• BƯỚC 3: Xả sạch và thấm khô bằng khăn bông</li>
                <li>• BƯỚC 4: Thoa 2 giọt tinh dầu Silk Oil lên ngọn tóc để hoàn thiện độ bóng</li>
              </ul>
            </div>
            
            <div className="pt-8 border-t border-gray-200">
               <h4 className="text-sm font-bold text-gray-800 mb-2">NGUỒN GỐC & XUẤT XỨ:</h4>
               <p className="text-[11px] text-gray-400 leading-relaxed italic uppercase tracking-widest">
                 MANUFACTURED IN MILAN, ITALY | FORMULATED BY THÁI HƯƠNG BIOTECH | EXCLUSIVE DISTRIBUTION BY THÁI HƯƠNG VIETNAM
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfoSection;
