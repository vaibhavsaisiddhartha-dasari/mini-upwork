import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="ui-card p-8 sm:p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 font-medium">Please sign in to continue</p>
        </div>
        
        {error && <div className="text-rose-600 text-sm font-medium text-center mb-6 p-3 bg-rose-50 border border-rose-200 rounded-lg">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 transition-colors group-focus-within:text-green-600">Username</label>
            <input className="input-premium" type="text" required placeholder="Enter your username"
              onChange={(e) => setFormData({...formData, username: e.target.value})} />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 transition-colors group-focus-within:text-green-600">Password</label>
            <input className="input-premium" type="password" required placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          <button className="btn-primary w-full mt-4">Sign In</button>
        </form>
        
        <p className="text-center mt-6 text-gray-500 font-medium text-sm">
          New here? <Link to="/register" className="text-green-600 font-semibold hover:text-green-700 transition-colors">Create an account</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
