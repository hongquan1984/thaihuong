
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Using the provided credentials
    if (username === 'thaihuong' && password === 's$5MpWT9k9E?Z/@') {
      onLogin();
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf2e9] px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-200">
              <svg viewBox="0 0 100 100" className="w-8 h-8 fill-white">
                <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">HANMI ADMIN</h2>
          <p className="text-gray-500 text-sm mt-1">Đăng nhập để quản lý nội dung</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Tên đăng nhập</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
              placeholder="thaihuong"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Mật khẩu</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
            >
              Quay lại trang chủ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
