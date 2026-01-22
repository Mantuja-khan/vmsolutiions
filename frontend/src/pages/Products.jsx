import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  ShoppingCart,
  Heart,
  Eye
} from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const Products = () => {
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'laptop', label: 'Laptops' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'services', label: 'Services' },
    { value: 'software', label: 'Software' }
  ]

  useEffect(() => {
    fetchProducts()
  }, [searchTerm, selectedCategory, currentPage])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        params: {
          search: searchTerm,
          category: selectedCategory,
          page: currentPage,
          limit: 12
        }
      })
      setProducts(response.data.products)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1)
  }

  const ProductCard = ({ product, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`card group ${viewMode === 'list' ? 'flex' : ''}`}
    >
      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
        <img
          src={product.images[0] || 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg'}
          alt={product.name}
          className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            viewMode === 'list' ? 'h-32' : 'h-32 sm:h-40 md:h-48'
          }`}
        />
        {product.hasOffer && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-red-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
            Sale
          </div>
        )}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
          <span className="text-xs sm:text-sm ml-1">{product.ratings?.average || 4.5}</span>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button className="p-1.5 sm:p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </button>
            <button className="p-1.5 sm:p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div className={`p-3 sm:p-4 md:p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          {product.stock > 0 ? (
            <span className="text-green-600 text-xs sm:text-sm font-medium whitespace-nowrap ml-2">In Stock</span>
          ) : (
            <span className="text-red-600 text-xs sm:text-sm font-medium whitespace-nowrap ml-2">Out of Stock</span>
          )}
        </div>
        
        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center space-x-1 sm:space-x-2">
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-xs sm:text-sm">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-sm sm:text-lg md:text-xl font-bold text-primary-600">
              ₹{product.price.toLocaleString()}
            </span>
          </div>
          {product.brand && (
            <span className="text-xs sm:text-sm text-gray-500">{product.brand}</span>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
          <Link
            to={`/products/${product._id}`}
            className="flex-1 btn-outline text-center py-1.5 sm:py-2 text-xs sm:text-sm"
          >
            View Details
          </Link>
          <button
            onClick={() => handleAddToCart(product)}
            disabled={product.stock === 0}
            className="flex-1 btn-primary py-1.5 sm:py-2 text-xs sm:text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
         

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {loading ? (
          <div className={`grid gap-3 sm:gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card p-3 sm:p-4 md:p-6 animate-pulse">
                <div className="bg-gray-300 h-32 sm:h-40 md:h-48 rounded-lg mb-4"></div>
                <div className="h-3 sm:h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 sm:h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-6 sm:h-8 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className={`grid gap-3 sm:gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 border rounded-lg ${
                    currentPage === index + 1
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products