import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  CheckCircle,
  ArrowRight,
  Heart,
  Car,
  Users,
  Star,
  Phone,
  Mail
} from 'lucide-react'

const Insurance = () => {
  const insuranceTypes = [
    {
      title: 'Health Insurance',
      description: 'Comprehensive health coverage for you and your family with cashless treatment facilities',
      icon: Heart,
      color: 'from-blue-500 to-blue-600',
      link: '/insurance/health',
      keyPoints: [
        'Cashless Treatment at 10,000+ Hospitals',
        'Family Floater Plans Available',
        'Coverage for Critical Illnesses',
        'Annual Health Check-ups'
      ]
    },
    {
      title: 'Vehicle Insurance',
      description: 'Protect your vehicle with comprehensive coverage including third-party and own damage protection',
      icon: Car,
      color: 'from-green-500 to-green-600',
      link: '/insurance/vehicle',
      keyPoints: [
        'Third Party Liability Coverage',
        'Own Damage Protection',
        'Zero Depreciation Add-on',
        'Roadside Assistance 24/7'
      ]
    },
    {
      title: 'Life Insurance',
      description: 'Secure your family\'s financial future with comprehensive life insurance plans',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      link: '/insurance/life',
      keyPoints: [
        'Life Coverage up to ₹10 Crore',
        'Maturity Benefits',
        'Accidental Death Benefit',
        'Tax Benefits under 80C'
      ]
    }
  ]

  const whyChooseUs = [
    {
      title: 'Expert Guidance',
      description: 'Our insurance experts help you choose the right policy for your needs'
    },
    {
      title: 'Quick Processing',
      description: 'Fast policy issuance and claim settlement process'
    },
    {
      title: 'Best Rates',
      description: 'Competitive premiums with maximum coverage benefits'
    },
    {
      title: 'Claim Support',
      description: '24/7 claim assistance and support throughout the process'
    }
  ]

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Mumbai',
      rating: 5,
      comment: 'Excellent service! Got my health insurance claim settled within 3 days. Highly recommended!'
    },
    {
      name: 'Priya Sharma',
      location: 'Delhi',
      rating: 5,
      comment: 'Very helpful team. They explained all policy details clearly and helped me choose the best plan.'
    },
    {
      name: 'Amit Patel',
      location: 'Bangalore',
      rating: 5,
      comment: 'Quick and hassle-free vehicle insurance renewal. Great customer support!'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}

      {/* Insurance Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Insurance Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive coverage options tailored to protect you and your loved ones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insuranceTypes.map((insurance, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${insurance.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <insurance.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {insurance.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {insurance.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {insurance.keyPoints.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 text-left">{point}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={insurance.link}
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

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose VM Solutiions for Insurance?
            </h2>
            <p className="text-xl text-gray-600">
              Your trusted partner for comprehensive insurance solutions
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from our satisfied insurance customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6"
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
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Protected?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get a free insurance quote today and secure your future
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-6 h-6 text-blue-200" />
                <span className="text-white">+91 98765 43210</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6 text-blue-200" />
                <span className="text-white">insurance@vmsolutions.com</span>
              </div>
            </div>
            
            <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              Get Free Quote
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Insurance