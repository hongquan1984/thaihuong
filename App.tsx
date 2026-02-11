
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureSlider from './components/FeatureSlider';
import ImageGallery from './components/ImageGallery';
import Testimonials from './components/Testimonials';
import ProductInfoSection from './components/ProductInfoSection';
import PartnerForm from './components/PartnerForm';
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
      <Header data={content} />
      <main>
        <Hero data={content} />
        <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 py-4 md:py-12 space-y-12 md:space-y-24">
          <FeatureSlider data={content} />
          <ImageGallery data={content} />
          <Testimonials data={content} />
          <ProductInfoSection data={content} />
          <PartnerForm />
        </div>
      </main>
      <Footer data={content} />
      <button onClick={() => setIsAdminMode(true)} className="fixed bottom-4 left-4 opacity-5 hover:opacity-100 bg-black text-white text-[8px] px-2 py-1 rounded transition-all z-[100]">DASHBOARD</button>
    </div>
  );
};

export default App;
