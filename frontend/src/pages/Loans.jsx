import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  CreditCard, 
  CheckCircle,
  ArrowRight,
  Home,
  User,
  Briefcase,
  Coins,
  Shield,
  Clock,
  Star,
  Phone,
  Mail
} from 'lucide-react'

const Loans = () => {
  const loanTypes = [
    {
      title: 'Personal Loan',
      description: 'Quick and easy personal loans for your immediate financial needs without any collateral',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      link: '/loan/personal',
      keyPoints: [
        'No Collateral Required',
        'Quick Approval in 24 Hours',
        'Flexible Tenure 12-60 Months',
        'Competitive Interest Rates'
      ]
    },
    {
      title: 'Home Loan',
      description: 'Make your dream home a reality with our affordable home loan solutions',
      icon: Home,
      color: 'from-green-500 to-green-600',
      link: '/loan/home',
      keyPoints: [
        'Low Interest Rates',
        'Long Tenure up to 30 Years',
        'Tax Benefits under 80C & 24',
        'Flexible Repayment Options'
      ]
    },
    {
      title: 'Business Loan',
      description: 'Fuel your business growth with our flexible business loan solutions',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      link: '/loan/business',
      keyPoints: [
        'Working Capital Solutions',
        'Equipment Finance Available',
        'Quick Processing',
        'Minimal Documentation'
      ]
    },
    {
      title: 'Gold Loan',
      description: 'Get instant loans against your gold ornaments with attractive interest rates',
      icon: Coins,
      color: 'from-yellow-500 to-yellow-600',
      link: '/loan/gold',
      keyPoints: [
        'Instant Approval & Disbursal',
        'Minimal Documentation',
        'Competitive Interest Rates',
        'Safe Gold Storage'
      ]
    },
    {
      title: 'Secured Loan',
      description: 'Loans against collateral with attractive interest rates and flexible terms',
      icon: Shield,
      color: 'from-indigo-500 to-indigo-600',
      link: '/loan/secured',
      keyPoints: [
        'Lower Interest Rates',
        'Higher Loan Amounts',
        'Flexible Tenure Options',
        'Multiple Collateral Types'
      ]
    },
    {
      title: 'Unsecured Loan',
      description: 'Loans without collateral based on your creditworthiness and income',
      icon: Clock,
      color: 'from-red-500 to-red-600',
      link: '/loan/unsecured',
      keyPoints: [
        'No Collateral Required',
        'Quick Processing',
        'Credit Score Based',
        'Flexible Usage'
      ]
    }
  ]

  const loanProcess = [
    {
      step: '01',
      title: 'Apply Online',
      description: 'Fill out our simple online application form with basic details'
    },
    {
      step: '02',
      title: 'Document Verification',
      description: 'Submit required documents for quick verification process'
    },
    {
      step: '03',
      title: 'Approval',
      description: 'Get instant approval notification with loan terms'
    },
    {
      step: '04',
      title: 'Disbursal',
      description: 'Receive loan amount directly in your bank account'
    }
  ]

  const whyChooseUs = [
    {
      title: 'Quick Processing',
      description: 'Fast loan approval and disbursal within 24-48 hours'
    },
    {
      title: 'Competitive Rates',
      description: 'Best interest rates in the market with transparent pricing'
    },
    {
      title: 'Flexible Terms',
      description: 'Customizable loan terms to suit your financial needs'
    },
    {
      title: 'Expert Support',
      description: 'Dedicated loan experts to guide you through the process'
    }
  ]

  const testimonials = [
    {
      name: 'Suresh Gupta',
      location: 'Chennai',
      rating: 5,
      comment: 'Got my personal loan approved within 24 hours. Excellent service and competitive rates!'
    },
    {
      name: 'Meera Singh',
      location: 'Pune',
      rating: 5,
      comment: 'Home loan process was smooth and hassle-free. Great support from the team throughout.'
    },
    {
      name: 'Ravi Patel',
      location: 'Ahmedabad',
      rating: 5,
      comment: 'Business loan helped me expand my business. Quick approval and flexible terms!'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
     

      {/* Loan Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Loan Type
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible loan solutions designed to meet your specific financial requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanTypes.map((loan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${loan.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <loan.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {loan.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {loan.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {loan.keyPoints.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 text-left">{point}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={loan.link}
                  className="btn-primary w-full flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Loan Process
            </h2>
            <p className="text-xl text-gray-600">
              Get your loan approved in just 4 easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {loanProcess.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {process.title}
                </h3>
                <p className="text-gray-600">
                  {process.description}
                </p>
                {index < loanProcess.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-x-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose VM Solutiions for Loans?
            </h2>
            <p className="text-xl text-gray-600">
              Your trusted financial partner for all loan requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from our satisfied loan customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
   
    </div>
  )
}

export default Loans