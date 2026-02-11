
import React from 'react';

interface FooterProps {
  data?: any;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const logoUrl = data?.company_logo || 'https://down-bs-vn.img.susercontent.com/vn-11134216-820l4-mf3qz730cj6565_tn.webp';
  const name = data?.company_name || 'THÁI HƯƠNG';
  const address = data?.company_address || 'Hơn cả một thương hiệu mỹ phẩm, Thái Hương là người bạn đồng hành trong hành trình đánh thức vẻ đẹp rạng rỡ của phái đẹp từ tinh hoa thiên nhiên.';

  return (
    <footer className="bg-white py-12 md:py-24 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center mb-10 md:mb-12">
          <div className="w-14 h-14 md:w-16 md:h-16 mb-6 overflow-hidden rounded-2xl shadow-xl shadow-orange-100">
            <img 
              src={logoUrl} 
              alt="Thái Hương Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-black tracking-[0.5em] text-xl md:text-2xl uppercase text-gray-900">{name}</span>
          <p className="text-gray-400 text-xs md:text-sm mt-4 max-w-lg mx-auto leading-relaxed">
            {address}
          </p>
          {data?.company_email && (
            <p className="text-[#e91e63] text-[10px] font-bold uppercase mt-4 tracking-widest">
              Email: {data.company_email}
            </p>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-10 md:mb-12">
          <a href="#" className="hover:text-[#e91e63] transition-colors">Điều khoản dịch vụ</a>
          <a href="#" className="hover:text-[#e91e63] transition-colors">Chính sách bảo mật</a>
          <a href="#" className="hover:text-[#e91e63] transition-colors">Hệ thống đại lý</a>
        </div>
        
        <div className="pt-10 md:pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-gray-300 text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-center md:text-left">
            © 2024 {name} VIỆT NAM. VẺ ĐẸP TỰ NHIÊN.
          </p>
          <div className="flex gap-4">
            {data?.company_facebook && (
              <a href={data.company_facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#e91e63] hover:text-white transition-all cursor-pointer">
                <span className="text-xs font-black">Fb</span>
              </a>
            )}
            {data?.company_zalo && (
              <a href={data.company_zalo} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#e91e63] hover:text-white transition-all cursor-pointer">
                <span className="text-xs font-black">Zl</span>
              </a>
            )}
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#e91e63] hover:text-white transition-all cursor-pointer">
               <span className="text-xs font-black">Tt</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
