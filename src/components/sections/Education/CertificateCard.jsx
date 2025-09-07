import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, Download, Eye, CheckCircle, Clock } from 'lucide-react';

// Mock data - replace with your actual certificates data
const certificatesData = [
  {
    id: 1,
    title: "SQL for Data Science",
    issuer: "Coursera",
    issueDate: "2023-09-15",
    expiryDate: "Never",
    credentialId: "COURSERA-SQL-2023-XYZ",
    type: "Course",
    category: "Data Science",
    status: "active",
    image: "/assets/certificates/coursera-sql.jpg",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/ABC123",
    downloadUrl: "/assets/documents/certificates/coursera-sql.pdf",
    description: "Covers essential SQL skills for data analysis, including querying, data manipulation, and advanced database concepts.",
    skills: ["SQL", "Data Analysis", "MySQL", "Database Management"],
    level: "Fundamentals"
  },
  {
    id: 2,
    title: "Learning React.js: Scalable & High-Performance Apps",
    issuer: "Infosys Springboard",
    issueDate: "2023-11-20",
    expiryDate: "Never",
    credentialId: "INFY-REACT-2023-LMN",
    type: "Course",
    category: "Web Development",
    status: "active",
    image: "/assets/certificates/infosys-react.jpg",
    verificationUrl: "https://infyspringboard.onwingspan.com/verify/XYZ456",
    downloadUrl: "/assets/documents/certificates/infosys-react.pdf",
    description: "Focuses on building modern, high-performance web applications using React.js, covering components, state, and hooks.",
    skills: ["React.js", "JavaScript", "Frontend", "Web Performance"],
    level: "Intermediate"
  },
  {
    id: 3,
    title: "TensorFlow Developer Certificate",
    issuer: "TensorFlow",
    issueDate: "2024-03-10",
    expiryDate: "Never",
    credentialId: "TF-DEV-2024-PQR",
    type: "Professional",
    category: "Machine Learning",
    status: "active",
    image: "/assets/certificates/tf-cert.jpg",
    verificationUrl: "https://www.tensorflow.org/certificate/verify/DEF789",
    downloadUrl: "/assets/documents/certificates/tf-cert.pdf",
    description: "Validates expertise in building and training neural networks using TensorFlow for computer vision, NLP, and more.",
    skills: ["TensorFlow", "Deep Learning", "Python", "Computer Vision"],
    level: "Professional"
  },
  {
    id: 4,
    title: "Docker Certified Associate",
    issuer: "Docker",
    issueDate: "2025-05-20",
    expiryDate: "Never",
    credentialId: "DCA-2025-GHI",
    type: "Professional",
    category: "DevOps",
    status: "active",
    image: "/assets/certificates/docker-cert.jpg",
    verificationUrl: "https://www.docker.com/certification/verify/GHI101",
    downloadUrl: "/assets/documents/certificates/docker-cert.pdf",
    description: "Demonstrates foundational knowledge and skills in using Docker for containerization and building modern applications.",
    skills: ["Docker", "Containerization", "MLOps", "CI/CD"],
    level: "Associate"
  },
  {
    id: 5,
    title: "Introduction to Quantum Computing",
    issuer: "NPTEL",
    issueDate: "2024-12-01",
    expiryDate: "Never",
    credentialId: "NPTEL-QC-2024-JKL",
    type: "Course",
    category: "Advanced Topics",
    status: "active",
    image: "/assets/certificates/nptel-qc.jpg",
    verificationUrl: "https://nptel.ac.in/noc/Ecertificate/?q=JKL202",
    downloadUrl: "/assets/documents/certificates/nptel-qc.pdf",
    description: "Provides a foundational understanding of quantum mechanics, quantum computation, and quantum algorithms.",
    skills: ["Quantum Computing", "Algorithms", "Physics", "Computation"],
    level: "Fundamentals"
  },
  {
    id: 6,
    title: "Full Stack Development",
    issuer: "Infosys Springboard",
    issueDate: "2022-12-30",
    expiryDate: "Never",
    credentialId: "INFY-FSD-2022-MNO",
    type: "Course",
    category: "Web Development",
    status: "active",
    image: "/assets/certificates/infosys-fsd.jpg",
    verificationUrl: "https://infyspringboard.onwingspan.com/verify/MNO303",
    downloadUrl: "/assets/documents/certificates/infosys-fsd.pdf",
    description: "Comprehensive training in front-end and back-end technologies to build complete web applications.",
    skills: ["HTML/CSS", "JavaScript", "Node.js", "REST APIs", "MongoDB"],
    level: "Intermediate"
  }
];

const CertificateCard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'Web Development', label: 'Web Development' },
    { id: 'Data Science', label: 'Data Science' },
    { id: 'Machine Learning', label: 'Machine Learning' },
    { id: 'DevOps', label: 'DevOps' },
    { id: 'Advanced Topics', label: 'Advanced Topics' }
  ];

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'Fundamentals', label: 'Fundamentals' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Associate', label: 'Associate' },
    { id: 'Professional', label: 'Professional' }
  ];

  const filteredCertificates = certificatesData.filter(cert => {
    const categoryMatch = selectedCategory === 'all' || cert.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || cert.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'expiring':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Professional':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Associate':
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Fundamentals':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const isExpiringSoon = (expiryDate) => {
    if (expiryDate === 'Never') return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const threMonthsFromNow = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
    return expiry <= threMonthsFromNow && expiry > today;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`
                px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200
                ${selectedLevel === level.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }
              `}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {cert.issuer}
                </span>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                  {cert.status === 'active' ? 'Active' : cert.status === 'expiring' ? 'Expiring Soon' : 'Expired'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(cert.level)}`}>
                  {cert.level}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {cert.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {cert.description}
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                {cert.expiryDate === 'Never' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
                <span>
                  {cert.expiryDate === 'Never' 
                    ? 'Never expires' 
                    : `Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`
                  }
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                ID: {cert.credentialId}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Skills Validated
              </h4>
              <div className="flex flex-wrap gap-1">
                {cert.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {isExpiringSoon(cert.expiryDate) && (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  ⚠️ This certificate expires soon. Consider renewing.
                </p>
              </div>
            )}

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCertificate(cert)}
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <a
                  href={cert.downloadUrl}
                  download
                  className="flex items-center gap-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-sm font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Verify</span>
              </a>
            </div> */}
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedCertificate.title}
                </h3>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <img
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="text-gray-500 dark:text-gray-400">Certificate image not available</div>';
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Certificate Details
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div>
                        <span className="font-medium">Issuer:</span> {selectedCertificate.issuer}
                      </div>
                      <div>
                        <span className="font-medium">Issue Date:</span> {new Date(selectedCertificate.issueDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Expiry Date:</span> {selectedCertificate.expiryDate === 'Never' ? 'Never expires' : new Date(selectedCertificate.expiryDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Credential ID:</span> {selectedCertificate.credentialId}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Skills & Competencies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Description
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {selectedCertificate.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={selectedCertificate.downloadUrl}
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Certificate</span>
                  </a>
                  <a
                    href={selectedCertificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Verify Online</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredCertificates.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No certificates found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your filters to see more certificates.
          </p>
        </div>
      )}
    </div>
  );
};

export default CertificateCard;