import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products, { ALL_PRODUCTS_DATA } from './components/Products';
import AllProducts from './components/AllProducts';
import ProductDetail from './components/ProductDetail';
import DeliveryProcess from './components/DeliveryProcess';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import CheckoutDrawer from './components/CheckoutDrawer';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import PolicyPage from './components/PolicyPage';
import VerificationCenter from './components/VerificationCenter';
import PulseFeed from './components/PulseFeed';
import AllProjectsPage from './components/AllProjectsPage';
import MasterclassPage from './components/MasterclassPage';
import Testimonials from './components/Testimonials';
import PromoPopup from './components/PromoPopup';
import HotDealsSidebar from './components/HotDealsSidebar';
import HowItWorksModal from './components/HowItWorksModal';
import { CartProvider } from './context/CartContext';
import { Product } from './types';
import { motion, AnimatePresence } from 'framer-motion';

// Feature Flags: Easily toggle global UI sections
const SHOW_OFFER_TIMER = false;
const SHOW_WELCOME_DISCOUNT = true;
const SHOW_PROMO_POPUP = false; // Toggle this to show/hide the popup

export type View = 'home' | 'about' | 'templates' | 'store' | 'faq' | 'contact' | 'contact-page' | 'product-detail' | 'delivery-process' | 'privacy-policy' | 'terms-conditions' | 'verification' | 'pulse' | 'projects' | 'masterclass';

const getPathFromView = (v: View, slug?: string) => {
  if (v === 'home') return '/';
  if (v === 'contact-page') return '/contact';
  if (v === 'templates' || v === 'store') return '/store';
  if (v === 'privacy-policy') return '/privacy';
  if (v === 'terms-conditions') return '/terms';
  if (v === 'verification') return '/verify';
  if (v === 'pulse') return '/profile';
  if (v === 'product-detail' && slug) return `/product/${slug}`;
  return `/${v}`;
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<any[]>([]);
  const [preSelectedCategory, setPreSelectedCategory] = useState<string>('All Products');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark');
  });

  const handlePurchaseSuccess = (items: any[]) => {
    setPurchasedItems(items);
    setCheckoutProduct(null);
    navigateTo('delivery-process');
  };

  useEffect(() => {
    const brandTitle = "Arham Builds | Official Store";
    let description = "Arham builds premium website templates and growth assets. Join the community and get exclusive digital products.";

    switch (view) {
      case 'store':
      case 'templates':
        description = "Shop premium website templates, digital assets, and creative designs curated by Arham Adib.";
        break;
      case 'verification':
        description = "Verify your order authenticity through our secure registry.";
        break;
      case 'pulse':
        description = "Arham Adib's Profile: Exclusive updates and raw creative logs.";
        break;
    }

    document.title = brandTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
  }, [view]);

  const parsePath = useCallback((path: string) => {
    const cleanPath = path.replace(/^\//, '').split('?')[0] || 'home';
    
    if (cleanPath === 'delivery-process') return { view: 'delivery-process' as View };
    if (cleanPath === 'contact') return { view: 'contact-page' as View };
    if (cleanPath === 'templates' || cleanPath === 'store') return { view: 'store' as View };
    if (cleanPath === 'privacy') return { view: 'privacy-policy' as View };
    if (cleanPath === 'terms') return { view: 'terms-conditions' as View };
    if (cleanPath === 'verify') return { view: 'verification' as View };
    if (cleanPath === 'profile') return { view: 'pulse' as View };
    if (cleanPath === 'projects') return { view: 'projects' as View };
    if (cleanPath === 'masterclass') return { view: 'masterclass' as View };

    const productMatch = path.match(/\/product\/([^\/?#]+)/);
    if (productMatch) {
      const slug = productMatch[1];
      const product = ALL_PRODUCTS_DATA.find(p => p.slug === slug);
      if (product) return { view: 'product-detail' as View, product };
    }

    const landingSections = ['about', 'faq'];
    if (landingSections.includes(cleanPath)) {
      return { view: 'home' as View, scrollTo: cleanPath };
    }

    return { view: 'home' as View };
  }, []);

  const navigateTo = useCallback((newView: View, item: Product | null = null, shouldPushState = true) => {
    const landingSections = ['about', 'faq'];
    const isSection = landingSections.includes(newView);
    
    let targetView = isSection ? 'home' : (newView === 'contact' ? 'contact-page' : newView);

    if (targetView === 'templates') targetView = 'store';

    if (targetView !== 'store') {
      setPreSelectedCategory('All Products');
    }

    setView(targetView);
    setActiveSection(newView);
    if (targetView === 'product-detail') setSelectedProduct(item);
    else { setSelectedProduct(null); }

    // Always scroll to top immediately on view change to prevent "glitchy" jumps
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    if (shouldPushState) {
      const slug = (item as any)?.slug;
      const path = getPathFromView(targetView as View, slug);
      window.history.pushState({ view: targetView, slug: slug }, '', path);
    }

    if (isSection || targetView === 'home') {
      // Increased timeout to ensure component rendering completes
      setTimeout(() => {
        const targetId = isSection ? newView : 'home';
        const element = document.getElementById(targetId);
        if (element) {
          const navHeight = 80; // Buffer for floating navbar
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: elementPosition - navHeight, behavior: 'smooth' });
        } else if (targetView === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 150);
    }
  }, []);

  useEffect(() => {
    const handleNavigation = () => {
      const res = parsePath(window.location.pathname);
      setView(res.view);
      setSelectedProduct((res as any).product || null);

      if ((res as any).scrollTo) {
        setTimeout(() => {
          const elementId = (res as any).scrollTo;
          const element = document.getElementById(elementId);
          if (element) {
             const navHeight = 80;
             const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
             window.scrollTo({ top: elementPosition - navHeight, behavior: 'smooth' });
          }
        }, 300);
      }
    };
    handleNavigation();
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, [parsePath]);

  useEffect(() => {
    const handleScroll = () => {
      if (view !== 'home') return;
      
      const sections = ['home', 'about', 'faq'];
      const navHeight = 100; // Offset for navbar
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= navHeight && rect.bottom >= navHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  useEffect(() => {
    if (SHOW_PROMO_POPUP) {
      const timer = setTimeout(() => {
        setShowPromo(true);
      }, 2000); // Show after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Combined UI hiding state - STRICTLY hide everything when How It Works, Checkout, or Promo is open
  const isUIVisible = !checkoutProduct && !showHowItWorks && !showPromo;

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { 
      duration: 0.3, 
      ease: "easeInOut"
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#F1F0EC] dark:bg-[#0b1120] bg-dots text-gray-900 dark:text-white transition-colors duration-500 no-scrollbar ${(showHowItWorks || checkoutProduct || showPromo) ? 'overflow-hidden h-screen' : ''}`}>
      <CartProvider>
        {isUIVisible && (
          <Navbar 
            darkMode={darkMode} 
            toggleTheme={() => setDarkMode(!darkMode)} 
            currentView={view} 
            activeSection={activeSection}
            onNavigate={(v) => navigateTo(v)} 
          />
        )}
        
        <CartDrawer onStartBrowsing={() => navigateTo('store')} onSuccess={(items) => handlePurchaseSuccess(items)} />
        
        <CheckoutDrawer 
          product={checkoutProduct} 
          onClose={() => setCheckoutProduct(null)} 
          onSuccess={() => handlePurchaseSuccess(checkoutProduct ? [checkoutProduct] : [])}
        />

        <HowItWorksModal 
          isOpen={showHowItWorks} 
          onClose={() => setShowHowItWorks(false)} 
        />

        <PromoPopup 
          isOpen={showPromo} 
          onClose={() => setShowPromo(false)} 
        />

        {isUIVisible && <ScrollToTop />}
        {isUIVisible && <HotDealsSidebar />}
        
        <main className={`flex-grow ${isUIVisible ? 'pt-[56px] md:pt-[64px]' : 'pt-0'} ${showHowItWorks ? 'hidden' : 'block'}`}>
          {view === 'delivery-process' && (
            <DeliveryProcess items={purchasedItems} onBack={() => navigateTo('home')} />
          )}
          {view === 'verification' && (
            <VerificationCenter onBack={() => navigateTo('home')} />
          )}
          {view === 'pulse' && (
            <PulseFeed onBack={() => navigateTo('home')} />
          )}
          {view === 'projects' && (
            <AllProjectsPage onBack={() => navigateTo('home')} />
          )}
          {view === 'masterclass' && (
            <MasterclassPage onBack={() => navigateTo('home')} />
          )}
          {view === 'contact-page' && <ContactPage onBack={() => navigateTo('home')} />}
          {view === 'privacy-policy' && <PolicyPage type="privacy" onBack={() => navigateTo('home')} />}
          {view === 'terms-conditions' && <PolicyPage type="terms" onBack={() => navigateTo('home')} />}
          
          {view === 'store' && (
            <AllProducts 
              onBack={() => navigateTo('home')} 
              onViewProduct={(p) => navigateTo('product-detail', p)}
              initialCategory={preSelectedCategory}
            />
          )}
          {view === 'product-detail' && selectedProduct && (
            <ProductDetail 
              product={selectedProduct} 
              onBack={() => navigateTo('store')}
              onCheckout={(p) => setCheckoutProduct(p)}
              onViewProduct={(p) => navigateTo('product-detail', p)}
            />
          )}

          {view === 'home' && (
            <div className="view-transition">
              <section id="home">
                <Hero 
                  onExplore={() => navigateTo('store')} 
                  onCategorySelect={(cat) => {
                    setPreSelectedCategory(cat);
                    navigateTo('store');
                  }}
                  onShowHowItWorks={() => setShowHowItWorks(true)} 
                  showWelcomeDiscount={SHOW_WELCOME_DISCOUNT}
                  showOfferTimer={SHOW_OFFER_TIMER}
                />
              </section>
              <section id="products">
                <Products 
                  onExploreMore={() => navigateTo('store')} 
                  onViewProduct={(p) => navigateTo('product-detail', p)}
                  onCategoryClick={(cat) => {
                    setPreSelectedCategory(cat);
                    navigateTo('store');
                  }}
                />
              </section>
              <section id="about" className="scroll-mt-24"><About /></section>
              <section id="testimonials"><Testimonials /></section>
              <section id="faq" className="scroll-mt-24"><FAQ /></section>
              <section id="contact"><Contact /></section>
            </div>
          )}
        </main>
        
        {isUIVisible && <Footer onNavigate={(v) => navigateTo(v)} />}
      </CartProvider>
    </div>
  );
};

export default App;