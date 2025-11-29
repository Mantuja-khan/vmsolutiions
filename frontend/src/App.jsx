import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

// Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import PWAInstallPrompt from './components/PWAInstallPrompt'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Services from './pages/Services'
import Insurance from './pages/Insurance'
import Loans from './pages/Loans'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import VerifyOTP from './pages/auth/VerifyOTP'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'

// Application Forms
import InsuranceForm from './pages/forms/InsuranceForm'
import LoanForm from './pages/forms/LoanForm'
import Applications from './pages/Applications'

// Services
import LaptopServices from './pages/services/LaptopServices'
import CCTVInstallation from './pages/services/CCTVInstallation'
import GoogleWorkspace from './pages/services/GoogleWorkspace'
import DigitalMarketing from './pages/services/DigitalMarketing'
import WebsiteDesigning from './pages/services/WebsiteDesigning'


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/insurance" element={<Insurance />} />
                <Route path="/loans" element={<Loans />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services/laptop-services" element={<LaptopServices />} />
                <Route path="/services/cctv-installation" element={<CCTVInstallation />} />
                <Route path="/services/google-workspace" element={<GoogleWorkspace />} />
                <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
                <Route path="/services/website-designing" element={<WebsiteDesigning />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/insurance/:type" element={<InsuranceForm />} />
                <Route path="/loan/:type" element={<LoanForm />} />
              </Routes>
            </main>
            <Footer />
            <PWAInstallPrompt />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App