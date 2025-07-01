import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { 
  Search, 
  Filter, 
  Eye, 
  FileText,
  Calendar,
  User,
  Shield,
  CreditCard,
  Clock,
  CheckCircle,
  X,
  AlertCircle
} from 'lucide-react'

const Applications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'loan', label: 'Loan' }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ]

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/api/admin/applications')
      setApplications(response.data)
    } catch (error) {
      console.error('Error fetching applications:', error)
      toast.error('Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (applicationId, newStatus, notes = '') => {
    try {
      await axios.patch(`/api/admin/applications/${applicationId}/status`, { 
        status: newStatus,
        adminNotes: notes
      })
      toast.success('Application status updated successfully')
      fetchApplications()
      if (selectedApplication && selectedApplication._id === applicationId) {
        setSelectedApplication({ 
          ...selectedApplication, 
          status: newStatus,
          adminNotes: notes
        })
      }
    } catch (error) {
      console.error('Error updating application status:', error)
      toast.error('Failed to update application status')
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
        return <Shield className="w-5 h-5 text-blue-500" />
      case 'loan':
        return <CreditCard className="w-5 h-5 text-green-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.personalInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.personalInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.subType?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || application.type === selectedType
    const matchesStatus = selectedStatus === 'all' || application.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-2">Manage insurance and loan applications</p>
        </div>
        <div className="text-sm text-gray-600">
          Total Applications: {applications.length}
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search applications by ID, name, email, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field"
            >
              {typeOptions.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          #{application._id.slice(-8)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.subType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {application.personalInfo?.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.personalInfo?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(application.type)}
                      <span className="ml-2 text-sm font-medium text-gray-900 capitalize">
                        {application.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <div className="text-sm text-gray-900">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(application.status)}
                      <select
                        value={application.status}
                        onChange={(e) => handleStatusUpdate(application._id, e.target.value)}
                        className={`text-sm font-medium rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-primary-500 ${getStatusColor(application.status)}`}
                      >
                        {statusOptions.slice(1).map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedApplication(application)
                        setAdminNotes(application.adminNotes || '')
                        setShowModal(true)
                      }}
                      className="text-primary-600 hover:text-primary-900 flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Application Details - #{selectedApplication._id.slice(-8)}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Application Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    {getTypeIcon(selectedApplication.type)}
                    <span className="ml-2">Application Information</span>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Type:</span> {selectedApplication.type} - {selectedApplication.subType}</div>
                    <div><span className="font-medium">Application ID:</span> #{selectedApplication._id.slice(-8)}</div>
                    <div><span className="font-medium">Date:</span> {new Date(selectedApplication.createdAt).toLocaleDateString()}</div>
                    <div><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedApplication.status)}`}>
                        {selectedApplication.status.replace('_', ' ').charAt(0).toUpperCase() + selectedApplication.status.replace('_', ' ').slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Name:</span> {selectedApplication.personalInfo?.fullName}</div>
                    <div><span className="font-medium">Email:</span> {selectedApplication.personalInfo?.email}</div>
                    <div><span className="font-medium">Phone:</span> {selectedApplication.personalInfo?.phone}</div>
                    <div><span className="font-medium">Date of Birth:</span> {selectedApplication.personalInfo?.dateOfBirth ? new Date(selectedApplication.personalInfo.dateOfBirth).toLocaleDateString() : 'N/A'}</div>
                    <div><span className="font-medium">Gender:</span> {selectedApplication.personalInfo?.gender}</div>
                    <div><span className="font-medium">Marital Status:</span> {selectedApplication.personalInfo?.maritalStatus}</div>
                  </div>
                </div>
              </div>

              {/* Address */}
              {selectedApplication.personalInfo?.address && (
                <div className="card p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
                  <div className="text-sm text-gray-600">
                    <p>{selectedApplication.personalInfo.address.street}</p>
                    <p>{selectedApplication.personalInfo.address.city}, {selectedApplication.personalInfo.address.state}</p>
                    <p>{selectedApplication.personalInfo.address.pincode}</p>
                  </div>
                </div>
              )}

              {/* Financial Information */}
              {selectedApplication.financialInfo && (
                <div className="card p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Monthly Income:</span> ₹{selectedApplication.financialInfo.monthlyIncome?.toLocaleString()}</div>
                    <div><span className="font-medium">Employment Type:</span> {selectedApplication.financialInfo.employmentType}</div>
                    <div><span className="font-medium">Company:</span> {selectedApplication.financialInfo.companyName || 'N/A'}</div>
                    <div><span className="font-medium">Work Experience:</span> {selectedApplication.financialInfo.workExperience} years</div>
                    <div><span className="font-medium">PAN Number:</span> {selectedApplication.financialInfo.panNumber}</div>
                    <div><span className="font-medium">Aadhar Number:</span> {selectedApplication.financialInfo.aadharNumber}</div>
                  </div>
                </div>
              )}

              {/* Specific Details */}
              {selectedApplication.specificDetails && Object.keys(selectedApplication.specificDetails).length > 0 && (
                <div className="card p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {selectedApplication.type === 'insurance' ? 'Insurance' : 'Loan'} Specific Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {Object.entries(selectedApplication.specificDetails).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              <div className="card p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Notes</h3>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Add notes about this application..."
                />
              </div>

              {/* Status Update */}
              <div className="card p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Update Application Status</h3>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedApplication.status}
                    onChange={(e) => {
                      handleStatusUpdate(selectedApplication._id, e.target.value, adminNotes)
                    }}
                    className="input-field"
                  >
                    {statusOptions.slice(1).map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedApplication._id, selectedApplication.status, adminNotes)
                    }}
                    className="btn-primary"
                  >
                    Save Notes
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Applications