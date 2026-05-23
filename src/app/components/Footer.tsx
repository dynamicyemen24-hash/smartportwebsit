import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Globe,
  Shield,
  Award,
  Clock,
} from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'إدارة المستودعات', href: '#solutions' },
    { label: 'النقل والشحن', href: '#solutions' },
    { label: 'سلاسل الإمداد', href: '#solutions' },
    { label: 'خدمات التوزيع', href: '#solutions' },
    { label: 'الحلول الذكية', href: '#solutions' },
  ];

  const services = [
    { label: 'الطاقة الشمسية', href: '#services' },
    { label: 'المقاولات العامة', href: '#services' },
    { label: 'الاستشارات الهندسية', href: '#services' },
    { label: 'البنية التحتية', href: '#services' },
    { label: 'المشاريع المنفذة', href: '#projects' },
  ];

  const contactInfo = [
    { icon: MapPin, text: 'الرياض، المملكة العربية السعودية', href: null },
    { icon: Phone, text: '+966 66 777 0832', href: 'tel:+966667780832' },
    { icon: Mail, text: 'info@smartportsco.com', href: 'mailto:info@smartportsco.com' },
    { icon: Globe, text: 'smartportsco.com', href: 'https://smartportsco.com' },
  ];

  const trustBadges = [
    { icon: Award, text: 'ISO 9001:2015 معتمد' },
    { icon: Shield, text: 'بياناتك محمية' },
    { icon: Clock, text: 'دعم 24/7' },
  ];

  return (
    <footer className="pt-16 pb-8" style={{ backgroundColor: '#1e3a5f' }}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 pb-8 border-b border-white/10">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="flex items-center gap-2 text-white/70">
                <Icon size={16} style={{ color: '#d4a574' }} />
                <span className="text-sm">{badge.text}</span>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#d4a574' }}
              >
                <Logo size={32} />
              </div>
              <div>
                <div className="text-white font-bold">المنافذ الذكية</div>
                <div className="text-xs text-gray-400">Smart Ports Co. Ltd</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              رواد الحلول اللوجستية والاستشارات المؤسسية المتكاملة في المملكة العربية السعودية
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/smartportsco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فيسبوك"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:opacity-80"
                style={{ backgroundColor: '#d4a574' }}
              >
                <Facebook size={18} style={{ color: '#1e3a5f' }} />
              </a>
              <a
                href="https://twitter.com/smartportsco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تويتر"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:opacity-80"
                style={{ backgroundColor: '#d4a574' }}
              >
                <Twitter size={18} style={{ color: '#1e3a5f' }} />
              </a>
              <a
                href="https://www.linkedin.com/company/smartportsco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="لينكد إن"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:opacity-80"
                style={{ backgroundColor: '#d4a574' }}
              >
                <Linkedin size={18} style={{ color: '#1e3a5f' }} />
              </a>
              <a
                href="https://www.instagram.com/smartportsco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="إنستغرام"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:opacity-80"
                style={{ backgroundColor: '#d4a574' }}
              >
                <Instagram size={18} style={{ color: '#1e3a5f' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg mb-4 font-semibold">الحلول اللوجستية</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4a574] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-lg mb-4 font-semibold">خدماتنا</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4a574] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg mb-4 font-semibold">تواصل معنا</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const Content = (
                  <span className="flex items-center gap-2">
                    <Icon size={16} style={{ color: '#d4a574' }} />
                    <span>{item.text}</span>
                  </span>
                );
                return (
                  <li key={index}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-white transition-colors flex items-center gap-2"
                      >
                        {Content}
                      </a>
                    ) : (
                      Content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>© {currentYear} المنافذ الذكية المحدودة. جميع الحقوق محفوظة.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="hover:text-white transition-colors">
                الشروط والأحكام
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                عن الشركة
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              سجل تجاري رقم: 1010XXXXXX | الرقم الضريبي: 300XXXXXXX00003
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
