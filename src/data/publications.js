// src/data/publications.js
export const publications = [
  {
    id: 4,
    title:
      "Building Instance Usage Mapping in Cross-Cultural Urban Scenes from Street View Images using Multimodal Self-Supervised Deep Learning",
    authors: [
      "Shailesh Kachhi (IISER Bhopal)",
      "Vaibhav Kumar (IISER Bhopal)",
      "Deeksha Arya (University of Tokyo)",
    ],
    venue:
      "34th ACM SIGSPATIAL International Conference on Advances in Geographic Information Systems (SIGSPATIAL 2026) · Applications Track, Full Paper · Riverside, CA, USA · Nov 3-6, 2026",
    year: 2026,
    type: "conference",
    status: "accepted",
    abstract:
      "Building usage maps are inputs to many urban planning, disaster management, and infrastructure analysis applications. However, generating instance-level building-usage maps from Street View Images (SVIs) across dense developing-country cities remains challenging due to limited annotated data, repetitive facades, and multilingual signage on buildings. In this study, we tackle this problem by proposing GeoBuild-SSL (Geometry-aware Building-usage Self-Supervised Learning), a multimodal deep-learning based framework that combines visual, geometric, and textual cues to predict building usage from a single SVI across six cities in India (Mumbai, Delhi, Chennai, Bengaluru) and Japan (Tokyo, Osaka). A five-stage automatic annotation pipeline is first implemented to refine noisy labels and generate 27,606 automatically labelled building instances from street-level panoramas. We pretrain a dual-encoder DINOv3 and SimCLR backbone in a self-supervised manner on 38,101 in-domain street-level RGB and monocular-depth images to learn facade and geometry features. The depth modality is injected as a geometric prior through Feature-wise Linear Modulation (FiLM), and multilingual signage cues are extracted using PaddleOCR and encoded with CLIP text features. To further improve robustness across viewpoints, we use a yaw-based curriculum-learning strategy that progressively exposes the model to oblique facade perspectives. Evaluated on a held-out 2,899-instance test set spanning Residential, Commercial, Industrial, and Institutional classes across India and Japan, GeoBuild-SSL most strongly improves the Residential and Commercial classes that an appearance-only baseline conflates.",
    keywords: [
      "Street View Imagery",
      "Self-Supervised Learning",
      "Multimodal Learning",
      "Urban GeoAI",
      "Building Usage Classification",
    ],
    codeUrl: "https://github.com/geoai4cities/geobuildssl",
    pdfUrl: "",
    featured: true,
  },
];

export const publicationTypes = [
  { value: "all", label: "All Works" },
  { value: "conference", label: "Conference Papers" },
];

export const publicationYears = [
  { value: "all", label: "All Years" },
  { value: "2026", label: "2026" },
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
