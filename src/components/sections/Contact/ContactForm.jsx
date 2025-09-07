import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm = ({ selectedReason }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    reason: selectedReason || '',
    organization: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const [errors, setErrors] = useState({});

  // Use Vite environment variables
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Initialize EmailJS
  React.useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, [EMAILJS_PUBLIC_KEY]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (!formData.reason) {
      newErrors.reason = 'Please select a reason for contact';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check if EmailJS is properly configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: 'Email service not configured. Please contact me directly at shailesh22@iiserb.ac.in' 
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        organization: formData.organization,
        reason: formData.reason,
        subject: formData.subject || `Contact from ${formData.name}`,
        message: formData.message,
        to_name: 'Shailesh Kachhi',
        reply_to: formData.email,
        time: new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          dateStyle: 'medium', 
          timeStyle: 'short' 
        })
      };

      console.log('Sending email with params:', templateParams);
      console.log('Using Service ID:', EMAILJS_SERVICE_ID);
      console.log('Using Template ID:', EMAILJS_TEMPLATE_ID);
      
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email sent successfully:', response);
      
      setStatus({ loading: false, success: true, error: null });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        reason: selectedReason || '',
        organization: '',
      });
      
    } catch (error) {
      console.error('Failed to send email:', error);
      let errorMessage = 'Failed to send message. ';
      
      if (error.text) {
        errorMessage += `Error: ${error.text}. `;
      }
      
      errorMessage += 'Please try again or contact me directly at shailesh22@iiserb.ac.in';
      
      setStatus({ 
        loading: false, 
        success: false, 
        error: errorMessage 
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Update reason when prop changes
  React.useEffect(() => {
    if (selectedReason && selectedReason !== formData.reason) {
      setFormData(prev => ({ ...prev, reason: selectedReason }));
    }
  }, [selectedReason, formData.reason]);

  const reasonOptions = [
    { value: 'research', label: 'Research Collaboration' },
    { value: 'technical', label: 'Technical Consultation' },
    { value: 'freelance', label: 'Freelance Project' },
    { value: 'academic', label: 'Academic Discussion' },
    { value: 'general', label: 'General Inquiry' }
  ];

  if (status.success) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus({ loading: false, success: false, error: null })}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Debug info - remove in production */}
      {(!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) && (
        <div className="p-3 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm">
            <strong>Note:</strong> Email service is not configured. Please set up EmailJS or messages will not be sent.
          </p>
        </div>
      )}

      {/* Name and Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Organization */}
      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Organization / Institution
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Your organization or institution"
        />
      </div>

      {/* Reason for Contact */}
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Reason for Contact *
        </label>
        <select
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            errors.reason ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <option value="">Select a reason</option>
          {reasonOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.reason && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.reason}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Brief subject line (optional)"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none ${
            errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Please provide details about your inquiry..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
        )}
        {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {formData.message.length}/1000 characters
        </p> */}
      </div>

      {/* Error Message */}
      {status.error && (
        <div className="flex items-center p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <p className="text-sm text-red-700 dark:text-red-300">{status.error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status.loading}
        className={`w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
          status.loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {status.loading ? (
          <>
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </button>

      {/* <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Your information will be used solely to respond to your inquiry and will not be shared with third parties.
      </p> */}
    </form>
  );
};

export default ContactForm;