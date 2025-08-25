// src/data/publications.js
export const publications = [
    {
      id: 1,
      title: "Deep Learning Approaches for Natural Language Processing in Healthcare",
      authors: ["Shailesh K", "Dr. Jane Smith", "Dr. Michael Johnson"],
      journal: "Journal of Medical Informatics",
      year: 2024,
      volume: "45",
      issue: "2",
      pages: "123-145",
      doi: "10.1016/j.jmi.2024.02.003",
      abstract: "This paper presents a comprehensive study on the application of deep learning techniques in healthcare natural language processing. We propose a novel transformer-based architecture that achieves state-of-the-art results in medical text classification and entity recognition tasks.",
      keywords: ["Deep Learning", "NLP", "Healthcare", "Transformers", "Medical Text"],
      type: "journal",
      status: "published",
      citations: 23,
      pdfUrl: "/assets/documents/publications/deep-learning-nlp-healthcare.pdf",
      url: "https://doi.org/10.1016/j.jmi.2024.02.003",
      featured: true
    },
    {
      id: 2,
      title: "Ethical Considerations in AI-Driven Decision Making Systems",
      authors: ["Shailesh K", "Dr. Sarah Wilson"],
      conference: "International Conference on AI Ethics",
      year: 2024,
      location: "San Francisco, CA",
      pages: "78-92",
      abstract: "As AI systems become more prevalent in critical decision-making processes, it's crucial to address the ethical implications. This paper explores frameworks for ensuring fairness, transparency, and accountability in AI systems.",
      keywords: ["AI Ethics", "Fairness", "Transparency", "Accountability"],
      type: "conference",
      status: "published",
      citations: 15,
      pdfUrl: "/assets/documents/publications/ai-ethics-decision-making.pdf",
      slides: "/assets/documents/presentations/ai-ethics-slides.pdf",
      featured: true
    },
    {
      id: 3,
      title: "Scalable Machine Learning Infrastructure for Real-time Analytics",
      authors: ["Shailesh K", "Dr. Alex Chen", "Dr. Maria Rodriguez"],
      journal: "IEEE Transactions on Big Data",
      year: 2023,
      volume: "9",
      issue: "4",
      pages: "567-589",
      doi: "10.1109/TBDATA.2023.3245678",
      abstract: "This work presents a scalable architecture for deploying machine learning models in production environments with real-time analytics requirements. We demonstrate significant improvements in latency and throughput compared to existing solutions.",
      keywords: ["Machine Learning", "Scalability", "Real-time Analytics", "Infrastructure"],
      type: "journal",
      status: "published",
      citations: 31,
      pdfUrl: "/assets/documents/publications/scalable-ml-infrastructure.pdf",
      codeUrl: "https://github.com/yourusername/scalable-ml-infra",
      featured: false
    },
    {
      id: 4,
      title: "Quantum Computing Applications in Optimization Problems",
      authors: ["Shailesh K", "Dr. Robert Kim"],
      journal: "Nature Quantum Information",
      year: 2023,
      volume: "9",
      issue: "1",
      pages: "45-62",
      doi: "10.1038/s41534-023-00123-4",
      abstract: "We investigate the potential of quantum computing algorithms for solving complex optimization problems. Our results show promising speedups for certain classes of NP-hard problems.",
      keywords: ["Quantum Computing", "Optimization", "Algorithms", "NP-hard"],
      type: "journal",
      status: "published",
      citations: 18,
      pdfUrl: "/assets/documents/publications/quantum-optimization.pdf",
      featured: false
    },
    {
      id: 5,
      title: "Privacy-Preserving Federated Learning for Healthcare Data",
      authors: ["Shailesh K", "Dr. Lisa Thompson", "Dr. James Lee"],
      conference: "ACM Conference on Computer and Communications Security",
      year: 2023,
      location: "Copenhagen, Denmark",
      pages: "234-248",
      abstract: "This paper proposes a novel approach to federated learning that preserves patient privacy while enabling collaborative model training across multiple healthcare institutions.",
      keywords: ["Federated Learning", "Privacy", "Healthcare", "Differential Privacy"],
      type: "conference",
      status: "published",
      citations: 27,
      pdfUrl: "/assets/documents/publications/privacy-federated-learning.pdf",
      featured: true
    },
    {
      id: 6,
      title: "Automated Code Review using Large Language Models",
      authors: ["Shailesh K", "Dr. Emma Davis"],
      journal: "Journal of Software Engineering",
      year: 2024,
      status: "under_review",
      abstract: "We present a system that leverages large language models to automate code review processes, identifying potential bugs, security vulnerabilities, and code quality issues.",
      keywords: ["Code Review", "Large Language Models", "Software Engineering", "Automation"],
      type: "journal",
      pdfUrl: "/assets/documents/publications/automated-code-review-preprint.pdf",
      featured: false
    }
  ];
  
  export const publicationTypes = [
    { value: "all", label: "All Publications" },
    { value: "journal", label: "Journal Articles" },
    { value: "conference", label: "Conference Papers" },
    { value: "preprint", label: "Preprints" },
    { value: "book", label: "Books & Chapters" }
  ];
  
  export const publicationYears = [
    { value: "all", label: "All Years" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" }
  ];
  
  export const getPublicationsByType = (type) => {
    if (type === "all") return publications;
    return publications.filter(pub => pub.type === type);
  };
  
  export const getPublicationsByYear = (year) => {
    if (year === "all") return publications;
    return publications.filter(pub => pub.year.toString() === year);
  };
  
  export const getFeaturedPublications = () => {
    return publications.filter(pub => pub.featured);
  };
  
  export const getPublicationStats = () => {
    const totalCitations = publications.reduce((sum, pub) => sum + (pub.citations || 0), 0);
    const totalPublications = publications.length;
    const publishedPublications = publications.filter(pub => pub.status === "published").length;
    const hIndex = calculateHIndex(publications);
    
    return {
      totalPublications,
      publishedPublications,
      totalCitations,
      hIndex
    };
  };
  
  const calculateHIndex = (publications) => {
    const citations = publications
      .map(pub => pub.citations || 0)
      .sort((a, b) => b - a);
    
    let hIndex = 0;
    for (let i = 0; i < citations.length; i++) {
      if (citations[i] >= i + 1) {
        hIndex = i + 1;
      } else {
        break;
      }
    }
    
    return hIndex;
  };