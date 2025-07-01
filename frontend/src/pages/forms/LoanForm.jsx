import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../contexts/AuthContext'
import { 
  CreditCard, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  Save
} from 'lucide-react'

const LoanForm = () => {
  const { type } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      address: {
        street: '',
        city: '',
        state: '',
        pincode: ''
      }
    },
    financialInfo: {
      monthlyIncome: '',
      employmentType: '',
      companyName: '',
      workExperience: '',
      panNumber: '',
      aadharNumber: ''
    },
    specificDetails: {}
  })

  const loanTypes = {
    personal: {
      title: 'Personal Loan',
      description: 'Quick and easy personal loans for your immediate needs',
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600',
      specificFields: [
        { key: 'loanAmount', label: 'Loan Amount (₹)', type: 'number', required: true },
        { key: 'loanTenure', label: 'Loan Tenure (Months)', type: 'number', required: true },
        { key: 'purpose', label: 'Loan Purpose', type: 'select', options: ['Medical Emergency', 'Education', 'Travel', 'Wedding', 'Home Renovation', 'Debt Consolidation', 'Other'], required: true },
        { key: 'existingLoans', label: 'Existing Loans', type: 'textarea', required: false }
      ]
    },
    home: {
      title: 'Home Loan',
      description: 'Fulfill your dream of owning a home with our home loans',
      icon: CreditCard,
      color: 'from-green-500 to-green-600',
      specificFields: [
        { key: 'loanAmount', label: 'Loan Amount (₹)', type: 'number', required: true },
        { key: 'loanTenure', label: 'Loan Tenure (Years)', type: 'number', required: true },
        { key: 'propertyType', label: 'Property Type', type: 'select', options: ['Apartment', 'Independent House', 'Villa', 'Plot'], required: true },
        { key: 'propertyValue', label: 'Property Value (₹)', type: 'number', required: true },
        { key: 'propertyLocation', label: 'Property Location', type: 'text', required: true },
        { key: 'downPayment', label: 'Down Payment (₹)', type: 'number', required: true }
      ]
    },
    business: {
      title: 'Business Loan',
      description: 'Grow your business with our flexible business loans',
      icon: CreditCard,
      color: 'from-purple-500 to-purple-600',
      specificFields: [
        { key: 'loanAmount', label: 'Loan Amount (₹)', type: 'number', required: true },
        { key: 'loanTenure', label: 'Loan Tenure (Years)', type: 'number', required: true },
        { key: 'businessType', label: 'Business Type', type: 'select', options: ['Manufacturing', 'Trading', 'Service', 'Retail', 'Agriculture', 'Other'], required: true },
        { key: 'businessAge', label: 'Business Age (Years)', type: 'number', required: true },
        { key: 'annualTurnover', label: 'Annual Turnover (₹)', type: 'number', required: true },
        { key: 'loanPurpose', label: 'Loan Purpose', type: 'textarea', required: true }
      ]
    },
    gold: {
      title: 'Gold Loan',
      description: 'Get instant loans against your gold ornaments',
      icon: CreditCard,
      color: 'from-yellow-500 to-yellow-600',
      specificFields: [
        { key: 'loanAmount', label: 'Loan Amount (₹)', type: 'number', required: true },
        { key: 'loanTenure', label: 'Loan Tenure (Months)', type: 'number', required: true },
        { key: 'goldWeight', label: 'Gold Weight (Grams)', type: 'number', required: true },
        { key: 'goldPurity', label: 'Gold Purity (Karat)', type: 'select', options: ['18K', '20K', '22K', '24K'], required: true },
        { key: 'ornamentType', label: 'Ornament Type', type: 'textarea', required: true }
      ]
    },
    secured: {
      title: 'Secured Loan',
      description: 'Loans against collateral with attractive interest rates',
      icon: CreditCard,
      color: 'from-indigo-500 to-indigo-600',
      specificFields: [
        { key: 'loanAmount', label: 'Loan Amount (₹)', type: 'number', required: true },
        { key: 'loanTenure', label: 'Loan Tenure (Years)', type: 'number', required: true },
        { key: 'collateralType', label: 'Collateral Type', type: 'select', options: ['Property', 'Fixed Deposit', 'Securities', 'Vehicle', 'Other'], required: true },
        { key: 'collateralValue', label: 'Collateral Value (₹)', type: 'number', required: true },
        { key: 'loanPurpose', label: 'Loan Purpose', type: 'textarea', required: true }
      ]
    },
    unsecured: {
      title: 'Unsecured Loan',
      description: 'Loans without collateral based on your creditworthiness',
      icon: CreditCard,
      color: 'from-red-500 to-red-600',
      specificFields: [
        { key: 'loanAmount', label: 'Loan Amount (₹)', type: 'number', required: true },
        { key: 'loanTenure', label: 'Loan Tenure (Years)', type: 'number', required: true },
        { key: 'creditScore', label: 'Credit Score (if known)', type: 'number', required: false },
        { key: 'loanPurpose', label: 'Loan Purpose', type: 'select', options: ['Education', 'Medical', 'Travel', 'Wedding', 'Business', 'Other'], required: true },
        { key: 'existingDebts', label: 'Existing Debts', type: 'textarea', required: false }
      ]
    }
  }

  const currentLoan = loanTypes[type]

  if (!currentLoan) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Loan Type</h2>
          <p className="text-gray-600 mb-6">The loan type you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const handleInputChange = (section, field, value) => {
    if (section === 'address') {
      setFormData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          address: {
            ...prev.personalInfo.address,
            [field]: value
          }
        }
      }))
    } else if (section === 'specificDetails') {
      setFormData(prev => ({
        ...prev,
        specificDetails: {
          ...prev.specificDetails,
          [field]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast.error('Please login to submit your application')
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname))
      return
    }

    setLoading(true)

    try {
      const applicationData = {
        type: 'loan',
        subType: type,
        ...formData
      }

      await axios.post('/api/applications', applicationData)
      toast.success('Loan application submitted successfully!')
      navigate('/applications')
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit application'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className={`w-16 h-16 bg-gradient-to-r ${currentLoan.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
            <currentLoan.icon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{currentLoan.title} Application</h1>
          <p className="text-gray-600 mt-2">{currentLoan.description}</p>
          {!isAuthenticated() && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                You can fill out this form, but you'll need to <Link to="/login" className="text-yellow-900 font-medium underline">login</Link> or <Link to="/register" className="text-yellow-900 font-medium underline">register</Link> to submit your application.
              </p>
            </div>
          )}
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.fullName}
                  onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    className="input-field pl-10"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    required
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    className="input-field pl-10"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    required
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  required
                  value={formData.personalInfo.gender}
                  onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marital Status *
                </label>
                <select
                  required
                  value={formData.personalInfo.maritalStatus}
                  onChange={(e) => handleInputChange('personalInfo', 'maritalStatus', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.personalInfo.address.street}
                    onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                    className="input-field resize-none"
                    placeholder="Enter your street address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.personalInfo.address.city}
                    onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                    className="input-field"
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.personalInfo.address.state}
                    onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                    className="input-field"
                    placeholder="Enter your state"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.personalInfo.address.pincode}
                    onChange={(e) => handleInputChange('address', 'pincode', e.target.value)}
                    className="input-field"
                    placeholder="Enter PIN code"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Financial Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Financial Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.financialInfo.monthlyIncome}
                  onChange={(e) => handleInputChange('financialInfo', 'monthlyIncome', e.target.value)}
                  className="input-field"
                  placeholder="Enter your monthly income"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type *
                </label>
                <select
                  required
                  value={formData.financialInfo.employmentType}
                  onChange={(e) => handleInputChange('financialInfo', 'employmentType', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Employment Type</option>
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="business">Business Owner</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="retired">Retired</option>
                  <option value="unemployed">Unemployed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.financialInfo.companyName}
                  onChange={(e) => handleInputChange('financialInfo', 'companyName', e.target.value)}
                  className="input-field"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Experience (Years)
                </label>
                <input
                  type="number"
                  value={formData.financialInfo.workExperience}
                  onChange={(e) => handleInputChange('financialInfo', 'workExperience', e.target.value)}
                  className="input-field"
                  placeholder="Enter work experience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.financialInfo.panNumber}
                  onChange={(e) => handleInputChange('financialInfo', 'panNumber', e.target.value)}
                  className="input-field"
                  placeholder="Enter PAN number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhar Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.financialInfo.aadharNumber}
                  onChange={(e) => handleInputChange('financialInfo', 'aadharNumber', e.target.value)}
                  className="input-field"
                  placeholder="Enter Aadhar number"
                />
              </div>
            </div>
          </motion.div>

          {/* Loan Specific Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              {currentLoan.title} Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentLoan.specificFields.map((field) => (
                <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} {field.required && '*'}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      required={field.required}
                      value={formData.specificDetails[field.key] || ''}
                      onChange={(e) => handleInputChange('specificDetails', field.key, e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option.toLowerCase().replace(' ', '_')}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      required={field.required}
                      rows={3}
                      value={formData.specificDetails[field.key] || ''}
                      onChange={(e) => handleInputChange('specificDetails', field.key, e.target.value)}
                      className="input-field resize-none"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      type={field.type}
                      required={field.required}
                      value={formData.specificDetails[field.key] || ''}
                      onChange={(e) => handleInputChange('specificDetails', field.key, e.target.value)}
                      className="input-field"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <button
              type="submit"
              disabled={loading}
              className="btn-primary py-3 px-8 text-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  {isAuthenticated() ? 'Submit Application' : 'Login to Submit'}
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}

export default LoanForm