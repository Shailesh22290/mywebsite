import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Calendar, MessageSquare, Clock, BookOpen, Code, Brain } from 'lucide-react';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';

const Contact = () => {
  const [selectedReason, setSelectedReason] = useState('');

  const contactReasons = [
    {
      id: 'research',
      title: 'Research Collaboration',
      description: 'Discuss potential research in ML, Computer Vision or Data Science',
      icon: '🔬',
      color: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
    },
    {
      id: 'technical',
      title: 'Technical Consultation',
      description: 'Get expert advice on ML projects, web development or data solutions',
      icon: '💻',
      color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
    },
    {
      id: 'freelance',
      title: 'Freelance Project',
      description: 'Discuss potential freelance opportunities in development or data science',
      icon: '🚀',
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
    },
    {
      id: 'academic',
      title: 'Academic Discussion',
      description: 'Talk about coursework, projects or academic opportunities',
      icon: '🎓',
      color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
    },
    {
      id: 'general',
      title: 'General Inquiry',
      description: 'Any other questions or discussions',
      icon: '💬',
      color: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'shailesh22@iiserb.ac.in / shaileshkachhi786@gmail.com',
      href: 'mailto:shailesh22@iiserb.ac.in',
      description: 'Preferred method for detailed discussions'
    },
    // {
    //   icon: Phone,
    //   label: 'Phone',
    //   value: '+91',
    //   href: 'tel:+91',
    //   description: 'Available Mon-Sat, 10AM-6PM IST'
    // },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bhopal, Madhya Pradesh',
      description: 'Open to remote and on-site opportunities'
    },
    {
      icon: Calendar,
      label: 'Schedule',
      value: 'Book a meeting',
      href: 'https://calendly.com/shaileshkachhi786',
      description: 'Schedule a 30-minute call'
    }
  ];

  const responseTime = {
    email: '24-48 hours',
    urgent: '2-4 hours',
    collaboration: '1-2 weeks'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 mt-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I'm always interested in discussing research opportunities, technical collaborations, 
            and innovative projects in Data Science and Web Development. Let's connect!
          </p>
        </motion.div>

        {/* Expertise Highlights */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Areas of Expertise
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center">
              <div className="mr-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Machine Learning</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Computer Vision, NLP, Predictive Modeling</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center">
              <div className="mr-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Full Stack Development</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">React, Node.js, MongoDB, SQL</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center">
              <div className="mr-4 p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Research</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI/ML, VR, Urban Safety, Climate Prediction</p>
              </div>
            </div>
          </div>
        </motion.div> */}

        {/* Contact Reasons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            What would you like to discuss?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactReasons.map((reason, index) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`cursor-pointer p-6 rounded-xl transition-all duration-300 ${
                  selectedReason === reason.id
                    ? `${reason.color} ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-900`
                    : 'bg-white dark:bg-gray-800 hover:shadow-lg'
                }`}
                onClick={() => setSelectedReason(reason.id)}
              >
                <div className="text-3xl mb-3">{reason.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Message
              </h2>
              <ContactForm selectedReason={selectedReason} />
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Times */}
            {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Response Times
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">General inquiries:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{responseTime.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Urgent matters:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{responseTime.urgent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Collaboration proposals:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{responseTime.collaboration}</span>
                </div>
              </div>
            </div> */}

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Connect With Me
              </h3>
              <SocialLinks />
            </div>

            {/* Current Status */}
            {/* <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                Current Status
              </h3>
              <div className="space-y-2 text-blue-800 dark:text-blue-200">
                <p><strong>Education:</strong> B.S. Data Science & Engineering at IISER Bhopal</p>
                <p><strong>Availability:</strong> Open to research collaborations and freelance projects</p>
                <p className="text-sm mt-3">
                  Actively working on ML research projects and available for technical discussions.
                </p>
              </div>
            </div> */}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What types of projects are you currently interested in?",
                answer: "I'm particularly interested in Machine Learning research, Computer Vision applications, and Full Stack Development projects. I enjoy working on problems that combine technical complexity with real-world impact."
              },
              {
                question: "Are you available for freelance work?",
                answer: "Yes, I'm available for freelance projects in web development, data analysis, and machine learning. I've previously worked with companies like SimDataS and BondVue on freelance basis."
              },
              {
                question: "Do you provide academic guidance or mentorship?",
                answer: "As a student myself, I'm happy to share my experiences and provide guidance to fellow students, particularly in Data Science, programming, and research methodology."
              },
              {
                question: "What's the best way to propose a research collaboration?",
                answer: "Please include details about your research interests, proposed methodology, and how my skills in ML/Data Science could contribute. I'm particularly interested in climate prediction, 3D computer vision, and urban safety applications."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;