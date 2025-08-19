export const projects = [
    {
      id: 1,
      title: "Neural Network Optimization for Healthcare",
      description: "Developed advanced neural network architectures for medical image analysis, improving diagnostic accuracy by 15% and reducing processing time by 30%.",
      longDescription: "This project involved creating custom neural network architectures specifically designed for medical imaging applications. The research focused on optimizing convolutional neural networks for X-ray, MRI, and CT scan analysis. Key achievements include implementing attention mechanisms, developing novel loss functions, and creating efficient data augmentation techniques.",
      category: "Research",
      type: "Machine Learning",
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenCV", "NumPy"],
      status: "Completed",
      startDate: "2023-01-15",
      endDate: "2023-08-30",
      teamSize: 4,
      role: "Lead Researcher",
      githubUrl: "https://github.com/username/neural-healthcare",
      liveUrl: "https://neural-healthcare-demo.com",
      paperUrl: "https://arxiv.org/abs/2023.12345",
      images: [
        "/assets/images/projects/neural-healthcare-1.jpg",
        "/assets/images/projects/neural-healthcare-2.jpg",
        "/assets/images/projects/neural-healthcare-3.jpg"
      ],
      tags: ["Deep Learning", "Healthcare", "Computer Vision", "Medical Imaging"],
      metrics: {
        accuracy: "94.2%",
        processingTime: "2.3s",
        datasetSize: "10,000 images",
        modelSize: "45MB"
      },
      challenges: [
        "Handling imbalanced medical datasets",
        "Ensuring model interpretability for clinical use",
        "Optimizing for real-time processing"
      ],
      outcomes: [
        "15% improvement in diagnostic accuracy",
        "30% reduction in processing time",
        "Published in top-tier medical AI conference"
      ],
      featured: true
    },
    {
      id: 2,
      title: "E-commerce Analytics Dashboard",
      description: "Built a comprehensive analytics platform for e-commerce businesses with real-time data visualization and predictive insights.",
      longDescription: "A full-stack web application that provides e-commerce businesses with detailed analytics about their sales, customer behavior, and inventory management. The platform includes real-time dashboards, predictive analytics for demand forecasting, and automated reporting features.",
      category: "Development",
      type: "Web Application",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Chart.js", "Express"],
      status: "In Progress",
      startDate: "2023-06-01",
      endDate: null,
      teamSize: 3,
      role: "Full-Stack Developer",
      githubUrl: "https://github.com/username/ecommerce-analytics",
      liveUrl: "https://ecommerce-analytics-demo.com",
      paperUrl: null,
      images: [
        "/assets/images/projects/ecommerce-analytics-1.jpg",
        "/assets/images/projects/ecommerce-analytics-2.jpg"
      ],
      tags: ["React", "Analytics", "E-commerce", "Data Visualization"],
      metrics: {
        users: "500+",
        dataPoints: "1M+",
        responseTime: "< 200ms",
        uptime: "99.9%"
      },
      challenges: [
        "Handling large-scale real-time data processing",
        "Creating intuitive data visualizations",
        "Ensuring data privacy and security"
      ],
      outcomes: [
        "Improved decision-making for 100+ businesses",
        "20% average increase in sales efficiency",
        "Featured in tech industry publications"
      ],
      featured: true
    },
    {
      id: 3,
      title: "Climate Data Analysis Platform",
      description: "Developed a comprehensive platform for analyzing climate data patterns and predicting environmental changes using machine learning.",
      longDescription: "This research project involved creating a sophisticated platform for processing and analyzing large-scale climate datasets. The system incorporates time series analysis, geospatial data processing, and predictive modeling to help researchers understand climate patterns and predict future environmental changes.",
      category: "Research",
      type: "Data Science",
      technologies: ["Python", "R", "Apache Spark", "Hadoop", "Jupyter", "Plotly"],
      status: "Completed",
      startDate: "2022-09-01",
      endDate: "2023-05-15",
      teamSize: 6,
      role: "Data Scientist",
      githubUrl: "https://github.com/username/climate-analysis",
      liveUrl: null,
      paperUrl: "https://doi.org/10.1000/climate.2023.001",
      images: [
        "/assets/images/projects/climate-analysis-1.jpg",
        "/assets/images/projects/climate-analysis-2.jpg",
        "/assets/images/projects/climate-analysis-3.jpg"
      ],
      tags: ["Climate Science", "Big Data", "Machine Learning", "Environmental Research"],
      metrics: {
        dataProcessed: "50TB",
        accuracy: "87.5%",
        predictionRange: "12 months",
        regions: "200+"
      },
      challenges: [
        "Processing massive climate datasets",
        "Dealing with missing and irregular data",
        "Creating accurate long-term predictions"
      ],
      outcomes: [
        "Improved climate prediction accuracy by 12%",
        "Identified new climate pattern indicators",
        "Collaboration with 5 international research institutes"
      ],
      featured: false
    },
    {
      id: 4,
      title: "Mobile Learning Application",
      description: "Created an adaptive mobile learning platform that personalizes educational content based on individual learning patterns.",
      longDescription: "A cross-platform mobile application that uses AI to create personalized learning experiences. The app adapts to each user's learning style, pace, and preferences to optimize educational outcomes. Features include interactive lessons, progress tracking, and social learning components.",
      category: "Development",
      type: "Mobile App",
      technologies: ["React Native", "Firebase", "TensorFlow Lite", "Node.js", "MongoDB"],
      status: "Completed",
      startDate: "2022-03-01",
      endDate: "2023-01-30",
      teamSize: 5,
      role: "Mobile Developer",
      githubUrl: "https://github.com/username/mobile-learning",
      liveUrl: "https://apps.apple.com/app/adaptive-learning",
      paperUrl: null,
      images: [
        "/assets/images/projects/mobile-learning-1.jpg",
        "/assets/images/projects/mobile-learning-2.jpg"
      ],
      tags: ["Mobile Development", "EdTech", "AI", "Personalization"],
      metrics: {
        downloads: "10,000+",
        activeUsers: "5,000+",
        completionRate: "78%",
        rating: "4.6/5"
      },
      challenges: [
        "Implementing AI on mobile devices",
        "Creating engaging user interfaces",
        "Ensuring offline functionality"
      ],
      outcomes: [
        "25% improvement in learning outcomes",
        "Featured in education technology conferences",
        "Positive feedback from 1000+ users"
      ],
      featured: true
    },
    {
      id: 5,
      title: "Blockchain-based Supply Chain Tracker",
      description: "Implemented a blockchain solution for transparent and secure supply chain tracking across multiple industries.",
      longDescription: "A comprehensive blockchain-based system that provides end-to-end visibility in supply chains. The platform enables companies to track products from origin to consumer, ensuring authenticity, preventing counterfeiting, and improving transparency in global trade.",
      category: "Development",
      type: "Blockchain",
      technologies: ["Solidity", "Ethereum", "Web3.js", "React", "IPFS", "Truffle"],
      status: "Completed",
      startDate: "2022-11-01",
      endDate: "2023-07-15",
      teamSize: 4,
      role: "Blockchain Developer",
      githubUrl: "https://github.com/username/blockchain-supply-chain",
      liveUrl: "https://supply-chain-tracker.com",
      paperUrl: null,
      images: [
        "/assets/images/projects/blockchain-supply-1.jpg",
        "/assets/images/projects/blockchain-supply-2.jpg"
      ],
      tags: ["Blockchain", "Supply Chain", "Ethereum", "Transparency"],
      metrics: {
        transactions: "50,000+",
        partners: "25",
        products: "100,000+",
        efficiency: "40% improvement"
      },
      challenges: [
        "Ensuring scalability on blockchain networks",
        "Integrating with existing supply chain systems",
        "Managing transaction costs"
      ],
      outcomes: [
        "Reduced counterfeiting by 60%",
        "Improved supply chain visibility",
        "Adopted by 3 major corporations"
      ],
      featured: false
    },
    {
      id: 6,
      title: "AI-powered Content Management System",
      description: "Developed an intelligent CMS that automatically categorizes, tags, and optimizes content using natural language processing.",
      longDescription: "An advanced content management system that leverages AI to automate content workflows. The system uses natural language processing to understand content context, automatically generate tags and categories, optimize for SEO, and suggest content improvements.",
      category: "Development",
      type: "Web Application",
      technologies: ["Python", "Django", "PostgreSQL", "React", "NLTK", "spaCy"],
      status: "In Progress",
      startDate: "2023-04-01",
      endDate: null,
      teamSize: 3,
      role: "Backend Developer",
      githubUrl: "https://github.com/username/ai-cms",
      liveUrl: null,
      paperUrl: null,
      images: [
        "/assets/images/projects/ai-cms-1.jpg"
      ],
      tags: ["AI", "NLP", "Content Management", "Automation"],
      metrics: {
        contentProcessed: "10,000+ articles",
        accuracy: "92%",
        timeReduction: "70%",
        languages: "5"
      },
      challenges: [
        "Understanding context in multiple languages",
        "Ensuring content quality standards",
        "Balancing automation with human oversight"
      ],
      outcomes: [
        "70% reduction in content processing time",
        "Improved content discoverability",
        "Enhanced SEO performance"
      ],
      featured: false
    }
  ];
  
  export const projectCategories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'research', name: 'Research', count: projects.filter(p => p.category === 'Research').length },
    { id: 'development', name: 'Development', count: projects.filter(p => p.category === 'Development').length },
    { id: 'featured', name: 'Featured', count: projects.filter(p => p.featured).length }
  ];
  
  export const projectTypes = [
    'Machine Learning',
    'Web Application',
    'Mobile App',
    'Data Science',
    'Blockchain',
    'AI/ML',
    'Full Stack'
  ];
  
  export const projectTechnologies = [
    'Python', 'JavaScript', 'React', 'Node.js', 'TensorFlow', 'PyTorch',
    'PostgreSQL', 'MongoDB', 'Firebase', 'AWS', 'Docker', 'Kubernetes',
    'Solidity', 'Ethereum', 'Django', 'Flask', 'React Native', 'Vue.js'
  ];
  
  export const projectStatuses = [
    'Completed',
    'In Progress',
    'Planning',
    'On Hold',
    'Cancelled'
  ];
  
  // Utility Functions
  export const getFeaturedProjects = () => projects.filter(project => project.featured);
  
  export const getProjectsByCategory = (category) => {
    if (category === 'all') return projects;
    return projects.filter(project => project.category.toLowerCase() === category.toLowerCase());
  };
  
  export const getProjectsByTechnology = (technology) => {
    return projects.filter(project => 
      project.technologies.includes(technology)
    );
  };
  
  export const getProjectsByStatus = (status) => {
    return projects.filter(project => project.status === status);
  };
  
  export const getProjectsByType = (type) => {
    return projects.filter(project => project.type === type);
  };
  
  export const getProjectById = (id) => {
    return projects.find(project => project.id === id);
  };
  
  export const getProjectsByDateRange = (startDate, endDate) => {
    return projects.filter(project => {
      const projectStart = new Date(project.startDate);
      const projectEnd = project.endDate ? new Date(project.endDate) : new Date();
      const rangeStart = new Date(startDate);
      const rangeEnd = new Date(endDate);
      
      return projectStart <= rangeEnd && projectEnd >= rangeStart;
    });
  };
  
  export const getProjectsByRole = (role) => {
    return projects.filter(project => 
      project.role.toLowerCase().includes(role.toLowerCase())
    );
  };
  
  export const getProjectsByTeamSize = (minSize, maxSize) => {
    return projects.filter(project => 
      project.teamSize >= minSize && project.teamSize <= maxSize
    );
  };
  
  export const searchProjects = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return projects.filter(project => 
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.longDescription.toLowerCase().includes(lowercaseQuery) ||
      project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery)) ||
      project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };
  
  export const getProjectMetrics = () => {
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === 'Completed').length;
    const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;
    const featuredProjects = projects.filter(p => p.featured).length;
    
    const allTechnologies = projects.flatMap(p => p.technologies);
    const uniqueTechnologies = [...new Set(allTechnologies)];
    const mostUsedTechnology = uniqueTechnologies.reduce((prev, current) => 
      allTechnologies.filter(tech => tech === current).length > 
      allTechnologies.filter(tech => tech === prev).length ? current : prev
    );
    
    const categories = [...new Set(projects.map(p => p.category))];
    const types = [...new Set(projects.map(p => p.type))];
    
    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      featuredProjects,
      completionRate: Math.round((completedProjects / totalProjects) * 100),
      uniqueTechnologies: uniqueTechnologies.length,
      mostUsedTechnology,
      categories: categories.length,
      types: types.length,
      averageTeamSize: Math.round(projects.reduce((sum, p) => sum + p.teamSize, 0) / totalProjects)
    };
  };
  
  export const sortProjects = (sortBy = 'startDate', order = 'desc') => {
    return [...projects].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Handle date sorting
      if (sortBy === 'startDate' || sortBy === 'endDate') {
        aValue = new Date(aValue || '1970-01-01');
        bValue = new Date(bValue || '1970-01-01');
      }
      
      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };
  
  export const getProjectDuration = (project) => {
    if (!project.endDate) return 'Ongoing';
    
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    const diffInMs = end - start;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.ceil(diffInDays / 30);
    
    if (diffInMonths < 1) return `${diffInDays} days`;
    if (diffInMonths < 12) return `${diffInMonths} months`;
    
    const years = Math.floor(diffInMonths / 12);
    const remainingMonths = diffInMonths % 12;
    
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  };
  
  export const getRecentProjects = (count = 3) => {
    return sortProjects('startDate', 'desc').slice(0, count);
  };
  
  export const getProjectsWithPapers = () => {
    return projects.filter(project => project.paperUrl);
  };
  
  export const getProjectsWithLiveUrls = () => {
    return projects.filter(project => project.liveUrl);
  };
  
  // Export default for easier importing
  export default {
    projects,
    projectCategories,
    projectTypes,
    projectTechnologies,
    projectStatuses,
    getFeaturedProjects,
    getProjectsByCategory,
    getProjectsByTechnology,
    getProjectsByStatus,
    getProjectsByType,
    getProjectById,
    getProjectsByDateRange,
    getProjectsByRole,
    getProjectsByTeamSize,
    searchProjects,
    getProjectMetrics,
    sortProjects,
    getProjectDuration,
    getRecentProjects,
    getProjectsWithPapers,
    getProjectsWithLiveUrls
  };