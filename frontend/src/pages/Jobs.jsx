import { useState, useEffect } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await API.get('/jobs/open');
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Explore <span className="text-green-600">Opportunities</span></h1>
          <p className="text-lg text-gray-600 font-medium">Find the perfect freelance projects and collaborate with top clients globally.</p>
        </div>

        <div className="grid gap-6">
          {jobs.length === 0 && (
            <div className="ui-card py-20 text-center">
               <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-gray-900">No projects available</h3>
               <p className="text-gray-600 mt-2">Check back later when clients post new jobs.</p>
            </div>
          )}
          
          {jobs.map(job => (
            <div key={job.id} className="ui-card p-6 md:p-8 group hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide uppercase">Open Project</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">{job.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm font-semibold text-gray-600">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                      <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-extrabold pb-0.5">{job.clientUsername.charAt(0).toUpperCase()}</div>
                      {job.clientUsername}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-start md:items-end border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-8 shrink-0 min-w-[200px]">
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm font-medium text-gray-500 mb-1">Fixed Budget</p>
                    <div className="text-3xl font-bold text-green-600">₹{job.budget}</div>
                  </div>
                  <Link to={`/jobs/${job.id}`} className="btn-primary w-full md:w-auto text-center py-2 px-8">
                    View & Apply
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Jobs;
