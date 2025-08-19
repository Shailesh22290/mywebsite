import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Star, ChevronRight, Award, Globe } from 'lucide-react';
import ServiceCard from './ServiceCard';
import TestimonialCard from './TestimonialCard';

const Consultancy = () => {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Research Methodology Consulting",
      description: "Expert guidance on research design, data collection, and analysis methodologies for academic and industry projects.",
      icon: <Briefcase className="w-6 h-6" />,
      features: ["Study Design", "Data Analysis", "Statistical Consulting", "Literature Review"],
      price: "Starting at $150/hour",
      duration: "1-3 months",
      deliverables: ["Research Protocol", "Analysis Plan", "Final Report"]
    },
    {
      id: 2,
      title: "Academic Writing Support",
      description: "Professional assistance with manuscript preparation, grant writing, and publication strategy.",
      icon: <Award className="w-6 h-6" />,
      features: ["Manuscript Review", "Grant Proposals", "Publication Strategy", "Peer Review"],
      price: "Starting at $100/hour",
      duration: "2-6 weeks",
      deliverables: ["Edited Manuscript", "Submission Guidelines", "Response Letters"]
    },
    {
      id: 3,
      title: "Data Science Solutions",
      description: "Custom data analysis, machine learning implementations, and dashboard development.",
      icon: <Globe className="w-6 h-6" />,
      features: ["Data Analysis", "ML Models", "Dashboards", "Automation"],
      price: "Starting at $200/hour",
      duration: "1-4 months",
      deliverables: ["Analysis Report", "Code Repository", "Documentation"]
    },
    {
      id: 4,
      title: "Workshop & Training",
      description: "Customized workshops on research methods, data analysis, and academic writing.",
      icon: <Users className="w-6 h-6" />,
      features: ["Custom Curriculum", "Hands-on Training", "Materials Provided", "Follow-up Support"],
      price: "Starting at $2000/workshop",
      duration: "1-3 days",
      deliverables: ["Training Materials", "Recordings", "Certificate"]
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Research Director, MedTech Solutions",
      content: "The research methodology consulting was exceptional. Our study design improved significantly, and the statistical analysis was thorough and insightful.",
      rating: 5,
      image: "/assets/images/testimonials/sarah.jpg",
      project: "Clinical Trial Design"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      role: "Department Head, University of Science",
      content: "Outstanding academic writing support. The manuscript review and publication strategy helped us publish in a top-tier journal.",
      rating: 5,
      image: "/assets/images/testimonials/michael.jpg",
      project: "Journal Publication"
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      role: "Data Analytics Manager, StartupCorp",
      content: "The data science solutions exceeded our expectations. The ML models are now core to our business operations.",
      rating: 5,
      image: "/assets/images/testimonials/lisa.jpg",
      project: "ML Implementation"
    }
  ];

  const stats = [
    { label: "Projects Completed", value: "50+", icon: <Briefcase className="w-5 h-5" /> },
    { label: "Happy Clients", value: "35+", icon: <Users className="w-5 h-5" /> },
    { label: "Success Rate", value: "98%", icon: <Star className="w-5 h-5" /> },
    { label: "Years Experience", value: "8+", icon: <Award className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Professional Consultancy Services
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Leverage my expertise in research methodology, academic writing, and data science 
            to accelerate your projects and achieve exceptional results.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Services Offered
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                isActive={activeService === service.id}
                onToggle={() => setActiveService(activeService === service.id ? null : service.id)}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Consultation", desc: "Initial discussion about your needs and goals" },
                { step: "02", title: "Proposal", desc: "Detailed project proposal with timeline and cost" },
                { step: "03", title: "Execution", desc: "Collaborative work with regular updates" },
                { step: "04", title: "Delivery", desc: "Final deliverables and follow-up support" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-600 dark:bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.desc}
                  </p>
                  {index < 3 && (
                    <ChevronRight className="w-5 h-5 text-gray-400 mx-auto mt-4 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Client Testimonials
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Let's discuss how I can help you achieve your research and development goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Schedule Consultation
            </button>
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              View Portfolio
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Consultancy;