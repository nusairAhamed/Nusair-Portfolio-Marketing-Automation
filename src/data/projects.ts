export interface EmailBuild {
  id: string;
  number: string;
  client: string;
  title: string;
  descriptor: string;
  tag: string;
  image: string;
  fullImage: string;
  isPlaceholder?: boolean;
}

export interface ClientProject {
  id: string;
  number: string;
  client: string;
  title: string;
  description: string;
  metrics: {
    value: string;
    label: string;
  }[];
  role?: string;
  focus?: string;
  cardTheme: {
    bg: string;
    bgColor: string;
    border: string;
    shadow: string;
    brandColor: string;
  };
  caseStudyUrl?: string;
  builds: EmailBuild[];
}

export const clientProjects: ClientProject[] = [
  {
    id: 'nissan',
    number: '01',
    client: 'Nissan Australia & New Zealand',
    title: 'Nissan Australia & New Zealand',
    description:
      'Developed 70+ responsive HTML email campaigns from Figma for Nissan Australia and New Zealand, spanning newsletters, vehicle launches, and transactional emails.',
    metrics: [
      {
        value: '70+',
        label: 'EDM Builds',
      },
      {
        value: '100%',
        label: 'Cross-Client QA',
      },
    ],
    role: 'Lead Email Developer',
    focus: 'HTML/CSS · Kinetic Email · Cross-Client QA',
    cardTheme: {
      bg: 'bg-gradient-to-b from-[#fff1f2] to-[#fce7ea]',
      bgColor: '#FFF1F2',
      border: 'border-[#fecdd3]',
      shadow: 'shadow-[0_20px_50px_rgba(195,0,47,0.06)]',
      brandColor: '#C3002F',
    },
    caseStudyUrl: '#',
    builds: [
      {
        id: 'nissan-qashqai',
        number: '01',
        client: 'Nissan',
        title: 'Nissan Qashqai e-POWER',
        descriptor: 'Interactive vehicle launch experience with dynamic visual styling.',
        tag: 'Launch Campaign',
        image: '/assets/nissan-qashqai.png',
        fullImage: '/assets/nissan-qashqai-full.png',
      },
      {
        id: 'nissan-navara',
        number: '02',
        client: 'Nissan',
        title: 'Nissan Navara PRO-4X',
        descriptor: 'Driveaway retail campaign with vehicle specs and finance CTAs.',
        tag: 'Retail Driveaway',
        image: '/assets/nissan-navara.png',
        fullImage: '/assets/nissan-navara-full.png',
      },
      {
        id: 'nissan-enews',
        number: '03',
        client: 'Nissan',
        title: 'Nissan eNews Editorial',
        descriptor: 'Multi-story lifestyle newsletter with grid hierarchy & feature articles.',
        tag: 'Customer eNews',
        image: '/assets/nissan-enews.png',
        fullImage: '/assets/nissan-enews-full.png',
      },
      {
        id: 'nissan-retail',
        number: '04',
        client: 'Nissan',
        title: 'Nissan Retail Offers',
        descriptor: '1% finance promotion architecture with model breakdown grids.',
        tag: 'Finance Promotion',
        image: '/assets/nissan-april-retail.png',
        fullImage: '/assets/nissan-april-retail-full.png',
      },
    ],
  },
  {
    id: 'officeworks',
    number: '02',
    client: 'Officeworks Australia',
    title: 'Officeworks Australia',
    description:
      'Developed 150+ responsive HTML email campaigns for Officeworks Australia, supporting retail promotional campaigns, seasonal communications, and personalised customer experiences with robust cross-client rendering across major email platforms.',
    metrics: [
      {
        value: '150+',
        label: 'EDM Builds',
      },
      {
        value: '100%',
        label: 'Cross-Client QA',
      },
    ],
    role: 'EDM / HTML Email Developer',
    focus:
      'HTML Email · Dynamic Content · Responsive Development · Cross-client QA · Email Personalisation',
    cardTheme: {
      bg: 'bg-gradient-to-b from-[#f2f7fc] to-[#eaf2fa]',
      bgColor: '#EEF4FA',
      border: 'border-[#cfe0f2]',
      shadow: 'shadow-[0_20px_50px_rgba(15,23,42,0.06)]',
    },
    caseStudyUrl: '#',
    builds: [
      {
        id: 'ow-naplan',
        number: '01',
        client: 'Officeworks',
        title: 'NAPLAN Education Campaign',
        descriptor: 'School essentials & learning workbooks retail EDM.',
        tag: 'Retail Campaign',
        image: '/assets/ow1.png',
        fullImage: '/assets/ow1.png',
      },
      {
        id: 'ow-tax-time',
        number: '02',
        client: 'Officeworks',
        title: 'Tax Time & EOFY Tech Promotion',
        descriptor: 'Commercial & consumer tech promotional campaign.',
        tag: 'EOFY Promotion',
        image: '/assets/ow2.png',
        fullImage: '/assets/ow2.png',
      },
      {
        id: 'ow-software-renewal',
        number: '03',
        client: 'Officeworks',
        title: 'Software Subscription Renewal',
        descriptor: 'Automated subscription lifecycle & Microsoft 365 upgrade EDM.',
        tag: 'Lifecycle & CRM',
        image: '/assets/ow3.png',
        fullImage: '/assets/ow3.png',
      },
      {
        id: 'ow-back-to-school',
        number: '04',
        client: 'Officeworks',
        title: 'Back to School Magazine',
        descriptor: 'Editorial seasonal catalogue & back-to-school essentials campaign.',
        tag: 'Seasonal Campaign',
        image: '/assets/ow4.png',
        fullImage: '/assets/ow4.png',
      },
    ],
  },
  {
    id: 'kfc',
    number: '03',
    client: 'KFC Australia',
    title: 'KFC Australia',
    description:
      'Developed 40+ high-impact responsive HTML email templates for KFC Australia, powering retail promotions, app-exclusive meal deals, game day campaigns, and Colonel’s Club lifecycle automation.',
    metrics: [
      {
        value: '40+',
        label: 'Email Templates',
      },
      {
        value: '100%',
        label: 'Cross-Client QA',
      },
    ],
    role: 'EDM & HTML Email Developer',
    focus: 'HTML Email · Promotional EDM · App Lifecycle · Cross-Client QA',
    cardTheme: {
      bg: 'bg-gradient-to-b from-[#fdf2f2] to-[#fae6e6]',
      bgColor: '#FAF0F0',
      border: 'border-[#f2cece]',
      shadow: 'shadow-[0_20px_50px_rgba(228,0,43,0.06)]',
    },
    caseStudyUrl: '#',
    builds: [
      {
        id: 'kfc-app-promo',
        number: '01',
        client: 'KFC Australia',
        title: 'Zinger Crunch Box App Exclusive',
        descriptor: 'Mobile-first retail promotion with voucher redemption QR code.',
        tag: 'App Exclusive',
        image: '/assets/kfc-app-promo.jpg',
        fullImage: '/assets/kfc-app-promo.jpg',
      },
      {
        id: 'kfc-wicked-wings',
        number: '02',
        client: 'KFC Australia',
        title: 'Wicked Wings Game Day Promo',
        descriptor: 'High-conversion retail EDM with match schedule countdown timer.',
        tag: 'Retail Promotion',
        image: '/assets/kfc-wicked-wings.jpg',
        fullImage: '/assets/kfc-wicked-wings.jpg',
      },
      {
        id: 'kfc-lunch-deals',
        number: '03',
        client: 'KFC Australia',
        title: 'Ultimate Lunch Deals Under $8',
        descriptor: 'Modular 3-column product breakdown with nutritional specs & price points.',
        tag: 'Menu Launch',
        image: '/assets/kfc-lunch-deals.jpg',
        fullImage: '/assets/kfc-lunch-deals.jpg',
      },
      {
        id: 'kfc-colonel-rewards',
        number: '04',
        client: 'KFC Australia',
        title: 'Colonel’s Club VIP Secret Menu',
        descriptor: 'Personalised tier progress rewards & CRM lifecycle automation.',
        tag: 'Loyalty & CRM',
        image: '/assets/kfc-colonel-rewards.jpg',
        fullImage: '/assets/kfc-colonel-rewards.jpg',
      },
    ],
  },
  {
    id: 'drinky',
    number: '04',
    client: 'Drinky',
    title: 'Drinky — Hydration & Wellness App',
    description:
      'Drinky is a creative wellness and productivity app that gamifies hydration using app-blocking and selfie verification.',
    metrics: [
      {
        value: '40%',
        label: 'Bounce Rate',
      },
      {
        value: '15%',
        label: 'Growth Boost',
      },
    ],
    role: 'Lead Product Designer',
    focus: 'UX · UI · Design System · Product Strategy',
    cardTheme: {
      bg: 'bg-gradient-to-b from-[#f8f2fc] to-[#f0e4f7]',
      bgColor: '#F3EAF7',
      border: 'border-[#e4d0f0]',
      shadow: 'shadow-[0_20px_50px_rgba(35,15,42,0.06)]',
    },
    caseStudyUrl: '#',
    builds: [
      {
        id: 'drinky-01',
        number: '01',
        client: 'Drinky',
        title: 'Gamified Mobile App',
        descriptor: 'Hydration tracking with interactive streaks and badge rewards.',
        tag: 'Mobile App',
        image: '/assets/drinky-preview.jpg',
        fullImage: '/assets/drinky-preview.jpg',
      },
      {
        id: 'drinky-02',
        number: '02',
        client: 'Drinky',
        title: 'Gamification & Rewards Engine',
        descriptor: 'Visual progress milestones and community challenge mechanics.',
        tag: 'UI System',
        image: '',
        fullImage: '',
        isPlaceholder: true,
      },
      {
        id: 'drinky-03',
        number: '03',
        client: 'Drinky',
        title: 'Habit Analytics & Dashboard',
        descriptor: 'Weekly intake reports and intelligent notification triggers.',
        tag: 'Analytics',
        image: '',
        fullImage: '',
        isPlaceholder: true,
      },
    ],
  },
];

// Flat list of all non-placeholder builds for lightbox iteration
export const allEmailBuilds: EmailBuild[] = clientProjects
  .flatMap((c) => c.builds)
  .filter((b) => !b.isPlaceholder && b.fullImage);
