import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import { IndianRupee, User, FileText, CheckCircle } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState('');
  const [proposal, setProposal] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) { }
    };
    const fetchBids = async () => {
      try {
        const res = await API.get(`/bids/job/${id}`);
        setBids(res.data);
      } catch(err) { }
    };
    fetchJob();
    fetchBids();
  }, [id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/bids', { jobId: job.id, amount, proposal });
      setSuccess('Your outstanding proposal has been submitted successfully.');
      setAmount(''); setProposal('');
      const res = await API.get(`/bids/job/${id}`);
      setBids(res.data);
    } catch(err) { }
  };

  const handleAcceptBid = async (bidId) => {
    try {
      await API.post(`/bids/${bidId}/accept`);
      const res = await API.get(`/bids/job/${id}`);
      setBids(res.data);
    } catch(err) { }
  };

  if (!job) return <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-50"><div className="w-10 h-10 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div></div>;

  const isClient = user?.role === 'ROLE_CLIENT';
  const isOwner = isClient && user.id === job.clientId;
  const isFreelancer = user?.role === 'ROLE_FREELANCER';

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Job Card */}
        <div className="ui-card p-8 md:p-10 mb-8 border-t-4 border-t-green-600">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex-1">
               <span className={`inline-block mb-4 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${job.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>{job.status}</span>
               <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">{job.title}</h1>
               <div className="flex items-center gap-2 text-gray-600 font-medium mb-8">
                 <User className="w-5 h-5 text-gray-400" />
                 Posted by <span className="text-gray-900 font-semibold">{job.clientUsername}</span>
               </div>
               
               <div className="prose max-w-none text-gray-700 font-medium leading-relaxed">
                 {job.description.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
               </div>
            </div>
            
            <div className="shrink-0 bg-gray-50 p-6 rounded-xl border border-gray-200 h-min w-full md:w-64 text-center">
               <p className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-2">Project Budget</p>
               <div className="text-4xl font-extrabold text-green-600 mb-6">₹{job.budget}</div>
               {isFreelancer && job.status === 'OPEN' && (
                 <a href="#propose" className="btn-primary w-full block py-2.5">Write Proposal</a>
               )}
            </div>
          </div>
        </div>

        {/* Propose Form */}
        {isFreelancer && job.status === 'OPEN' && (
          <div id="propose" className="ui-card p-8 md:p-10 mb-8 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3"><FileText className="text-green-600" /> Submit your proposal</h2>
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg font-medium flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6" /> {success}
              </div>
            )}
            
            <form onSubmit={handleBidSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Bid (₹)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IndianRupee className="w-5 h-5 text-gray-400" />
                  </div>
                  <input className="input-premium pl-11 text-lg font-bold text-green-700" type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter</label>
                <textarea className="input-premium h-48 resize-none leading-relaxed" required placeholder="Introduce yourself and explain why you're a great fit for this project..." value={proposal} onChange={(e) => setProposal(e.target.value)} />
              </div>
              <button className="btn-primary py-3 px-8 text-lg w-full md:w-auto self-end mt-2">Send Proposal</button>
            </form>
          </div>
        )}

        {/* Bids List */}
        {(isOwner || isFreelancer) && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Submitted Proposals ({bids.length})</h2>
            <div className="grid gap-4">
              {bids.map(bid => (
                <div key={bid.id} className={`ui-card p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${bid.status === 'ACCEPTED' ? 'ring-2 ring-green-500 bg-green-50' : ''}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
                        {bid.freelancerUsername.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900">{bid.freelancerUsername}</h3>
                      <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600">Bid: <span className="text-green-600">₹{bid.amount}</span></span>
                    </div>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200 italic">"{bid.proposal}"</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center gap-4 shrink-0 min-w-[140px] w-full md:w-auto">
                    <span className={`px-4 py-1.5 text-sm font-bold rounded-lg uppercase tracking-wider w-full text-center ${bid.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : bid.status === 'ACCEPTED' ? 'bg-green-600 text-white shadow-sm' : 'bg-rose-100 text-rose-800'}`}>
                      {bid.status}
                    </span>
                    {isOwner && bid.status === 'PENDING' && (
                      <button onClick={() => handleAcceptBid(bid.id)} className="btn-primary w-full py-2 px-4 shadow-sm">
                        Accept Offer
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default JobDetails;
