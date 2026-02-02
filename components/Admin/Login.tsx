
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const logoUrl = 'https://down-bs-vn.img.susercontent.com/vn-11134216-820l4-mf3qz730cj6565_tn.webp';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Cập nhật thông tin đăng nhập theo yêu cầu
    if (username === 'hongquan0508@gmail.com' && password === '123456789') {
      onLogin();
    } else {
      setError('Email hoặc mật khẩu không chính xác');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf2e9] px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100 overflow-hidden p-1">
              <img 
                src={logoUrl} 
                alt="Thái Hương Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tighter">Quản trị Thái Hương</h2>
          <p className="text-gray-500 text-sm mt-1">Sử dụng tài khoản hongquan0508@gmail.com</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Email đăng nhập</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
              placeholder="hongquan0508@gmail.com"
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

          {error && <p className="text-red-500 text-xs font-medium text-center bg-red-50 py-2 rounded-lg">{error}</p>}

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
            >
              Đăng nhập hệ thống
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
