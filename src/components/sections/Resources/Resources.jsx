import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const Resources = () => {
  return (
    <section id="resources" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-6 sm:px-8 lg:px-16 xl:px-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Clock className="mx-auto mb-6 h-16 w-16 text-blue-500 dark:text-blue-400" />
          <h2 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
            Coming Soon!
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            I'm working hard to bring you an awesome collection of freelance resources, guides, and templates. Stay tuned for the launch!
          </p>
          
          {/* Optional: You can uncomment this section to add a "Notify Me" form */}
          {/*
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Your email to get notified"
              className="flex-1 rounded-lg border bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800"
            />
            <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
              Notify Me
            </button>
          </div>
          */}
        </motion.div>
      </div>
    </section>
  );
};

export default Resources;