import React, { useEffect, useState, useRef } from 'react';
import { 
  Send, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Check, 
  Loader2, 
  ArrowLeft,
  MessageCircle,
  MapPin,
  Mail,
  Phone,
Youtube
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactPageProps {
  onBack?: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const email = "arhamadib31@gmail.com";
  const address = "Bahadurganj, Bihar, India";
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData(formRef.current);
      const name = formData.get('user_name');
      const userEmail = formData.get('user_email');
      const userMessage = formData.get('message');

      const fullMessage = `New Inquiry from Website\n\nName: ${name}\nEmail: ${userEmail}\nMessage: ${userMessage}`;
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent('New Website Inquiry')}&body=${encodeURIComponent(fullMessage)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        setSubmitStatus('success');
        setIsSubmitting(false);
        formRef.current?.reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }, 800);

    } catch (error) {
      console.error('Submission Error:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const socials = [
    { name: 'Instagram', href: 'https://www.instagram.com/arhambuilds.in', icon: <Instagram size={18} /> },
    { name: 'Twitter', href: 'https://x.com/arham_07a', icon: <Twitter size={18} fill="currentColor" /> },
    { name: 'Telegram', href: 'https://t.me/arhambuilds', icon: <Send size={18} /> },
    { name: 'LinkedIn', href: 'https://in.linkedin.com/in/arham07a?trk=people-guest_people_search-card', icon: <Linkedin size={18} fill="currentColor" />}, 
    { name: 'Youtube', href: 'https://www.youtube.com/@arhambuilds', icon: <Youtube size={18} /> }
 ];
 
  return (
    <div className="min-h-screen w-full bg-[#f4f2ee] dark:bg-[#0b1120] text-gray-900 dark:text-white transition-colors flex flex-col items-center pt-8 pb-24 px-4 sm:px-6 relative overflow-hidden font-sans no-scrollbar">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-6xl flex flex-col items-center"
      >
        <div className="w-full flex justify-start items-center mb-10 z-10">
          {onBack && (
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </button>
          )}
        </div>

        <div className="w-full z-10 px-2 sm:px-4">
          <div className="text-center mb-10 md:mb-14 flex flex-col gap-1 px-4 animate-fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1a1f2c] dark:text-white tracking-tight leading-tight whitespace-nowrap">
              Contact Us!
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-sans font-normal leading-relaxed opacity-80">
              Let's work together to build your next digital vision
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-8">
                <div className="group">
                  <p className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.4em] mb-2">Email:</p>
                  <div onClick={copyEmail} className="inline-flex items-center gap-3 cursor-pointer">
                    <p className="text-xl md:text-2xl font-bold text-[#1a1f2c] dark:text-white hover:text-blue-600 transition-colors tracking-tight">
                      {email}
                    </p>
                    {copied ? (
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 p-1 rounded-full animate-scale-in">
                        <Check size={10} />
                      </div>
                    ) : (
                      <Mail size={14} className="text-gray-300 dark:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.4em] mb-2">Location:</p>
                  <div className="flex items-start gap-3">
                    <p className="text-lg md:text-xl font-bold text-[#1a1f2c] dark:text-white leading-snug max-w-xs tracking-tight">
                      {address}
                    </p>
                    <MapPin size={14} className="text-gray-200 dark:text-gray-800 mt-1" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                {socials.map((social, i) => (
                  <a 
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm hover:scale-110 active:scale-95 group"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="animate-fade-in">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900/30 p-8 sm:p-10 rounded-[2.5rem] border border-gray-200 dark:border-white/5 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Full Name</label>
                    <input type="text" name="user_name" required placeholder="Arham Adib" className="w-full bg-[#f8f9fa] dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-4 px-5 text-[12px] font-bold outline-none focus:ring-2 ring-blue-500/20 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Email</label>
                    <input type="email" name="user_email" required placeholder="hello@world.com" className="w-full bg-[#f8f9fa] dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-4 px-5 text-[12px] font-bold outline-none focus:ring-2 ring-blue-500/20 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Message</label>
                  <textarea name="message" required placeholder="Describe your project vision..." className="w-full bg-[#f8f9fa] dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2rem] p-5 text-[12px] font-bold outline-none focus:ring-2 ring-blue-500/20 transition-all resize-none min-h-[160px]" />
                </div>
                <button type="submit" disabled={isSubmitting} className="group relative overflow-hidden w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50">
                  {/* Dark button: Constant slow blue shimmer (Low Capacity) */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <>Send Inquiry <Send size={14} /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;