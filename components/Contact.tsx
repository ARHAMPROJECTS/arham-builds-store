import React, { useEffect, useState, useRef } from 'react';
import SectionHeading from './SectionHeading';
import { Mail, MapPin, Instagram, Twitter, Linkedin, Youtube, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} id="contact" className="py-16 md:py-24 bg-transparent transition-colors border-t border-gray-100 dark:border-white/5">
      <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-[0.98]'}`}>
        <SectionHeading title="Work with us!" subtitle="Let's work together to grow your brand or channel with powerful digital content." />

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-white/5">
          <div className="flex flex-col md:flex-row">
            
            {/* Image Column */}
            <div className="w-full md:w-2/5 h-48 md:h-auto relative">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNoMNJTSMPjrfmt-JgWCyrgTyyxu6SC8FnGShHNOQL2GN-46T8NpHWL8m-hEuvmr_L2IvpaCygpHt6eFVgpW5ltpqugYNcIAYGqyb_KhR-rQN_XrPQXGvdAou_uFNK2C8DeWmsgz1YssY-z_FsJeMhzoiKvbxeCjHb9WbfepToq8WZyCB5VirinKqXHg/s1600/ArhamAdib.jpg" 
                alt="Arham Adib" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
              <div className="absolute bottom-4 left-4 text-white md:hidden">
                <p className="font-bold text-lg">Arham Adib</p>
                <p className="text-[10px] opacity-90 uppercase tracking-widest">Web Designer & Editor</p>
              </div>
            </div>

            {/* Info Column */}
            <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
              <div className="space-y-6">
                
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">Email</h4>
                    <a href="mailto:arhamadib31@gmail.com" className="text-sm sm:text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap overflow-hidden text-ellipsis block max-w-full">
                      arhamadib31@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">Location</h4>
                    <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                      Bahadurganj, Bihar, India
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100 dark:border-white/5">
                  <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Connect With Me</h4>
                  <div className="flex flex-row flex-nowrap gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1">
                    <SocialLink href="https://t.me/arhambuilds" icon={<Send className="w-4 h-4 sm:w-5 sm:h-5" />} label="Telegram" />
                    <SocialLink href="https://instagram.com/arhambuilds.in" icon={<Instagram className="w-4 h-4 sm:w-5 sm:h-5" />} label="Instagram" />
                    <SocialLink href="https://x.com/arham_07a" icon={<Twitter className="w-4 h-4 sm:w-5 sm:h-5" />} label="Twitter" />
                    <SocialLink href="https://in.linkedin.com/in/arham07a?trk=people-guest_people_search-card" icon={<Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />} label="LinkedIn" />
                    <SocialLink href="https://www.youtube.com/@arhambuilds" icon={<Youtube className="w-4 h-4 sm:w-5 sm:h-5" />} label="YouTube" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const MessageCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle w-4 h-4 sm:w-5 sm:h-5">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z" />
  </svg>
);

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={label}
    className="p-2 sm:p-2.5 bg-[#1c2433] dark:bg-white/10 text-white flex items-center justify-center rounded-full shadow-lg hover:bg-[#435ef7] dark:hover:bg-[#435ef7] transition-all hover:scale-110 active:scale-95 flex-shrink-0"
  >
    {icon}
  </a>
);

export default Contact;