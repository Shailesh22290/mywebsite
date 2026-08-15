// src/data/news.js
export const newsItems = [
  {
    id: 1,
    date: '2026-08-11',
    type: 'paper',
    title: 'First Research Paper Accepted at ACM SIGSPATIAL 2026',
    description:
      "My first research paper, \"Building Instance Usage Mapping in Cross-Cultural Urban Scenes from Street View Images using Multimodal Self-Supervised Deep Learning,\" was accepted at the 34th ACM SIGSPATIAL International Conference (Applications Track, Full Paper).",
    link: '/publications',
    linkLabel: 'View Publication',
  },
  {
    id: 2,
    date: '2026-08-09',
    type: 'engagement',
    title: 'Engaged to Rebuild the IISER Bhopal Central Library Website',
    description:
      'Received an honorarium to restructure the Central Library website, adding a RAG-powered AI research assistant for querying the library catalog and a virtual library tour.',
    link: null,
    linkLabel: null,
  },
];

export const getSortedNews = () =>
  [...newsItems].sort((a, b) => new Date(b.date) - new Date(a.date));

export const formatNewsDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
