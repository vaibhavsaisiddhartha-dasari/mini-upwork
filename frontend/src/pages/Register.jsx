import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'FREELANCER' });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])/;
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      setError('Password must contain at least one uppercase, lowercase, number, and special character (@#$%^&+=!)');
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password, formData.role);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="ui-card p-8 sm:p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Join MiniUpwork</h2>
          <p className="text-gray-500 font-medium">Empowering your freelance journey</p>
        </div>

        {error && <div className="text-rose-600 text-sm font-medium text-center mb-6 p-3 bg-rose-50 border border-rose-200 rounded-lg">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 transition-colors group-focus-within:text-green-600">Username</label>
            <input className="input-premium" required placeholder="Choose a username"
              onChange={(e) => setFormData({...formData, username: e.target.value})} />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 transition-colors group-focus-within:text-green-600">Email Address</label>
            <input className="input-premium" type="email" required placeholder="you@domain.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 transition-colors group-focus-within:text-green-600">Password</label>
            <input className="input-premium" type="password" required placeholder="Min. 8 characters"
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          
          <div className="mt-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Account Type</label>
            <div className="flex gap-4">
              <label className="flex-1 relative cursor-pointer group">
                <input type="radio" name="role" value="FREELANCER" className="peer sr-only" defaultChecked
                  onChange={(e) => setFormData({...formData, role: e.target.value})} />
                <div className="p-3 rounded-lg border border-gray-200 text-center font-medium text-gray-500 peer-checked:border-green-600 peer-checked:bg-green-50 peer-checked:text-green-700 hover:bg-gray-50 transition-all">
                  Find Work
                </div>
                <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-green-600 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </label>
              <label className="flex-1 relative cursor-pointer group">
                <input type="radio" name="role" value="CLIENT" className="peer sr-only"
                  onChange={(e) => setFormData({...formData, role: e.target.value})} />
                <div className="p-3 rounded-lg border border-gray-200 text-center font-medium text-gray-500 peer-checked:border-green-600 peer-checked:bg-green-50 peer-checked:text-green-700 hover:bg-gray-50 transition-all">
                  Hire Talent
                </div>
                <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-green-600 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </label>
            </div>
          </div>
          
          <button className="btn-primary w-full mt-4">Create Account</button>
        </form>
        
        <p className="text-center mt-6 text-gray-500 font-medium text-sm">
          Already have an account? <Link to="/login" className="text-green-600 font-semibold hover:text-green-700 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
