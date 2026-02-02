
import React from 'react';

interface Testimonial {
  avatar: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialsProps {
  data?: any;
}

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  const reviews: Testimonial[] = data?.testimonials ? JSON.parse(data.testimonials) : [
    {
      avatar: 'https://i.pravatar.cc/150?u=hair1',
      name: 'Nguyễn Bích Liên',
      role: 'Chủ tiệm Hair Salon',
      content: 'Mình đã dùng thử rất nhiều dòng dầu gội Ý, nhưng Thái Hương thực sự khác biệt. Tóc khách hàng sau khi xả rất tơi, mềm và có mùi thơm cực kỳ quý tộc.',
      rating: 5
    },
    {
      avatar: 'https://i.pravatar.cc/150?u=hair2',
      name: 'Lê Hoàng Minh',
      role: 'Nhà tạo mẫu tóc',
      content: 'Bộ collagen phục hồi của Thái Hương cứu được những mái tóc xơ xác nhất. Keratin thấm sâu, giúp tóc chắc khỏe từ lõi chứ không phải chỉ bóng mượt bên ngoài.',
      rating: 5
    },
    {
      avatar: 'https://i.pravatar.cc/150?u=hair3',
      name: 'Phạm Thu Hương',
      role: 'Khách hàng cá nhân',
      content: 'Trước đây tóc mình rụng và khô lắm, dùng bộ đôi gội xả này được 1 tháng thấy tóc con mọc nhiều hẳn, vuốt tóc mượt như đi hấp ở tiệm về.',
      rating: 5
    }
  ];

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 bg-[#fef9f5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs font-black text-orange-500 uppercase tracking-[0.3em] mb-3">Phản hồi khách hàng</p>
          <h3 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">Khách hàng nói về chúng tôi</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[45px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] border border-orange-50 relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute -top-6 left-10">
                 <div className="flex gap-1">
                   {[...Array(item.rating)].map((_, i) => (
                     <span key={i} className="text-orange-500 text-xl">★</span>
                   ))}
                 </div>
              </div>

              <div className="mb-8">
                <svg className="w-10 h-10 text-orange-100 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56929 13 4.017 13H2.017V21H5.017Z" />
                </svg>
                <p className="text-gray-500 italic leading-relaxed text-sm font-medium">"{item.content}"</p>
              </div>

              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-2xl object-cover shadow-lg" />
                <div>
                  <h5 className="font-black text-gray-900 text-sm uppercase tracking-tight">{item.name}</h5>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
