import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { 
  Package, 
  ShoppingCart, 
  FileText, 
  Users,
  TrendingUp,
  Calendar,
  Eye
} from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalApplications: 0,
    totalUsers: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [recentApplications, setRecentApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`)
      const { stats, recentOrders, recentApplications } = response.data
      
      setStats(stats || {
        totalProducts: 0,
        totalOrders: 0,
        totalApplications: 0,
        totalUsers: 0
      })
      setRecentOrders(recentOrders || [])
      setRecentApplications(recentApplications || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError('Failed to load dashboard data')
      
      // Set default values on error
      setStats({
        totalProducts: 0,
        totalOrders: 0,
        totalApplications: 0,
        totalUsers: 0
      })
      setRecentOrders([])
      setRecentApplications([])
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Applications',
      value: stats.totalApplications,
      icon: FileText,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ]

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      under_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    }

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status ? status.replace('_', ' ').toUpperCase() : 'UNKNOWN'}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️ {error}</div>
          <button 
            onClick={fetchDashboardData}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value || 0}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">+12% from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Jan', sales: 4000 },
              { name: 'Feb', sales: 3000 },
              { name: 'Mar', sales: 5000 },
              { name: 'Apr', sales: 4500 },
              { name: 'May', sales: 6000 },
              { name: 'Jun', sales: 5500 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { name: 'Jan', users: 400 },
              { name: 'Feb', users: 600 },
              { name: 'Mar', users: 800 },
              { name: 'Apr', users: 1200 },
              { name: 'May', users: 1600 },
              { name: 'Jun', users: 2000 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#14b8a6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOrders && recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order._id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Order #{order._id ? order._id.slice(-6) : 'N/A'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.user?.name || 'Unknown User'} • ₹{order.totalAmount?.toLocaleString() || '0'}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status)}
                      <p className="text-xs text-gray-500 mt-1">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown Date'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No recent orders
              </div>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentApplications && recentApplications.length > 0 ? (
              recentApplications.map((application) => (
                <div key={application._id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {application.type || 'Unknown'} - {application.subType || 'Unknown'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {application.user?.name || 'Unknown User'}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(application.status)}
                      <p className="text-xs text-gray-500 mt-1">
                        {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'Unknown Date'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No recent applications
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard