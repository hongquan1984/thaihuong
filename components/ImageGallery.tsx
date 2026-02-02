
import React, { useState, useEffect, useRef } from 'react';

interface ImageGalleryProps {
  data?: any;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ data }) => {
  const images: string[] = data?.gallery_images ? JSON.parse(data.gallery_images) : [
    'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400'
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationId: number;
    const scrollSpeed = 0.5;

    const autoScroll = () => {
      if (scrollRef.current && !isHovered) {
        scrollRef.current.scrollLeft += scrollSpeed;
        
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  if (images.length === 0) return null;

  return (
    <section className="py-20 animate-in fade-in duration-1000 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="relative inline-block mb-12">
           <h3 className="font-script text-6xl text-[#e91e63] lowercase">Hình ảnh sản phẩm</h3>
           <div className="w-1/2 h-1 bg-[#e91e63] mx-auto mt-2 rounded-full opacity-30"></div>
        </div>

        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto scrollbar-hide py-10 px-4"
        >
          {[...images, ...images].map((img, idx) => (
            <div key={idx} className="min-w-[280px] md:min-w-[350px] aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-105">
               <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default ImageGallery;
