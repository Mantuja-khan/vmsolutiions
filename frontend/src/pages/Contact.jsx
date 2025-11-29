import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageSquare,
  User,
  Building
} from 'lucide-react'
import toast from 'react-hot-toast'
import contact from "../../images/contact.jpg"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Office',
      details: [
        'Prerna Infotech',
        'Prerna Infotech, 70-71 Ground Floor',
        'Capital High Street Phool Bagh, Bhiwadi, Alwar(Rajasthan) '
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        '+91 935-8853-990',
        'Available for Support',
        'Mon-Sat: 10:00 AM - 6:00 PM'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'Manojj@prernainffotech.com',
        'vishal@prernainffotech.com',
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Saturday: 10:00 AM - 6:00 PM',
        'Sunday: Closed'
      ],
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const departments = [
    {
      name: 'Sales Inquiry',
      email: 'Manojj@prernainffotech.com',
      phone: '+91 935-8853-990'
    },
    {
      name: 'Technical Support',
      email: 'vishal@prernainffotech.com',
      phone: '+91 935-8853-990'
    },
    {
      name: 'Insurance & Loans',
      email: 'Manojj@prernainffotech.com',
      phone: '+91 99826-86232'
    },
    {
      name: 'General Inquiry',
      email: 'vishal@prernainffotech.com',
      phone: '+91 935-8853-990'
    }
  ]

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer laptop sales & services, CCTV installation, Google Workspace setup, digital marketing, insurance solutions, and various loan products.'
    },
    {
      question: 'Do you provide warranty on products?',
      answer: 'Yes, all our products come with manufacturer warranty. We also provide extended warranty options for additional coverage.'
    },
    {
      question: 'How can I track my order?',
      answer: 'You can track your order by logging into your account and visiting the Orders section. You\'ll receive tracking information via email and SMS.'
    },
    {
      question: 'Do you offer home service?',
      answer: 'Yes, we provide home service for laptop repairs and CCTV installation within our service areas. Additional charges may apply.'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section with Background */}
     <section className="relative py-12 md:py-16 overflow-hidden">
  <div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url('${contact}')`,
  }}
>
    <div className="absolute inset-0 bg-gradient-to-r to-secondary-900/90"></div>
  </div>
  <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
      </h1>
      <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
        
      </p>
    </motion.div>
  </div>
</section>


      {/* Contact Info Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="input-field pl-10"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="input-field pl-10"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input-field pl-10"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="input-field pl-10"
                        >
                          <option value="">Select a subject</option>
                          <option value="sales">Sales Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="insurance">Insurance & Loans</option>
                          <option value="general">General Inquiry</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="input-field pl-10 resize-none"
                        placeholder="Enter your message"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="card overflow-hidden">
                <div className="h-100">
                  <iframe
                    src="https://www.google.com/maps/place/Vm+solutiions/@26.8763569,74.78614,8z/data=!4m10!1m2!2m1!1svm+solutions!3m6!1s0xac5e7c25239dca63:0x6877bc0877fb1edd!8m2!3d28.2117487!4d76.8611897!15sCgx2bSBzb2x1dGlvbnNaDiIMdm0gc29sdXRpb25zkgEQc29mdHdhcmVfY29tcGFueaoBRxABKhAiDHZtIHNvbHV0aW9ucygAMh8QASIbg5IeiNs4jLt48D9_kZz8Ae9-L-NKzJS_S7NjMhAQAiIMdm0gc29sdXRpb25z4AEA!16s%2Fg%2F11wfl47xxs?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="VM Solutiions Location"
                  ></iframe>
                </div>
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-gray-900">
                      Prerna Infotech, 123 Tech Street, Digital City, Mumbai 400001
                    </span>
                  </div>
                </div>
              </div>

              {/* Department Contacts */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Department Contacts
                </h3>
                <div className="space-y-4">   
                  {departments.map((dept, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <h4 className="font-medium text-gray-900 mb-2">{dept.name}</h4>
                      <div className="space-y-1">
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-sm text-primary-600 hover:text-primary-700 block"
                        >
                          {dept.email}
                        </a>
                        <a
                          href={`tel:${dept.phone}`}
                          className="text-sm text-gray-600 hover:text-gray-700 block"
                        >
                          {dept.phone}
                        </a>
                      </div>
                    </div>
                  ))} 
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact