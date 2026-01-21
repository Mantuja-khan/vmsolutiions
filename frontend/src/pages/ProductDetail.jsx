import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Plus,
  Minus,
  Check
} from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`)
      setProduct(response.data)
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Product not found')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              <div className="bg-gray-300 h-64 sm:h-80 lg:h-96 rounded-lg"></div>
              <div className="space-y-3 sm:space-y-4">
                <div className="h-6 sm:h-8 bg-gray-300 rounded"></div>
                <div className="h-3 sm:h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 sm:h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-8 sm:h-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' }
  ]

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-4 sm:mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 sm:space-x-4 text-sm sm:text-base">
            <li>
              <Link to="/" className="text-gray-400 hover:text-gray-500">Home</Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <Link to="/products" className="text-gray-400 hover:text-gray-500">Products</Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium truncate max-w-[100px] sm:max-w-none">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={product.images[selectedImage] || 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < Math.floor(product.ratings?.average || 4.5)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">
                    ({product.ratings?.count || 0} reviews)
                  </span>
                </div>
                {product.brand && (
                  <span className="text-xs sm:text-sm text-gray-500">by {product.brand}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
              {product.originalPrice && (
                <span className="text-lg sm:text-xl lg:text-2xl text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-2xl sm:text-2xl lg:text-3xl font-bold text-primary-600">
                ₹{product.price.toLocaleString()}
              </span>
              {product.hasOffer && (
                <span className="bg-red-100 text-red-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                  Save ₹{(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.stock > 0 ? (
                <>
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-sm sm:text-base text-green-600 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                </>
              ) : (
                <span className="text-sm sm:text-base text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <span className="px-3 py-2 sm:px-4 sm:py-2 font-medium text-sm sm:text-base">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2 sm:space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary py-2.5 sm:py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Add to Cart
              </button>
              <button className="p-2.5 sm:p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button className="p-2.5 sm:p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">Free Shipping</p>
                  <p className="text-xs sm:text-sm text-gray-600">On orders over ₹5,000</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">Warranty</p>
                  <p className="text-xs sm:text-sm text-gray-600">{product.warranty || '1 Year'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">Easy Returns</p>
                  <p className="text-xs sm:text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-12 lg:mt-16"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-4 sm:py-6 lg:py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 space-y-1 sm:space-y-0">
                    <span className="font-medium text-gray-900 capitalize text-sm sm:text-base">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-gray-600 text-sm sm:text-base sm:text-right">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-6 sm:py-8">
                <p className="text-sm sm:text-base text-gray-600">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetail