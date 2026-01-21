import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { 
  FileText, 
  Calendar, 
  Eye, 
  Plus,
  Shield,
  CreditCard,
  Clock,
  CheckCircle,
  X,
  AlertCircle
} from 'lucide-react'

const Applications = () => {
  const { isAuthenticated } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated()) {
      fetchApplications()
    }
  }, [isAuthenticated])

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/applications/my-applications')
      setApplications(response.data)
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'under_review':
        return <AlertCircle className="w-5 h-5 text-blue-500" />
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected':
        return <X className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'under_review':
        return 'bg-blue-100 text-blue-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'insurance':
        return <Shield className="w-6 h-6 text-blue-500" />
      case 'loan':
        return <CreditCard className="w-6 h-6 text-green-500" />
      default:
        return <FileText className="w-6 h-6 text-gray-500" />
    }
  }

  const applicationTypes = [
    {
      type: 'insurance',
      title: 'Insurance Applications',
      description: 'Apply for health, vehicle, and life insurance',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      options: [
        { name: 'Health Insurance', path: '/insurance/health' },
        { name: 'Vehicle Insurance', path: '/insurance/vehicle' },
        { name: 'Life Insurance', path: '/insurance/life' }
      ]
    },
    {
      type: 'loan',
      title: 'Loan Applications',
      description: 'Apply for various types of loans',
      icon: CreditCard,
      color: 'from-green-500 to-green-600',
      options: [
        { name: 'Personal Loan', path: '/loan/personal' },
        { name: 'Home Loan', path: '/loan/home' },
        { name: 'Business Loan', path: '/loan/business' },
        { name: 'Gold Loan', path: '/loan/gold' },
        { name: 'Secured Loan', path: '/loan/secured' },
        { name: 'Unsecured Loan', path: '/loan/unsecured' }
      ]
    }
  ]

  if (!isAuthenticated()) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to view your applications</p>
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

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600 mt-2">Track and manage your insurance and loan applications</p>
        </div>

        {/* New Application Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Apply for New Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applicationTypes.map((appType, index) => (
              <motion.div
                key={appType.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${appType.color} rounded-lg flex items-center justify-center mr-4`}>
                    <appType.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{appType.title}</h3>
                    <p className="text-sm text-gray-600">{appType.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {appType.options.map((option) => (
                    <Link
                      key={option.name}
                      to={option.path}
                      className="text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-2 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {option.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Existing Applications */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Applications</h2>
          
          {applications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600 mb-6">You haven't submitted any applications yet. Start by applying for insurance or loans above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application, index) => (
                <motion.div
                  key={application._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getTypeIcon(application.type)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {application.subType} {application.type}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            Applied on {new Date(application.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FileText className="w-4 h-4 mr-1" />
                            ID: {application._id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(application.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                          {application.status.replace('_', ' ').charAt(0).toUpperCase() + application.status.replace('_', ' ').slice(1)}
                        </span>
                      </div>
                      <Link
                        to={`/applications/${application._id}`}
                        className="btn-outline py-2 px-4 text-sm flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* Application Details Preview */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Applicant:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {application.personalInfo?.fullName}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {application.personalInfo?.email}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {application.personalInfo?.phone}
                        </span>
                      </div>
                    </div>

                    {application.adminNotes && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-1">Admin Notes:</h4>
                        <p className="text-sm text-blue-800">{application.adminNotes}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Applications