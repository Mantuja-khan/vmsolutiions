import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import image from "../../assets/website.png"
import { 
  Globe,
  CheckCircle,
  ArrowRight,
  Code,
  Smartphone,
  ShoppingCart,
  Palette,
  Zap,
  Shield,
  Search,
  Users,
  Award,
  Clock,
  DollarSign
} from 'lucide-react'

const WebsiteDesigning = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Websites that look perfect on all devices - desktop, tablet, and mobile'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Solutions',
      description: 'Complete online store setup with payment gateway integration'
    },
    {
      icon: Code,
      title: 'Custom Development',
      description: 'Tailored solutions built specifically for your business needs'
    },
    {
      icon: Palette,
      title: 'Modern UI/UX',
      description: 'Beautiful, intuitive designs that engage and convert visitors'
    },
    {
      icon: Zap,
      title: 'Fast Loading',
      description: 'Optimized performance for lightning-fast page load times'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'SSL certificates, security measures, and regular backups'
    },
    {
      icon: Search,
      title: 'SEO Optimized',
      description: 'Built-in SEO best practices to improve search rankings'
    },
    {
      icon: Users,
      title: 'CMS Integration',
      description: 'Easy content management with WordPress, Shopify, or custom CMS'
    }
  ]

  const packages = [
    {
      name: 'Basic',
      price: '₹15,000',
      description: 'Perfect for small businesses and startups',
      features: [
        'Up to 5 pages',
        'Responsive design',
        'Contact form',
        'Basic SEO setup',
        'Social media integration',
        '1 month free support'
      ],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Professional',
      price: '₹35,000',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 15 pages',
        'Advanced responsive design',
        'CMS integration',
        'Advanced SEO',
        'Contact & booking forms',
        'Blog setup',
        'Google Analytics',
        '3 months free support'
      ],
      popular: true,
      color: 'from-purple-500 to-pink-600'
    },
    {
      name: 'Enterprise',
      price: '₹75,000+',
      description: 'Complete solution for established businesses',
      features: [
        'Unlimited pages',
        'Custom functionality',
        'E-commerce integration',
        'Premium SEO & marketing',
        'Multiple integrations',
        'Priority support',
        'Regular maintenance',
        '6 months free support'
      ],
      color: 'from-orange-500 to-red-600'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We understand your business goals, target audience, and project requirements'
    },
    {
      step: '02',
      title: 'Design & Prototype',
      description: 'Create wireframes and design mockups for your approval'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Build your website with clean code and best practices'
    },
    {
      step: '04',
      title: 'Testing & Launch',
      description: 'Rigorous testing followed by successful deployment'
    },
    {
      step: '05',
      title: 'Support & Maintenance',
      description: 'Ongoing support to keep your website running smoothly'
    }
  ]

  // Projects showcase data
  const projects = [
    {
      title: 'E-commerce Fashion Store',
      category: 'E-commerce',
      image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg',
      description: 'Modern online fashion store with seamless shopping experience',
      technologies: ['React', 'Node.js', 'Stripe'],
      link: '#'
    },
    {
      title: 'Corporate Business Website',
      category: 'Corporate',
      image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg',
      description: 'Professional corporate website with custom CMS integration',
      technologies: ['WordPress', 'PHP', 'MySQL'],
      link: '#'
    },
    {
      title: 'Restaurant & Food Ordering',
      category: 'Food & Beverage',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      description: 'Online ordering system with real-time menu management',
      technologies: ['React', 'Firebase', 'Payment Gateway'],
      link: '#'
    },
    {
      title: 'Healthcare Clinic Portal',
      category: 'Healthcare',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
      description: 'Patient portal with appointment booking and records management',
      technologies: ['Vue.js', 'Laravel', 'PostgreSQL'],
      link: '#'
    },
    {
      title: 'Real Estate Platform',
      category: 'Real Estate',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      description: 'Property listing platform with advanced search and filters',
      technologies: ['Next.js', 'MongoDB', 'Map Integration'],
      link: '#'
    },
    {
      title: 'Educational Platform',
      category: 'Education',
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg',
      description: 'Online learning platform with course management system',
      technologies: ['React', 'Django', 'Video Streaming'],
      link: '#'
    }
  ]

  const benefits = [
    { icon: Award, text: 'Industry-leading design quality' },
    { icon: Clock, text: 'Quick turnaround time' },
    { icon: DollarSign, text: 'Competitive pricing' },
    { icon: Users, text: 'Dedicated project manager' }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
     <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 py-32">
      {/* Zig-zag animated background */}
      <div className="absolute inset-0 opacity-50">
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-full h-full bg-[url('/zigzag-pattern.svg')] bg-repeat bg-[length:300px_300px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* LEFT SIDE: Text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left text-white"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-5">
            <Globe className="w-8 h-8" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Website Designing & Development
          </h1>

          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto lg:mx-0 text-cyan-50">
            Create a stunning online presence that captures attention and drives results.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Link
              to="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>

            <a
              href="#projects"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white/20 px-6 py-3 text-base md:text-lg font-semibold rounded-full transition-all duration-300"
            >
              View Our Work
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center lg:justify-end"
        >
         <img
  src={image}
  alt="Website design illustration"
  className="w-96 md:w-[420px] lg:w-[520px] drop-shadow-2xl rounded-2xl"
/>

        </motion.div>
      </div>
    </section>

      {/* Benefits Bar */}
      <section className="bg-white py-8 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-center space-x-3"
              >
                <benefit.icon className="w-6 h-6 text-blue-600" />
                <span className="text-sm md:text-base text-gray-700 font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Web Design Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We deliver websites that are not just beautiful, but also functional and results-driven
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Recent Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a look at some of the websites we've built for our clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        className="inline-flex items-center text-white font-medium hover:text-cyan-300 transition-colors duration-200"
                      >
                        View Project
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Flexible Pricing Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect package for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  pkg.popular ? 'ring-4 ring-purple-500 transform scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-center py-2 font-semibold text-sm">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <div className={`inline-block px-4 py-2 bg-gradient-to-r ${pkg.color} rounded-full mb-6`}>
                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900">{pkg.price}</span>
                  </div>
                  <p className="text-gray-600 mb-8">{pkg.description}</p>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
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
              Our Development Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Dream Website?
            </h2>
            <p className="text-xl text-cyan-50 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something amazing together
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="btn-primary bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link
                to="/portfolio"
                className="btn-secondary bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                View Full Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default WebsiteDesigning