import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Globe,
  Download,
  ExternalLink,
  Heart,
  Coffee,
  Code,
  Book
} from 'lucide-react';
import ProfileImage from '../Home/ProfileImage';
// In any component where you want different background


const About = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const personalInfo = {
    name: "Shailesh K.",
    title: "Data Science & Engineering Student",
    location: "Bhopal, India",
    email: "shailesh22@iiserb.ac.in ",
    phone: "+91",
    website: "https://shailesh22290.github.io",
    joinDate: "December 2022"
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'interests', label: 'Interests', icon: Heart },
    { id: 'philosophy', label: 'Philosophy', icon: Book },
    { id: 'personal', label: 'Personal', icon: Coffee }
  ];

  const interests = [
    { category: 'Research', items: ['Machine Learning', 'Data Science', 'AI Ethics', 'Computer Vision'] },
    { category: 'Teaching', items: ['Curriculum Design', 'Student Mentoring', 'Educational Technology'] },
    { category: 'Technology', items: ['React', 'Python', 'TensorFlow', 'Cloud Computing'] },
    { category: 'Hobbies', items: ['Trekking', 'Travel', 'Reading', 'Cooking'] }
  ];

  const renderTabContent = () => {
  switch (activeTab) {
    case 'overview':
      return (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            I am a Data Science and Engineering student with experience in machine learning, artificial intelligence, and full-stack development. My work focuses on designing and implementing solutions that combine advanced analytics with practical applications across diverse domains.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Throughout my academic and professional journey, I have been involved in research, software development, and technical leadership, aiming to create impactful and scalable systems. I believe in the power of data-driven approaches to solve real-world challenges and drive meaningful innovation.
          </p>

          {/* Technical Skills with colored bullets */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Technical Skills
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>
                  <span className="font-semibold">Programming:</span> Python, C++, JavaScript, SQL, PHP
                </span>
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>
                  <span className="font-semibold">ML/AI Tools:</span> TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy
                </span>
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span>
                  <span className="font-semibold">Databases:</span> MySQL, MongoDB, PostgreSQL
                </span>
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                <span>
                  <span className="font-semibold">Web Development:</span> React.js, Node.js, HTML/CSS, REST APIs, Drupal
                </span>
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <span>
                  <span className="font-semibold">Cloud & Tools:</span> Google Colab, Firebase, Supabase, Docker, Git
                </span>
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span>
                  <span className="font-semibold">Visualization & Analysis:</span> Power BI, Jupyter Notebook, Matplotlib, Seaborn, QGIS
                </span>
              </li>
            </ul>
          </div>
        </div>
      );
  
  
case 'interests':
  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        My interests span across various domains, from AI research to leadership and creative pursuits.
        I aim to build innovative solutions, leading teams, and exploring the intersection of technology and human potential.
        I believe in maintaining a balance between professional excellence and personal growth.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Research & AI */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Research & AI</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>Machine Learning & Deep Learning
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>3D Computer Vision & NLP
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>Climate Modeling & Urban Analytics
            </li>
          </ul>
        </div>

        {/* Leadership & Management */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Leadership & Management</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>Team Leadership & Management
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>Strategic Planning & Execution
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div> Event & Budget Management
            </li>
          </ul>
        </div>

        {/* Technology & Development */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technology & Development</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>Full Stack Development 
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>MLOps & Model Deployment
            </li>
      
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-lime-500 rounded-full mr-3"></div>Data Engineering & Analytics
            </li>
          </ul>
        </div>

        {/* Personal Interests */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Personal Interests</h3>
          <ul className="space-y-2">
            
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-rose-500 rounded-full mr-3"></div>Swimming & Fitness
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>Mentoring & Social Service
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>Travel & Cultural Exploration
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
     case 'philosophy':
  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        My philosophy is rooted in the belief that technology and leadership should serve humanity's greater good. 
        I approach every challenge—whether in research, development, or team management—with the conviction that 
        innovation thrives when we combine technical excellence with empathy, collaboration, and ethical responsibility.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Research & Innovation</h3>
          <p className="text-gray-700 dark:text-gray-300">
            I believe research should bridge the gap between theoretical possibilities and practical solutions. 
            Whether working on climate modeling or urban safety, I focus on creating AI systems that are not just 
            technically sound but also ethically responsible and socially impactful.
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Leadership & Collaboration</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Effective leadership isn't about commanding—it's about empowering. From managing 80+ students in technical 
            events to coordinating research teams, I believe in fostering environments where every individual can 
            contribute their unique strengths toward shared goals.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Technology & Ethics</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Technology is a powerful tool that must be wielded responsibly. I'm passionate about developing AI solutions 
            that enhance human capabilities while addressing bias, privacy, and transparency. Every algorithm we create 
            should make the world more equitable, not less.
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Continuous Growth</h3>
          <p className="text-gray-700 dark:text-gray-300">
            The intersection of learning and teaching is where true growth happens. Whether mentoring students, 
            leading teams, or diving into new research domains, I believe in staying curious, embracing challenges, 
            and turning failures into stepping stones for innovation.
          </p>
        </div>
      </div>
    </div>
  );
     case 'personal':
  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
      Life is all about balance pushing myself in demanding research spaces while staying grounded through nature.
From long Himalayan trails that test endurance and spirit, to quiet moments watching the mountains breathe, trekking keeps me connected to clarity and purpose.

I've completed treks like Kedarkantha in Uttarakhand and Kheerganga in Himachal Pradesh, and each journey reminded me that growth happens step-by-step, whether it's climbing peaks or solving complex problems.
Growing up in Jabalpur and now studying in Bhopal, I’ve learned to embrace both forward momentum and the beauty of the path itself.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Swimming</h3>
          <p className="text-gray-600 dark:text-gray-400">
            My go-to activity for mental clarity and physical fitness. There's something meditative about 
            the rhythm of strokes that helps me think through complex problems.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trekking</h3>
          <p className="text-gray-600 dark:text-gray-400">
          
From sunrise climbs in the Himalayas to quiet forest paths, I love discovering new perspectives in nature where every step, horizon, and breath of mountain air feels like its own story.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Book className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mentoring</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Guiding junior students through technical challenges and career decisions. Leading teams 
            and sharing knowledge has taught me as much as any research project.
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Life Philosophy</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          I believe that the best innovations come from diverse experiences. Whether I'm debugging code at 2 AM, 
          swimming laps at dawn, or managing events with tight budgets, each experience shapes my approach 
          to problem-solving. The discipline from swimming, creativity from photography, and empathy from mentoring 
          all contribute to making me a better researcher and leader.
        </p>
      </div>
    </div>
  );
      
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          {/* <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get to know me better - my background, interests, and what drives my passion for 
            education and research.
          </p> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sticky top-8">
              <div className="text-center mb-8">
                <ProfileImage size="large" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
                  {personalInfo.name}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  {personalInfo.title}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Mail className="w-5 h-5 mr-3 text-green-500" />
                  <span>{personalInfo.email}</span>
                </div>
                {/* <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Phone className="w-5 h-5 mr-3 text-purple-500" />
                  <span>{personalInfo.phone}</span>
                </div> */}
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Globe className="w-5 h-5 mr-3 text-orange-500" />
                  <span>{personalInfo.website}</span>
                </div>
                {/* <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Calendar className="w-5 h-5 mr-3 text-red-500" />
                  <span>Since {personalInfo.joinDate}</span>
                </div> */}
              </div>

              <div className="mt-8 space-y-3">
                <a href="https://drive.google.com/file/d/14kiGLxpjgdprOKcGmoRWzWTZZdt3AHY5/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </button> </a>
                    <a href="/projects" target="_blank" rel="noopener noreferrer" className="mt-3 block">
                <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Projects
                </button></a>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-t-lg font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;