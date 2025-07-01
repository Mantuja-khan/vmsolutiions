import { Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight
} from 'lucide-react'
import logo from "../../../images/logo.png"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: 'Services', path: '/services' },
      { name: 'About Us', path: '/about' }
    ],
    'Services': [
      { name: 'Laptop Sales & Service', path: '/services/laptop-services' },
      { name: 'CCTV Installation', path: '/services/cctv-installation' },
      { name: 'Google Workspace', path: '/services/google-workspace' },
      { name: 'Digital Marketing', path: '/services/digital-marketing' }
    ],
    'Insurance': [
      { name: 'Health Insurance', path: '/insurance/health' },
      { name: 'Vehicle Insurance', path: '/insurance/vehicle' },
      { name: 'Life Insurance', path: '/insurance/life' }
    ],
    'Loans': [
      { name: 'Personal Loan', path: '/loan/personal' },
      { name: 'Home Loan', path: '/loan/home' },
      { name: 'Business Loan', path: '/loan/business' },
      { name: 'Gold Loan', path: '/loan/gold' }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700' }
  ]

  return (
    <footer className="bg-gray-900 text-white">


      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                {logo ? (
                  <img
                    src={logo}
                    alt="Company Logo"
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}

                {/* Fallback if logo fails or isn't provided */}
                <div className="hidden w-10 h-10 md:w-12 md:h-12 gradient-bg rounded-lg items-center justify-center">
                  <span className="text-white font-bold text-xl">VM</span>
                </div>

                <span className="text-xl font-bold">Vm solutiions</span>
              </Link>

              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Your trusted partner for all tech solutions. From laptops and accessories to
                comprehensive digital services, insurance, and loans - we've got you covered.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Address
                    F-GF-70,71,Ground Floor,Capital Highstreet,Phool Bagh,Bhiwadi(Alwar)</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-400">+91 935-8853-990</span>
                </div>
                <div className="flex items-start space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                  <div className="text-gray-400">
                    <div>Manojj@prernainffotech.com</div>
                    <div>vishal@prernainffotech.com</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-lg font-semibold mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400">
                © {currentYear} Vm solutiions. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer