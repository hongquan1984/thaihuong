
import React, { useEffect, useRef } from 'react';

interface HeroProps {
  data?: any;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const content = {
    scriptTitle: 'Reflect Your Beauty',
    description: data?.hero_desc || 'Lorem ipsum has become the industry standard for design mockups and prototypes. Thái Hương mang đến vẻ đẹp chuẩn Ý từ những nguyên liệu tinh túy nhất.',
    videoUrl: data?.hero_video || 'https://player.vimeo.com/external/494252666.sd.mp4?s=72312154670233e466d79a29e7f539951684c30c&profile_id=164&oauth2_token_id=57447761',
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [content.videoUrl]);

  return (
    <section className="relative w-full bg-white overflow-hidden py-20 px-6">
      {/* Decorative background sketches (Simulated with CSS) */}
      <div className="absolute top-10 left-10 w-40 h-40 opacity-[0.05] pointer-events-none rotate-[-15deg]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-gray-900"><path strokeWidth={0.5} d="M12 2l2 4 4 2-4 2-2 4-2-4-4-2 4-2zM4 20l2-2 2 2-2 2zm16-4l2-2 2 2-2 2z" /></svg>
      </div>
      <div className="absolute bottom-10 left-1/4 w-32 h-32 opacity-[0.05] pointer-events-none rotate-[20deg]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-gray-900"><path strokeWidth={0.5} d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 15a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM15 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM15 15a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" /></svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col items-start space-y-6 lg:pr-10 relative z-10">
          <div className="relative">
             {/* Pink brush stroke effect behind title */}
             <div className="absolute -top-4 -left-6 w-72 h-32 bg-pink-100/50 rounded-full blur-2xl -z-10 rotate-[-5deg]"></div>
             <h2 className="font-script text-[clamp(3.5rem,8vw,6rem)] text-[#e91e63] leading-none mb-4">
               {content.scriptTitle}
             </h2>
          </div>
          
          <p className="text-gray-500 text-lg leading-relaxed max-w-md font-medium">
            {content.description}
          </p>

          <button className="bg-[#e91e63] text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-black hover:shadow-2xl active:scale-95 shadow-lg shadow-pink-200">
            SHOP NOW
          </button>
        </div>

        {/* Right Media (Video) */}
        <div className="relative">
          <div className="relative z-10 w-full aspect-[4/3] lg:aspect-[5/4] rounded-[20px] overflow-hidden shadow-2xl border-4 border-white bg-gray-50">
            <video 
              ref={videoRef}
              autoPlay 
              muted 
              loop 
              playsInline
              key={content.videoUrl}
              className="w-full h-full object-cover"
            >
              <source src={content.videoUrl} type="video/mp4" />
            </video>
            
            {/* Visual Leaf overlay simulation if desired, or keep it clean for video */}
            <div className="absolute bottom-0 right-0 w-1/3 h-1/2 pointer-events-none opacity-40">
               {/* Simplified leaf shape */}
               <svg viewBox="0 0 100 100" fill="#004d40" className="w-full h-full transform rotate-[45deg] translate-y-1/4 translate-x-1/4">
                 <path d="M50 0 C70 30 100 50 50 100 C0 50 30 30 50 0" />
               </svg>
            </div>
          </div>
          
          {/* Subtle glow behind media */}
          <div className="absolute inset-0 bg-[#e91e63]/5 blur-[100px] rounded-full -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
