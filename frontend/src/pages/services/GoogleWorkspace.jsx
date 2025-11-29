import { motion } from 'framer-motion'
import { 
  Cloud, 
  Mail, 
  FileText, 
  Video, 
  Users, 
  Shield,
  CheckCircle,
  Star,
  Phone,
  MapPin,
  Calendar,
  Folder,
  MessageSquare
} from 'lucide-react'

const GoogleWorkspace = () => {
  const services = [
    {
      title: 'Gmail for Business',
      description: 'Professional email with your domain name',
      icon: Mail,
      features: ['Custom Domain Email', '30GB Storage', 'Advanced Security', '24/7 Support'],
      price: '₹125/user/month'
    },
    {
      title: 'Google Drive',
      description: 'Secure cloud storage and file sharing',
      icon: Folder,
      features: ['30GB Cloud Storage', 'File Sharing', 'Real-time Collaboration', 'Version History'],
      price: 'Included'
    },
    {
      title: 'Google Meet',
      description: 'Video conferencing and online meetings',
      icon: Video,
      features: ['HD Video Calls', '100 Participants', 'Screen Sharing', 'Recording'],
      price: 'Included'
    },
    {
      title: 'Google Docs & Sheets',
      description: 'Collaborative document and spreadsheet editing',
      icon: FileText,
      features: ['Real-time Editing', 'Comment & Suggest', 'Template Gallery', 'Offline Access'],
      price: 'Included'
    }
  ]

  const plans = [
    {
      name: 'Business Starter',
      price: '₹125',
      period: 'per user/month',
      features: [
        'Custom business email',
        '30 GB cloud storage per user',
        'Standard security and management controls',
        'Customer support'
      ],
      popular: false
    },
    {
      name: 'Business Standard',
      price: '₹672',
      period: 'per user/month',
      features: [
        'Custom business email',
        '2 TB cloud storage per user',
        'Enhanced security and management controls',
        'Standard support (paid upgrade to enhanced support)',
        'Meet recording coming to Google Drive'
      ],
      popular: true
    },
    {
      name: 'Business Plus',
      price: '₹1260',
      period: 'per user/month',
      features: [
        'Custom business email + eDiscovery, retention',
        '5 TB cloud storage per user',
        'Advanced security, management and compliance controls',
        'Enhanced support (paid upgrade to premium support)',
        'Advanced Meet features'
      ],
      popular: false
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Advanced security features including 2-step verification and SSO'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Real-time collaboration tools for seamless teamwork'
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description: 'Secure cloud storage accessible from anywhere'
    },
    {
      icon: Calendar,
      title: 'Smart Calendar',
      description: 'Intelligent scheduling and meeting management'
    }
  ]

  const benefits = [
    'Increase productivity with integrated tools',
    'Reduce IT costs and complexity',
    'Work from anywhere with cloud access',
    'Enhanced security and compliance',
    'Seamless collaboration across teams',
    'Professional email with custom domain'
  ]

  const testimonials = [
    {
      name: 'Anita Sharma',
      company: 'Tech Startup',
      rating: 5,
      comment: 'Google Workspace transformed our remote work capabilities. Excellent setup and support from Vm solutiions.'
    },
    {
      name: 'Vikram Patel',
      company: 'Marketing Agency',
      rating: 5,
      comment: 'Professional email setup and seamless integration. Our team productivity has increased significantly.'
    },
    {
      name: 'Priya Gupta',
      company: 'Consulting Firm',
      rating: 5,
      comment: 'Great migration service from our old email system. Zero downtime and excellent customer support.'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
     

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Google Workspace Applications
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive suite of productivity and collaboration tools for modern businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {service.price}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Google Workspace?
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed to enhance productivity and collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Benefits List */}
          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Business Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

 

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Successful Google Workspace implementations across various industries
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
                  <div className="text-sm text-gray-600">{testimonial.company}</div>
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get started with Google Workspace today and boost your team's productivity
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-6 h-6 text-blue-200" />
                <span className="text-white">+91 935-8853-990</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6 text-blue-200" />
                <span className="text-white">Manojj@prernainffotech.com</span>
              </div>
            </div>
            
           
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default GoogleWorkspace