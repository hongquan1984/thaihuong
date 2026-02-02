
import React from 'react';
import { NavLink } from '../types';

const Header: React.FC = () => {
  const links: NavLink[] = [
    { label: 'Giới thiệu', href: '#' },
    { label: 'Sản phẩm', href: '#' },
    { label: 'Đánh giá', href: '#' },
    { label: 'Liên hệ', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex-1 flex justify-start space-x-8">
          {links.slice(0, 2).map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium hover:text-orange-500 transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 mb-1">
            <svg viewBox="0 0 100 100" className="fill-orange-500">
              <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
            </svg>
          </div>
          <span className="font-bold tracking-widest text-lg uppercase">HANMI</span>
        </div>

        <div className="flex-1 flex justify-end space-x-8">
          {links.slice(2).map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium hover:text-orange-500 transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
