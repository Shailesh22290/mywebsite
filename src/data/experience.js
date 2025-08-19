// src/data/experience.js
export const workExperience = [
    {
      id: 1,
      company: "Tech Innovation Labs",
      position: "Senior Research Engineer",
      location: "San Francisco, CA",
      type: "Full-time",
      startDate: "2023-01-15",
      endDate: null, // Current position
      current: true,
      description: "Leading research and development of cutting-edge AI systems with focus on natural language processing and computer vision applications.",
      responsibilities: [
        "Design and implement deep learning architectures for production systems",
        "Lead cross-functional teams of 5+ engineers and researchers",
        "Collaborate with product teams to translate research into scalable solutions",
        "Mentor junior researchers and establish best practices for ML development",
        "Published 3 peer-reviewed papers in top-tier conferences"
      ],
      technologies: ["Python", "TensorFlow", "PyTorch", "Kubernetes", "AWS", "Docker"],
      achievements: [
        "Improved model accuracy by 15% through novel architecture design",
        "Reduced training time by 40% through distributed computing optimization",
        "Led team that won 'Innovation Award' for breakthrough in NLP research"
      ],
      logo: "/assets/images/companies/tech-innovation-labs.png",
      website: "https://techinnovationlabs.com"
    },
    {
      id: 2,
      company: "DataMind Solutions",
      position: "Machine Learning Engineer",
      location: "New York, NY",
      type: "Full-time",
      startDate: "2021-03-01",
      endDate: "2022-12-31",
      current: false,
      description: "Developed and deployed machine learning models for enterprise clients across various industries including healthcare, finance, and retail.",
      responsibilities: [
        "Built end-to-end ML pipelines for real-time prediction systems",
        "Collaborated with data scientists to optimize model performance",
        "Implemented MLOps practices for model deployment and monitoring",
        "Conducted technical workshops for client teams",
        "Contributed to open-source ML libraries used by 1000+ developers"
      ],
      technologies: ["Python", "Scikit-learn", "Apache Spark", "MLflow", "Azure", "PostgreSQL"],
      achievements: [
        "Deployed 12+ ML models serving 10M+ requests daily",
        "Reduced client churn by 25% through predictive analytics",
        "Established ML infrastructure reducing deployment time by 60%"
      ],
      logo: "/assets/images/companies/datamind-solutions.png",
      website: "https://datamindsolutions.com"
    },
    {
      id: 3,
      company: "Quantum Research Institute",
      position: "Research Assistant",
      location: "Boston, MA",
      type: "Part-time",
      startDate: "2020-09-01",
      endDate: "2021-02-28",
      current: false,
      description: "Conducted research on quantum computing applications in optimization and machine learning under the supervision of Dr. Maria Rodriguez.",
      responsibilities: [
        "Implemented quantum algorithms using Qiskit and Cirq",
        "Analyzed performance of quantum vs classical algorithms",
        "Collaborated on research papers and conference presentations",
        "Maintained quantum computing simulation infrastructure",
        "Participated in weekly research seminars and journal clubs"
      ],
      technologies: ["Python", "Qiskit", "Cirq", "NumPy", "Matplotlib", "Jupyter"],
      achievements: [
        "Co-authored 2 papers published in Nature Quantum Information",
        "Presented research at International Quantum Computing Conference",
        "Developed quantum simulation framework used by 20+ researchers"
      ],
      logo: "/assets/images/companies/quantum-research-institute.png",
      website: "https://quantumresearch.edu"
    },
    {
      id: 4,
      company: "StartupX",
      position: "Software Developer Intern",
      location: "Austin, TX",
      type: "Internship",
      startDate: "2020-06-01",
      endDate: "2020-08-31",
      current: false,
      description: "Developed web applications and contributed to the company's main product, a SaaS platform for small businesses.",
      responsibilities: [
        "Built responsive web interfaces using React and TypeScript",
        "Implemented RESTful APIs using Node.js and Express",
        "Collaborated with UX designers to improve user experience",
        "Participated in agile development processes and code reviews",
        "Wrote unit tests and integration tests for new features"
      ],
      technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Jest"],
      achievements: [
        "Developed feature used by 80% of active users",
        "Improved application performance by 30% through optimization",
        "Received offer for full-time position upon graduation"
      ],
      logo: "/assets/images/companies/startupx.png",
      website: "https://startupx.com"
    }
  ];
  
  export const consultingExperience = [
    {
      id: 1,
      client: "HealthTech Innovations",
      project: "AI-Powered Diagnostic System",
      duration: "6 months",
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      description: "Designed and implemented a machine learning system for medical image analysis to assist radiologists in early disease detection.",
      role: "Lead AI Consultant",
      technologies: ["Python", "TensorFlow", "OpenCV", "FastAPI", "Docker"],
      outcomes: [
        "Achieved 94% accuracy in early-stage cancer detection",
        "Reduced diagnosis time by 50%",
        "System deployed across 15 hospitals"
      ],
      testimonial: "The AI system developed exceeded our expectations. The accuracy and speed improvements have significantly enhanced our diagnostic capabilities.",
      clientLogo: "/assets/images/clients/healthtech-innovations.png"
    },
    {
      id: 2,
      client: "Financial Services Corp",
      project: "Fraud Detection System",
      duration: "4 months",
      startDate: "2023-08-01",
      endDate: "2023-11-30",
      description: "Developed a real-time fraud detection system using machine learning to identify suspicious transactions and prevent financial losses.",
      role: "Senior ML Consultant",
      technologies: ["Python", "Apache Kafka", "Redis", "PostgreSQL", "Kubernetes"],
      outcomes: [
        "Reduced false positives by 40%",
        "Detected 99.2% of fraudulent transactions",
        "Saved $2.3M in potential losses during pilot phase"
      ],
      testimonial: "The fraud detection system has revolutionized our security posture. The real-time capabilities and low false positive rate are exceptional.",
      clientLogo: "/assets/images/clients/financial-services-corp.png"
    },
    {
      id: 3,
      client: "E-commerce Platform",
      project: "Recommendation Engine",
      duration: "3 months",
      startDate: "2023-04-01",
      endDate: "2023-06-30",
      description: "Built a personalized recommendation system to improve user engagement and increase sales conversion rates.",
      role: "ML Consultant",
      technologies: ["Python", "Apache Spark", "Elasticsearch", "Redis", "AWS"],
      outcomes: [
        "Increased click-through rate by 35%",
        "Improved conversion rate by 22%",
        "Enhanced user session duration by 28%"
      ],
      testimonial: "The recommendation system has significantly improved our user engagement metrics and directly contributed to revenue growth.",
      clientLogo: "/assets/images/clients/ecommerce-platform.png"
    }
  ];
  
  export const volunteerExperience = [
    {
      id: 1,
      organization: "AI for Social Good",
      position: "Technical Volunteer",
      startDate: "2022-01-01",
      endDate: null,
      current: true,
      description: "Contributing to open-source projects that leverage AI for addressing social challenges such as climate change, education, and healthcare accessibility.",
      contributions: [
        "Developed climate prediction models for NGOs",
        "Created educational AI tools for underserved communities",
        "Mentored 15+ students in AI/ML fundamentals",
        "Organized monthly tech talks for the community"
      ],
      logo: "/assets/images/organizations/ai-for-social-good.png",
      website: "https://aiforsocialgood.org"
    },
    {
      id: 2,
      organization: "Code for Change",
      position: "Project Lead",
      startDate: "2021-06-01",
      endDate: "2023-12-31",
      current: false,
      description: "Led development of technological solutions for local government and non-profit organizations to improve public services and community engagement.",
      contributions: [
        "Built civic engagement platform used by 10,000+ citizens",
        "Coordinated team of 8 volunteer developers",
        "Established partnerships with 5 local government agencies",
        "Conducted workshops on digital literacy for seniors"
      ],
      logo: "/assets/images/organizations/code-for-change.png",
      website: "https://codeforchange.org"
    }
  ];
  
  export const skills = {
    technical: [
      { name: "Python", level: 95, years: 6 },
      { name: "Machine Learning", level: 90, years: 5 },
      { name: "Deep Learning", level: 88, years: 4 },
      { name: "TensorFlow", level: 85, years: 4 },
      { name: "PyTorch", level: 82, years: 3 },
      { name: "JavaScript", level: 80, years: 5 },
      { name: "React", level: 75, years: 3 },
      { name: "Node.js", level: 70, years: 3 },
      { name: "Docker", level: 75, years: 3 },
      { name: "Kubernetes", level: 65, years: 2 },
      { name: "AWS", level: 70, years: 3 },
      { name: "PostgreSQL", level: 75, years: 4 },
      { name: "MongoDB", level: 70, years: 3 }
    ],
    research: [
      { name: "Research Methodology", level: 90 },
      { name: "Statistical Analysis", level: 85 },
      { name: "Data Analysis", level: 88 },
      { name: "Academic Writing", level: 85 },
      { name: "Grant Writing", level: 75 },
      { name: "Peer Review", level: 80 }
    ],
    soft: [
      { name: "Leadership", level: 85 },
      { name: "Communication", level: 88 },
      { name: "Problem Solving", level: 92 },
      { name: "Team Collaboration", level: 90 },
      { name: "Project Management", level: 80 },
      { name: "Mentoring", level: 85 }
    ]
  };
  
  export const getExperienceByType = (type) => {
    switch (type) {
      case 'work':
        return workExperience;
      case 'consulting':
        return consultingExperience;
      case 'volunteer':
        return volunteerExperience;
      default:
        return workExperience;
    }
  };
  
  export const getCurrentPosition = () => {
    return workExperience.find(exp => exp.current);
  };
  
  export const getExperienceStats = () => {
    const totalYears = calculateTotalExperience();
    const totalPositions = workExperience.length + consultingExperience.length;
    const totalClients = consultingExperience.length;
    const totalVolunteerHours = 500; // This could be calculated from actual data
    
    return {
      totalYears,
      totalPositions,
      totalClients,
      totalVolunteerHours
    };
  };
  
  const calculateTotalExperience = () => {
    if (workExperience.length === 0) return 0;
    
    const firstJob = workExperience[workExperience.length - 1];
    const startDate = new Date(firstJob.startDate);
    const endDate = new Date();
    
    const years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(years);
  };