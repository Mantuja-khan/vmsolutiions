import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { 
  Package, 
  Calendar, 
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  X,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Download
} from 'lucide-react'

const OrderDetail = () => {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated()) {
      fetchOrder()
    }
  }, [id, isAuthenticated])

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`https://vmsolutiions-backend.onrender.com/api/orders/${id}`)
      setOrder(response.data)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />
      case 'confirmed':
        return <CheckCircle className="w-6 h-6 text-blue-500" />
      case 'processing':
        return <Package className="w-6 h-6 text-purple-500" />
      case 'shipped':
        return <Truck className="w-6 h-6 text-orange-500" />
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'cancelled':
        return <X className="w-6 h-6 text-red-500" />
      default:
        return <Clock className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'shipped':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const orderSteps = [
    { key: 'pending', label: 'Order Placed', icon: CheckCircle },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { key: 'processing', label: 'Processing', icon: Package },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle }
  ]

  const getCurrentStepIndex = (status) => {
    return orderSteps.findIndex(step => step.key === status)
  }

  if (!isAuthenticated()) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to view order details</p>
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Link to="/orders" className="btn-primary">
            Back to Orders
          </Link>
        </div>
      </div>
    )
  }

  const currentStepIndex = getCurrentStepIndex(order.status)

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/orders"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Order #{order._id.slice(-8)}
                  </h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CreditCard className="w-4 h-4 mr-1" />
                      ₹{order.totalAmount?.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Order Progress */}
              {order.status !== 'cancelled' && (
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    {orderSteps.map((step, index) => (
                      <div key={step.key} className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          index <= currentStepIndex
                            ? 'bg-primary-500 border-primary-500 text-white'
                            : 'bg-gray-100 border-gray-300 text-gray-400'
                        }`}>
                          <step.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs mt-2 text-center ${
                          index <= currentStepIndex ? 'text-primary-600 font-medium' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </span>
                        {index < orderSteps.length - 1 && (
                          <div className={`absolute h-0.5 w-full mt-5 ${
                            index < currentStepIndex ? 'bg-primary-500' : 'bg-gray-300'
                          }`} style={{ left: '50%', right: '-50%' }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {order.trackingNumber && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Truck className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-900">
                      Tracking Number: {order.trackingNumber}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.product?.images?.[0] || 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg'}
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900">
                        
                        {item.product?.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.product?.brand && `Brand: ${item.product.brand}`}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          Price: ₹{item.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        ₹{(item.price * item.quantity)?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{order.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹{Math.round(order.totalAmount * 0.18)?.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-primary-600">
                      ₹{Math.round(order.totalAmount * 1.18)?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full btn-outline mt-4 flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </button>
            </motion.div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Address
                </h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                  <p>{order.shippingAddress.pincode}</p>
                  <div className="flex items-center mt-3">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{order.shippingAddress.phone}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payment Information */}
            {order.paymentDetails && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </h2>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Method:</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {order.paymentDetails.method}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={`font-medium ${
                      order.paymentDetails.status === 'completed' 
                        ? 'text-green-600' 
                        : 'text-yellow-600'
                    }`}>
                      {order.paymentDetails.status?.charAt(0).toUpperCase() + order.paymentDetails.status?.slice(1)}
                    </span>
                  </div>
                  {order.paymentDetails.paymentId && (
                    <div className="flex justify-between">
                      <span>Payment ID:</span>
                      <span className="font-medium text-gray-900 text-xs">
                        {order.paymentDetails.paymentId}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail