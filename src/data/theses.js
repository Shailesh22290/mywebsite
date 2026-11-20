// src/data/theses.js
// One object per thesis, rendered by src/pages/ThesisPage.jsx at /thesis/:id.
// Empty arrays / missing fields hide their section. A link with url: null renders as a visible TODO.

const ADVISORS = [
  { label: 'Advisor', value: 'Dr. Vaibhav Kumar (IISER Bhopal)' },
  { label: 'Co-advisor', value: 'Dr. Deeksha Arya (CSIS, The University of Tokyo)' },
  { label: 'Department', value: 'Data Science and Engineering, IISER Bhopal' },
];

export const theses = {
  bs: {
    id: 'bs',
    pageTitle: 'BS thesis',
    title:
      'Mapping Building Use from Street View Panoramas with Self-Supervised Depth, Vision and Text Fusion across India and Japan',
    subtitle: 'Shailesh Kachhi ⋅ BS thesis ⋅ IISER Bhopal',
    cardBlurb:
      'GeoBuild-SSL: instance-level building use from a single street-view panorama in six cities across India and Japan. Published at ACM SIGSPATIAL 2026.',
    intro:
      'Building use (residential, commercial, industrial, institutional) feeds property tax, disaster response and utility planning, but it is missing from most open data. In well-mapped Tokyo, 145 of 146 nearby OSM polygons in our audit had no building-use tag. My BS thesis asks whether a single street-view panorama is enough to recover it, across very different cities in India and Japan.',
    meta: [
      ...ADVISORS,
      { label: 'Period', value: 'Dec 2025 – Apr 2026' },
      {
        label: 'Published as',
        value:
          'Kachhi, Kumar, Arya. ACM SIGSPATIAL 2026, Riverside, CA, 3–6 Nov 2026.',
      },
    ],
    heroFigure: {
      src: '/thesis/bs/fig-challenges.jpg',
      alt: 'Three street-view examples of ambiguous depth, similar-looking facades and multilingual signage',
      caption:
        'Key challenges in building-usage classification from street-view imagery: (a) depth ambiguity, (b) facade ambiguity, (c) multilingual signage with cross-cultural divergence.',
    },
    summary: [
      'I built GeoBuild-SSL (Geometry-aware Building-usage Self-Supervised Learning), which predicts instance-level building use from one street-view image in six cities: Mumbai, Delhi, Chennai, Bengaluru, Tokyo and Osaka.',
      'Labels were the first problem. A five-stage automatic annotation pipeline cleans noisy pseudo-labels (median confidence 0.44, 7.6:1 class imbalance) into 27,606 labelled building instances from 118 panoramas (1,888 perspective views).',
      'A dual DINOv3 + SimCLR backbone is self-supervised pretrained on 38,101 in-domain RGB and monocular-depth images. Depth enters as a geometric prior through FiLM, multilingual signage is read with PaddleOCR and encoded with CLIP text features, and a yaw-based curriculum handles oblique facades. Predictions are attached to OSM building footprints in GIS and cross-validated against OSM land use.',
    ],
    summaryFigures: [
      {
        src: '/thesis/bs/fig-annotation.jpg',
        alt: 'Flow diagram of the five-stage automatic labelling pipeline, from street-view imagery to labelled building instances',
        caption: 'The five-stage annotation pipeline used to generate building-usage labels.',
      },
    ],
    summaryFigure: {
      src: '/thesis/bs/fig-architecture.jpg',
      alt: 'GeoBuild-SSL architecture: RGB, depth and OCR text streams feed separate encoders, fusion layers and a final MLP classifier',
      caption: 'The GeoBuild-SSL method: RGB, depth and OCR text streams, fused for building-use classification.',
    },
    stats: [
      { value: '0.67', label: 'Weighted F1, vs 0.40 for an RGB-only baseline' },
      { value: '27,606', label: 'Auto-labelled building instances' },
      { value: '6 cities', label: 'Across 2 countries (India, Japan)' },
      { value: '2,899', label: 'Held-out test instances' },
      { value: 'Depth', label: 'Single most informative cue (ablation)' },
    ],
    links: [
      { label: 'Thesis PDF', url: 'https://drive.google.com/file/d/1cZARYR8wNwaH8UdfCjws5MzMukPau1gG/view?usp=sharing' },
      { label: 'Paper PDF', url: 'https://drive.google.com/file/d/1f4rFpEHExIXyivyStMpaN3MtAG9Rrn4Q/view?usp=sharing' },
      { label: 'DOI', url: 'https://doi.org/10.1145/3841645.3843286' },
      { label: 'Code', url: 'https://github.com/geoai4cities/geobuild-ssl' },
      { label: 'Slides', url: 'https://drive.google.com/file/d/1jpKD57_hlYqQaQ9pSuvHJi9HvI55o_Qp/view?usp=sharing' },
    ],
    bibtex: `@inproceedings{Kachhi2026GeoBuildSSL,
  author    = {Kachhi, Shailesh and Kumar, Vaibhav and Arya, Deeksha},
  title     = {Building Instance Usage Mapping in Cross-Cultural Urban Scenes from Street View Images using Multimodal Self-Supervised Deep Learning},
  booktitle = {Proceedings of the 34th ACM International Conference on Advances in Geographic Information Systems},
  series    = {SIGSPATIAL '26},
  year      = {2026},
  address   = {Riverside, CA, USA},
  publisher = {ACM},
  doi       = {10.1145/3841645.3843286}
}`,
    highlights: [
      {
        title: 'Depth as a geometric prior',
        text: 'Two buildings can occupy almost the same pixels and still be very different things. Monocular depth separates a near residential house (~9 m) from a commercial tower behind it (~28 m). Depth enters the visual features through FiLM, and in the ablation it is the single most informative cue: scalar depth conditioning alone lifts weighted F1 from 0.40 to 0.65, and the full depth-map pathway reaches 0.67.',
        figure: {
          src: '/thesis/bs/fig-depth.jpg',
          alt: 'Street-view images from Tokyo, Bengaluru and Delhi with relative-depth maps, building distances and detected building boxes',
          caption: 'Depth used for building classification in (a) Tokyo, (b) Bengaluru, (c) Delhi. Only buildings within 30 m of the camera are classified.',
        },
      },
      {
        title: 'Reading the signs',
        text: 'Shop boards and institutional signs often say what a building is used for. Multilingual OCR (English, Hindi and regional scripts, Kanji/Kana) is encoded into one CLIP embedding space, which sharpens the Institutional class: hospitals, banks and government offices.',
        figure: {
          src: '/thesis/bs/fig-ocr.jpg',
          alt: 'Shopfronts with OCR bounding boxes over English, Hindi and Japanese signs',
          caption: 'PaddleOCR detections on shopfronts in (a) Bengaluru, (b) Tokyo, (c) Delhi and (d) Osaka.',
        },
      },
      {
        title: 'Training across cultures',
        text: 'Indian and Japanese streets look very different. Joint India–Japan training transfers markedly better than single-country models: the India test subset rises from 0.56 (India-only) to 0.64, and the Japan subset from 0.60 (Japan-only) to 0.71. Depth helps here too, since a building at 8 m activates the same depth-conditioned channels in Bengaluru as in Tokyo.',
        figure: {
          src: '/thesis/bs/fig-study-area.jpg',
          alt: 'Maps of India and Japan marking Mumbai, Delhi, Chennai, Bengaluru, Tokyo and Osaka',
          caption: 'Study areas: six cities in India and Japan.',
        },
      },
      {
        title: 'From pixels to maps',
        text: 'Predictions are attached to OSM building footprints, producing machine-readable usage labels for untagged buildings. I position this as a screening layer for human review, not a replacement for mappers.',
        figure: {
          src: '/thesis/bs/fig-usage-map.jpg',
          alt: 'Building-usage maps for Delhi, Tokyo, Chennai and Osaka comparing ground truth, RGB-only and RGB plus depth predictions',
          caption: 'Building-usage maps for (a) Delhi, (b) Tokyo, (c) Chennai, (d) Osaka: ground truth (left), RGB-only (centre), RGB+depth (right). Footprints © OpenStreetMap contributors.',
        },
      },
    ],
    presentations: [
      {
        label: 'ACM SIGSPATIAL 2026, Riverside, CA, 4 Nov 2026 (slides)',
        url: 'https://drive.google.com/file/d/1jpKD57_hlYqQaQ9pSuvHJi9HvI55o_Qp/view?usp=sharing',
      },
    ],
    acknowledgements:
      'This work is supported by the PUSHPAK National Mission on Drone Technology towards Drone Excellence Programme (No. 23 (1)/2024-ESDA), Ministry of Electronics and Information Technology, Government of India, and by the Anusandhan National Research Foundation (ANRF), Project No. CRD/2024/000883. I thank Surya Prasath Ramalingam, whose prior work this study builds on. Panoramas are from Google Street View; self-supervised pretraining uses the India Driving Dataset and Mapillary Vistas; building footprints are © OpenStreetMap contributors.',
  },

  ms: {
    id: 'ms',
    pageTitle: 'MS thesis',
    title: 'Structured Multimodal Representations of Cities for Urban Planning',
    subtitle: 'Shailesh Kachhi ⋅ MS thesis (ongoing) ⋅ IISER Bhopal',
    ongoing: true,
    cardBlurb:
      'Structured, queryable representations of streets from street-level imagery, 360° video and LiDAR: OSM attribute enrichment, GAVAS and UrbanSG-QA.',
    intro:
      'My MS thesis builds structured, queryable representations of streets (what is there, what it sounds like, and where things are) from street-level imagery, 360° video and LiDAR, so planners can inspect and edit a street before changing it. It has three parts, all ongoing.',
    meta: [
      ...ADVISORS,
      { label: 'Period', value: 'May 2026 – Apr 2027' },
      { label: 'Status', value: 'In progress' },
    ],
    summary: [],
    stats: [],
    links: [],
    highlights: [
      {
        title: 'Part 1: Street-view attribute enrichment (JST LOTUS)',
        text: 'A depth-aware vision-language framework that infers ten OSM building and street-context attributes from a single panorama in Indian and Japanese cities. Residency at CSIS, The University of Tokyo (Jan–Jun 2027).',
      },
      {
        title: 'Part 2: GAVAS, Geometry-Aware Video-to-Audio Synthesis with 4D Acoustic Scene Graphs',
        text: 'Builds a 4D acoustic scene graph from street video so planners can hear a street change before it is built. A what-if street edit becomes an edit of the graph.',
        note: 'Submitted to Nature Cities (Nature Portfolio). Shailesh Kachhi, Vaibhav Kumar.',
      },
      {
        title: 'Part 3: UrbanSG-QA',
        text: 'An LLM agent for grounded spatial question answering over scene graphs built from Indian mobile LiDAR, with a 500-question benchmark (UrbanSG-IND).',
      },
    ],
    presentations: [],
    acknowledgements: '',
  },
};
