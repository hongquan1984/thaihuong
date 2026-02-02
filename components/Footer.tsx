
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-10 h-10 mb-2">
            <svg viewBox="0 0 100 100" className="fill-orange-400">
              <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
            </svg>
          </div>
          <span className="font-bold tracking-widest text-xl uppercase text-gray-800">HANMI</span>
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
          © 2024 HANMI VIETNAM. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
