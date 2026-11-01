// src/data/news.js
export const newsItems = [
  {
    id: 5,
    date: '2026-11-04',
    type: 'paper',
    title: 'Our Paper GeoBuildSSL Presented at ACM SIGSPATIAL 2026, California, USA',
    description:
      'Our research paper, GeoBuildSSL, was presented in the Applications Track of the 34th ACM SIGSPATIAL International Conference on Advances in Geographic Information Systems in Riverside, California, USA.',
    link: '/publications',
    linkLabel: 'View Publication',
  },
  {
    id: 4,
    date: '2026-10-13',
    type: 'award',
    title: 'Received a Travel Grant to Attend the 34th ACM SIGSPATIAL International Conference in Riverside, CA, USA',
    description:
      'Honored to receive a $500 travel grant from ACM SIGSPATIAL to attend ACM SIGSPATIAL 2026, a CORE A ranked conference, in Riverside, California, USA.',
    link: null,
    linkLabel: null,
  },
  {
    id: 3,
    date: '2026-09-04',
    type: 'award',
    title: 'Selected for the Prestigious JST LOTUS Fellowship in Japan',
    description:
      'Delighted to be selected for the JST LOTUS Fellowship, which supports a research stay of up to one year in Japan. I will conduct research at the University of Tokyo as part of its bilateral research collaboration with IISER Bhopal, India.',
    link: null,
    linkLabel: null,
  },
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
