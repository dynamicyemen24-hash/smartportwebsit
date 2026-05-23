import { lazy, Suspense, useEffect, useMemo, useState } from 'react';

import { api } from '../utils/api';

import ServiceWorker, { SWUpdateNotification } from './components/ServiceWorker';

import { ToastProvider } from './components/Toast';

/* ============================================================================
 * MAIN WEBSITE COMPONENTS
 * ========================================================================== */

import AboutSection from './components/AboutSection';
import CaseStudiesPro from './components/CaseStudiesPro';
import ConsultingSection from './components/ConsultingSection';
import ContactSectionPro from './components/ContactSectionPro';
import FAQSection from './components/FAQSection';
import FloatingCTA from './components/FloatingCTA';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroExecutive from './components/HeroExecutive';
import LiveChat from './components/LiveChat';
import MethodologySection from './components/MethodologySection';
import ProjectsPro from './components/ProjectsPro';
import ScrollToTop from './components/ScrollToTop';
import ServicesSection from './components/ServicesSection';
import SolutionsSectionPro from './components/SolutionsSectionPro';
import TestimonialsPro from './components/TestimonialsPro';
import TrustSection from './components/TrustSection';
import ValuePropositionSection from './components/ValuePropositionSection';
import WhyUsSection from './components/WhyUsSection';

/* ============================================================================
 * LAZY LOADED ADMIN COMPONENTS
 * ========================================================================== */

const AdminLogin = lazy(() => import('./admin/AdminLogin'));

const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));

const AdminAppointments = lazy(() => import('./admin/AdminAppointments'));

const AdminRequests = lazy(() => import('./admin/AdminRequests'));

const MarketingDashboard = lazy(() => import('./admin/MarketingDashboard'));

const SocialMediaHub = lazy(() => import('./admin/SocialMediaHub'));

const AIAssistant = lazy(() => import('./admin/AIAssistant'));

const MessagingCenter = lazy(() => import('./admin/MessagingCenter'));

const BrandingSettings = lazy(() => import('./admin/BrandingSettings'));

const EvaluationCriteria = lazy(() => import('./admin/EvaluationCriteria'));

/* ============================================================================
 * TYPES
 * ========================================================================== */

type AdminRoute =
  | '#admin'
  | '#admin/requests'
  | '#admin/marketing'
  | '#admin/social'
  | '#admin/ai'
  | '#admin/messages'
  | '#admin/appointments'
  | '#admin/settings'
  | '#admin/evaluation';

/* ============================================================================
 * LOADING SCREEN
 * ========================================================================== */

function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-black animate-spin" />

        <p className="text-sm md:text-base text-gray-600">{message}</p>
      </div>
    </div>
  );
}

/* ============================================================================
 * APP
 * ========================================================================== */

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.hash || '');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /* ==========================================================================
   * INITIALIZATION
   * ======================================================================== */

  useEffect(() => {
    /* ========================================================================
     * GLOBAL DOCUMENT SETTINGS
     * ====================================================================== */

    document.documentElement.lang = 'ar';

    document.documentElement.dir = 'rtl';

    document.documentElement.style.scrollBehavior = 'smooth';

    document.title = 'المنافذ الذكية | Smart Ports - رواد الحلول اللوجستية الذكية';

    /* ========================================================================
     * META DESCRIPTION
     * ====================================================================== */

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'المنافذ الذكية - شركة رائدة في الحلول اللوجستية المتكاملة وإدارة المستودعات والنقل والشحن والطاقة الذكية في المملكة العربية السعودية',
      );
    }

    /* ========================================================================
     * STRUCTURED DATA (SEO)
     * ====================================================================== */

    const structuredData = {
      '@context': 'https://schema.org',

      '@type': 'Organization',

      name: 'المنافذ الذكية المحدودة',

      alternateName: 'Smart Ports Co. Ltd',

      url: 'https://smartportsco.com',

      logo: 'https://smartportsco.com/logo.png',

      description:
        'شركة رائدة في الحلول اللوجستية المتكاملة وإدارة المستودعات والنقل والشحن والطاقة الذكية',

      telephone: '+966667780832',

      email: 'info@smartportsco.com',

      address: {
        '@type': 'PostalAddress',
        addressLocality: 'الرياض',
        addressCountry: 'SA',
      },

      sameAs: [
        'https://www.facebook.com/smartportsco',
        'https://www.twitter.com/smartportsco',
        'https://www.linkedin.com/company/smartportsco',
      ],
    };

    const structuredDataScript = document.createElement('script');

    structuredDataScript.type = 'application/ld+json';

    structuredDataScript.text = JSON.stringify(structuredData);

    document.head.appendChild(structuredDataScript);

    /* ========================================================================
     * AUTHENTICATION
     * ====================================================================== */

    const token = api.getToken();

    setIsAuthenticated(Boolean(token));

    /* ========================================================================
     * HASH ROUTER
     * ====================================================================== */

    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '');
    };

    window.addEventListener('hashchange', handleHashChange);

    /* ========================================================================
     * CLEANUP
     * ====================================================================== */

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';

      structuredDataScript.remove();

      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  /* ==========================================================================
   * ROUTE DETECTION
   * ======================================================================== */

  const isAdminRoute = useMemo(() => currentRoute.startsWith('#admin'), [currentRoute]);

  /* ==========================================================================
   * ADMIN COMPONENT RESOLVER
   * ======================================================================== */

  const adminComponent = useMemo(() => {
    switch (currentRoute as AdminRoute) {
      case '#admin/requests':
        return <AdminRequests />;

      case '#admin/marketing':
        return <MarketingDashboard />;

      case '#admin/social':
        return <SocialMediaHub />;

      case '#admin/ai':
        return <AIAssistant />;

      case '#admin/messages':
        return <MessagingCenter />;

      case '#admin/appointments':
        return <AdminAppointments />;

      case '#admin/settings':
        return <BrandingSettings />;

      case '#admin/evaluation':
        return <EvaluationCriteria />;

      default:
        return <AdminDashboard />;
    }
  }, [currentRoute]);

  /* ==========================================================================
   * LOGIN VIEW
   * ======================================================================== */

  if (isAdminRoute && !isAuthenticated) {
    return (
      <>
        <ServiceWorker />

        <SWUpdateNotification />

        <Suspense fallback={<LoadingScreen message="جاري تحميل واجهة تسجيل الدخول..." />}>
          <AdminLogin
            onLoginSuccess={() => {
              setIsAuthenticated(true);

              setCurrentRoute('#admin');

              window.location.hash = '#admin';
            }}
          />
        </Suspense>
      </>
    );
  }

  /* ==========================================================================
   * ADMIN DASHBOARD
   * ======================================================================== */

  if (isAdminRoute) {
    return (
      <>
        <ServiceWorker />

        <SWUpdateNotification />

        <Suspense fallback={<LoadingScreen message="جاري تحميل لوحة الإدارة..." />}>
          {adminComponent}
        </Suspense>
      </>
    );
  }

  /* ==========================================================================
   * MAIN WEBSITE
   * ======================================================================== */

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white text-black overflow-x-hidden" dir="rtl">
        {/* ================================================================
         * HEADER
         * ============================================================== */}

        <Header />

        {/* ================================================================
         * MAIN CONTENT
         * ============================================================== */}

        <main>
          <HeroExecutive />

          <SolutionsSectionPro />

          <ValuePropositionSection />

          <ServicesSection />

          <ConsultingSection />

          <WhyUsSection />

          <MethodologySection />

          <ProjectsPro />

          <CaseStudiesPro />

          <TrustSection />

          <TestimonialsPro />

          <FAQSection />

          <AboutSection />

          <ContactSectionPro />
        </main>

        {/* ================================================================
         * FOOTER
         * ============================================================== */}

        <Footer />

        {/* ================================================================
         * FLOATING COMPONENTS
         * ============================================================== */}

        <FloatingCTA />

        <ScrollToTop />

        <LiveChat />

        {/* ================================================================
         * PWA / SERVICE WORKER
         * ============================================================== */}

        <ServiceWorker />

        <SWUpdateNotification />
      </div>
    </ToastProvider>
  );
}
