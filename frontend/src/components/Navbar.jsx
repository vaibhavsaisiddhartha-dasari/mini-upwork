import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-200 ${scrolled ? 'ui-nav py-3' : 'bg-white border-b border-transparent py-4 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2 group">
          <div className="bg-green-600 p-1.5 rounded-lg transition-colors group-hover:bg-green-700">
            <span className="text-white font-extrabold text-lg px-0.5 tracking-tighter">mu</span>
          </div>
          <span className="text-gray-900 tracking-tight">MiniUpwork</span>
        </Link>
        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <Link to="/jobs" className={`font-medium text-sm transition-colors ${isActive('/jobs') || isActive('/') ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}>Find Work</Link>
              <Link to="/dashboard" className={`font-medium text-sm transition-colors ${isActive('/dashboard') ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}>Dashboard</Link>
              {user.role === 'ROLE_CLIENT' && (
                <Link to="/post-job" className="btn-primary py-2 px-4 text-xs">Post a Job</Link>
              )}
              <div className="flex items-center gap-4 ml-2 pl-6 border-l border-gray-200">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                  <User className="w-3.5 h-3.5 text-gray-500" /> {user.username}
                </span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-rose-600 transition-colors title='Log out'">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Log in</Link>
              <Link to="/register" className="btn-primary py-2 px-4 text-sm rounded-full">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
