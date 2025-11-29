import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  CreditCard, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Lock,
  CheckCircle,
  Copy
} from 'lucide-react'

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [useProfileAddress, setUseProfileAddress] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  })

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login?redirect=/checkout')
      return
    }
    
    if (cartItems.length === 0) {
      navigate('/cart')
      return
    }

    // Initialize with user data
    if (user) {
      setShippingAddress(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || ''
      }))

      // Check if user has saved address
      if (user.address && (user.address.street || user.address.city || user.address.state || user.address.pincode)) {
        setUseProfileAddress(true)
        setShippingAddress({
          name: user.name || '',
          phone: user.phone || '',
          street: user.address.street || '',
          city: user.address.city || '',
          state: user.address.state || '',
          pincode: user.address.pincode || ''
        })
      }
    }
  }, [isAuthenticated, cartItems, navigate, user])

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    })
  }

  const handleUseProfileAddress = () => {
    if (user?.address) {
      setUseProfileAddress(true)
      setShippingAddress({
        name: user.name || '',
        phone: user.phone || '',
        street: user.address.street || '',
        city: user.address.city || '',
        state: user.address.state || '',
        pincode: user.address.pincode || ''
      })
    } else {
      toast.error('No saved address found in profile')
    }
  }

  const handleClearAddress = () => {
    setUseProfileAddress(false)
    setShippingAddress({
      name: user?.name || '',
      phone: user?.phone || '',
      street: '',
      city: '',
      state: '',
      pincode: ''
    })
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    try {
      setLoading(true)

      // Validate shipping address
      const requiredFields = ['name', 'phone', 'street', 'city', 'state', 'pincode']
      for (const field of requiredFields) {
        if (!shippingAddress[field]) {
          toast.error(`Please fill in ${field}`)
          return
        }
      }

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway')
        return
      }

      const totalAmount = Math.round(getCartTotal() * 1.18) // Including 18% tax

      // Create Razorpay order
      const orderResponse = await axios.post('https://http://72.61.227.137:5000/api/payments/create-order', {
        amount: totalAmount
      })

      const { orderId, amount, currency, key } = orderResponse.data

      // Razorpay options
      const options = {
        key,
        amount,
        currency,
        name: 'VM Solutions',
        description: 'Purchase from VM Solutions',
        order_id: orderId,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyResponse = await axios.post('https://http://72.61.227.137:5000/api/payments/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })

            if (verifyResponse.data.success) {
              // Create order in database
              const orderData = {
                items: cartItems.map(item => ({
                  productId: item._id,
                  quantity: item.quantity
                })),
                shippingAddress,
                paymentDetails: {
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                  method: 'razorpay',
                  status: 'completed'
                }
              }

              const createOrderResponse = await axios.post('https://http://72.61.227.137:5000/api/orders', orderData)
              
              if (createOrderResponse.data) {
                clearCart()
                toast.success('Order placed successfully!')
                navigate(`/orders/${createOrderResponse.data._id}`)
              }
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            toast.error('Payment verification failed')
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone
        },
        theme: {
          color: '#3B82F6'
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()

    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const subtotal = getCartTotal()
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + tax

  return (
    <div className="pt-16 pb-20 md:pb-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Shipping Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Address
                </h2>
                
                {user?.address && (user.address.street || user.address.city || user.address.state || user.address.pincode) && (
                  <div className="flex space-x-2">
                    {!useProfileAddress ? (
                      <button
                        onClick={handleUseProfileAddress}
                        className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
                      >
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Use Saved Address
                      </button>
                    ) : (
                      <button
                        onClick={handleClearAddress}
                        className="text-xs sm:text-sm text-gray-600 hover:text-gray-700 font-medium"
                      >
                        Clear & Enter New
                      </button>
                    )}
                  </div>
                )}
              </div>

              {useProfileAddress && user?.address && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-800 font-medium mb-1">Using saved address from profile:</p>
                  <div className="text-xs sm:text-sm text-blue-700">
                    <p>{user.address.street}</p>
                    <p>{user.address.city}, {user.address.state} - {user.address.pincode}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="name"
                      value={shippingAddress.name}
                      onChange={handleInputChange}
                      className="input-field pl-10 text-sm sm:text-base"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      className="input-field pl-10 text-sm sm:text-base"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <textarea
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleInputChange}
                    className="input-field resize-none text-sm sm:text-base"
                    rows={3}
                    placeholder="Enter your street address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="input-field text-sm sm:text-base"
                    placeholder="Enter your city"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    className="input-field text-sm sm:text-base"
                    placeholder="Enter your state"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={shippingAddress.pincode}
                    onChange={handleInputChange}
                    className="input-field text-sm sm:text-base"
                    placeholder="Enter PIN code"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Method
              </h2>
              
              <div className="border border-primary-200 rounded-lg p-4 bg-primary-50">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="razorpay"
                    name="payment"
                    defaultChecked
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="razorpay" className="ml-3 flex items-center">
                    <span className="font-medium text-gray-900">Razorpay</span>
                    <span className="ml-2 text-sm text-gray-600">
                      (Credit Card, Debit Card, UPI, Net Banking)
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-4 flex items-center text-sm text-gray-600">
                <Lock className="w-4 h-4 mr-2" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-24">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4">
                    <img
                      src={item.images?.[0] || 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg'}
                      alt={item.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-primary-600">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full btn-primary py-3 sm:py-4 mt-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Place Order
                  </>
                )}
              </button>

              {/* Security Info */}
              <div className="mt-4 text-center text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>256-bit SSL encrypted checkout</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout