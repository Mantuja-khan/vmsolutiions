import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../contexts/AuthContext'
import { Mail, RefreshCw } from 'lucide-react'

const VerifyOTP = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [timer, setTimer] = useState(300) // 5 minutes

  const { userId, email } = location.state || {}

  useEffect(() => {
    if (!userId || !email) {
      navigate('/register')
      return
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [userId, email, navigate])

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpString = otp.join('')
    
    if (otpString.length !== 6) {
      toast.error('Please enter complete OTP')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post('https://vmsolutiions-backend.onrender.com/api/auth/verify-otp', {
        userId,
        otp: otpString
      })
      
      const { token, user } = response.data
      login(token, user)
      toast.success('Email verified successfully!')
      navigate('/')
    } catch (error) {
      const message = error.response?.data?.message || 'OTP verification failed'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setResendLoading(true)

    try {
      await axios.post('https://vmsolutiions-backend.onrender.com/api/auth/resend-otp', { userId })
      toast.success('OTP sent successfully!')
      setTimer(300) // Reset timer
      setOtp(['', '', '', '', '', '']) // Clear OTP inputs
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to resend OTP'
      toast.error(message)
    } finally {
      setResendLoading(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a 6-digit code to
            </p>
            <p className="font-medium text-primary-600">{email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Enter the 6-digit code
              </label>
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            {timer > 0 ? (
              <p className="text-sm text-gray-600">
                Resend code in <span className="font-medium text-primary-600">{formatTime(timer)}</span>
              </p>
            ) : (
              <button
                onClick={handleResendOTP}
                disabled={resendLoading}
                className="text-sm font-medium text-primary-600 hover:text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
              >
                {resendLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Code
                  </>
                )}
              </button>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code? Check your spam folder or{' '}
              <button
                onClick={handleResendOTP}
                disabled={resendLoading || timer > 0}
                className="font-medium text-primary-600 hover:text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                try again
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default VerifyOTP