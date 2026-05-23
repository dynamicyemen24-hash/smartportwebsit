import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import LogoPro from './LogoPro';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const closeMenu = () => setIsMenuOpen(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;

      setIsScrolled(totalScroll > 50);
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'الرئيسية' },
    { href: '#solutions', label: 'الحلول' },
    { href: '#services', label: 'الخدمات' },
    { href: '#projects', label: 'المشاريع' },
    { href: '#about', label: 'عن الشركة' },
    { href: '#contact', label: 'تواصل معنا' },
  ];

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-[60] bg-gradient-to-l from-[#d4a574] to-[#1e3a5f]"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-md shadow-lg'
            : 'bg-white/95 backdrop-blur-md border-b border-gray-200'
        }`}
      >
        <nav className="container mx-auto px-4 lg:px-8" aria-label="القائمة الرئيسية">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-3 group"
              aria-label="المنافذ الذكية - الصفحة الرئيسية"
            >
              <div className="flex items-center gap-3">
                <div className="transition-transform duration-300 group-hover:scale-105">
                  <LogoPro size={48} variant="colored" />
                </div>
                <div className="hidden md:block">
                  <div className="font-bold text-xl" style={{ color: '#1e3a5f' }}>
                    المنافذ الذكية
                  </div>
                  <div className="text-xs" style={{ color: '#6b7c93' }}>
                    Smart Ports Co. Ltd
                  </div>
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1" role="menubar">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className="px-4 py-2 font-medium rounded-lg transition-all hover:bg-gray-100"
                  style={{ color: '#1e3a5f' }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+966667780832"
                className="px-5 py-2.5 rounded-xl border-2 font-medium transition-all hover:shadow-md hover:border-[#d4a574] flex items-center gap-2"
                style={{ borderColor: '#d4a574', color: '#1e3a5f', backgroundColor: 'white' }}
              >
                <Phone size={16} />
                <span>اتصل بنا</span>
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-xl font-medium transition-all hover:shadow-lg hover:scale-105 text-white flex items-center gap-2"
                style={{ backgroundColor: '#1e3a5f' }}
              >
                <span>احصل على عرض</span>
                <ChevronDown size={18} className="rotate-[-90deg]" />
              </a>
              <a
                href="#admin"
                className="px-4 py-2.5 rounded-xl border font-medium transition-all hover:shadow-md text-sm"
                style={{ borderColor: '#6b7c93', color: '#6b7c93' }}
                aria-label="دخول لوحة الإدارة"
              >
                الإدارة
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: '#1e3a5f' }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div
              id="mobile-menu"
              className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top-2"
              role="menu"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    role="menuitem"
                    className="px-4 py-3 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#1e3a5f' }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-gray-200">
                <a
                  href="tel:+966667780832"
                  className="px-6 py-3 rounded-xl border-2 text-center font-medium flex items-center justify-center gap-2"
                  style={{ borderColor: '#d4a574', color: '#1e3a5f' }}
                >
                  <Phone size={18} />
                  <span>اتصل بنا الآن</span>
                </a>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="px-6 py-3 rounded-xl text-center text-white font-medium flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#1e3a5f' }}
                >
                  <span>احصل على عرض سعر</span>
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-20" />
    </>
  );
}
