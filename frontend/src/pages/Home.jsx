import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useCart } from '../contexts/CartContext'
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
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Eye
} from 'lucide-react'

const Home = () => {
  const { addToCart } = useCart()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (featuredProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.min(featuredProducts.length, 6))
      }, 4000)
      return () => clearInterval(timer)
    }
  }, [featuredProducts])

  const fetchProducts = async () => {
    try {
      // Fetch all products
      const allProductsResponse = await axios.get('https://vmsolutiions-backend.onrender.com/api/products?limit=8')
      setAllProducts(allProductsResponse.data.products || [])

      // Fetch featured products (products with offers)
      const featuredResponse = await axios.get('https://vmsolutiions-backend.onrender.com/api/products/featured/list')
      setFeaturedProducts(featuredResponse.data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.min(featuredProducts.length, 6))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.min(featuredProducts.length, 6)) % Math.min(featuredProducts.length, 6))
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1)
  }

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

  return (
    <div className="pt-16 pb-20 md:pb-8">
      {/* Hero Section with Product Carousel */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 md:w-64 md:h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 md:w-64 md:h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6">
                Your Complete
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Tech Partner
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl">
                From premium laptops to comprehensive digital services, insurance, and loans - 
                everything you need in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="btn-primary text-sm md:text-base px-4 md:px-6 py-2 md:py-3 bg-white text-primary-600 hover:bg-gray-100"
                >
                  Shop Products
                </Link>
                <Link
                  to="/services"
                  className="btn-outline text-sm md:text-base px-4 md:px-6 py-2 md:py-3 border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Product Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {!loading && featuredProducts.length > 0 && (
                <div className="relative w-full max-w-sm md:max-w-md mx-auto">
                  <div className="relative h-80 md:h-96 bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Product Carousel */}
                    <div className="relative h-full">
                      {featuredProducts.slice(0, 6).map((product, index) => (
                        <motion.div
                          key={product._id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: index === currentSlide ? 1 : 0,
                            scale: index === currentSlide ? 1 : 0.8,
                            zIndex: index === currentSlide ? 10 : 1
                          }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 flex flex-col justify-center items-center p-4 md:p-6"
                        >
                          <div className="w-32 h-32 md:w-40 md:h-40 mb-4 md:mb-6 rounded-xl overflow-hidden shadow-2xl">
                            <img
                              src={product.images[0] || 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg'}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-base md:text-lg font-bold text-white text-center mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center space-x-2 mb-4">
                            {product.originalPrice && (
                              <span className="text-gray-300 line-through text-xs md:text-sm">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                            <span className="text-lg md:text-xl font-bold text-yellow-400">
                              ₹{product.price.toLocaleString()}
                            </span>
                          </div>
                          <Link
                            to={`/products/${product._id}`}
                            className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-xs md:text-sm px-3 py-2"
                          >
                            View Details
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 md:p-2 transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 md:p-2 transition-all duration-200"
                    >
                      <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {featuredProducts.slice(0, 6).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentSlide ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
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

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of premium laptops and tech accessories
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="card p-4 md:p-6 animate-pulse">
                  <div className="bg-gray-300 h-40 md:h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : allProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {allProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card group hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images[0] || 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg'}
                      alt={product.name}
                      className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.hasOffer && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Sale
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs ml-1">{product.ratings?.average || 4.5}</span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <Link
                          to={`/products/${product._id}`}
                          className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>
                      {product.stock > 0 ? (
                        <span className="text-green-600 text-xs font-medium">In Stock</span>
                      ) : (
                        <span className="text-red-600 text-xs font-medium">Out of Stock</span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-xs">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-base md:text-lg font-bold text-primary-600">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                      {product.brand && (
                        <span className="text-xs text-gray-500">{product.brand}</span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        to={`/products/${product._id}`}
                        className="flex-1 btn-outline text-center py-2 text-xs"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="flex-1 btn-primary py-2 text-xs flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <ShoppingBag className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products available</h3>
              <p className="text-gray-600">Check back later for new products</p>
            </div>
          )}

          {/* View All Products Button */}
          {allProducts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="btn-primary inline-flex items-center"
              >
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose VM Solutions?
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

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg text-gray-100 mb-6 md:mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and experience the VM Solutions difference
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                to="/products"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
              >
                Start Shopping
              </Link>
              <Link
                to="/register"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home