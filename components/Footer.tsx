
import React from 'react';

const Footer: React.FC = () => {
  const logoUrl = 'https://down-bs-vn.img.susercontent.com/vn-11134216-820l4-mf3qz730cj6565_tn.webp';

  return (
    <footer className="bg-white py-24 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 mb-6 overflow-hidden rounded-2xl shadow-xl shadow-orange-100">
            <img 
              src={logoUrl} 
              alt="Thái Hương Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-black tracking-[0.5em] text-2xl uppercase text-gray-900">THÁI HƯƠNG</span>
          <p className="text-gray-400 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
            Hơn cả một thương hiệu chăm sóc tóc, Thái Hương là người bạn đồng hành trong hành trình đánh thức vẻ đẹp rạng rỡ của phái đẹp từ tinh hoa thiên nhiên Italia.
          </p>
        </div>
        
        <div className="flex justify-center space-x-12 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-12">
          <a href="#" className="hover:text-orange-500 transition-colors">Điều khoản</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Bảo mật</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Đại lý</a>
        </div>
        
        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-gray-300 text-[9px] uppercase tracking-[0.4em]">
            © 2024 THÁI HƯƠNG VIETNAM. MILANO SOUL.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all cursor-pointer">
               <span className="text-xs font-black">Fb</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all cursor-pointer">
               <span className="text-xs font-black">Ig</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all cursor-pointer">
               <span className="text-xs font-black">Tt</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
