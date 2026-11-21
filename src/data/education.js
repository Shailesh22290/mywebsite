// src/data/education.js
export const education = [
  {
    id: 1,
    institution: "Indian Institute of Science Education and Research (IISER) Bhopal",
    degree: "BS-MS in Data Science and Engineering",
    specialization: "Data Science, Artificial Intelligence, and Optimization",
    startDate: "2022-12-01",
    endDate: "Present",
    location: "Bhopal, India",
    status: "ongoing",
    coursework: [
      // Core DS & AI
      "Machine Learning",
      "Deep Learning",
      "Artificial Intelligence",
      "Data Science in Practice",
      "Applied Optimization",
      "Computer Vision",
      "Advanced Natural Language Processing",
      "Machine Learning with Graphs",
      "3D Deep Learning",

      // Programming & Systems
      "Introduction to Programming",
      "Data Structures and Algorithms",
      "Algorithms",
      "Fundamentals of Database Systems",
      "Signals and Systems",

      // Mathematics
      "Linear Algebra",
      "Multivariable Calculus",
      "Probability and Statistics",
      "Discrete Mathematics",

      // Applied & Interdisciplinary
      "Physics Through Computational Thinking",
      "Econometrics I",
      "Engineering Design and Drawing",
      "Law Relating to Intellectual Property and Patents"
    ],
    achievements: [
      "General Secretary, Technical Affairs - Student Activity Council (2024–2025)",
      "Convenor - Techfest Armageddon (2023–2025)",
      "Winner - Smart India Hackathon 2023 (National Level)",
      "AIR 7288 - JEE Advanced 2022 (Top 1% among 1.5M candidates)"
    ],
    logo: "/assets/images/institutions/iiserb.png",
    website: "https://iiserb.ac.in"
  }
];

export const certifications = [
  // Real certifications from CV
  {
    id: 1,
    name: "Introduction to Quantum Computing",
    issuer: "NPTEL",
    issueDate: "2024-12-01",
    expiryDate: "N/A",
    credentialId: "NPTEL-QC-2024-001",
    badgeUrl: "/assets/images/certifications/quantum.png",
    verificationUrl: "#",
    description: "Introduction to principles of quantum computing and algorithms.",
    skills: ["Quantum Computing", "Qubits", "Quantum Algorithms"]
  },
  {
    id: 2,
    name: "Learning React.js: Scalable & High-Performance Apps",
    issuer: "Infosys Springboard",
    issueDate: "2023-11-01",
    expiryDate: "N/A",
    credentialId: "INFY-REACT-2023-001",
    badgeUrl: "/assets/images/certifications/react.png",
    verificationUrl: "#",
    description: "React.js certification focusing on scalable and high-performance app development.",
    skills: ["React.js", "Frontend Development", "Web Applications"]
  },
  {
    id: 3,
    name: "SQL for Data Science",
    issuer: "Coursera",
    issueDate: "2023-09-01",
    expiryDate: "N/A",
    credentialId: "COURSERA-SQL-2023-001",
    badgeUrl: "/assets/images/certifications/sql.png",
    verificationUrl: "#",
    description: "SQL fundamentals for data analysis and database querying.",
    skills: ["SQL", "Data Analysis", "Databases"]
  },
  {
    id: 4,
    name: "Full Stack Development",
    issuer: "Infosys Springboard",
    issueDate: "2022-12-01",
    expiryDate: "N/A",
    credentialId: "INFY-FULLSTACK-2022-001",
    badgeUrl: "/assets/images/certifications/fullstack.png",
    verificationUrl: "#",
    description: "Training in frontend, backend, and database development.",
    skills: ["Full Stack", "React", "Node.js", "SQL"]
  },
];

export const onlineCourses = [
  {
    id: 1,
    title: "Applied Data Science with Python",
    provider: "Coursera (University of Michigan)",
    instructor: "Various",
    completionDate: "2023-08-15",
    certificateUrl: "#",
    description: "Covers data wrangling, visualization, text analysis, and ML with Python.",
    skills: ["Python", "Pandas", "Scikit-learn", "Matplotlib"]
  },
  {
    id: 2,
    title: "Deep Learning Specialization",
    provider: "Coursera (DeepLearning.AI)",
    instructor: "Andrew Ng",
    completionDate: "2023-07-01",
    certificateUrl: "#",
    description: "Covers deep learning models including CNNs, RNNs, and sequence models.",
    skills: ["Deep Learning", "Neural Networks", "CNN", "RNN"]
  }
];

export const researchInterests = [
  {
    area: "Machine Learning for Climate and Weather",
    description: "Using ensemble optimization and ML models for precipitation prediction.",
    keywords: ["Climate Modeling", "Ensemble Learning", "Statistical Optimization"],
    currentProjects: ["Monsoon Prediction with Ensemble Models"]
  },
  {
    area: "VR and Urban Safety",
    description: "Developing VR-based multimodal frameworks for studying safety perceptions.",
    keywords: ["VR", "Biometrics", "LSTM", "Urban Planning"],
    currentProjects: ["Safety Perception Modeling in VR"]
  },
  {
    area: "Computer Vision",
    description: "Aerial and urban computer vision applications.",
    keywords: ["Object Detection", "Surveillance", "Tracking"],
    currentProjects: ["Vehicle Recognition from Drone Footage"]
  }
];

export const academicHonors = [
  {
    year: 2023,
    award: "Winner - Smart India Hackathon",
    institution: "Govt. of India",
    description: "Secured 1st place in Smart India Hackathon 2023 (National Level)."
  },
  {
    year: 2024,
    award: "General Secretary, Technical Affairs",
    institution: "IISER Bhopal SAC",
    description: "Elected leader responsible for technical initiatives across campus."
  },
  {
    year: 2022,
    award: "AIR 7288",
    institution: "JEE Advanced",
    description: "Achieved All India Rank 7288, placing in the top 1% of 1.5M candidates."
  }
];

export const getEducationByLevel = (level) => {
  const levelMap = {
    'bachelors': education.filter(edu => edu.degree.includes('BS-MS') || edu.degree.includes('B.A.'))
  };
  return levelMap[level] || education;
};

export const getActiveCertifications = () => {
  const now = new Date();
  return certifications.filter(cert => !cert.expiryDate || new Date(cert.expiryDate) > now);
};

export const getEducationStats = () => {
  const totalDegrees = education.length;
  const totalCertifications = certifications.length;
  const totalPublications = 0; // not yet

  return {
    totalDegrees,
    totalCertifications,
    totalPublications,
  };
};
