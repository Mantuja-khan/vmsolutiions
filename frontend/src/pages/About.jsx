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
import manoj_sir from "../../images/manojsir.jpg"
import vishal from "../../images/vishalbhaiya.jpg"
import about from "../../images/about.jpg"

const About = () => {
  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '5000+', label: 'Happy Customers' },
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
      name: 'Mr. Manoj Khambra',
      position: 'Founder & CEO',
      image: manoj_sir,
      description: 'With over 15 years of experience in the technology industry, Rajesh founded VM Solutiions with a vision to make technology accessible to everyone.',
      expertise: ['Business Strategy', 'Technology Leadership', 'Customer Relations'],
      social: {
        email: 'Manojj@prernainffotech.com',
        phone: '+91 9982686232'
      }
    },
    {
      name: 'Mr. Vishal Y Singh',
      position: 'Business Partner',
      image: vishal,
      description: 'Vishal brings extensive technical expertise and innovation to VM Solutiions, ensuring we stay at the forefront of technology trends.',
      expertise: ['Technical Innovation', 'Product Development', 'Team Leadership'],
      social: {
        email: 'vishal@prernainfitech.com',
        phone: '+91 9358853990'
      }
    }
  ]


  const achievements = [
    // 'Best Technology Service Provider 2023',
    // 'Customer Choice Award 2022',
    // 'Innovation Excellence Award 2021',
    // 'Top Rated Business Partner 2020'
  ]

  return (
    <div className="pt-16">
      {/* Hero Section with Background */}
      <section className="relative py-20 overflow-hidden">
        <div
         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
         style={{
           backgroundImage: `url('${about}')`,
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
                VM Solutiions was born from a simple yet powerful vision: to make technology accessible, 
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
                alt="VM Solutiions Office"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
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
              The visionaries behind VM Solutiions, dedicated to driving innovation and excellence
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
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Expertise:</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.linkedin}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href={`tel:${member.social.phone}`}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


     
    </div>
  )
}

export default About