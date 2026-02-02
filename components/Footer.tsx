
import React from 'react';

const Footer: React.FC = () => {
  const logoUrl = 'https://down-bs-vn.img.susercontent.com/vn-11134216-820l4-mf3qz730cj6565_tn.webp';

  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 mb-3 overflow-hidden rounded-xl shadow-sm">
            <img 
              src={logoUrl} 
              alt="Thái Hương Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold tracking-widest text-xl uppercase text-gray-800">THÁI HƯƠNG</span>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
            Vẻ đẹp bền vững bắt nguồn từ sự thấu hiểu và chăm sóc làn da đúng cách từ thiên nhiên.
          </p>
        </div>
        
        <div className="flex justify-center space-x-6 text-sm font-medium text-gray-500 mb-8">
          <a href="#" className="hover:text-orange-500 transition-colors">Điều khoản dịch vụ</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Chính sách bảo mật</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Liên hệ đại lý</a>
        </div>
        
        <p className="text-gray-400 text-[10px] uppercase tracking-widest">
          © 2024 THÁI HƯƠNG VIETNAM. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
