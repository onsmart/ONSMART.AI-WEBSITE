
import React from 'react';
import { Link } from "react-router-dom";
import { 
  Linkedin, 
  Instagram, 
  Facebook, 
  Youtube, 
  ShoppingCart, 
  UserCheck, 
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  ArrowRight,
  Sparkles,
  Share2
} from "lucide-react";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('navigation');
  
  return (
    <footer id="footer" className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900 text-white relative overflow-hidden" role="contentinfo" aria-label={t('footer.footerLabel')}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-4">
              <div className="space-y-3">
                <img 
                  src="/images/banner-branco.png" 
                  alt="onsmartAI Logo" 
                  className="h-8 brightness-150" 
                />
                <p className="text-gray-300 text-xs leading-relaxed">
                  {t('footer.companyDescription')}
                </p>
              </div>
            </div>

            {/* Navigation Links - Clean */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white text-sm flex items-center gap-1">
                <div className="w-0.5 h-4 bg-brand-blue rounded-full"></div>
                {t('footer.navigation')}
              </h3>
              
              <div className="space-y-2">
                {[
                  { to: "/", label: t('footer.home') },
                  { to: "/servicos", label: t('footer.services') },
                  { to: "/conteudo", label: t('footer.contentCenter') },
                  { to: "/diagnostico", label: t('footer.diagnostic') },
                  { to: "/contato", label: t('footer.contact') }
                ].map((link) => (
                  <Link 
                    key={link.to}
                    to={link.to} 
                    className="block text-gray-300 hover:text-brand-blue transition-colors text-xs leading-relaxed"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Legal Links */}
              <div className="pt-2 border-t border-gray-700/50 space-y-1">
                <Link to="/politica-privacidade" className="block text-gray-400 hover:text-brand-blue transition-colors text-xs">
                  {t('footer.privacyPolicy')}
                </Link>
                <Link to="/termos-uso" className="block text-gray-400 hover:text-brand-blue transition-colors text-xs">
                  {t('footer.termsOfUse')}
                </Link>
              </div>
            </div>

            {/* Partnership Programs - Clean */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white text-sm flex items-center gap-1">
                <div className="w-0.5 h-4 bg-brand-blue rounded-full"></div>
                {t('footer.partnerships')}
              </h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2 text-sm">{t('footer.resellers')}</h4>
                  <div className="space-y-1">
                    <Link to="/revendas" className="block text-gray-300 hover:text-brand-blue transition-colors text-xs leading-relaxed">
                      {t('footer.becomeReseller')}
                    </Link>
                    <Link to="/revendas/cadastro" className="block text-gray-300 hover:text-brand-blue transition-colors text-xs leading-relaxed">
                      {t('footer.register')}
                    </Link>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2 text-sm">{t('footer.digitalAgents')}</h4>
                  <div className="space-y-1">
                    <Link to="/agentes-digitais" className="block text-gray-300 hover:text-brand-blue transition-colors text-xs leading-relaxed">
                      {t('footer.referralProgram')}
                    </Link>
                    <Link to="/agentes-digitais/cadastro" className="block text-gray-300 hover:text-brand-blue transition-colors text-xs leading-relaxed">
                      {t('footer.becomeAgent')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media & Contact - Compact */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white text-sm flex items-center gap-1">
                <div className="w-0.5 h-4 bg-brand-blue rounded-full"></div>
                {t('footer.socialMedia')}
              </h3>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  {[
                    { 
                      href: "https://www.linkedin.com/company/on-smart-tech/posts/?feedView=all", 
                      icon: Linkedin, 
                      label: "LinkedIn"
                    },
                    { 
                      href: "https://www.instagram.com/onsmart.ai", 
                      icon: Instagram, 
                      label: "Instagram"
                    },
                    { 
                      href: "https://www.youtube.com/channel/UC7IkX4S0ixK0QBSdW8rDaXQ", 
                      icon: Youtube, 
                      label: "YouTube"
                    },
                    { 
                      href: "https://www.facebook.com/onsmart2017/", 
                      icon: Facebook, 
                      label: "Facebook"
                    }
                  ].map((social) => (
                    <a 
                      key={social.label}
                      href={social.href}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-300 hover:text-brand-blue transition-colors"
                      aria-label={`${t('footer.followUsOn')} ${social.label}`}
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>

                <div>
                  <h4 className="font-medium text-white mb-1 text-sm">{t('footer.contactSection')}</h4>
                  <div className="space-y-1">
                    <a 
                      href="mailto:atendimento.ai@onsmart.com.br" 
                      className="flex items-center gap-2 text-gray-300 hover:text-brand-blue transition-colors group"
                    >
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      <span className="text-xs break-all">atendimento.ai@onsmart.com.br</span>
                    </a>
                    <a 
                      href="https://wa.me/5511996669247?text=Olá!%20Vim%20pelo%20site%20da%20Onsmart.ai" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors group"
                    >
                      <MessageCircle className="h-3 w-3 flex-shrink-0" />
                      <span className="text-xs">+55 (11) 99666-9247</span>
                    </a>
                    <a 
                      href="https://wa.me/15558991881?text=Olá!%20Vim%20pelo%20site%20da%20Onsmart.ai" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors group"
                    >
                      <MessageCircle className="h-3 w-3 flex-shrink-0" />
                      <span className="text-xs">1 555 8991881</span>
                      <span className="text-xs text-green-400">(Sonia IA)</span>
                    </a>
                    <a 
                      href="https://wa.me/5511998138045?text=Olá!%20Vim%20pelo%20site%20da%20Onsmart.ai" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors group"
                    >
                      <MessageCircle className="h-3 w-3 flex-shrink-0" />
                      <span className="text-xs">+55 (11) 99813-8045</span>
                      <span className="text-xs text-blue-400">(Atendimento Humanizado)</span>
                    </a>
                    <div className="pt-2 mt-2 border-t border-gray-700/40 space-y-1.5 leading-snug">
                      <p className="text-xs text-gray-400">
                        <span className="text-gray-500">{t('footer.cnpjLabel')}</span> {t('footer.cnpjValue')}
                      </p>
                      <p className="text-xs text-gray-400">
                        <span className="text-gray-500">{t('footer.matrixLabel')}:</span> {t('footer.matrixAddress')}
                      </p>
                      <p className="text-xs text-gray-400">
                        <span className="text-gray-500">{t('footer.branchLabel')}:</span> {t('footer.branchAddress')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="text-gray-400 text-xs text-center sm:text-left">
                © {new Date().getFullYear()} onsmartAI. {t('footer.rights')}.
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-xs">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{t('footer.location')}</span>
                </div>
                <div className="w-px h-3 bg-gray-600"></div>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-brand-blue" />
                  <span>{t('footer.poweredBy')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
