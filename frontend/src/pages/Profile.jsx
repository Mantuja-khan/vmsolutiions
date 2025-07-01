import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X
} from 'lucide-react'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user, login } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          pincode: user.address?.pincode || ''
        }
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      
      const response = await axios.put('https://vmsolutiions-backend.onrender.com/api/auth/profile', {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      })

      // Update the user context with new data
      const token = localStorage.getItem('token')
      if (token) {
        login(token, response.data.user)
      }

      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          pincode: user.address?.pincode || ''
        }
      })
    }
    setIsEditing(false)
  }

  return (
    <div className="pt-16 pb-20 md:pb-8 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-4 sm:px-6 py-4 sm:py-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">{user?.name}</h1>
                    <p className="text-sm sm:text-base text-primary-100">{user?.email}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 w-full sm:w-auto">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 sm:flex-none bg-white text-primary-600 px-3 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-sm disabled:opacity-50"
                      >
                        <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="flex-1 sm:flex-none bg-transparent border border-white text-white px-3 py-2 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors duration-200 flex items-center justify-center text-sm"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full sm:w-auto bg-white text-primary-600 px-3 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-sm"
                    >
                      <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Personal Information
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`input-field pl-9 sm:pl-10 text-sm sm:text-base ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={true} // Email should not be editable
                        className="input-field pl-9 sm:pl-10 bg-gray-50 cursor-not-allowed text-sm sm:text-base"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`input-field pl-9 sm:pl-10 text-sm sm:text-base ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Address Information
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <textarea
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className={`input-field pl-9 sm:pl-10 resize-none text-sm sm:text-base ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                        placeholder="Enter your street address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`input-field text-sm sm:text-base ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`input-field text-sm sm:text-base ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="address.pincode"
                      value={formData.address.pincode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`input-field text-sm sm:text-base ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                      placeholder="PIN Code"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary-600 mb-2">0</div>
              <div className="text-sm sm:text-base text-gray-600">Total Orders</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-secondary-600 mb-2">0</div>
              <div className="text-sm sm:text-base text-gray-600">Applications</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600 mb-2">₹0</div>
              <div className="text-sm sm:text-base text-gray-600">Total Spent</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile