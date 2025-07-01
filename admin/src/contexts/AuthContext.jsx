import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const adminData = localStorage.getItem('adminData')
    
    if (token && adminData) {
      try {
        setAdmin(JSON.parse(adminData))
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (error) {
        console.error('Error parsing admin data:', error)
        logout()
      }
    }
    setLoading(false)
  }, [])

  const login = (token, adminData) => {
    localStorage.setItem('adminToken', token)
    localStorage.setItem('adminData', JSON.stringify(adminData))
    setAdmin(adminData)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    toast.success('Admin logged in successfully!')
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    setAdmin(null)
    delete axios.defaults.headers.common['Authorization']
    toast.success('Logged out successfully!')
  }

  const isAuthenticated = () => {
    return !!admin && !!localStorage.getItem('adminToken')
  }

  const value = {
    admin,
    login,
    logout,
    isAuthenticated,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
