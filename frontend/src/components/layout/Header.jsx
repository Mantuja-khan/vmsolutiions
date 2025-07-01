import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import logo from "../../../images/logo.png"
import logo_1 from "../../../images/logo_1.png"
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Package,
  FileText,
  Settings,
  ChevronUp,
  Shield,
  CreditCard
} from 'lucide-react'

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const { getCartItemsCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }, [location])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  const sidebarLinks = [
    { name: 'Insurance', path: '/insurance', icon: Shield },
    { name: 'Loans', path: '/loans', icon: CreditCard },
    ...navLinks.map(link => ({ ...link, icon: FileText }))
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mobile-header ${isScrolled ? 'bg-white shadow-lg backdrop-blur-md' : 'bg-white/95 backdrop-blur-sm'
        }`}>
        <div className="w-full px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 md:space-x-3">
              <img
                src={logo_1}
                alt="Company Logo"
                className="w-24 h-20 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"

              />
              {/* Optional fallback if image fails to load */}
              <div className="hidden w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-lg items-center justify-center">
                <span className="text-gray-600 font-bold text-sm md:text-xl">LOGO</span>
              </div>
            </Link>


            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link
                to="/"
                className={`text-sm lg:text-base text-gray-700 hover:text-primary-500 transition-colors duration-200 ${location.pathname === '/' ? 'text-primary-500 font-medium' : ''
                  }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`text-sm lg:text-base text-gray-700 hover:text-primary-500 transition-colors duration-200 ${location.pathname === '/products' ? 'text-primary-500 font-medium' : ''
                  }`}
              >
                Products
              </Link>
              <Link
                to="/services"
                className={`text-sm lg:text-base text-gray-700 hover:text-primary-500 transition-colors duration-200 ${location.pathname === '/services' ? 'text-primary-500 font-medium' : ''
                  }`}
              >
                Services
              </Link>
              <Link
                to="/insurance"
                className={`text-sm lg:text-base text-gray-700 hover:text-primary-500 transition-colors duration-200 ${location.pathname === '/insurance' ? 'text-primary-500 font-medium' : ''
                  }`}
              >
                Insurance
              </Link>
              <Link
                to="/loans"
                className={`text-sm lg:text-base text-gray-700 hover:text-primary-500 transition-colors duration-200 ${location.pathname === '/loans' ? 'text-primary-500 font-medium' : ''
                  }`}
              >
                Loans
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm lg:text-base text-gray-700 hover:text-primary-500 transition-colors duration-200 ${location.pathname === link.path ? 'text-primary-500 font-medium' : ''
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Cart - Always visible */}
              <Link
                to="/cart"
                className="relative p-1.5 md:p-2 text-gray-600 hover:text-primary-500 transition-colors duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[10px] md:text-xs">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>

              {/* User Menu - Desktop only */}
              {isAuthenticated() ? (
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-500 transition-colors duration-200"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden lg:block text-sm">{user?.name}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                      <div className="py-2">
                        <div className="px-4 py-2 border-b">
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Package className="w-4 h-4" />
                          <span>Orders</span>
                        </Link>
                        <Link
                          to="/applications"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Applications</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="text-sm lg:text-base text-gray-700 hover:text-primary-500 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-xs lg:text-sm px-2 py-1.5 lg:px-4 lg:py-2"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-1.5 text-gray-600 hover:text-primary-500 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Right Sidebar */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="md:hidden fixed top-0 right-0 h-full w-64 max-w-[80vw] bg-white shadow-xl z-50 transform transition-transform duration-300">
            <div className="flex items-center justify-between p-3 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-primary-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3 h-full overflow-y-auto">
              {/* User Section */}
              {isAuthenticated() ? (
                <div className="px-3 pb-3 border-b">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/applications"
                      className="flex items-center space-x-3 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Applications</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center space-x-3 w-full px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-3 pb-3 border-b">
                  <div className="space-y-1">
                    <Link
                      to="/login"
                      className="flex items-center space-x-3 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center space-x-3 px-2 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="px-3 space-y-1">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center space-x-3 px-2 py-2 text-sm rounded-lg transition-colors duration-200 ${location.pathname === link.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </>
  )
}

const MobileBottomNav = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsProfileMenuOpen(false)
  }

  const bottomNavItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Products', path: '/products', icon: '📱' },
    { name: 'Services', path: '/services', icon: '🔧' },
    { name: 'Orders', path: '/orders', icon: '📦' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Always show bottom nav when at the very top
      if (currentScrollY <= 50) {
        setIsVisible(true)
      } else if (currentScrollY > 100) {
        // Only hide/show based on scroll direction when scrolled down
        if (currentScrollY < lastScrollY) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
          setIsProfileMenuOpen(false)
        }
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Profile Menu Overlay */}
      {isProfileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}

      {/* Profile Menu */}
      {isProfileMenuOpen && (
        <div className="md:hidden fixed bottom-14 left-1/2 transform -translate-x-1/2 z-50 w-56 bg-white rounded-lg shadow-xl border">
          <div className="py-1">
            {isAuthenticated() ? (
              <>
                <div className="px-3 py-2 border-b">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/applications"
                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <FileText className="w-4 h-4" />
                  <span>Applications</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-3 px-3 py-2 text-sm text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 mobile-bottom-nav ${isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}>
        <div className="grid grid-cols-5 py-1">
          {bottomNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center py-1.5 px-1 text-xs transition-colors duration-200 mobile-nav-item ${location.pathname === item.path
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-primary-500'
                }`}
              onClick={() => setIsProfileMenuOpen(false)}
            >
              <span className="text-base mb-0.5 mobile-nav-icon">{item.icon}</span>
              <span className="font-medium text-[9px] leading-tight mobile-nav-text">{item.name}</span>
            </Link>
          ))}

          {/* Profile Button - Center Position */}
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`flex flex-col items-center py-1.5 px-1 text-xs transition-colors duration-200 relative mobile-nav-item ${isProfileMenuOpen ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-500'
              }`}
          >
            <div className="relative">
              <User className="w-4 h-4 mb-0.5" />
              {isProfileMenuOpen && (
                <ChevronUp className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5" />
              )}
            </div>
            <span className="font-medium text-[9px] leading-tight mobile-nav-text">Profile</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Header