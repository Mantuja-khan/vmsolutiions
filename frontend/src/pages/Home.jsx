import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useCart } from '../contexts/CartContext'
import sukoh from "../assets/sukoh.png"
import shree from "../assets/shree.png"
import ds from "../assets/ds.png"
import garv from "../assets/garventerprises.png"
import blue from "../assets/bluesip.png"
import niraaj from "../assets/niraaj.png"
import { 
  ShoppingBag, 
  Shield, 
  CreditCard, 
  Laptop, 
  Camera, 
  Cloud,
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle,
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react'

// Import your images here - replace with your actual image paths
import hero_image from "../assets/home.png"
// import hero_image2 from "../assets/hero2.png"
// import hero_image3 from "../assets/hero3.png"
// import hero_image4 from "../assets/hero4.png"

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Hero Slides Data
  const heroSlides = [
    {
      title: "Your Complete",
      highlight: "Tech Partner",
      description: "From premium laptops to comprehensive digital services, insurance, and loans - everything you need in one place.",
      image: hero_image,
      primaryBtn: { text: "Shop Products", link: "/products" },
      secondaryBtn: { text: "Explore Services", link: "/services" }
    },
    {
      title: "Premium",
      highlight: "Laptop Solutions",
      description: "Discover high-quality laptops from trusted brands with professional repair and maintenance services.",
      image: hero_image, // Replace with hero_image2
      primaryBtn: { text: "Browse Laptops", link: "/products" },
      secondaryBtn: { text: "Repair Services", link: "/services/laptop-services" }
    },
    {
      title: "Secure Your",
      highlight: "Future Today",
      description: "Comprehensive insurance and flexible loan solutions tailored to protect and empower your financial journey.",
      image: hero_image, // Replace with hero_image3
      primaryBtn: { text: "Get Insurance", link: "/insurance" },
      secondaryBtn: { text: "Apply for Loan", link: "/loans" }
    },
    {
      title: "Digital",
      highlight: "Transformation",
      description: "CCTV security, Google Workspace, and digital marketing services to elevate your business to the next level.",
      image: hero_image, // Replace with hero_image4
      primaryBtn: { text: "View Services", link: "/services" },
      secondaryBtn: { text: "Contact Us", link: "/contact" }
    }
  ]

  // Testimonials Data
const testimonials = [
  {
    name: "Blue Sip Team",
    firm: "Blue Sip",
    role: "Founder",
    image: blue,
    previewImage: blue,
    rating: 5,
    text: "VM Solutions delivered a clean and modern website that perfectly represents our brand identity.",
    website: "https://bluesip.org.in/"
  },
  {
    name: "Niraaj Packaging",
    firm: "Niraaj Pack",
    role: "Director",
    image: "https://ui-avatars.com/api/?name=Niraaj+Packaging",
    previewImage: niraaj,
    rating: 5,
    text: "Our company website was developed professionally with excellent performance and responsiveness.",
    website: "https://niraajpack.com/"
  },
  {
    name: "Garv Enterprises",
    firm: "Garv Enterprises",
    role: "Owner",
    image: garv,
    previewImage: garv,
    rating: 5,
    text: "The website built for our pneumatic tools business is fast, attractive, and easy to manage.",
    website: "https://garventerprises.in/"
  },
  {
    name: "DS Engineering",
    firm: "DS Engineering Works",
    role: "Managing Director",
    image: ds,
    previewImage: ds,
    rating: 5,
    text: "A professional engineering website with modern UI and great user experience.",
    website: "https://www.dsengineeringworks.com/"
  },
  {
    name: "Shree Enterprises Pvt. Ltd.",
    firm: "Shree enterprises",
    role: "Client",
    image: shree,
    previewImage: shree,
    rating: 5,
    text: "Website created by prerna infotech really push my business , ",
    website: "https://shreeenterprises29.com/"
  },
  {
    name: "Sukoh Technlogies pvt. ltd.",
    firm: "Sukoh Technologies",
    role: "Client",
    image: sukoh,
    previewImage: sukoh,
    rating: 5,
    text: "VM Solutiions provided really well designed website for our company and it really helped us to grow our business.",
    website: "https://sukohtechnologies.com/"
  }
];
  const services = [
    {
      icon: Laptop,
      title: 'Laptop Sales & Services',
      description: 'Premium laptops and professional repair services',
      link: '/services/laptop-services',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Camera,
      title: 'CCTV Installation',
      description: 'Complete security camera setup and monitoring',
      link: '/services/cctv-installation',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Cloud,
      title: 'Google Workspace',
      description: 'Cloud-based productivity solutions',
      link: '/services/google-workspace',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Grow your business with digital strategies',
      link: '/services/digital-marketing',
      color: 'from-pink-500 to-violet-600'
    }
  ]
  const features = [
    {
      icon: ShoppingBag,
      title: 'Premium Products',
      description: 'High-quality laptops and accessories from trusted brands'
    },
    {
      icon: Shield,
      title: 'Insurance Solutions',
      description: 'Comprehensive health, vehicle, and life insurance plans'
    },
    {
      icon: CreditCard,
      title: 'Flexible Loans',
      description: 'Personal, home, business, and gold loans with competitive rates'
    },
    {
      icon: CheckCircle,
      title: 'Expert Support',
      description: '24/7 technical support and customer service'
    }
  ]
  const stats = [
    { number: '5000+', label: 'Happy Customers' },
    { number: '100+', label: 'Products Available' },
    { number: '50+', label: 'Service Locations' },
    { number: '99%', label: 'Customer Satisfaction' }
  ]

  // Auto-slide for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  // Auto-slide for testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000) // Change testimonial every 4 seconds

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

 

  return (
    <div className="pt-16 pb-20 md:pb-8">
      {/* Hero Section with Slider */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 md:w-64 md:h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 md:w-64 md:h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6"
                >
                  {heroSlides[currentSlide].title}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    {heroSlides[currentSlide].highlight}
                  </span>
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
                >
                  <Link
                    to={heroSlides[currentSlide].primaryBtn.link}
                    className="btn-primary text-sm md:text-base px-4 md:px-6 py-2 md:py-3 bg-white text-primary-600 hover:bg-gray-100"
                  >
                    {heroSlides[currentSlide].primaryBtn.text}
                  </Link>
                  <Link
                    to={heroSlides[currentSlide].secondaryBtn.link}
                    className="btn-outline text-sm md:text-base px-4 md:px-6 py-2 md:py-3 border-white text-white hover:bg-white hover:text-primary-600"
                  >
                    {heroSlides[currentSlide].secondaryBtn.text}
                  </Link>
                </motion.div>
              </div>

              {/* Right Content - Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-full max-w-sm md:max-w-lg mx-auto">
                  <div className="relative h-80 md:h-96 backdrop-blur-sm rounded-2xl overflow-hidden ">    
                    <img
                      src={heroSlides[currentSlide].image}
                      alt={`VM Solutiions - ${heroSlides[currentSlide].title}`}
                      className="w-full h-full object-cover"
                    />    
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          
          

          {/* Slide Indicators */}
          
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-4 h-6 md:w-6 md:h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-2 md:w-1 md:h-3 bg-white rounded-full mt-1 md:mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose VM Solutiions?
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive tech solutions backed by expertise and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center p-4 md:p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Professional tech services tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={service.link}
                  className="card block p-4 md:p-6 text-center hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 group-hover:text-primary-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-center text-primary-500 group-hover:text-primary-600">
                    <span className="mr-2 text-sm md:text-base">Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Happy Customers / Testimonials Section */}
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
  <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Our Success Stories
      </h2>
      <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
        Humne in businesses ko digital hone mein madad ki hai.
      </p>
    </div>

    {/* Bottom Grid for Desktop */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {testimonials.slice(0, 6).map((item, index) => (
        <div key={index} className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
          
          {/* Website Preview Image */}
          <div className="relative h-48 overflow-hidden bg-gray-200">
            <img 
              src={item.previewImage} 
              alt={`${item.firm} website preview`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <a 
                href={item.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2"
              >
              </a>
            </div>
          </div>

          <div className="p-6">
            {/* Firm & Icon Header */}
            <div className="flex items-center gap-3 mb-4">
              <img src={item.image} className="w-10 h-10 rounded-full border border-primary-100" alt={item.name} />
              <div className="flex-1">
                <h5 className="font-bold text-gray-900 text-sm leading-tight">{item.firm}</h5>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.name} • {item.role}</p>
              </div>
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-600 text-sm italic mb-4 line-clamp-2">
              "{item.text}"
            </p>

            {/* Visit Website Link */}
            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
               <a 
                href={item.website} 
                target="_blank" 
                className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                {item.website.replace('https://', '')}
              </a>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Quick Access to Insurance & Loans */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Financial Solutions
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive insurance and loan solutions for all your financial needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 group-hover:text-primary-600 transition-colors duration-300">
                Insurance Solutions
              </h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Protect what matters most with our comprehensive insurance plans
              </p>
              <Link
                to="/insurance"
                className="btn-primary w-full"
              >
                Explore Insurance
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 group-hover:text-primary-600 transition-colors duration-300">
                Loan Solutions
              </h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Flexible loan options to meet all your financial requirements
              </p>
              <Link
                to="/loans"
                className="btn-primary w-full"
              >
                Explore Loans
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home