
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductMain from './components/ProductMain';
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
  const [errorMessage, setErrorMessage] = useState('');

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
    setErrorMessage('');
    try {
      const { data, error } = await supabase.from('site_content').select('key').limit(1);
      
      if (error) {
        if (error.code === '42P01') {
          setConnectionStatus('error');
          setErrorMessage('Kết nối API OK, nhưng bảng "site_content" chưa được tạo. Hãy chạy lệnh SQL bên dưới!');
        } else {
          setConnectionStatus('error');
          setErrorMessage(`Lỗi: ${error.message} (Mã: ${error.code})`);
        }
      } else {
        setConnectionStatus('success');
      }
    } catch (err: any) {
      setConnectionStatus('error');
      setErrorMessage('Không thể kết nối tới Supabase. Kiểm tra URL và Key trong lib/supabase.ts');
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
      'hero_title', 'hero_brand', 'hero_brand2', 'hero_price', 'hero_old_price', 
      'hero_img1', 'hero_img2', 'prod_name', 'specs_img', 'specs_benefits', 'footer_info', 'footer_contact'
    ];
    
    const defaultValues: any = {
      hero_title: 'BẢO VỆ DA - NGĂN LÃO HÓA',
      hero_brand: 'WIICARE',
      hero_brand2: 'GIOVENTÙ',
      hero_price: '899.000đ',
      hero_old_price: '1.070.000đ',
      hero_img1: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
      hero_img2: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      prod_name: 'BỘ ĐÔI BẢO VỆ DA - NGĂN LÃO HÓA',
      specs_img: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=600',
      specs_benefits: 'Sửa giúp da căng bóng, mềm mịn tức thì\nNgăn ngừa lão hóa da\nCeramide làm trắng da',
      footer_info: 'Vẻ đẹp bền vững bắt nguồn từ sự thấu hiểu.',
      footer_contact: 'Hotline: 090.xxx.xxxx | Địa chỉ: Hà Nội'
    };

    let sql = `-- HƯỚNG DẪN QUAN TRỌNG: Hãy copy và chạy đoạn này để cấp quyền LƯU dữ liệu\n\n`;
    sql += `-- 1. Tạo bảng\n`;
    sql += `CREATE TABLE IF NOT EXISTS site_content (key TEXT PRIMARY KEY, value TEXT);\n\n`;
    sql += `-- 2. Bật bảo mật bảng\n`;
    sql += `ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;\n\n`;
    sql += `-- 3. Xóa các chính sách cũ nếu có để tránh xung đột\n`;
    sql += `DROP POLICY IF EXISTS "Allow Public Access" ON site_content;\n`;
    sql += `DROP POLICY IF EXISTS "Allow Public Read" ON site_content;\n\n`;
    sql += `-- 4. Tạo chính sách cho phép ĐỌC và GHI dữ liệu (RẤT QUAN TRỌNG ĐỂ LƯU ĐƯỢC)\n`;
    sql += `CREATE POLICY "Allow Public Access" ON site_content FOR ALL USING (true) WITH CHECK (true);\n\n`;
    sql += `-- 5. Chèn/Cập nhật dữ liệu mặc định\n`;
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
          <ProductMain data={content} />
          <RelatedProducts />
          <ProductInfoSection data={content} />
        </div>
      </main>
      
      {/* Footer SQL Tool */}
      <div className="bg-gray-950 text-white py-16 border-t-8 border-orange-600">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <h3 className="text-3xl font-black text-white mb-2 italic">SUPABASE SQL SETUP</h3>
              <p className="text-gray-400 text-sm">Hãy chạy mã SQL này để kích hoạt quyền LƯU (Write) dữ liệu.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={checkConnection}
                disabled={connectionStatus === 'checking'}
                className={`px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2 ${
                  connectionStatus === 'success' ? 'bg-green-500 text-white' : 
                  connectionStatus === 'error' ? 'bg-red-500 text-white' : 
                  'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {connectionStatus === 'checking' ? 'Đang kiểm tra...' : 'Kiểm tra kết nối'}
                {connectionStatus === 'success' && ' ✓'}
                {connectionStatus === 'error' && ' ✕'}
              </button>
              <button 
                onClick={() => setShowSqlPreview(!showSqlPreview)}
                className="bg-white text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all shadow-xl"
              >
                {showSqlPreview ? 'ĐÓNG BẢNG SQL' : 'MỞ HƯỚNG DẪN SETUP'}
              </button>
            </div>
          </div>

          {connectionStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-bold flex items-center gap-3 animate-in fade-in zoom-in duration-300">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Kết nối OK! Nếu vẫn không lưu được, hãy copy mã SQL bên dưới và chạy lại trong SQL Editor.
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-bold animate-in fade-in zoom-in duration-300">
              {errorMessage}
            </div>
          )}
          
          {showSqlPreview && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <div className="text-orange-500 font-black text-xl mb-4">BƯỚC 1</div>
                  <p className="text-sm text-gray-300">Vào <b>SQL Editor</b> trên Supabase.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <div className="text-orange-500 font-black text-xl mb-4">BƯỚC 2</div>
                  <p className="text-sm text-gray-300">Nhấn <b>New Query</b>, dán mã bên cạnh vào.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <div className="text-orange-500 font-black text-xl mb-4">BƯỚC 3</div>
                  <p className="text-sm text-gray-300">Nhấn <b>RUN</b> để hoàn tất cấp quyền GHI.</p>
                </div>
              </div>
              
              <div className="lg:col-span-2 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-black rounded-2xl overflow-hidden border border-white/10">
                  <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">PostgreSQL Script (Full Access)</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(generateSqlScript());
                        alert("Đã copy SQL script thành công!");
                      }}
                      className="text-[10px] font-bold text-orange-400 hover:text-white transition-colors"
                    >
                      COPY TO CLIPBOARD
                    </button>
                  </div>
                  <pre className="p-8 text-[12px] font-mono text-orange-200/80 overflow-auto h-[400px] scrollbar-hide select-all">
                    {generateSqlScript()}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      
      <button 
        onClick={() => setIsAdminMode(true)}
        className="fixed bottom-4 left-4 opacity-5 hover:opacity-100 bg-black text-white text-[8px] px-2 py-1 rounded transition-all z-[100]"
      >
        DASHBOARD
      </button>
    </div>
  );
};

export default App;
