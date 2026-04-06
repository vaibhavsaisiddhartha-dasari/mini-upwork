import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Briefcase, IndianRupee } from 'lucide-react';

const PostJob = () => {
  const [formData, setFormData] = useState({ title: '', description: '', budget: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/jobs', formData);
      navigate('/dashboard');
    } catch (err) { }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-20 bg-gray-50">
      <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Create a <span className="text-green-600">Project</span></h1>
           <p className="text-lg text-gray-600 font-medium">Connect with professionals capable of bringing your idea to reality.</p>
        </div>

        <div className="ui-card p-8 md:p-12 pb-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-green-600">
                <Briefcase className="w-4 h-4" /> Project Title
              </label>
              <input className="input-premium text-lg" required
                placeholder="e.g. Build an elegant Next.js E-commerce site"
                onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-green-600">
                <Sparkles className="w-4 h-4" /> Detailed Description
              </label>
              <textarea className="input-premium h-48 resize-none" required
                placeholder="Describe your requirements, necessary skills, timeline, and expectations..."
                onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
            
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-green-600">
                <IndianRupee className="w-4 h-4" /> Fixed Budget
              </label>
              <div className="relative">
                <input className="input-premium text-xl font-bold text-gray-900" type="number" required
                  onChange={(e) => setFormData({...formData, budget: e.target.value})} />
              </div>
            </div>
            
            <hr className="border-gray-200 mt-4 mb-2" />
            
            <div className="flex justify-end">
               <button className="btn-primary py-3 px-8 text-lg w-full md:w-auto">Post Project to Marketplace</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PostJob;
