
import React from 'react';

const Header: React.FC = () => {
  const logoUrl = 'https://down-bs-vn.img.susercontent.com/vn-11134216-820l4-mf3qz730cj6565_tn.webp';

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-[#fff5f7] border-b border-gray-100 py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-bold text-[#e91e63] uppercase tracking-wider">
          <div>Offer Season Upto 30% Off</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">Checkout</a>
            <a href="#" className="hover:text-black transition-colors">Wishlist</a>
            <a href="#" className="hover:text-black transition-colors">My Account</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Contact info */}
          <div className="flex items-center gap-3 text-[#e91e63]">
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-gray-400 leading-none mb-1">Call us for help</span>
              <span className="text-sm font-black tracking-tighter">+84 123 456 789</span>
            </div>
          </div>

          {/* Centered Logo */}
          <div className="flex flex-col items-center">
            <div className="h-16 flex items-center justify-center mb-1">
               <img src={logoUrl} alt="Logo" className="h-full object-contain" />
            </div>
            <div className="text-center">
               <h1 className="text-2xl font-black italic tracking-tighter text-gray-900 leading-none">THÁI HƯƠNG</h1>
               <p className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-400 mt-1">Beauty & Cosmetics</p>
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="flex items-center gap-3 text-[#e91e63]">
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold uppercase text-gray-400 leading-none mb-1">Shopping Cart</span>
              <span className="text-sm font-black tracking-tighter">0.00đ - 0 item</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#e91e63] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-center py-4 space-x-12">
          {['Home', 'Shop', 'Deals', 'About', 'Blogs', 'Contact us'].map((item) => (
            <a key={item} href="#" className="text-white text-[12px] font-bold uppercase tracking-widest hover:text-pink-200 transition-colors">
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
