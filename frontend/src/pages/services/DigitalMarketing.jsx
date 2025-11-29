import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Search, 
  Share2, 
  BarChart3, 
  Target,
  Users,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageSquare,
  Eye
} from 'lucide-react'

const DigitalMarketing = () => {
  const services = [
    {
      title: 'SEO Optimization',
      description: 'Improve your search engine rankings and organic traffic',
      icon: Search,
      features: ['Keyword Research', 'On-page SEO', 'Technical SEO', 'Link Building'],
      price: 'Starting from ₹15,000/month'
    },
    {
      title: 'Social Media Marketing',
      description: 'Build your brand presence across social platforms',
      icon: Share2,
      features: ['Content Creation', 'Community Management', 'Paid Advertising', 'Analytics'],
      price: 'Starting from ₹10,000/month'
    },
    {
      title: 'PPC Advertising',
      description: 'Drive targeted traffic with pay-per-click campaigns',
      icon: Target,
      features: ['Google Ads', 'Facebook Ads', 'Campaign Management', 'ROI Optimization'],
      price: 'Starting from ₹20,000/month'
    },
    {
      title: 'Analytics & Reporting',
      description: 'Track performance and measure marketing success',
      icon: BarChart3,
      features: ['Google Analytics', 'Custom Reports', 'Performance Tracking', 'ROI Analysis'],
      price: 'Starting from ₹5,000/month'
    }
  ]

  const packages = [
    {
      name: 'Starter',
      price: '₹25,000',
      period: 'per month',
      features: [
        'Basic SEO optimization',
        'Social media management (2 platforms)',
        'Monthly performance report',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '₹50,000',
      period: 'per month',
      features: [
        'Advanced SEO optimization',
        'Social media management (4 platforms)',
        'PPC campaign management',
        'Bi-weekly performance reports',
        'Phone & email support',
        'Content creation (10 posts/month)'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '₹1,00,000',
      period: 'per month',
      features: [
        'Complete SEO strategy',
        'Full social media management',
        'Advanced PPC campaigns',
        'Weekly performance reports',
        'Dedicated account manager',
        'Content creation (20 posts/month)',
        'Custom analytics dashboard'
      ],
      popular: false
    }
  ]

  const strategies = [
    {
      icon: Globe,
      title: 'Website Optimization',
      description: 'Optimize your website for better user experience and conversions'
    },
    {
      icon: MessageSquare,
      title: 'Content Marketing',
      description: 'Create engaging content that attracts and retains customers'
    },
    {
      icon: Users,
      title: 'Audience Targeting',
      description: 'Reach the right audience with precision targeting strategies'
    },
    {
      icon: Eye,
      title: 'Brand Visibility',
      description: 'Increase your brand visibility across digital channels'
    }
  ]

  const results = [
    { metric: '300%', label: 'Average Traffic Increase' },
    { metric: '150%', label: 'Lead Generation Boost' },
    { metric: '200%', label: 'Social Media Growth' },
    { metric: '95%', label: 'Client Satisfaction Rate' }
  ]

  const testimonials = [
    {
      name: 'Rohit Sharma',
      company: 'E-commerce Store',
      rating: 5,
      comment: 'Our online sales increased by 250% within 6 months. Excellent digital marketing strategy and execution.'
    },
    {
      name: 'Kavya Reddy',
      company: 'Healthcare Clinic',
      rating: 5,
      comment: 'Great SEO results! We now rank on the first page for all our target keywords. Highly recommended.'
    },
    {
      name: 'Arjun Patel',
      company: 'Real Estate Agency',
      rating: 5,
      comment: 'Professional social media management and PPC campaigns. Our lead quality has improved significantly.'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
     

      

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Digital Marketing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital marketing solutions to boost your online presence
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
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
                <div className="text-lg font-bold text-purple-600 mb-4">
                  {service.price}
                </div>
                
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Strategies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Marketing Strategies
            </h2>
            <p className="text-xl text-gray-600">
              Proven strategies that deliver measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strategies.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <strategy.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {strategy.title}
                </h3>
                <p className="text-gray-600">
                  {strategy.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Results Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {result.metric}
                </div>
                <div className="text-gray-600">{result.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600">
              Systematic approach to digital marketing success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Analysis', description: 'Comprehensive audit of your current digital presence and competitors' },
              { step: '02', title: 'Strategy', description: 'Develop customized marketing strategy based on your goals and budget' },
              { step: '03', title: 'Implementation', description: 'Execute campaigns across multiple digital channels with precision' },
              { step: '04', title: 'Optimization', description: 'Continuous monitoring and optimization for maximum ROI' }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {process.title}
                </h3>
                <p className="text-gray-600">
                  {process.description}
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
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real businesses
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
                  <div className="text-sm text-gray-600">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Get a free digital marketing audit and discover growth opportunities
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-6 h-6 text-purple-200" />
                <span className="text-white">+91 935-8853-990</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6 text-purple-200" />
                <span className="text-white">vishal@prernainffotech.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-6 h-6 text-purple-200" />
                <span className="text-white">Prerna Infotech, Bhiwadi</span>
              </div>
            </div>
            
            
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default DigitalMarketing