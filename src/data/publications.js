// src/data/publications.js
export const publications = [
  {
    id: 1,
    title: "Ensemble Optimization for Monsoon Prediction",
    authors: ["Shailesh Kachhi", "DST Centre of Excellence, IIT Delhi"],
    year: 2025,
    type: "research",
    status: "in_progress",
    abstract:
      "Developed an automated stopping-point detection method to optimize computational resources in precipitation ensemble simulations. Applied statistical and ML techniques on CESM, MPI, and PPE datasets for long-term climate prediction.",
    keywords: ["Climate", "Ensemble", "Optimization", "Precipitation"],
    pdfUrl: "",
    featured: true,
  },
  {
    id: 2,
    title: "VR–Biometrics–NLP Framework for Urban Safety Perception",
    authors: ["Shailesh Kachhi", "GeoAI4Cities Lab, IISER Bhopal"],
    year: 2025,
    type: "research",
    status: "in_progress",
    abstract:
      "Designed immersive VR environments with real-time biometrics and NLP to study women’s safety perception in urban day/night settings. Developed feature extraction pipeline and LSTM-based threat prediction model.",
    keywords: ["VR", "Urban Safety", "NLP", "LSTM", "Perception"],
    pdfUrl: "",
    featured: true,
  },
  {
    id: 3,
    title: "Drone-based Vehicle Detection and Tracking",
    authors: ["Shailesh Kachhi", "IIT Mandi"],
    year: 2024,
    type: "research",
    status: "completed",
    abstract:
      "Built computer vision pipeline for road classification and multi-vehicle tracking using drone surveillance videos. Preprocessed aerial footage, annotated datasets, and contributed to model development for traffic monitoring.",
    keywords: ["Computer Vision", "Traffic Surveillance", "Drones"],
    pdfUrl: "",
    featured: false,
  },
];

export const publicationTypes = [
  { value: "all", label: "All Works" },
  { value: "research", label: "Research Internships" },
  { value: "project", label: "Projects" },
];

export const publicationYears = [
  { value: "all", label: "All Years" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
];

export const getPublicationsByType = (type) => {
  if (type === "all") return publications;
  return publications.filter((pub) => pub.type === type);
};

export const getPublicationsByYear = (year) => {
  if (year === "all") return publications;
  return publications.filter((pub) => pub.year.toString() === year);
};

export const getFeaturedPublications = () => {
  return publications.filter((pub) => pub.featured);
};
