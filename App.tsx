
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductMain from './components/ProductMain';
import RelatedProducts from './components/RelatedProducts';
import ProductInfoSection from './components/ProductInfoSection';
import Footer from './components/Footer';
import AdminDashboard from './components/Admin/AdminDashboard';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for admin route
    if (window.location.hash === '#admin') {
      setIsAdmin(true);
    }

    const fetchContent = async () => {
      const { data, error } = await supabase.from('site_content').select('*');
      if (data) {
        const contentMap = data.reduce((acc: any, item: any) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
        setContent(contentMap);
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (isAdmin) {
    return <AdminDashboard onExit={() => setIsAdmin(false)} />;
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
        onClick={() => setIsAdmin(true)}
        className="fixed bottom-4 right-4 opacity-0 hover:opacity-100 bg-gray-800 text-white p-2 rounded text-xs"
      >
        Admin Mode
      </button>
    </div>
  );
};

export default App;
