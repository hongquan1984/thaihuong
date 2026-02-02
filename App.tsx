
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

  useEffect(() => {
    // Detect #admin in URL
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
        if (data) {
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
      <Footer />
      {/* Hidden trigger for admin demo */}
      <button 
        onClick={() => setIsAdminMode(true)}
        className="fixed bottom-4 right-4 opacity-0 hover:opacity-100 bg-gray-800/20 text-gray-800 p-2 rounded text-[10px] transition-opacity"
      >
        Quản trị
      </button>
    </div>
  );
};

export default App;
