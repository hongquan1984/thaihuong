
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureSlider from './components/FeatureSlider';
import RelatedProducts from './components/RelatedProducts';
import ProductInfoSection from './components/ProductInfoSection';
import Footer from './components/Footer';
import AdminDashboard from './components/Admin/AdminDashboard';
import Login from './components/Admin/Login';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('hanmi_auth') === 'true';
  });
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showSqlPreview, setShowSqlPreview] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminMode(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);

    const fetchContent = async () => {
      try {
        const { data, error } = await supabase.from('site_content').select('*');
        if (data && data.length > 0) {
          const contentMap = data.reduce((acc: any, item: any) => {
            acc[item.key] = item.value;
            return acc;
          }, {});
          setContent(contentMap);
        }
      } catch (err) {
        console.error("Failed to fetch content", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    try {
      const { data, error } = await supabase.from('site_content').select('key').limit(1);
      if (error) {
        setConnectionStatus('error');
      } else {
        setConnectionStatus('success');
      }
    } catch (err: any) {
      setConnectionStatus('error');
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('hanmi_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminMode(false);
    sessionStorage.removeItem('hanmi_auth');
    window.location.hash = '';
  };

  const generateSqlScript = () => {
    const keys = [
      'hero_title', 'hero_title_size', 'hero_brand', 'hero_brand_size', 'hero_brand2', 'hero_brand2_size', 'hero_desc',
      'hero_price', 'hero_old_price', 'hero_img1', 'hero_video', 'prod_name', 'specs_img', 'specs_benefits', 'footer_info', 'footer_contact', 'home_slides'
    ];
    
    const defaultValues: any = {
      hero_title: 'BẢO VỆ DA - NGĂN LÃO HÓA NHÉ CẢ NHÀ',
      hero_title_size: '12px',
      hero_brand: 'THÁI HƯƠNG COSMETIC',
      hero_brand_size: '4.5rem',
      hero_brand2: 'COLAGEN SHAMPOO',
      hero_brand2_size: '3.5rem',
      hero_desc: 'Giải pháp toàn diện giúp bảo vệ làn da khỏi tác hại của tia UV đồng thời cấp ẩm và ngăn ngừa lão hóa chuyên sâu từ Collagen tươi hữu cơ.',
      hero_price: '899.000đ',
      hero_old_price: '1.070.000đ',
      hero_img1: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
      hero_video: 'https://player.vimeo.com/external/494252666.sd.mp4?s=72312154670233e466d79a29e7f539951684c30c&profile_id=164&oauth2_token_id=57447761',
      prod_name: 'BỘ ĐÔI BẢO VỆ DA - NGĂN LÃO HÓA',
      specs_img: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=600',
      specs_benefits: 'Sửa giúp da căng bóng, mềm mịn tức thì\nNgăn ngừa lão hóa da\nCeramide làm trắng da',
      footer_info: 'Vẻ đẹp bền vững bắt nguồn từ sự thấu hiểu.',
      footer_contact: 'Hotline: 090.xxx.xxxx | Địa chỉ: Hà Nội',
      home_slides: '[]'
    };

    let sql = `-- SQL Script for Supabase\n`;
    sql += `CREATE TABLE IF NOT EXISTS site_content (key TEXT PRIMARY KEY, value TEXT);\n`;
    sql += `ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;\n`;
    sql += `CREATE POLICY "Allow Public Access" ON site_content FOR ALL USING (true) WITH CHECK (true);\n\n`;
    sql += `INSERT INTO site_content (key, value) VALUES\n`;
    
    const valuesSql = keys.map(key => {
      const val = content?.[key] || defaultValues[key] || '';
      return `('${key}', '${val.replace(/'/g, "''")}')`;
    }).join(',\n');
    
    sql += valuesSql + `\nON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;`;
    return sql;
  };

  if (isAdminMode) {
    if (!isAuthenticated) {
      return <Login onLogin={handleLogin} onCancel={() => setIsAdminMode(false)} />;
    }
    return <AdminDashboard onExit={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>
        <Hero data={content} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
          <FeatureSlider data={content} />
          <RelatedProducts />
          <ProductInfoSection data={content} />
        </div>
      </main>
      <Footer />
      <button onClick={() => setIsAdminMode(true)} className="fixed bottom-4 left-4 opacity-5 hover:opacity-100 bg-black text-white text-[8px] px-2 py-1 rounded transition-all z-[100]">DASHBOARD</button>
    </div>
  );
};

export default App;
