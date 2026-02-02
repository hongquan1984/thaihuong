
import React from 'react';
import { NavLink } from '../types';

const Header: React.FC = () => {
  const links: NavLink[] = [
    { label: 'Giới thiệu', href: '#' },
    { label: 'Sản phẩm', href: '#' },
    { label: 'Đánh giá', href: '#' },
    { label: 'Liên hệ', href: '#' },
  ];

  const logoUrl = 'https://down-bs-vn.img.susercontent.com/vn-11134216-820l4-mf3qz730cj6565_tn.webp';

  return (
    <header className="sticky top-0 z-50 bg-[#fbf1e9]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex-1 flex justify-start space-x-10">
          {links.slice(0, 2).map((link) => (
            <a key={link.label} href={link.href} className="text-[13px] font-bold uppercase tracking-widest text-gray-600 hover:text-orange-500 transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-lg">
            <img 
              src={logoUrl} 
              alt="Thái Hương Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-black tracking-[0.3em] text-xl uppercase text-gray-800">THÁI HƯƠNG</span>
        </div>

        <div className="flex-1 flex justify-end space-x-10">
          {links.slice(2).map((link) => (
            <a key={link.label} href={link.href} className="text-[13px] font-bold uppercase tracking-widest text-gray-600 hover:text-orange-500 transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
