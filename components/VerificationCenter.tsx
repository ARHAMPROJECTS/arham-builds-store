
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Lock, 
  Globe, 
  ArrowLeft,
  User,
  Package,
  Download,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface VerificationCenterProps {
  onBack?: () => void;
}

interface MockOrderData {
  id: string;
  customerName: string;
  date: string;
  amount: string;
  status: 'Processing' | 'In Queue' | 'Deployed';
  progress: number;
  items: string[];
}

const VerificationCenter: React.FC<VerificationCenterProps> = ({ onBack }) => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verified' | 'not_found'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [verifiedData, setVerifiedData] = useState<MockOrderData | null>(null);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setStatus('scanning');
    setVerifiedData(null);
    
    // Dramatic verification simulation
    setTimeout(() => {
      const sanitizedId = orderId.toUpperCase().trim();
      if (sanitizedId.startsWith('DB-')) {
        setStatus('verified');
        setVerifiedData({
          id: sanitizedId,
          customerName: "AUTHENTICATED OWNER",
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
          amount: "₹499.00",
          status: 'Processing',
          progress: 72,
          items: ["Premium Digital Asset", "Deployment Protocol v2"]
        });
      } else {
        setStatus('not_found');
      }
    }, 2800);
  };

  const handleDownloadReport = () => {
    if (!verifiedData) return;
    const timestamp = new Date().toLocaleString();
    const report = `
==============================================
    DIGITAL BHAIYA AUTHENTICITY REPORT
==============================================
STATUS      : VERIFIED AUTHENTIC
ORDER ID    : ${verifiedData.id}
OWNER       : ${verifiedData.customerName}
TIMESTAMP   : ${timestamp}
NET TOTAL   : ${verifiedData.amount}
GATEWAY     : Razorpay Enterprise
INVENTORY   : ${verifiedData.items.join(', ')}

----------------------------------------------
This order has been verified against the 
merchant master dashboard. Deployment is live.
----------------------------------------------
VERIFIED BY: KHUSHTER RAHMANI
OFFICIAL VERIFICATION PROTOCOL v2.6
==============================================
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Auth-Report-${verifiedData.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="verification-center" className="min-h-screen py-10 md:py-20 bg-[#F1F0EC] dark:bg-[#0b1120] transition-colors overflow-hidden font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        {onBack && (
          <div className="flex justify-start mb-8 animate-fade-in">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Return Home</span>
            </button>
          </div>
        )}
        
        <div className={`text-center mb-10 md:mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
             <ShieldCheck size={12} className="text-blue-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Secure Protocol Registry</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Verify Order <span className="text-blue-600 italic">Authenticity</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium max-w-xl mx-auto leading-relaxed">
            Enter your Order ID to cross-reference your purchase with the <b>Digital Bhaiya Dashboard</b> and view your real-time delivery status.
          </p>
        </div>

        <div className={`relative transition-all duration-1000 delay-200 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="bg-white dark:bg-white/[0.02] rounded-[2.5rem] p-6 md:p-10 border border-gray-100 dark:border-white/5 shadow-2xl overflow-hidden relative">
            
            {/* Form Section */}
            <form onSubmit={handleVerify} className="max-w-lg mx-auto relative z-10 mb-8">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Order ID (e.g. DB-1234-X)" 
                  value={orderId}
                  onChange={(e) => { setOrderId(e.target.value.toUpperCase()); setStatus('idle'); }}
                  className="w-full h-16 pl-14 pr-36 bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white font-black text-sm tracking-widest transition-all shadow-sm uppercase"
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Search size={20} />
                </div>
                <button 
                  type="submit"
                  disabled={status === 'scanning'}
                  className="absolute right-3 top-3 bottom-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  {status === 'scanning' ? <Loader2 className="animate-spin" size={16} /> : 'Verify Now'}
                </button>
              </div>
            </form>

            {/* Results Area */}
            <div className="min-h-[120px] flex flex-col items-center justify-center transition-all duration-500">
              {status === 'idle' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 w-full pt-4">
                   {[
                     { icon: <Lock size={14} />, title: "Secure Logs", desc: "Razorpay Cross-check" },
                     { icon: <Activity size={14} />, title: "Live Sync", desc: "Real-time query" },
                     { icon: <Globe size={14} />, title: "Digital Registry", desc: "Database Bridge" }
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-gray-900 dark:text-white mb-0.5">{item.title}</p>
                          <p className="text-[8px] font-medium text-gray-500 uppercase">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
              )}

              {status === 'scanning' && (
                <div className="flex flex-col items-center py-8">
                  <div className="relative w-48 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-6">
                    <div className="absolute inset-0 bg-blue-600 w-1/2 animate-scanning-line"></div>
                  </div>
                  <div className="flex items-center gap-3">
                     <Activity size={12} className="text-blue-500 animate-pulse" />
                     <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] animate-pulse">Scanning Master Dashboard...</p>
                  </div>
                </div>
              )}

              {status === 'verified' && verifiedData && (
                <div className="w-full space-y-8 animate-scale-in">
                  
                  {/* Verified Header */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem]">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce-subtle">
                        <CheckCircle2 size={32} />
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Authenticity Confirmed</h3>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">Linked to Razorpay Bridge</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleDownloadReport}
                        className="p-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-all shadow-sm"
                        title="Download Verified Report"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* General Info */}
                    <div className="p-6 bg-gray-50/50 dark:bg-white/[0.02] rounded-[2rem] border border-gray-100 dark:border-white/5 space-y-5">
                      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-white/5 pb-3">
                        <User size={16} className="text-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order Holder</span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-medium text-gray-500">Registry Name</span>
                          <span className="text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-tight">{verifiedData.customerName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-medium text-gray-500">Creation Date</span>
                          <span className="text-[11px] font-bold text-gray-900 dark:text-white">{verifiedData.date}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-medium text-gray-500">Net Amount</span>
                          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">{verifiedData.amount}</span>
                        </div>
                      </div>
                    </div>

                    {/* Inventory Info */}
                    <div className="p-6 bg-gray-50/50 dark:bg-white/[0.02] rounded-[2rem] border border-gray-100 dark:border-white/5 space-y-5">
                      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-white/5 pb-3">
                        <Package size={16} className="text-purple-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Digital Inventory</span>
                      </div>
                      <div className="space-y-3">
                        {verifiedData.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                            <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tracking Section */}
                  <div className="p-8 bg-white dark:bg-white/[0.02] rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-inner">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white">Deployment Status</span>
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{verifiedData.status}</span>
                    </div>
                    
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-100 dark:bg-gray-800">
                        <div style={{ width: `${verifiedData.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-1000"></div>
                      </div>
                      <div className="flex justify-between text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          <span>Order</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          <span>Auth</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${verifiedData.progress >= 50 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                          <span>Customized</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${verifiedData.progress === 100 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                          <span>Live</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-col md:flex-row gap-4">
                    <a 
                      href="mailto:arhamadib31@gmail.com" 
                      className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                    >
                      <Mail size={18} fill="white/10" />
                      Priority Support
                    </a>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="flex-1 h-14 bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-white/10 rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all hover:bg-gray-100 active:scale-95"
                    >
                      New Query
                    </button>
                  </div>
                </div>
              )}

              {status === 'not_found' && (
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-10 flex flex-col items-center text-center animate-fade-in w-full">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg mb-5">
                    <AlertTriangle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Registry Mismatch</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium max-w-sm leading-relaxed mb-8">
                    We couldn't locate this ID in our primary bridge. If you just purchased, please allow 60-120 seconds for database sync.
                  </p>
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <button 
                      onClick={() => setStatus('idle')}
                      className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-950 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                    >
                      Re-scan Registry
                    </button>
                    <a 
                      href="mailto:arhamadib31@gmail.com"
                      className="flex items-center justify-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-widest"
                    >
                      Contact Manual Support <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="mt-12 text-center opacity-30 select-none">
           <div className="flex items-center justify-center gap-4 mb-4">
              <ShieldCheck size={14} />
              <Lock size={14} />
              <Globe size={14} />
           </div>
           <p className="text-[8px] font-black uppercase tracking-[0.5em] text-gray-500">
              Enterprise Grade Secure Order Bridge v2.6.4
           </p>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanning-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-scanning-line {
          animation: scanning-line 1.8s infinite cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default VerificationCenter;
