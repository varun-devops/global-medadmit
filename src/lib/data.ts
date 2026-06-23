// Static site content. University recognitions are indicative — verify with current NMC/WHO listings.

export type Country = {
  slug: string;
  name: string;
  code: string; // ISO 3166-1 alpha-2 (for flag images)
  flag: string;
  type: ("student" | "work")[];
  blurb: string;
  image: string;
};

export const countries: Country[] = [
  {
    slug: "ukraine",
    name: "Ukraine",
    code: "ua",
    flag: "🇺🇦",
    type: ["student"],
    blurb: "A long-standing destination for European medical education with historic universities and affordable, English-medium MBBS programmes.",
    image: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800&q=80",
  },
  {
    slug: "hungary",
    name: "Hungary",
    code: "hu",
    flag: "🇭🇺",
    type: ["student", "work"],
    blurb: "EU member with world-renowned medical schools, European degrees and sponsored work-visa pathways for skilled professionals.",
    image: "https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?w=800&q=80",
  },
  {
    slug: "romania",
    name: "Romania",
    code: "ro",
    flag: "🇷🇴",
    type: ["student", "work"],
    blurb: "EU education at affordable fees, with globally recognised medical universities and a clear pathway to practise across Europe.",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
  },
  {
    slug: "moldova",
    name: "Moldova",
    code: "md",
    flag: "🇲🇩",
    type: ["student", "work"],
    blurb: "Affordable European destination with a respected state medical university and growing demand for skilled workers.",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&q=80",
  },
  {
    slug: "latvia",
    name: "Latvia",
    code: "lv",
    flag: "🇱🇻",
    type: ["student"],
    blurb: "An EU country offering high-quality, English-medium medical degrees recognised across Europe and beyond.",
    image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=800&q=80",
  },
  {
    slug: "serbia",
    name: "Serbia",
    code: "rs",
    flag: "🇷🇸",
    type: ["student", "work"],
    blurb: "Strong academic tradition, low living costs and welcoming universities for international medical students.",
    image: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=800&q=80",
  },
  {
    slug: "bosnia-herzegovina",
    name: "Bosnia & Herzegovina",
    code: "ba",
    flag: "🇧🇦",
    type: ["student"],
    blurb: "A safe, affordable European setting with established medical faculties and a rich, welcoming culture.",
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
  },
  {
    slug: "montenegro",
    name: "Montenegro",
    code: "me",
    flag: "🇲🇪",
    type: ["student", "work"],
    blurb: "Beautiful Adriatic nation offering European medical study and sponsored work-visa opportunities.",
    image: "https://images.unsplash.com/photo-1591805856846-fd8b66e76401?w=800&q=80",
  },
  {
    slug: "albania",
    name: "Albania",
    code: "al",
    flag: "🇦🇱",
    type: ["student", "work"],
    blurb: "An emerging, budget-friendly European destination with English-medium medicine and a fast-growing job market.",
    image: "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=800&q=80",
  },
];

export type University = {
  slug: string;
  name: string;
  country: string;
  code: string; // ISO 3166-1 alpha-2 (for flag images)
  flag: string;
  established: string;
  medium: string;
  recognition: string[];
  blurb: string;
  image: string;
};

export const universities: University[] = [
  {
    slug: "umfst-targu-mures",
    name: "George Emil Palade University of Medicine, Pharmacy, Science & Technology of Targu Mures",
    country: "Romania",
    code: "ro",
    flag: "🇷🇴",
    established: "1945",
    medium: "English",
    recognition: ["NMC", "WHO", "ARACIS"],
    blurb:
      "The only Romanian university named after a Nobel laureate — English-medium MD with students from 90+ countries, an EU campus in Hamburg, and world-class simulation and research centres.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    slug: "bogomolets-nmu",
    name: "Bogomolets National Medical University",
    country: "Ukraine",
    code: "ua",
    flag: "🇺🇦",
    established: "1841",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "One of Ukraine's oldest and most prestigious medical universities, based in the capital, Kyiv.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  },
  {
    slug: "kharkiv-nmu",
    name: "Kharkiv National Medical University",
    country: "Ukraine",
    code: "ua",
    flag: "🇺🇦",
    established: "1805",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "A historic university with a strong international faculty and a large global student community.",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80",
  },
  {
    slug: "university-of-debrecen",
    name: "University of Debrecen",
    country: "Hungary",
    code: "hu",
    flag: "🇭🇺",
    established: "1918",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "A top-ranked EU medical school with decades of experience teaching international students in English.",
    image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=800&q=80",
  },
  {
    slug: "semmelweis-university",
    name: "Semmelweis University",
    country: "Hungary",
    code: "hu",
    flag: "🇭🇺",
    established: "1769",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "One of Europe's most respected medical universities, located in Budapest.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  },
  {
    slug: "carol-davila",
    name: "Carol Davila University of Medicine & Pharmacy",
    country: "Romania",
    code: "ro",
    flag: "🇷🇴",
    established: "1857",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "Romania's leading medical university in Bucharest, with a globally recognised English programme.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    slug: "iuliu-hatieganu",
    name: "Iuliu Hațieganu University of Medicine & Pharmacy",
    country: "Romania",
    code: "ro",
    flag: "🇷🇴",
    established: "1919",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "A renowned medical university in Cluj-Napoca, popular with international students.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
  },
  {
    slug: "nicolae-testemitanu",
    name: "Nicolae Testemițanu State University of Medicine & Pharmacy",
    country: "Moldova",
    code: "md",
    flag: "🇲🇩",
    established: "1945",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "Moldova's premier medical university, offering an affordable English-medium MBBS in Chișinău.",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
  },
  {
    slug: "riga-stradins",
    name: "Riga Stradiņš University",
    country: "Latvia",
    code: "lv",
    flag: "🇱🇻",
    established: "1950",
    medium: "English",
    recognition: ["NMC", "WHO"],
    blurb: "A leading EU medical university in Riga, known for its modern facilities and global recognition.",
    image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=800&q=80",
  },
  {
    slug: "belgrade-medicine",
    name: "University of Belgrade — Faculty of Medicine",
    country: "Serbia",
    code: "rs",
    flag: "🇷🇸",
    established: "1920",
    medium: "English",
    recognition: ["WHO"],
    blurb: "Serbia's most prestigious medical faculty with a long academic tradition in Belgrade.",
    image: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=800&q=80",
  },
  {
    slug: "sarajevo-medicine",
    name: "University of Sarajevo — Faculty of Medicine",
    country: "Bosnia & Herzegovina",
    code: "ba",
    flag: "🇧🇦",
    established: "1944",
    medium: "English",
    recognition: ["WHO"],
    blurb: "A well-established medical faculty offering quality education in a safe European city.",
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
  },
  {
    slug: "montenegro-medicine",
    name: "University of Montenegro — Faculty of Medicine",
    country: "Montenegro",
    code: "me",
    flag: "🇲🇪",
    established: "1997",
    medium: "English",
    recognition: ["WHO"],
    blurb: "Montenegro's main medical faculty, set on the scenic Adriatic coast in Podgorica.",
    image: "https://images.unsplash.com/photo-1591805856846-fd8b66e76401?w=800&q=80",
  },
  {
    slug: "tirana-medicine",
    name: "University of Medicine, Tirana",
    country: "Albania",
    code: "al",
    flag: "🇦🇱",
    established: "1952",
    medium: "English",
    recognition: ["WHO"],
    blurb: "Albania's dedicated medical university in the capital, Tirana, with growing international intake.",
    image: "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=800&q=80",
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
    location: "MBBS, Hungary",
    rating: 5,
    text: "I was so nervous about studying abroad, but the team made the whole process so easy. They helped me choose the right university and were always there to answer my questions. I couldn't have done it without them!",
  },
  {
    name: "Akash Saini",
    location: "MBBS, Romania",
    rating: 5,
    text: "I was worried about the visa process, but they walked me through it step by step. They made sure I had everything I needed and were always available whenever I had a question.",
  },
  {
    name: "Shobhit Maheshwari",
    location: "MBBS, Serbia",
    rating: 5,
    text: "I was a little homesick at first, but the team helped me adjust to my new life. They connected me with other international students and helped me settle in comfortably.",
  },
  {
    name: "Ritika Sharma",
    location: "MBBS, Latvia",
    rating: 5,
    text: "Completely transparent — no donation, no hidden charges, exactly as promised. The counselors genuinely cared about getting me into the right university for my budget.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
};

export const team: TeamMember[] = [
  {
    name: "Dr. Arjun Sharma",
    role: "Founder & CEO",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
  },
  {
    name: "Priya Verma",
    role: "Head of Counselling",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Anna Kovalenko",
    role: "Europe Admissions Manager",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    name: "Rahul Mehta",
    role: "Visa & Documentation Lead",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    name: "Neha Gupta",
    role: "Student Support Head",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
  },
  {
    name: "Sandeep Singh",
    role: "Operations Manager",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
];

export const contactInfo = {
  phone: "+91 84489 45837",
  phoneRaw: "918448945837",
  whatsapp: "918448945837",
  email: "varunparihar994@gmail.com",
  address: "New Delhi, India",
};
