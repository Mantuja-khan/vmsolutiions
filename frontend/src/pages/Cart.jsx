import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight,
  ShoppingCart
} from 'lucide-react'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const { isAuthenticated } = useAuth()

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 sm:w-20 md:w-24 sm:h-20 md:h-24 text-gray-300 mx-auto mb-6 sm:mb-8" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Your cart is empty</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn-primary text-sm sm:text-base">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 text-sm font-medium self-start sm:self-auto"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  {/* Image and Product Info */}
                  <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <img
                        src={item.images?.[0] || 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg'}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>
                      {item.brand && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          Brand: {item.brand}
                        </p>
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-2">
                        <span className="text-base sm:text-lg font-bold text-primary-600">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs sm:text-sm text-gray-400 line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Remove Controls */}
                  <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <span className="px-2 sm:px-4 py-1.5 sm:py-2 font-medium text-sm sm:text-base min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Subtotal ({item.quantity} item{item.quantity > 1 ? 's' : ''})
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-24"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Subtotal</span>
                  <span className="text-sm sm:text-base font-medium">₹{getCartTotal().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Shipping</span>
                  <span className="text-sm sm:text-base font-medium text-green-600">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Tax</span>
                  <span className="text-sm sm:text-base font-medium">₹{Math.round(getCartTotal() * 0.18).toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="flex justify-between">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-base sm:text-lg font-bold text-primary-600">
                      ₹{Math.round(getCartTotal() * 1.18).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                {isAuthenticated() ? (
                  <Link
                    to="/checkout"
                    className="w-full btn-primary py-2.5 sm:py-3 flex items-center justify-center text-sm sm:text-base"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Proceed to Checkout
                  </Link>
                ) : (
                  <Link
                    to="/login?redirect=/checkout"
                    className="w-full btn-primary py-2.5 sm:py-3 flex items-center justify-center text-sm sm:text-base"
                  >
                    Login to Checkout
                  </Link>
                )}
                
                <Link
                  to="/products"
                  className="w-full btn-outline py-2.5 sm:py-3 flex items-center justify-center text-sm sm:text-base"
                >
                  Continue Shopping
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart