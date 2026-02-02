
import React, { useState } from 'react';

const PartnerForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Logic gửi dữ liệu có thể tích hợp với Supabase sau này
  };

  if (submitted) {
    return (
      <section className="py-12 md:py-20 bg-[#fff5f7] rounded-[40px] md:rounded-[60px] mx-4 md:mx-0 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="font-script text-5xl text-gray-900 mb-4 lowercase">Cảm ơn bạn đã quan tâm</h3>
          <p className="text-gray-500 font-medium">Chúng tôi đã nhận được thông tin đăng ký đối tác. Đội ngũ Thái Hương sẽ liên hệ với bạn trong vòng 24 giờ tới.</p>
          <button onClick={() => setSubmitted(false)} className="mt-8 text-[#e91e63] font-black text-xs uppercase tracking-widest border-b-2 border-[#e91e63] pb-1">Gửi yêu cầu mới</button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-[#fff5f7] rounded-[40px] md:rounded-[60px] mx-4 md:mx-0 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/50 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <span className="text-[#e91e63] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] block">Cơ hội kinh doanh</span>
              <h2 className="font-script text-5xl md:text-7xl text-gray-900 leading-tight lowercase">Hợp tác cùng <br/> Thái Hương</h2>
              <div className="w-20 h-1.5 bg-[#e91e63] rounded-full"></div>
            </div>
            
            <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed">
              Trở thành đại lý chính thức để nhận mức chiết khấu hấp dẫn, hỗ trợ đào tạo marketing chuyên nghiệp và cùng chúng tôi lan tỏa giá trị vẻ đẹp tự nhiên đến hàng triệu phụ nữ Việt.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#e91e63]">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                 </div>
                 <span className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Sản phẩm độc quyền</span>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#e91e63]">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                 </div>
                 <span className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Chiết khấu cực cao</span>
               </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-[35px] md:rounded-[45px] shadow-2xl shadow-pink-200/20 border border-white">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Họ và tên</label>
                  <input required type="text" className="w-full px-5 py-3 md:py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#e91e63] transition-all text-sm font-medium" placeholder="Nguyễn Văn A" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Số điện thoại</label>
                  <input required type="tel" className="w-full px-5 py-3 md:py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#e91e63] transition-all text-sm font-medium" placeholder="0901 234 567" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Email</label>
                <input required type="email" className="w-full px-5 py-3 md:py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#e91e63] transition-all text-sm font-medium" placeholder="email@vi-du.com" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Khu vực dự định kinh doanh</label>
                <select className="w-full px-5 py-3 md:py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#e91e63] transition-all text-sm font-medium appearance-none cursor-pointer">
                  <option>Toàn quốc</option>
                  <option>Miền Bắc</option>
                  <option>Miền Trung</option>
                  <option>Miền Nam</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Lời nhắn cho chúng tôi</label>
                <textarea className="w-full px-5 py-3 md:py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#e91e63] transition-all text-sm font-medium h-24 md:h-32 resize-none" placeholder="Tôi muốn tìm hiểu chính sách đại lý..."></textarea>
              </div>

              <button type="submit" className="w-full bg-[#e91e63] hover:bg-black text-white py-4 md:py-5 rounded-2xl md:rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all duration-300 shadow-xl shadow-pink-100 active:scale-95">
                Gửi đăng ký đối tác
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerForm;
