// src/data/education.js
export const education = [
    {
      id: 1,
      institution: "Massachusetts Institute of Technology",
      degree: "Ph.D. in Computer Science",
      specialization: "Artificial Intelligence and Machine Learning",
      startDate: "2019-09-01",
      endDate: "2023-05-15",
      location: "Cambridge, MA",
      gpa: "3.9/4.0",
      status: "completed",
      dissertation: {
        title: "Scalable Deep Learning Architectures for Real-time Natural Language Processing",
        advisor: "Dr. Sarah Johnson",
        committee: ["Dr. Michael Chen", "Dr. Lisa Rodriguez", "Dr. James Wilson"],
        abstract: "This dissertation explores novel architectures for scaling deep learning models in natural language processing applications. We propose a new transformer variant that achieves significant improvements in both speed and accuracy for real-time applications.",
        pdfUrl: "/assets/documents/dissertation.pdf"
      },
      coursework: [
        "Advanced Machine Learning",
        "Deep Learning Systems",
        "Natural Language Processing",
        "Computer Vision",
        "Optimization for Machine Learning",
        "Distributed Systems",
        "Research Methods in AI"
      ],
      achievements: [
        "MIT Presidential Fellowship (2019-2020)",
        "Best Paper Award at ICML 2022",
        "Teaching Assistant Excellence Award",
        "Graduate Student Research Award"
      ],
      publications: 8,
      logo: "/assets/images/institutions/mit.png",
      website: "https://mit.edu"
    },
    {
      id: 2,
      institution: "Stanford University",
      degree: "M.S. in Computer Science",
      specialization: "Machine Learning",
      startDate: "2017-09-01",
      endDate: "2019-06-15",
      location: "Stanford, CA",
      gpa: "3.8/4.0",
      status: "completed",
      thesis: {
        title: "Federated Learning Approaches for Privacy-Preserving Healthcare Applications",
        advisor: "Dr. Andrew Thompson",
        abstract: "This thesis investigates federated learning techniques that enable collaborative machine learning while preserving patient privacy in healthcare settings.",
        pdfUrl: "/assets/documents/masters-thesis.pdf"
      },
      coursework: [
        "Machine Learning",
        "Statistical Learning Theory",
        "Convex Optimization",
        "Probabilistic Graphical Models",
        "Data Mining",
        "Information Theory",
        "Algorithms and Data Structures"
      ],
      achievements: [
        "Stanford Graduate Fellowship",
        "Outstanding Student in Machine Learning",
        "Research Assistant of the Year",
        "Dean's List (All Semesters)"
      ],
      publications: 3,
      logo: "/assets/images/institutions/stanford.png",
      website: "https://stanford.edu"
    },
    {
      id: 3,
      institution: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      specialization: "Artificial Intelligence",
      startDate: "2013-08-01",
      endDate: "2017-05-15",
      location: "Berkeley, CA",
      gpa: "3.7/4.0",
      status: "completed",
      seniorProject: {
        title: "Automated Code Review System using Machine Learning",
        advisor: "Dr. David Martinez",
        abstract: "Developed a machine learning system that automatically reviews code for potential bugs, security vulnerabilities, and style violations.",
        githubUrl: "https://github.com/yourusername/automated-code-review"
      },
      coursework: [
        "Data Structures and Algorithms",
        "Computer Systems",
        "Database Systems",
        "Operating Systems",
        "Software Engineering",
        "Computer Networks",
        "Artificial Intelligence",
        "Machine Learning"
      ],
      achievements: [
        "Summa Cum Laude",
        "Phi Beta Kappa Honor Society",
        "Outstanding Senior Project Award",
        "ACM Student Research Competition Winner",
        "Dean's Honor List (6 semesters)"
      ],
      activities: [
        "ACM Student Chapter President",
        "CS Undergraduate Student Association",
        "Peer Tutor for Data Structures",
        "Hackathon Organizer"
      ],
      logo: "/assets/images/institutions/berkeley.png",
      website: "https://berkeley.edu"
    }
  ];
  
  export const certifications = [
    {
      id: 1,
      name: "AWS Certified Machine Learning – Specialty",
      issuer: "Amazon Web Services",
      issueDate: "2023-03-15",
      expiryDate: "2026-03-15",
      credentialId: "AWS-MLS-2023-001234",
      badgeUrl: "/assets/images/certifications/aws-ml-specialty.png",
      verificationUrl: "https://aws.amazon.com/verification/AWS-MLS-2023-001234",
      description: "Validates expertise in building, training, tuning, and deploying machine learning models on AWS.",
      skills: ["Machine Learning", "AWS", "Model Deployment", "Data Engineering"]
    },
    {
      id: 2,
      name: "Google Cloud Professional Machine Learning Engineer",
      issuer: "Google Cloud",
      issueDate: "2023-01-20",
      expiryDate: "2025-01-20",
      credentialId: "GCP-PMLE-2023-005678",
      badgeUrl: "/assets/images/certifications/gcp-ml-engineer.png",
      verificationUrl: "https://cloud.google.com/certification/verify/GCP-PMLE-2023-005678",
      description: "Demonstrates ability to design, build, and productionize ML models using Google Cloud technologies.",
      skills: ["Google Cloud", "TensorFlow", "MLOps", "Data Pipeline"]
    },
    {
      id: 3,
      name: "Microsoft Azure AI Engineer Associate",
      issuer: "Microsoft",
      issueDate: "2022-11-10",
      expiryDate: "2024-11-10",
      credentialId: "MSFT-AI-2022-009876",
      badgeUrl: "/assets/images/certifications/azure-ai-engineer.png",
      verificationUrl: "https://docs.microsoft.com/en-us/learn/certifications/azure-ai-engineer",
      description: "Validates skills in designing and implementing AI solutions using Microsoft Azure AI services.",
      skills: ["Azure AI", "Cognitive Services", "Bot Framework", "Machine Learning"]
    },
    {
      id: 4,
      name: "TensorFlow Developer Certificate",
      issuer: "TensorFlow",
      issueDate: "2022-08-05",
      expiryDate: "2025-08-05",
      credentialId: "TF-DEV-2022-001122",
      badgeUrl: "/assets/images/certifications/tensorflow-developer.png",
      verificationUrl: "https://www.credential.net/TF-DEV-2022-001122",
      description: "Demonstrates proficiency in using TensorFlow to solve deep learning and ML problems.",
      skills: ["TensorFlow", "Deep Learning", "Neural Networks", "Python"]
    },
    {
      id: 5,
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      issueDate: "2022-06-15",
      expiryDate: "2025-06-15",
      credentialId: "CKA-2022-003344",
      badgeUrl: "/assets/images/certifications/kubernetes-admin.png",
      verificationUrl: "https://www.cncf.io/certification/verify/CKA-2022-003344",
      description: "Validates skills in Kubernetes cluster administration and management.",
      skills: ["Kubernetes", "Container Orchestration", "DevOps", "Cloud Infrastructure"]
    }
  ];
  
  export const onlineCourses = [
    {
      id: 1,
      title: "Deep Learning Specialization",
      provider: "Coursera (DeepLearning.AI)",
      instructor: "Andrew Ng",
      completionDate: "2021-12-15",
      certificateUrl: "/assets/documents/certificates/deep-learning-specialization.pdf",
      description: "Comprehensive specialization covering neural networks, deep learning, and their applications.",
      courses: [
        "Neural Networks and Deep Learning",
        "Improving Deep Neural Networks",
        "Structuring Machine Learning Projects",
        "Convolutional Neural Networks",
        "Sequence Models"
      ],
      skills: ["Deep Learning", "Neural Networks", "CNN", "RNN", "TensorFlow"]
    },
    {
      id: 2,
      title: "Machine Learning Engineering for Production (MLOps)",
      provider: "Coursera (DeepLearning.AI)",
      instructor: "Andrew Ng",
      completionDate: "2021-09-20",
      certificateUrl: "/assets/documents/certificates/mlops-specialization.pdf",
      description: "Specialization focused on deploying machine learning models in production environments.",
      courses: [
        "Introduction to Machine Learning in Production",
        "Machine Learning Data Lifecycle in Production",
        "Machine Learning Modeling Pipelines in Production",
        "Deploying Machine Learning Models in Production"
      ],
      skills: ["MLOps", "Model Deployment", "Data Pipeline", "Production Systems"]
    },
    {
      id: 3,
      title: "Natural Language Processing Specialization",
      provider: "Coursera (DeepLearning.AI)",
      instructor: "Younes Bensouda Mourri",
      completionDate: "2021-06-10",
      certificateUrl: "/assets/documents/certificates/nlp-specialization.pdf",
      description: "Comprehensive training in natural language processing techniques and applications.",
      courses: [
        "Natural Language Processing with Classification and Vector Spaces",
        "Natural Language Processing with Probabilistic Models",
        "Natural Language Processing with Sequence Models",
        "Natural Language Processing with Attention Models"
      ],
      skills: ["NLP", "Transformers", "BERT", "Attention Mechanisms", "Language Models"]
    },
    {
      id: 4,
      title: "CS50's Introduction to Artificial Intelligence with Python",
      provider: "edX (Harvard University)",
      instructor: "David J. Malan",
      completionDate: "2020-05-15",
      certificateUrl: "/assets/documents/certificates/cs50-ai.pdf",
      description: "Introduction to artificial intelligence concepts and algorithms using Python.",
      topics: [
        "Search Algorithms",
        "Knowledge Representation",
        "Uncertainty and Probability",
        "Optimization",
        "Machine Learning",
        "Neural Networks"
      ],
      skills: ["AI Fundamentals", "Python", "Search Algorithms", "Logic", "Probability"]
    }
  ];
  
  export const researchInterests = [
    {
      area: "Natural Language Processing",
      description: "Developing advanced NLP models for real-world applications",
      keywords: ["Transformers", "Language Models", "Text Generation", "Sentiment Analysis"],
      currentProjects: ["Multilingual NLP", "Conversational AI", "Text Summarization"]
    },
    {
      area: "Computer Vision",
      description: "Creating intelligent systems that can understand and interpret visual information",
      keywords: ["Image Classification", "Object Detection", "Semantic Segmentation", "GANs"],
      currentProjects: ["Medical Image Analysis", "Autonomous Systems", "Visual Question Answering"]
    },
    {
      area: "Machine Learning Infrastructure",
      description: "Building scalable and efficient ML systems for production environments",
      keywords: ["MLOps", "Model Deployment", "Distributed Training", "AutoML"],
      currentProjects: ["Federated Learning", "Edge AI", "Model Compression"]
    },
    {
      area: "AI Ethics and Fairness",
      description: "Ensuring AI systems are fair, transparent, and beneficial for society",
      keywords: ["Algorithmic Fairness", "Bias Detection", "Explainable AI", "Privacy"],
      currentProjects: ["Fair ML", "Differential Privacy", "AI Auditing"]
    }
  ];
  
  export const academicHonors = [
    {
      year: 2023,
      award: "Outstanding Dissertation Award",
      institution: "MIT Computer Science Department",
      description: "Awarded for exceptional research contribution to the field of AI"
    },
    {
      year: 2022,
      award: "Best Paper Award",
      institution: "International Conference on Machine Learning (ICML)",
      description: "Recognition for groundbreaking research in scalable deep learning"
    },
    {
      year: 2021,
      award: "Google PhD Fellowship",
      institution: "Google Research",
      description: "Prestigious fellowship supporting doctoral research in AI"
    },
    {
      year: 2020,
      award: "MIT Presidential Fellowship",
      institution: "Massachusetts Institute of Technology",
      description: "Merit-based fellowship for exceptional doctoral students"
    }
  ];
  
  export const getEducationByLevel = (level) => {
    const levelMap = {
      'phd': education.filter(edu => edu.degree.includes('Ph.D.')),
      'masters': education.filter(edu => edu.degree.includes('M.S.') || edu.degree.includes('M.A.')),
      'bachelors': education.filter(edu => edu.degree.includes('B.S.') || edu.degree.includes('B.A.'))
    };
    return levelMap[level] || education;
  };
  
  export const getActiveCertifications = () => {
    const now = new Date();
    return certifications.filter(cert => new Date(cert.expiryDate) > now);
  };
  
  export const getEducationStats = () => {
    const totalDegrees = education.length;
    const totalCertifications = certifications.length;
    const totalPublications = education.reduce((sum, edu) => sum + (edu.publications || 0), 0);
    const averageGPA = education.reduce((sum, edu) => sum + parseFloat(edu.gpa), 0) / education.length;
    
    return {
      totalDegrees,
      totalCertifications,
      totalPublications,
      averageGPA: Math.round(averageGPA * 100) / 100
    };
  };