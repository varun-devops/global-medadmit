/**
 * George Emil Palade University of Medicine, Pharmacy, Science and Technology
 * of Targu Mures (UMPhST) — content extracted from the official 2024 English
 * brochure (brosura_umfst_2024_EN.pdf). Focused on the medical/health offer.
 *
 * This module powers the UMPhST microsite under /universities/umfst-targu-mures.
 * Wording is kept close to the source brochure for SEO depth.
 */

export const UMFST_SLUG = "umfst-targu-mures";

export const umfst = {
  slug: UMFST_SLUG,
  shortName: "G.E. Palade UMPhST of Targu Mures",
  name: "George Emil Palade University of Medicine, Pharmacy, Science and Technology of Targu Mures",
  country: "Romania",
  code: "ro",
  city: "Targu Mures",
  established: "1945",
  medium: "English, Romanian, Hungarian",
  motto: "Docendo discimus — by teaching, we learn",
  website: "https://www.umfst.ro",
  address: "38 Gheorghe Marinescu street, Targu Mures, Mures, 540142, Romania",
  phone: "+40-265-21 55 51",
  hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
  image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
  recognition: ["NMC", "WHO", "ARACIS", "EU-recognised"],
  tagline:
    "A nearly 80-year tradition of academic and scientific excellence — the only Romanian university named after a Nobel Prize laureate, teaching medicine in English, Romanian and Hungarian.",
  intro:
    "George Emil Palade University of Medicine, Pharmacy, Science and Technology of Targu Mures is a distinguished academic institution recognised both nationally and internationally, established almost eight decades ago. Nearly 13,000 students — including more than 1,400 international students from 83 countries — study across seven faculties, with an English-medium Faculty of Medicine and a campus in Hamburg, Germany.",

  stats: [
    { value: "13,000", label: "Students enrolled" },
    { value: "1,442", label: "International students" },
    { value: "83", label: "Countries represented" },
    { value: "1945", label: "Year founded" },
    { value: "7", label: "Faculties" },
    { value: "90+", label: "Countries in the English programme" },
  ],
} as const;

/* ---------------------------------------------------------------- Faculties */

export type Program = {
  level: "Undergraduate" | "Master's" | "Doctoral";
  name: string;
  years: string;
  language: string;
  accreditation: string;
};

export type Faculty = {
  slug: string;
  name: string;
  icon: string; // lucide icon name
  since: string;
  summary: string;
  body: string[];
  programs: Program[];
  highlights: string[];
  image: string;
};

export const faculties: Faculty[] = [
  {
    slug: "medicine-in-english",
    name: "Faculty of Medicine in English",
    icon: "Stethoscope",
    since: "2019",
    summary:
      "The flagship English-medium MD programme, drawing students from more than 90 countries to the Targu Mures campus.",
    body: [
      "Founded in 2019 as part of the University's internationalisation, the Faculty of Medicine in English converts the tradition of Romanian medical training into a modern learning approach for future generations of doctors.",
      "Students come from more than 90 countries and are enrolled in courses held on the Targu Mures campus. The Medicine degree programme in English is accredited by the Romanian Agency for Quality Assurance in Higher Education (ARACIS) and also benefits from international accreditation.",
      "The Faculty of Medicine in English is a blueprint for success — combining tradition with innovation, personal interaction with optimum use of modern technical facilities, and generosity with high standards.",
    ],
    programs: [
      { level: "Undergraduate", name: "Medicine in English (MER)", years: "6 years", language: "English", accreditation: "Accredited" },
      { level: "Undergraduate", name: "Medicine in English — Hamburg Campus (UMPhST-UMCH)", years: "6 years", language: "English", accreditation: "Accredited" },
    ],
    highlights: [
      "Students from 90+ countries on the Targu Mures campus",
      "ARACIS-accredited with additional international accreditation",
      "Degree recognised across the EU",
    ],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  },
  {
    slug: "medicine",
    name: "Faculty of Medicine",
    icon: "HeartPulse",
    since: "1945",
    summary:
      "The historic core of the University — the only institution in Romania offering medical programmes in Hungarian alongside Romanian.",
    body: [
      "The Faculty of Medicine has a curriculum tailored to current medical education standards, a teaching system focused on students, and a unitary assessment system within each degree programme.",
      "Graduates can continue their studies through master's, doctoral and continuing medical education programmes, including postgraduate courses, symposiums, conferences, congresses and summer schools. Residency programmes are set up for all medical specialties, guided by experienced teachers working at university clinics in Targu Mures.",
      "Medical education in Targu Mures began in 1945. In 1948 the Medical-Pharmaceutical Institute was established; in 1965 it was granted the right to confer the title of Doctor of Medicine; and in 1991 the Institute was renamed the University of Medicine and Pharmacy.",
    ],
    programs: [
      { level: "Undergraduate", name: "Medicine", years: "6 years", language: "Romanian, Hungarian", accreditation: "Accredited" },
      { level: "Undergraduate", name: "Military Medicine", years: "6 years", language: "Romanian", accreditation: "Accredited" },
      { level: "Undergraduate", name: "General Nursing", years: "4 years", language: "Romanian, Hungarian", accreditation: "Accredited" },
      { level: "Undergraduate", name: "Balneophysiotherapy and Recovery", years: "3 years", language: "Romanian", accreditation: "Accredited" },
      { level: "Master's", name: "Health Service Management", years: "1 year", language: "Romanian", accreditation: "Accredited" },
      { level: "Master's", name: "Clinical and Community Nutrition", years: "2 years", language: "Romanian", accreditation: "Accredited" },
    ],
    highlights: [
      "Only Romanian faculty teaching medicine in Hungarian",
      "Residency programmes across all medical specialties",
      "National (TRANSMED) and international (ERASMUS, FOGARTY) mobility",
    ],
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
  },
  {
    slug: "dental-medicine",
    name: "Faculty of Dental Medicine",
    icon: "Smile",
    since: "1948",
    summary:
      "Over 70 generations of dentists trained, with EU-wide degree acceptance and one of Romania's most advanced clinical centres.",
    body: [
      "Dental medical education in Targu Mures dates back to 1948. More than 70 generations of dentists and dental technicians have been trained by experienced teachers valued for their high-quality professional skills.",
      "The faculty hosts one of the most innovative educational and research facilities in Romania, including the Dental Medicine Integrated Center (CIMD), the Dental Imaging Simulation Center, a Specialized Outpatient Clinic, and cutting-edge teaching and research labs.",
      "The clinical area is equipped with 84 dental units across four clinics structured by dental specialty. Planmeca's ProMax 3D CBCT tomography offers maximum accuracy in diagnosing maxillofacial conditions through 3D imaging, 3D photography, 2D panoramic images and cephalometry.",
    ],
    programs: [
      { level: "Undergraduate", name: "Dental Medicine", years: "6 years", language: "Romanian, Hungarian", accreditation: "Accredited" },
      { level: "Undergraduate", name: "Dental Medicine in English", years: "6 years", language: "English", accreditation: "Authorized" },
      { level: "Undergraduate", name: "Dental Technology", years: "3 years", language: "Romanian", accreditation: "Accredited" },
      { level: "Master's", name: "Aesthetic Oral Rehabilitation", years: "1 year", language: "Romanian", accreditation: "Accredited" },
    ],
    highlights: [
      "84 dental units across 4 specialty clinics",
      "EU-wide acceptance of degrees and freedom to practise",
      "Planmeca ProMax 3D CBCT imaging",
    ],
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
  },
  {
    slug: "pharmacy",
    name: "Faculty of Pharmacy",
    icon: "Pill",
    since: "1948",
    summary:
      "A European institutional model with more than 70 years of Romanian-Hungarian pharmaceutical education and modern research centres.",
    body: [
      "The Faculty of Pharmacy, with a tradition of more than 70 years in Romanian-Hungarian pharmaceutical education, is today a European institutional model in terms of infrastructure, quality of education and student access to the university campus' many facilities.",
      "Targu Mures is the heart of the Transylvanian pharmaceutical industry, giving students a great opportunity and diversifying the job offer beyond community pharmacy, hospitals and analytical laboratories.",
      "Key scientific assets include the Integrated Centre for Pharmaceutical Education, two botanical and medicinal-plant gardens, the Research Centre for Medicinal and Aromatic Plants, the Pharmacognosy and Phytochemistry Laboratory, the Drug Testing Laboratory and a pharmacy simulator replicating a community pharmacy.",
    ],
    programs: [
      { level: "Undergraduate", name: "Pharmacy", years: "5 years", language: "Romanian, Hungarian", accreditation: "Accredited" },
      { level: "Undergraduate", name: "Nutrition and Dietetics", years: "3 years", language: "Romanian", accreditation: "Authorized" },
      { level: "Undergraduate", name: "Medical Cosmetics and Cosmetic Product Technology", years: "3 years", language: "Romanian", accreditation: "Accredited" },
      { level: "Master's", name: "Cosmetology and Dermopharmacy", years: "2 years", language: "Romanian", accreditation: "Accredited" },
      { level: "Master's", name: "Medical Biotechnology", years: "1 year", language: "Hungarian", accreditation: "Accredited" },
    ],
    highlights: [
      "6,000 m² Integrated Centre for Pharmaceutical Education",
      "Two botanical & medicinal-plant gardens with three greenhouses",
      "Pharmacy simulator and downtown university pharmacy",
    ],
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
  },
];

/* ---------------------------------------------------- Educational facilities */

export type Facility = {
  slug: string;
  name: string;
  icon: string;
  blurb: string;
};

export const facilities: Facility[] = [
  {
    slug: "virtual-reality-centre",
    name: "National Centre for Virtual Reality Applied in Medicine",
    icon: "Glasses",
    blurb:
      "Inside the UNiX building, students use virtual (VR), augmented (AR) and mixed-reality technologies — including Microsoft HoloLens 2, the HoloHuman app (life-size holograms, 11 systems, 4,500+ labelled structures) and HoloPatient holographic patient simulations.",
  },
  {
    slug: "simulation-centre",
    name: "Centre for Simulation and Practical Skills",
    icon: "Activity",
    blurb:
      "The first and only internationally accredited medical simulation centre in Romania. Since 2012 it has grown to 40+ basic simulators that faithfully recreate the human body, and has trained students on over 17,000 procedures.",
  },
  {
    slug: "advanced-research-centre",
    name: "Advanced Centre for Medical and Pharmaceutical Research",
    icon: "FlaskConical",
    blurb:
      "A unique 4,000 m² institution built through an ~€11 million European project, with 400+ research devices for cardio-neurology — DNA and plasma cell bank, mass spectrometry, flow cytometry, confocal microscopy, genetics and advanced cardiac imaging.",
  },
  {
    slug: "dental-integrated-centre",
    name: "Integrated Dental Medicine Center",
    icon: "Smile",
    blurb:
      "84 dental units across four specialty clinics, a patients' triage department, a radiology compartment and a dental laboratory — anchored by Planmeca ProMax 3D CBCT cone-beam tomography.",
  },
  {
    slug: "pharmaceutical-centre",
    name: "Integrated Pharmaceutical Learning Centre",
    icon: "Pill",
    blurb:
      "A 6,000 m² building — among the most modern pharmacy college facilities in the country — with a 170-seat auditorium, 14 teaching laboratories, a computer room and a pharmacy simulator.",
  },
  {
    slug: "library",
    name: "G.E. Palade UMPhST Library",
    icon: "BookOpen",
    blurb:
      "More than 300,000 printed volumes plus e-books, online databases and catalogues, and a Museum of the History of Medicine and Pharmacy holding rare works dating to 1532.",
  },
];

/* ------------------------------------------------------ Student-life amenities */

export type Amenity = {
  icon: string;
  title: string;
  desc: string;
};

export const amenities: Amenity[] = [
  { icon: "BedDouble", title: "1,700+ accommodation places", desc: "Over 500 rooms across six student dormitories (one more under construction), with reading spaces, free internet and air-conditioned study areas. Fees from 245–510 RON/month." },
  { icon: "Bike", title: "UMPhST Student Bike", desc: "Romania's first student bike-sharing project — Pegas bicycles branded with the UMPhST logo for getting around between dorms, the university and the hospital." },
  { icon: "Utensils", title: "Hestia canteen & kitchens", desc: "The Hestia microcanteen seats 150 (plus a 30-seat terrace), open 8am–6pm weekdays, alongside fully equipped, air-conditioned student kitchens." },
  { icon: "Dumbbell", title: "11,000 m² sports centre", desc: "Two sports halls, four tennis courts, football pitches, a body-building gym, fencing room and the Salus per Aquam aquatic complex with pool, sauna and jacuzzi." },
  { icon: "ShieldCheck", title: "Health & safety", desc: "Card-entry access to dorms, an on-site medical office, weekly linen changes and automatic washing machines for every student." },
  { icon: "HeartHandshake", title: "Counselling & career guidance", desc: "Psychological counselling, psychological first-aid, career counselling and professional-development workshops through the CCGC centre." },
  { icon: "HandCoins", title: "VIFU volunteering programme", desc: "Volunteer across university departments to lower your tuition fees — a flagship student-support initiative." },
  { icon: "Theater", title: "A vibrant cultural city", desc: "Targu Mures — many say the most beautiful city in Transylvania — offers a national theatre, philharmonic, festivals, museums and Art Nouveau landmarks." },
];

/* ---------------------------------------------------------- Erasmus+ & careers */

export const erasmus = {
  budget: "≈ €3 million",
  body: [
    "G.E. Palade UMPhST holds the largest ERASMUS+ budget of any Romanian university for the 2023–2024 academic year — almost €3 million, including the largest budget ever received by a Romanian university for traineeships.",
    "Each year 100–140 incoming students (Erasmus+ students or Free Movers) join from EU and partner countries, while over 1,000 outgoing students undertake traineeships in universities, labs, research centres, hospitals, medical practices and companies abroad.",
    "All study and traineeship placements completed abroad under the Erasmus programme — and the transferable credits earned — receive automatic, full recognition within the University.",
  ],
  careers: [
    "High employability is evident as early as the first year after graduation, with many students already employed while still studying — supported by partnerships with high-profile employers such as Bosch, Azomures, Hirschmann, Dent Estet and Siemens.",
    "Programmes like BOSCH Student Smart Career, the 'Face in Front with Employers' job fair, the Bosch and Hirschmann Academies, and weekly Company Hour workshops connect students directly with industry.",
  ],
};

/* --------------------------------------------------------- 10 reasons to choose */

export const reasons: { title: string; desc: string; icon: string }[] = [
  { title: "Named after a Nobel laureate", icon: "Award", desc: "The only university in Romania named after a Nobel Prize laureate — George Emil Palade, a founder of modern cell biology." },
  { title: "Multilingual medical education", icon: "Languages", desc: "The only Romanian university providing medical education in three languages: Romanian, Hungarian and English." },
  { title: "An EU campus in Germany", icon: "Building2", desc: "The only Romanian university with its own EU campus — the UMPhST-UMCH branch in Hamburg, Germany." },
  { title: "A green, smart university", icon: "Leaf", desc: "First among Romanian universities and 79th in the world in the UI GreenMetric ranking, and the only one to implement the Smart University concept." },
  { title: "Internationally accredited simulation", icon: "MonitorPlay", desc: "The first Romanian university to gain international accreditation for virtual medical education backed by computer medical simulation." },
  { title: "Its own clinical hospital", icon: "Hospital", desc: "The only Romanian university building its own University Clinical Hospital — 160 beds, 12 clinical specialties and 6 operating theatres." },
  { title: "World-class research", icon: "FlaskConical", desc: "A €11 million Advanced Centre for Medical and Pharmaceutical Research with 400+ devices for cardio-neurology." },
  { title: "Largest Erasmus+ budget", icon: "Plane", desc: "The largest ERASMUS+ budget in Romania for 2023–2024 — almost €3 million for mobility and traineeships." },
  { title: "A global community", icon: "Globe", desc: "More than 1,400 international students from 83 countries — travel the world without leaving the campus." },
  { title: "Student-first campus life", icon: "Sparkles", desc: "1,700+ accommodation places, an 11,000 m² sports centre, bike-sharing, counselling and the VIFU tuition-reducing volunteering programme." },
];

/* ----------------------------------------------------------- Microsite sub-pages */

export const microsite = [
  { slug: "faculties", title: "Faculties & Programmes", icon: "GraduationCap", desc: "Medicine, Dental Medicine and Pharmacy degrees taught in English, Romanian and Hungarian." },
  { slug: "facilities", title: "Educational Facilities", icon: "Microscope", desc: "VR medicine, simulation, advanced research, dental and pharmaceutical centres." },
  { slug: "student-life", title: "Student Life", icon: "Sparkles", desc: "Dorms, dining, sports, bike-sharing, counselling and life in Targu Mures." },
  { slug: "erasmus", title: "Erasmus+ & Careers", icon: "Plane", desc: "Romania's largest Erasmus+ budget and strong graduate employability." },
  { slug: "reasons", title: "10 Reasons to Choose Us", icon: "Award", desc: "Why students from 83 countries pick G.E. Palade UMPhST of Targu Mures." },
] as const;
