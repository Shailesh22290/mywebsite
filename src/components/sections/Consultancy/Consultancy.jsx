import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Users, Star, ChevronDown, Award, Globe, BrainCircuit, 
  Video, CheckCircle, ArrowRight, Clock, DollarSign, Zap, Shield,
  TrendingUp, Target, Lightbulb, MessageSquare
} from 'lucide-react';

// Helper Components
const ServiceCard = ({ service, isActive, onToggle, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div
        className="flex justify-between items-center p-6 cursor-pointer group"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl text-white shadow-lg group-hover:scale-105 transition-transform">
            {service.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{service.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full font-medium">
                {service.successRate}% Success Rate
              </span>
              {service.isPopular && (
                <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs px-2 py-1 rounded-full font-medium">
                  🔥 Most Popular
                </span>
              )}
            </div>
          </div>
        </div>
        <motion.div animate={{ rotate: isActive ? 180 : 0 }} className="text-blue-500">
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6"
          >
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    What You Get:
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    {service.features.map(feature => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    Perfect For:
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    {service.perfectFor.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-bold text-gray-900 dark:text-white">{service.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600 dark:text-gray-300 font-medium">{service.duration}</span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg mr-4">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{testimonial.company}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4 italic leading-relaxed">"{testimonial.content}"</p>
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
        <span>Project: <strong className="text-gray-700 dark:text-gray-300">{testimonial.project}</strong></span>
        <div className="flex items-center gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <div className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md inline-block">
        ✓ {testimonial.outcome}
      </div>
    </motion.div>
  );
};

const ProcessStep = ({ step, index, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay }}
      className="flex items-start gap-4"
    >
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
        {index + 1}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
      </div>
    </motion.div>
  );
};

// Main Component
const EnhancedConsultancy = () => {
  const [activeService, setActiveService] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 2, // Changed ID to make it appear first, assuming it's the main offering
      title: "High-Converting Web Applications",
      description: "Full-stack solutions that don't just look good—they convert visitors into customers.",
      icon: <Globe className="w-6 h-6" />,
      features: [
        "Modern React.js frontend with 90+ PageSpeed score",
        "Scalable Node.js/Python backend",
        "SEO-optimized architecture",
        "Mobile-first responsive design",
        "Payment integration & analytics setup"
      ],
      perfectFor: [
        "Businesses launching their first web presence",
        "Companies needing to modernize legacy systems",
        "Startups requiring MVP development"
      ],
      price: "From $450",
      duration: "3-6 weeks",
      successRate: 98,
      isPopular: true
    },
    {
      id: 1,
      title: "AI & Data Strategy (Research-Based)",
      description: "Leverage my ML research experience to explore and prototype data-driven features.",
      icon: <BrainCircuit className="w-6 h-6" />,
      features: [
        "Feasibility analysis for AI concepts",
        "Proof-of-concept (PoC) model development",
        "Data strategy & roadmap creation",
        "Guidance on data collection & annotation",
        "Research paper implementation"
      ],
      perfectFor: [
        "Companies exploring AI for the first time",
        "Teams needing to validate an ML-based idea",
        "Startups wanting a data-driven product roadmap"
      ],
      price: "From $300",
      duration: "2-4 weeks",
      successRate: 95
    },
    {
      id: 3,
      title: "Computer Vision R&D",
      description: "Explore the potential of visual data with custom prototypes based on my research work.",
      icon: <Video className="w-6 h-6" />,
      features: [
        "Proof-of-concept for object detection",
        "Feasibility study for image recognition",
        "Performance evaluation of existing models",
        "Custom data augmentation strategies",
        "Technical report on findings"
      ],
      perfectFor: [
        "Businesses with unique visual data challenges",
        "R&D departments needing specialized expertise",
        "Validating ideas before major investment"
      ],
      price: "From $340",
      duration: "2-5 weeks",
      successRate: 92
    },
    {
      id: 4,
      title: "1-on-1 Technical Mentoring",
      description: "Fast-track your team's skills in web development and introduce them to AI concepts.",
      icon: <Users className="w-6 h-6" />,
      features: [
        "Personalized learning roadmaps for web dev",
        "Hands-on project guidance (React, Node.js)",
        "Code review & best practices",
        "Introductory sessions on ML/CV theory",
        "Flexible scheduling options"
      ],
      perfectFor: [
        "Developers wanting to level up their skills",
        "Teams adopting modern web technologies",
        "Students preparing for tech careers"
      ],
      price: "From $30/hour",
      duration: "Ongoing",
      successRate: 99
    }
  ];

  const testimonials = [
   
  {
    "id": 1,
    "name": "Dr. S.K. Pathak",
    "role": "Librarian",
    "company": "IISER Bhopal",
    "content": "Shailesh developed a Central Library Management System that has significantly modernized our library operations. His implementation of a user-friendly interface with a robust backend has improved both our cataloging and user access.",
    "rating": 5,
    "project": "Central Library Management System",
    "outcome": "Improved cataloging and user access"
  },
  {
    "id": 2,
    "name": "Aditi Sharma",
    "role": "Project Lead",
    "company": "Punjab Government Initiative",
    "content": "The job portal and analytical tool Shailesh delivered were exceptional. He built a user-friendly platform with React and provided a powerful backend that gives us crucial insights into user demographics, helping us shape our employment strategies.",
    "rating": 5,
    "project": "Job portal and Analytical tool",
    "outcome": "Enabled data-driven analysis of user demographics"
  },
  {
    "id": 3,
    "name": "Karan Mehra",
    "role": "Founder",
    "company": "BondVue",
    "content": "As a Product Development Associate, Shailesh was instrumental in creating our new learning portal. He designed and developed a platform that allows users to track their progress effectively, which was a core requirement for our product launch.",
    "rating": 5,
    "project": "E-learning Portal for Bonds",
    "outcome": "Successful launch of a new learning platform"
  }

  ];

  const stats = [
    { label: "Client Conversion Lift", value: "25%+", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Projects Delivered On-Time", value: "100%", icon: <Clock className="w-5 h-5" /> },
    { label: "Client Satisfaction", value: "100%", icon: <Shield className="w-5 h-5" /> },
    { label: "Avg. Page Speed Boost", value: "60%", icon: <Target className="w-5 h-5" /> }
  ];

  const process = [
    {
      title: "Discovery Call (Free)",
      description: "I discuss your challenges, goals, and success metrics in a 30-minute strategy session."
    },
    {
      title: "Custom Strategy & Quote",
      description: "Receive a detailed proposal with timeline, deliverables, and fixed pricing within 24 hours."
    },
    {
      title: "Development & Weekly Updates",
      description: "Watch your solution come to life with regular progress updates and milestone reviews."
    },
    {
      title: "Launch & Optimization",
      description: "Go live with confidence, plus 30 days of free optimization to maximize your results."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-slate-900">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200 dark:bg-gray-700">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-48 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              🚀 Building High-Performance Web Solutions
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
            Build Web Applications
            <br />
            <span className="text-blue-600 dark:text-blue-400">That Drive Real Growth</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            I combine expert <strong>Full-Stack Development</strong> with an analytical approach from my <strong>AI/ML research</strong> to build web solutions that solve problems, boost efficiency, and deliver measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href="https://calendly.com/shaileshkachhi786" target="_blank" rel="noopener noreferrer">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Start Free Consultation
              </button>
            </a>
             <a href="/projects" target="_blank" rel="noopener noreferrer">
            <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              View Projects
            </button>
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ⚡ Free strategy session • 💰 Resonable pricing • 🎯 Results guaranteed
          </p>
        </motion.div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-3 text-blue-600 dark:text-blue-400">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Solutions That Drive <span className="text-blue-600">Real Results</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              My primary focus is delivering robust web applications, complemented by research-driven AI exploration to unlock future growth.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                isActive={activeService === service.id}
                onToggle={() => setActiveService(activeService === service.id ? null : service.id)}
                delay={0.4 + index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent <span className="text-purple-600">Process</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From idea to implementation—here's exactly how we'll work together to achieve your goals.
            </p>
          </motion.div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-8">
              {process.map((step, index) => (
                <ProcessStep
                  key={index}
                  step={step}
                  index={index}
                  delay={0.6 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Success Stories From <span className="text-green-600">Happy Clients</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real results from real businesses—see how my web solutions have transformed their operations and bottom line.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                delay={0.8 + index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-2xl shadow-2xl text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build a Better Web Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join successful clients who've increased their conversions with high-performance web applications. 
              Let's discuss your project in a free 30-minute strategy session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
               <a href="https://calendly.com/shaileshkachhi786" target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Book Free Strategy Call
              </button>
               </a>
             <a href="/projects" target="_blank" rel="noopener noreferrer">
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                See Portfolio
              </button>
               </a>
            
            </div>
            <div className="flex justify-center items-center gap-6 text-sm opacity-75">
              <span>✅ No commitment required</span>
              <span>⚡ Response within 24 hours</span>
              <span>🎯 Customized solution</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedConsultancy;