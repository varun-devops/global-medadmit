// Static site content. University recognitions are indicative — verify with current NMC/WHO listings.

export type Country = {
  slug: string;
  name: string;
  flag: string;
  type: ("student" | "work")[];
  blurb: string;
  image: string;
};

export const countries: Country[] = [
  {
    slug: "uzbekistan",
    name: "Uzbekistan",
    flag: "🇺🇿",
    type: ["student"],
    blurb: "Home to several large, English-medium medical universities with a strong Indian student community and affordable tuition.",
    image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=800&q=80",
  },
  {
    slug: "kyrgyzstan",
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    type: ["student"],
    blurb: "Popular for low-cost MBBS in Bishkek with WHO-listed universities and easy admission for Indian students.",
    image: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=800&q=80",
  },
  {
    slug: "georgia",
    name: "Georgia",
    flag: "🇬🇪",
    type: ["student"],
    blurb: "European-standard medical education in Tbilisi with globally recognized degrees and a safe environment.",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
  },
  {
    slug: "russia",
    name: "Russia",
    flag: "🇷🇺",
    type: ["student"],
    blurb: "Decades of MBBS excellence with state medical universities, strong infrastructure and affordable fees.",
    image: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800&q=80",
  },
  {
    slug: "kazakhstan",
    name: "Kazakhstan",
    flag: "🇰🇿",
    type: ["student"],
    blurb: "Modern campuses, low living costs and NMC/WHO-listed medical universities across major cities.",
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
  },
  {
    slug: "hungary",
    name: "Hungary",
    flag: "🇭🇺",
    type: ["student", "work"],
    blurb: "EU member with prestigious medical schools, plus sponsored work-visa opportunities for skilled professionals.",
    image: "https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?w=800&q=80",
  },
  {
    slug: "slovakia",
    name: "Slovakia",
    flag: "🇸🇰",
    type: ["work"],
    blurb: "Central-European hub offering employer-sponsored work visas across manufacturing, healthcare and services.",
    image: "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=800&q=80",
  },
  {
    slug: "moldova",
    name: "Moldova",
    flag: "🇲🇩",
    type: ["work"],
    blurb: "Affordable European destination with growing demand for skilled workers and structured visa pathways.",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&q=80",
  },
  {
    slug: "montenegro",
    name: "Montenegro",
    flag: "🇲🇪",
    type: ["work"],
    blurb: "Adriatic nation offering tourism and hospitality work visas with a clear path to European experience.",
    image: "https://images.unsplash.com/photo-1591805856846-fd8b66e76401?w=800&q=80",
  },
];

export type University = {
  slug: string;
  name: string;
  country: string;
  flag: string;
  established: string;
  medium: string;
  recognition: string[];
  blurb: string;
  image: string;
};

export const universities: University[] = [
  {
    slug: "andijan-state-medical",
    name: "Andijan State Medical Institute",
    country: "Uzbekistan",
    flag: "🇺🇿",
    established: "1955",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "One of the largest medical universities and research centers in Uzbekistan, with a long teaching tradition.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  },
  {
    slug: "bukhara-state-medical",
    name: "Bukhara State Medical Institute",
    country: "Uzbekistan",
    flag: "🇺🇿",
    established: "1990",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "A large institute offering an English-medium 5+1 year MBBS structure with modern facilities.",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80",
  },
  {
    slug: "bukhara-innovative-medical",
    name: "Bukhara Innovative Medical University",
    country: "Uzbekistan",
    flag: "🇺🇿",
    established: "2021",
    medium: "English",
    recognition: ["WHO"],
    blurb: "Fully English-medium, globally recognized syllabus with affordable tuition and a modern campus.",
    image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=800&q=80",
  },
  {
    slug: "fergana-medical-public-health",
    name: "Fergana Medical Institute of Public Health",
    country: "Uzbekistan",
    flag: "🇺🇿",
    established: "2019",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "One of the top medical colleges in Central Asia offering world-class training in public health and medicine.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  },
  {
    slug: "international-medical-university-kg",
    name: "International Medical University",
    country: "Kyrgyzstan",
    flag: "🇰🇬",
    established: "2003",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "A premier medical university for MBBS in Kyrgyzstan, located in the capital city of Bishkek.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    slug: "georgian-national-seu",
    name: "Georgian National University SEU",
    country: "Georgia",
    flag: "🇬🇪",
    established: "2001",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "One of the most prestigious universities in Tbilisi for international students pursuing medicine.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
  },
];

export type Testimonial = {
  name: string;
  location: string;
  text: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Poonam Singh",
    location: "MBBS, Uzbekistan",
    rating: 5,
    text: "I was so nervous about studying abroad, but the team made the whole process so easy. They helped me choose the right university and were always there to answer my questions. I couldn't have done it without them!",
  },
  {
    name: "Akash Saini",
    location: "MBBS, Georgia",
    rating: 5,
    text: "I was worried about the visa process, but they walked me through it step by step. They made sure I had everything I needed and were always available whenever I had a question.",
  },
  {
    name: "Shobhit Maheshwari",
    location: "MBBS, Kyrgyzstan",
    rating: 5,
    text: "I was a little homesick at first, but the team helped me adjust to my new life. They connected me with other Indian students and helped me settle in comfortably.",
  },
  {
    name: "Ritika Sharma",
    location: "MBBS, Russia",
    rating: 5,
    text: "Completely transparent — no donation, no hidden charges, exactly as promised. The counselors genuinely cared about getting me into the right university for my budget.",
  },
];

export const contactInfo = {
  phone: "+91 84489 45837",
  phoneRaw: "918448945837",
  whatsapp: "918448945837",
  email: "varunparihar994@gmail.com",
  address: "New Delhi, India",
};
