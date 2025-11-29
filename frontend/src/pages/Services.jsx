import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Laptop, 
  Camera, 
  Cloud, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  Clock,
  Globe
} from 'lucide-react'
import service from "../../images/services.jpg"

const Services = () => {
  const services = [
    {
      icon: Laptop,
      title: 'Laptop Sales & Services',
      description: 'Premium laptops from top brands with professional repair and maintenance services',
      features: ['New & Refurbished Laptops', 'Hardware Repair', 'Software Installation', 'Data Recovery'],
      link: '/services/laptop-services',
      color: 'from-blue-500 to-purple-600',
      image: 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg'
    },
    {
      icon: Camera,
      title: 'CCTV Installation',
      description: 'Complete security camera setup and monitoring solutions for homes and businesses',
      features: ['HD Camera Installation', '24/7 Monitoring', 'Remote Access', 'Maintenance Support'],
      link: '/services/cctv-installation',
      color: 'from-green-500 to-teal-600',
      image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg'
    },
    {
      icon: Cloud,
      title: 'Google Workspace',
      description: 'Cloud-based productivity solutions to streamline your business operations',
      features: ['Gmail for Business', 'Google Drive Storage', 'Collaboration Tools', 'Admin Management'],
      link: '/services/google-workspace',
      color: 'from-orange-500 to-red-600',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Grow your business with comprehensive digital marketing strategies',
      features: ['SEO Optimization', 'Social Media Marketing', 'Content Creation', 'Analytics & Reporting'],
      link: '/services/digital-marketing',
      color: 'from-pink-500 to-violet-600',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    },
    {
      icon: Globe,
      title: 'Website Designing',
      description: 'Custom website design and development to establish your strong online presence',
      features: ['Responsive Design', 'E-commerce Solutions', 'CMS Integration', 'Custom Development'],
      link: '/services/website-designing',
      color: 'from-cyan-500 to-blue-600',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'
    }
  ]

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: CheckCircle },
    { number: '200+', label: 'Happy Clients', icon: Users },
    { number: '5+', label: 'Years Experience', icon: Award },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ]

  const whyChooseUs = [
    {
      title: 'Expert Team',
      description: 'Our certified professionals have years of experience in their respective fields'
    },
    {
      title: 'Quality Assurance',
      description: 'We ensure the highest quality standards in all our services and products'
    },
    {
      title: 'Competitive Pricing',
      description: 'Get the best value for your money with our transparent pricing structure'
    },
    {
      title: 'Customer Support',
      description: '24/7 customer support to help you with any queries or issues'
    },
    {
      title: 'Quick Turnaround',
      description: 'Fast and efficient service delivery without compromising on quality'
    },
    {
      title: 'Warranty & Maintenance',
      description: 'Comprehensive warranty and ongoing maintenance support for peace of mind'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section with Background */}
      <section className="relative py-20 overflow-hidden">
              <div
               className="absolute inset-0 bg-cover bg-center bg-no-repeat"
               style={{
                 backgroundImage: `url('${service}')`,
               }}
             >
                <div className="absolute inset-0 bg-gradient-to-r  to-secondary-900/90"></div>
              </div>
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                
                </motion.div>
              </div>
            </section>

   

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional technology services designed to help your business thrive in the digital age
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-1 transition-all duration-200"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose VM Solutiions?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering exceptional service and building long-term relationships with our clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services