// src/data/talks.js
export const talks = [
    {
      id: 1,
      title: "The Future of AI in Healthcare: Opportunities and Challenges",
      event: "AI in Healthcare Summit 2024",
      type: "keynote",
      date: "2024-03-15",
      location: "San Francisco, CA",
      venue: "Moscone Center",
      duration: 45,
      audience: 500,
      description: "Explored the transformative potential of AI in healthcare, addressing current applications, future possibilities, and the ethical considerations that must guide development.",
      topics: [
        "AI-powered diagnostics",
        "Drug discovery acceleration",
        "Personalized medicine",
        "Ethical AI in healthcare",
        "Regulatory considerations"
      ],
      slidesUrl: "/assets/documents/presentations/ai-healthcare-keynote-2024.pdf",
      videoUrl: "https://youtube.com/watch?v=example1",
      abstract: "This keynote presentation examines the current state and future potential of artificial intelligence in healthcare. We'll explore breakthrough applications in medical imaging, drug discovery, and personalized treatment while addressing the critical ethical and regulatory challenges that must be navigated to ensure responsible AI deployment in healthcare settings.",
      featured: true,
      rating: 4.8,
      feedback: "Incredibly insightful presentation that balanced technical depth with accessibility. The ethical framework discussion was particularly valuable.",
      image: "/assets/images/talks/ai-healthcare-keynote.jpg"
    },
    {
      id: 2,
      title: "Building Scalable ML Systems: From Research to Production",
      event: "MLOps Conference 2024",
      type: "technical",
      date: "2024-02-20",
      location: "New York, NY",
      venue: "Javits Center",
      duration: 30,
      audience: 300,
      description: "Shared practical insights on transitioning machine learning research prototypes to production-ready systems that scale.",
      topics: [
        "MLOps best practices",
        "Model deployment strategies",
        "Monitoring and maintenance",
        "Performance optimization",
        "Team collaboration"
      ],
      slidesUrl: "/assets/documents/presentations/scalable-ml-systems-2024.pdf",
      videoUrl: "https://youtube.com/watch?v=example2",
      codeUrl: "https://github.com/yourusername/scalable-ml-demo",
      abstract: "This technical presentation provides a comprehensive guide to building scalable machine learning systems. Drawing from real-world experience, we'll cover the entire lifecycle from research prototype to production deployment, including infrastructure considerations, monitoring strategies, and team collaboration best practices.",
      featured: true,
      rating: 4.6,
      feedback: "Excellent practical advice with real-world examples. The code samples were particularly helpful for implementation.",
      image: "/assets/images/talks/scalable-ml-systems.jpg"
    },
    {
      id: 3,
      title: "Quantum Computing for Machine Learning: Current State and Future Prospects",
      event: "Quantum Technology Symposium 2023",
      type: "research",
      date: "2023-11-10",
      location: "Boston, MA",
      venue: "MIT Campus",
      duration: 35,
      audience: 150,
      description: "Presented research findings on quantum algorithms for machine learning and their potential advantages over classical approaches.",
      topics: [
        "Quantum machine learning algorithms",
        "Quantum advantage in optimization",
        "Current limitations and challenges",
        "Future research directions",
        "Practical implementation considerations"
      ],
      slidesUrl: "/assets/documents/presentations/quantum-ml-symposium-2023.pdf",
      paperUrl: "/assets/documents/publications/quantum-ml-paper.pdf",
      abstract: "This research presentation explores the intersection of quantum computing and machine learning, examining current algorithms, potential quantum advantages, and practical challenges. We'll discuss recent breakthroughs and outline promising research directions for the field.",
      featured: false,
      rating: 4.4,
      feedback: "Fascinating research with clear explanations of complex concepts. Great balance of theoretical and practical insights.",
      image: "/assets/images/talks/quantum-ml-symposium.jpg"
    },
    {
      id: 4,
      title: "Ethics in AI: Building Responsible Systems",
      event: "Tech Ethics Conference 2023",
      type: "panel",
      date: "2023-09-25",
      location: "Austin, TX",
      venue: "Austin Convention Center",
      duration: 60,
      audience: 400,
      description: "Participated in a panel discussion on ethical considerations in AI development, focusing on bias, fairness, and accountability.",
      topics: [
        "AI bias and fairness",
        "Algorithmic accountability",
        "Transparent AI systems",
        "Regulatory frameworks",
        "Industry best practices"
      ],
      videoUrl: "https://youtube.com/watch?v=example3",
      abstract: "This panel discussion brings together experts from academia, industry, and policy to discuss the critical ethical challenges in AI development. We'll explore practical approaches to building more fair, transparent, and accountable AI systems.",
      featured: true,
      rating: 4.7,
      feedback: "Thought-provoking discussion with diverse perspectives. The policy recommendations were particularly valuable.",
      image: "/assets/images/talks/ethics-panel.jpg",
      panelists: [
        { name: "Dr. Sarah Chen", affiliation: "Stanford University" },
        { name: "Mike Johnson", affiliation: "Google AI" },
        { name: "Lisa Rodriguez", affiliation: "AI Ethics Institute" }
      ]
    },
    {
      id: 5,
      title: "Introduction to Deep Learning for Beginners",
      event: "Community Tech Meetup",
      type: "workshop",
      date: "2023-08-15",
      location: "Seattle, WA",
      venue: "Seattle Public Library",
      duration: 120,
      audience: 50,
      description: "Conducted a hands-on workshop introducing deep learning concepts to beginners with practical coding exercises.",
      topics: [
        "Neural network fundamentals",
        "Training your first model",
        "Common architectures",
        "Practical applications",
        "Getting started with TensorFlow"
      ],
      slidesUrl: "/assets/documents/presentations/deep-learning-workshop-2023.pdf",
      codeUrl: "https://github.com/yourusername/deep-learning-workshop",
      materialsUrl: "/assets/documents/workshops/deep-learning-materials.zip",
      abstract: "This hands-on workshop provides a gentle introduction to deep learning for beginners. Participants will learn fundamental concepts through practical exercises and build their first neural network model.",
      featured: false,
      rating: 4.9,
      feedback: "Excellent workshop with clear explanations and practical exercises. Perfect for beginners!",
      image: "/assets/images/talks/deep-learning-workshop.jpg"
    },
    {
      id: 6,
      title: "The Role of AI in Climate Change Solutions",
      event: "Climate Tech Summit 2023",
      type: "keynote",
      date: "2023-06-20",
      location: "San Diego, CA",
      venue: "San Diego Convention Center",
      duration: 40,
      audience: 350,
      description: "Explored how artificial intelligence can be leveraged to address climate change challenges and accelerate sustainable solutions.",
      topics: [
        "AI for climate modeling",
        "Energy optimization",
        "Carbon footprint reduction",
        "Sustainable agriculture",
        "Green technology innovation"
      ],
      slidesUrl: "/assets/documents/presentations/ai-climate-keynote-2023.pdf",
      videoUrl: "https://youtube.com/watch?v=example4",
      abstract: "This keynote examines the critical role of artificial intelligence in addressing climate change. We'll explore current applications, emerging technologies, and the potential for AI to accelerate the transition to a sustainable future.",
      featured: true,
      rating: 4.5,
      feedback: "Inspiring presentation that highlighted the positive impact AI can have on climate solutions. Well-researched and engaging.",
      image: "/assets/images/talks/ai-climate-keynote.jpg"
    }
  ];
  
  export const upcomingTalks = [
    {
      id: 1,
      title: "Generative AI: Transforming Creative Industries",
      event: "Creative AI Conference 2024",
      type: "keynote",
      date: "2024-08-15",
      location: "Los Angeles, CA",
      venue: "Hollywood Convention Center",
      duration: 50,
      status: "confirmed",
      description: "Exploring how generative AI is revolutionizing creative industries from art and music to content creation and design.",
      registrationUrl: "https://creativeai2024.com/register",
      eventUrl: "https://creativeai2024.com"
    },
    {
      id: 2,
      title: "Federated Learning: Privacy-Preserving AI",
      event: "Privacy Tech Summit 2024",
      type: "technical",
      date: "2024-09-10",
      location: "Virtual",
      venue: "Online",
      duration: 30,
      status: "confirmed",
      description: "Technical deep-dive into federated learning approaches for building AI systems that preserve user privacy.",
      registrationUrl: "https://privacytech2024.com/register"
    },
    {
      id: 3,
      title: "AI Research Methodology Workshop",
      event: "Graduate Student Research Symposium",
      type: "workshop",
      date: "2024-10-05",
      location: "Cambridge, MA",
      venue: "Harvard University",
      duration: 180,
      status: "pending",
      description: "Comprehensive workshop on research methodology for graduate students pursuing AI research."
    }
  ];
  
  export const talkTopics = [
    { category: "AI/ML", topics: ["Deep Learning", "Machine Learning", "Neural Networks", "AI Ethics"] },
    { category: "Research", topics: ["Research Methodology", "Academic Writing", "Grant Writing", "Peer Review"] },
    { category: "Technology", topics: ["Software Engineering", "Cloud Computing", "Data Science", "MLOps"] },
    { category: "Industry", topics: ["Startups", "Product Development", "Team Leadership", "Career Development"] },
    { category: "Social Impact", topics: ["AI for Good", "Climate Tech", "Healthcare AI", "Education Technology"] }
  ];
  
  export const speakingExperience = {
    totalTalks: talks.length,
    totalAudience: talks.reduce((sum, talk) => sum + talk.audience, 0),
    averageRating: talks.reduce((sum, talk) => sum + (talk.rating || 0), 0) / talks.filter(talk => talk.rating).length,
    countries: ["USA", "Canada", "UK", "Germany", "Japan"],
    languages: ["English", "Spanish"],
    yearsActive: 5
  };
  
  export const talkTypes = [
    { value: "all", label: "All Types" },
    { value: "keynote", label: "Keynote Presentations" },
    { value: "technical", label: "Technical Talks" },
    { value: "research", label: "Research Presentations" },
    { value: "panel", label: "Panel Discussions" },
    { value: "workshop", label: "Workshops" }
  ];
  
  export const getTalksByType = (type) => {
    if (type === "all") return talks;
    return talks.filter(talk => talk.type === type);
  };
  
  export const getTalksByYear = (year) => {
    if (year === "all") return talks;
    return talks.filter(talk => new Date(talk.date).getFullYear().toString() === year);
  };
  
  export const getFeaturedTalks = () => {
    return talks.filter(talk => talk.featured);
  };
  
  export const getUpcomingTalks = () => {
    return upcomingTalks.filter(talk => new Date(talk.date) > new Date());
  };
  
  export const getTalkStats = () => {
    const totalTalks = talks.length;
    const totalAudience = talks.reduce((sum, talk) => sum + talk.audience, 0);
    const averageRating = talks.reduce((sum, talk) => sum + (talk.rating || 0), 0) / talks.filter(talk => talk.rating).length;
    const upcomingCount = getUpcomingTalks().length;
    
    return {
      totalTalks,
      totalAudience,
      averageRating: Math.round(averageRating * 10) / 10,
      upcomingCount
    };
  };