import React, { useEffect, useState } from 'react';
import { ArrowLeft, Shield, FileText, Lock, Globe, Clock, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface PolicyPageProps {
  type: 'privacy' | 'terms';
  onBack: () => void;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ type, onBack }) => {
  const isPrivacy = type === 'privacy';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f0ec] dark:bg-[#0b1120] py-6 md:py-12 transition-colors font-sans no-scrollbar">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto px-6"
      >
        
        {/* Top Back Button - Small UI version */}
        <div className="flex justify-start mb-6 md:mb-10">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        {/* Standardized Header Section */}
        <div className="text-center mb-8 md:mb-12 space-y-2 px-4 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1a1f2c] dark:text-white tracking-tight leading-none whitespace-nowrap">
            {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-widest opacity-60">
            Last Updated: 28, February 2026.
          </p>
        </div>

        {/* Content with small, thin typography */}
        <div className="space-y-8 px-2 md:px-6 mb-16 animate-fade-up">
          {isPrivacy ? (
            <div className="space-y-8 text-gray-500 dark:text-gray-400 font-light text-[11px] md:text-xs leading-relaxed tracking-tight">
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600"><Lock size={14} /></div>
                  <h2 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] m-0">Information Collection</h2>
                </div>
                <p>
                  We collect information necessary to fulfill your digital orders. This includes personal details provided during checkout and assets uploaded via our customization forms (such as photos, text, and specific preferences). We also collect contact information like your email and WhatsApp number for delivery verification.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600"><Globe size={14} /></div>
                  <h2 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] m-0">Data Usage & Protection</h2>
                </div>
                <p>
                  Your data is used exclusively to architect and deploy your requested digital templates or projects. We do not sell or share your personal assets with third parties for marketing purposes. All uploaded media is stored on secure servers and used only for the purpose of your specific project.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600"><Clock size={14} /></div>
                  <h2 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] m-0">Retention & Deletion</h2>
                </div>
                <p>
                  Websites and their associated assets are typically hosted for 2 months. After this period, or upon your explicit request for removal, we purge all personal images and specific text from our active deployment environments to ensure your long-term privacy.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600"><ShieldAlert size={14} /></div>
                  <h2 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] m-0">Contact & Support</h2>
                </div>
                <p>
                  If you have any questions regarding your data or wish to request an immediate purge of your information, please contact us at <span className="text-blue-500 font-bold">arhamadib31@gmail.com</span>.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-8 text-gray-500 dark:text-gray-400 font-light text-[11px] md:text-xs leading-relaxed tracking-tight">
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600"><FileText size={14} /></div>
                  <h2 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] m-0">Digital Products</h2>
                </div>
                <p>
                  By purchasing from our store, you acknowledge that all products are digital assets. Due to the immediate nature of digital distribution, all sales are final. We do not offer refunds or cancellations once a payment is confirmed, except in cases where we fail to meet our guaranteed delivery timeline.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600"><Clock size={14} /></div>
                  <h2 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] m-0">Delivery Guaranteed</h2>
                </div>
                <p>
                  We guarantee delivery of your customized link within 12-24 hours. Please note that this timer commences only after the successful submission of our customization form. Delays in form submission will result in corresponding delays in final delivery.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600"><Globe size={14} /></div>
                  <h2 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] m-0">Hosting & Usage</h2>
                </div>
                <p>
                  Standard hosting for templates is provided for 2 months. You are granted a personal license to use the delivered link. Redistribution, cloning, or attempts to modify the source architecture without explicit written permission is strictly prohibited.
                </p>
              </section>

              <section className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="flex-shrink-0 text-amber-500">
                  <ShieldAlert size={20} strokeWidth={2} />
                </div>
                <p className="text-[11px] md:text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed m-0">Continued use of our services constitutes agreement to these terms. We reserve the right to modify these terms at any time without
prior notice.
                </p>
              </section>
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export default PolicyPage;