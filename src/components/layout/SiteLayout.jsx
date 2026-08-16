import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ChatbotWidget from '../ChatbotWidget';
import FloatingBubbles from '../FloatingBubbles';
import PageTransition from '../motion/PageTransition';
import ScrollProgress from '../ScrollProgress';
import BackToTop from '../BackToTop';
import CookieConsent from '../CookieConsent';
import AnnouncementBar from '../AnnouncementBar';

export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Clear locks left by preloader / mobile nav / modals when changing routes
    document.body.style.overflow = '';
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-brand-bg-light antialiased selection:bg-accent-cyan/30 selection:text-primary-blue">
      <ScrollProgress />
      <AnnouncementBar />
      <FloatingBubbles />
      <Navbar />
      <main className="relative z-10">
        <PageTransition pathname={pathname} key={pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <BackToTop />
      <CookieConsent />
      <ChatbotWidget />
    </div>
  );
}
