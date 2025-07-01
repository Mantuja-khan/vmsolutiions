import { motion } from 'framer-motion'
import { 
  Users, 
  Award, 
  Target, 
  Heart,
  CheckCircle,
  Star,
  Linkedin,
  Mail,
  Phone
} from 'lucide-react'

const About = () => {
  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '10000+', label: 'Happy Customers' },
    { number: '100+', label: 'Products & Services' },
    { number: '99%', label: 'Customer Satisfaction' }
  ]

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide comprehensive technology solutions that empower businesses and individuals to achieve their goals through innovation and excellence.'
    },
    {
      icon: Heart,
      title: 'Our Vision',
      description: 'To be the leading technology partner in India, known for our commitment to quality, customer satisfaction, and innovative solutions.'
    },
    {
      icon: Award,
      title: 'Our Values',
      description: 'Integrity, Innovation, Excellence, and Customer-centricity drive everything we do. We believe in building long-term relationships based on trust.'
    }
  ]

  const team = [
    {
      name: 'Mr. Manoj Khambraa',
      position: 'Founder & CEO',
      image: 'https://vmsolutiions.com/assets/manojsir-BuHEPvw3.jpg',
      description: 'With over 14 years of experience in the technology industry, Rajesh founded Vm solutiions with a vision to make technology accessible to everyone.',
      expertise: ['Business Strategy', 'Technology Leadership', 'Customer Relations'],
      social: {
        email: 'manojj@prernainffotech.com',
        phone: '+91 998-2686-232'
      }
    },
    {
      name: 'Mr. Vishal Y Singh',
      position: 'Business Partner',
      image: 'https://vmsolutiions.com/assets/vishalbhaiya-Byd1y08j.jpg',
      description: 'Vishal Singh brings extensive technical expertise and innovation to Vm solutiions, ensuring we stay at the forefront of technology trends.',
      expertise: ['Technical Innovation', 'Product Development', 'Team Leadership'],
      social: {
        email: 'Vishal@prernainfftech.com',
        phone: '+91 935-8853-990'
      }
    }
  ]



  const achievements = [
    'Best Technology Service Provider 2023',
    'Customer Choice Award 2022',
    'Innovation Excellence Award 2021',
    'Top Rated Business Partner 2020'
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 to-secondary-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About VM Solutiions
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Your trusted technology partner since 2019, committed to delivering excellence in every solution we provide
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Vm solutiions was born from a simple yet powerful vision: to make technology accessible, 
                reliable, and beneficial for everyone. Founded in 2019 by technology enthusiasts 
                Rajesh Kumar and Priya Sharma, we started as a small laptop service center and have 
                grown into a comprehensive technology solutions provider.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Today, we serve thousands of customers across India, offering everything from premium 
                laptops and tech services to insurance and loan solutions. Our commitment to excellence 
                and customer satisfaction has made us a trusted name in the industry.
              </p>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
                alt="Vm solutiions Office"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission, Vision & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide us in everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The visionaries behind Vm solutiions, dedicated to driving innovation and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-4">
                  {member.position}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Success Story
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Become part of our growing family of satisfied customers and experience the Vm solutiions difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                Get in Touch
              </a>
              <a
                href="/products"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
              >
                Explore Products
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About