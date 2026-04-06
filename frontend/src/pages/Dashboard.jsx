import { useState, useEffect, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, CheckCircle2, CircleDashed, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if(!user) return;
    const fetchData = async () => {
      try {
        if (user.role === 'ROLE_CLIENT') {
          const res = await API.get('/jobs/myjobs');
          setData(res.data);
        } else {
          const res = await API.get('/bids/mybids');
          setData(res.data);
        }
      } catch (err) { }
    };
    fetchData();
  }, [user]);

  if (!user) return null;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-7 h-7 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
            </div>
            <p className="text-gray-600 font-medium">Welcome back, {user.username}</p>
          </div>
          
          {user.role === 'ROLE_CLIENT' && (
            <Link to="/post-job" className="btn-primary flex items-center gap-2 py-2">
              <PlusCircle className="w-5 h-5" /> Post New Job
            </Link>
          )}
        </header>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {user.role === 'ROLE_CLIENT' ? (
            <>
              {data.length === 0 && (
                <div className="col-span-full ui-card py-16 flex flex-col items-center justify-center text-center">
                  <div className="bg-green-50 p-4 rounded-full mb-4">
                    <PlusCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Configure Your First Project</h3>
                  <p className="text-gray-600 mb-6 max-w-md">You haven't posted any jobs yet. Post a job to start receiving bids from top talent!</p>
                  <Link to="/post-job" className="btn-primary">Post a Job</Link>
                </div>
              )}
              {data.map(job => (
                <Link to={`/jobs/${job.id}`} key={job.id} className="ui-card p-6 group flex flex-col hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase ${job.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {job.status}
                    </div>
                    <div className="text-lg font-bold text-green-600">₹{job.budget}</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">{job.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">{job.description}</p>
                  
                  <div className="mt-auto border-t border-gray-100 pt-4 flex items-center text-sm font-semibold text-green-600 group-hover:gap-2 transition-all">
                    Manage Project &rarr;
                  </div>
                </Link>
              ))}
            </>
          ) : (
             <>
              {data.length === 0 && (
                <div className="col-span-full ui-card py-16 flex flex-col items-center justify-center text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No Active Bids</h3>
                  <p className="text-gray-600 mb-6 max-w-md">Find open projects and submit your proposals to start working.</p>
                  <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
                </div>
              )}
              {data.map(bid => (
                <div key={bid.id} className="ui-card p-6 flex flex-col hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-medium text-gray-500">Bid Amount</div>
                    <div className="text-xl font-bold text-green-600">₹{bid.amount}</div>
                  </div>
                  
                  <div className="mb-6 flex items-center gap-2">
                    {bid.status === 'PENDING' && <><Clock className="w-5 h-5 text-amber-500" /> <span className="font-semibold text-amber-600 text-sm">Under Review</span></>}
                    {bid.status === 'ACCEPTED' && <><CheckCircle2 className="w-5 h-5 text-green-600" /> <span className="font-semibold text-green-700 text-sm">Accepted</span></>}
                    {bid.status === 'REJECTED' && <><CircleDashed className="w-5 h-5 text-rose-500" /> <span className="font-semibold text-rose-600 text-sm">Refused</span></>}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 flex-1">
                    <p className="text-sm text-gray-700 italic line-clamp-3">"{bid.proposal}"</p>
                  </div>
                  
                  <Link to={`/jobs/${bid.jobId}`} className="block text-center btn-outline w-full py-2 text-sm">
                    View Project Details
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
