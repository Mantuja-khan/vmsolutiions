import { motion } from 'framer-motion'
import { 
  Camera, 
  Shield, 
  Monitor, 
  Smartphone, 
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  Eye,
  Clock,
  Wifi
} from 'lucide-react'

const CCTVInstallation = () => {
  const services = [
    {
      title: 'CCTV Installation',
      description: 'Professional installation of security camera systems',
      icon: Camera,
      features: ['Site Survey', 'Professional Installation', 'Cable Management', 'System Testing'],
      price: 'Starting from ₹15,000'
    },
    {
      title: '24/7 Monitoring',
      description: 'Round-the-clock surveillance monitoring services',
      icon: Monitor,
      features: ['Live Monitoring', 'Alert Notifications', 'Incident Response', 'Monthly Reports'],
      price: 'Starting from ₹2,000/month'
    },
    {
      title: 'Remote Access',
      description: 'Access your cameras from anywhere using mobile app',
      icon: Smartphone,
      features: ['Mobile App', 'Web Portal', 'Real-time Viewing', 'Cloud Storage'],
      price: 'Starting from ₹500/month'
    },
    {
      title: 'Maintenance',
      description: 'Regular maintenance to ensure optimal performance',
      icon: Shield,
      features: ['Regular Checkups', 'Software Updates', 'Hardware Cleaning', 'Performance Optimization'],
      price: 'Starting from ₹1,000/visit'
    }
  ]

  const cameraTypes = [
    {
      name: 'Dome Cameras',
      description: 'Discreet indoor surveillance',
      features: ['360° Coverage', 'Vandal Resistant', 'Night Vision', 'HD Quality']
    },
    {
      name: 'Bullet Cameras',
      description: 'Outdoor security monitoring',
      features: ['Weather Resistant', 'Long Range', 'Infrared Vision', '4K Resolution']
    },
    {
      name: 'PTZ Cameras',
      description: 'Pan, tilt, and zoom functionality',
      features: ['Remote Control', 'Auto Tracking', 'Zoom Capability', 'Preset Positions']
    },
    {
      name: 'IP Cameras',
      description: 'Network-based surveillance',
      features: ['WiFi Connectivity', 'Cloud Storage', 'Mobile Access', 'Smart Analytics']
    }
  ]

  const features = [
    {
      icon: Eye,
      title: 'High Definition Video',
      description: 'Crystal clear 4K video quality for detailed surveillance'
    },
    {
      icon: Clock,
      title: 'Night Vision',
      description: 'Advanced infrared technology for 24/7 monitoring'
    },
    {
      icon: Wifi,
      title: 'Smart Analytics',
      description: 'AI-powered motion detection and facial recognition'
    },
    {
      icon: Shield,
      title: 'Secure Storage',
      description: 'Encrypted local and cloud storage options'
    }
  ]

  const testimonials = [
    {
      name: 'Suresh Gupta',
      business: 'Retail Store Owner',
      rating: 5,
      comment: 'Excellent CCTV installation service. The team was professional and the system works perfectly.'
    },
    {
      name: 'Meera Singh',
      business: 'Homeowner',
      rating: 5,
      comment: 'Great security solution for our home. We can monitor everything from our phones.'
    },
    {
      name: 'Ravi Patel',
      business: 'Office Manager',
      rating: 5,
      comment: 'Professional installation and excellent after-sales support. Highly recommended!'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="w-10 h-10 text-gray-900" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              CCTV Installation & Monitoring
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Comprehensive security camera solutions for homes and businesses with 24/7 monitoring
            </p>
            
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our CCTV Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete security solutions from installation to monitoring and maintenance
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
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
                <div className="text-lg font-bold text-gray-900 mb-4">
                  {service.price}
                </div>
                
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Camera Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Camera Types We Install
            </h2>
            <p className="text-xl text-gray-600">
              Choose from a variety of camera types to suit your specific security needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cameraTypes.map((camera, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {camera.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {camera.description}
                </p>
                <div className="space-y-2">
                  {camera.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
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
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by homeowners and businesses for reliable security solutions
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
                  <div className="text-sm text-gray-600">{testimonial.business}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Secure Your Property Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get a free consultation and quote for your CCTV installation needs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-6 h-6 text-gray-400" />
                <span className="text-white">+91 935-8853-990</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6 text-gray-400" />
                <span className="text-white">vishal@prernainffotech.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-6 h-6 text-gray-400" />
                <span className="text-white">Prerna Infotech , Bhiwadi</span>
              </div>
            </div>
            
           
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CCTVInstallation