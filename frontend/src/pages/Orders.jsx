import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { 
  Package, 
  Eye, 
  Calendar, 
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  X
} from 'lucide-react'

const Orders = () => {
  const { isAuthenticated } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated()) {
      fetchOrders()
    }
  }, [isAuthenticated])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://vmsolutiions-backend.onrender.com/api/orders/my-orders')
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />
      case 'processing':
        return <Package className="w-5 h-5 text-purple-500" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-orange-500" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'cancelled':
        return <X className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-purple-100 text-purple-800'
      case 'shipped':
        return 'bg-orange-100 text-orange-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!isAuthenticated()) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to view your orders</p>
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
          <div className="animate-pulse space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping to see your orders here.</p>
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order._id.slice(-8)}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CreditCard className="w-4 h-4 mr-1" />
                          ₹{order.totalAmount?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <Link
                      to={`/orders/${order._id}`}
                      className="btn-outline py-2 px-4 text-sm flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items?.slice(0, 2).map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                      <img
                        src={item.product?.images?.[0] || 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg'}
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.product?.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ₹{item.price?.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ₹{(item.price * item.quantity)?.toLocaleString()}
                      </div>
                    </div>
                  ))}
                  
                  {order.items?.length > 2 && (
                    <div className="text-sm text-gray-600 text-center py-2">
                      +{order.items.length - 2} more items
                    </div>
                  )}
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h4>
                    <div className="text-sm text-gray-600">
                      <p>{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                      <p>{order.shippingAddress.phone}</p>
                    </div>
                  </div>
                )}

                {/* Order Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {order.trackingNumber && (
                      <span>Tracking: <span className="font-medium">{order.trackingNumber}</span></span>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    {order.status === 'delivered' && (
                      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                        Write Review
                      </button>
                    )}
                    {(order.status === 'pending' || order.status === 'confirmed') && (
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                        Cancel Order
                      </button>
                    )}
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders