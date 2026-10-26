export interface SkillItem {
  id: string;
  name: string;
  category: 'automation' | 'qa' | 'programming' | 'frameworks' | 'cms' | 'uiux';
  categoryLabel: string;
  brandColor: string;
  bgLight: string;
  borderLight: string;
  tag: string;
}

export const skillCategories = [
  { id: 'all', label: 'All Stack' },
  { id: 'automation', label: 'HubSpot & Marketing Automation' },
  { id: 'qa', label: 'Email Testing & QA' },
  { id: 'programming', label: 'Programming Technologies' },
  { id: 'frameworks', label: 'Frameworks & Libraries' },
  { id: 'cms', label: 'CMS' },
  { id: 'uiux', label: 'UI / UX' },
] as const;

export const skillsGrouped: {
  category: 'automation' | 'qa' | 'programming' | 'frameworks' | 'cms' | 'uiux';
  categoryTitle: string;
  skills: SkillItem[];
}[] = [
  {
    category: 'automation',
    categoryTitle: 'HubSpot & Marketing Automation',
    skills: [
      {
        id: 'hubspot',
        name: 'HubSpot Marketing Hub',
        category: 'automation',
        categoryLabel: 'CRM & Automation',
        brandColor: '#FF7A59',
        bgLight: 'bg-[#FFF3EF]',
        borderLight: 'border-[#FFD7CC]',
        tag: 'Marketing Hub & HubL',
      },
      {
        id: 'adobe-campaign',
        name: 'Adobe Campaign',
        category: 'automation',
        categoryLabel: 'Enterprise ESP',
        brandColor: '#ED2224',
        bgLight: 'bg-[#FDEDEE]',
        borderLight: 'border-[#FAC0C3]',
        tag: 'Delivery Workflows',
      },
      {
        id: 'sfmc',
        name: 'Salesforce Marketing Cloud',
        category: 'automation',
        categoryLabel: 'Enterprise CRM',
        brandColor: '#00A1E0',
        bgLight: 'bg-[#EBF7FD]',
        borderLight: 'border-[#BAE5F9]',
        tag: 'Journey Builder',
      },
      {
        id: 'mailchimp',
        name: 'Mailchimp',
        category: 'automation',
        categoryLabel: 'Marketing Tool',
        brandColor: '#FFE01B',
        bgLight: 'bg-[#FFFDE6]',
        borderLight: 'border-[#FFF49E]',
        tag: 'ESP & Automations',
      },
      {
        id: 'insider',
        name: 'Insider',
        category: 'automation',
        categoryLabel: 'Growth Management',
        brandColor: '#1C1427',
        bgLight: 'bg-[#F9F0FA]',
        borderLight: 'border-[#E8C5EB]',
        tag: 'Growth & Triggering',
      },
      {
        id: 'luxsci',
        name: 'LuxSci',
        category: 'automation',
        categoryLabel: 'Secure Infrastructure',
        brandColor: '#0D47A1',
        bgLight: 'bg-[#EEF4FD]',
        borderLight: 'border-[#BED7F9]',
        tag: 'HIPAA & Encryption',
      },
    ],
  },
  {
    category: 'qa',
    categoryTitle: 'Email Testing & QA',
    skills: [
      {
        id: 'email-on-acid',
        name: 'Email on Acid',
        category: 'qa',
        categoryLabel: 'Client Testing & QA',
        brandColor: '#7B2CBF',
        bgLight: 'bg-[#F6EEFD]',
        borderLight: 'border-[#E0C0F9]',
        tag: 'Cross-Client QA',
      },
      {
        id: 'litmus',
        name: 'Litmus',
        category: 'qa',
        categoryLabel: 'Email Testing Matrix',
        brandColor: '#6B47B8',
        bgLight: 'bg-[#EDF5FC]',
        borderLight: 'border-[#C2E0FA]',
        tag: 'Rendering QA',
      },
    ],
  },
  {
    category: 'programming',
    categoryTitle: 'Programming Technologies',
    skills: [
      {
        id: 'php',
        name: 'PHP',
        category: 'programming',
        categoryLabel: 'Server-side Logic',
        brandColor: '#777BB4',
        bgLight: 'bg-[#F2F3FA]',
        borderLight: 'border-[#D3D6EE]',
        tag: 'Backend & Templating',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        category: 'programming',
        categoryLabel: 'Frontend Engineering',
        brandColor: '#F7DF1E',
        bgLight: 'bg-[#FEFDE8]',
        borderLight: 'border-[#FBF396]',
        tag: 'ES6+ & Scripting',
      },
      {
        id: 'dart',
        name: 'Dart',
        category: 'programming',
        categoryLabel: 'Language',
        brandColor: '#0175C2',
        bgLight: 'bg-[#EBF4FB]',
        borderLight: 'border-[#B5DBF5]',
        tag: 'OOP & App Logic',
      },
      {
        id: 'html5',
        name: 'HTML5 for Email',
        category: 'programming',
        categoryLabel: 'Table Layouts',
        brandColor: '#E34F26',
        bgLight: 'bg-[#FDEDE8]',
        borderLight: 'border-[#F8C1B2]',
        tag: 'Table Architecture',
      },
      {
        id: 'css3',
        name: 'CSS3 & Dark Mode',
        category: 'programming',
        categoryLabel: 'Email Styling',
        brandColor: '#1572B6',
        bgLight: 'bg-[#EBF4FA]',
        borderLight: 'border-[#B8DCF4]',
        tag: 'Dark Mode & Media Queries',
      },
    ],
  },
  {
    category: 'frameworks',
    categoryTitle: 'Frameworks and Libraries',
    skills: [
      {
        id: 'bootstrap',
        name: 'Bootstrap',
        category: 'frameworks',
        categoryLabel: 'CSS Framework',
        brandColor: '#7952B3',
        bgLight: 'bg-[#F4EFFB]',
        borderLight: 'border-[#DCC8F5]',
        tag: 'Responsive Grid',
      },
      {
        id: 'laravel',
        name: 'Laravel',
        category: 'frameworks',
        categoryLabel: 'PHP Framework',
        brandColor: '#FF2D20',
        bgLight: 'bg-[#FDEDEC]',
        borderLight: 'border-[#FABCB8]',
        tag: 'Blade & Mails',
      },
      {
        id: 'jquery',
        name: 'jQuery',
        category: 'frameworks',
        categoryLabel: 'JavaScript Library',
        brandColor: '#0769AD',
        bgLight: 'bg-[#EBF3F9]',
        borderLight: 'border-[#BBD9EE]',
        tag: 'DOM Scripting',
      },
    ],
  },
  {
    category: 'cms',
    categoryTitle: 'CMS',
    skills: [
      {
        id: 'wordpress',
        name: 'WordPress',
        category: 'cms',
        categoryLabel: 'Content Management',
        brandColor: '#21759B',
        bgLight: 'bg-[#ECF5F9]',
        borderLight: 'border-[#BEDFF0]',
        tag: 'Custom Themes & Pages',
      },
    ],
  },
  {
    category: 'uiux',
    categoryTitle: 'UI / UX',
    skills: [
      {
        id: 'figma',
        name: 'Figma',
        category: 'uiux',
        categoryLabel: 'Design & Prototype',
        brandColor: '#F24E1E',
        bgLight: 'bg-[#FDF1EE]',
        borderLight: 'border-[#FACFC4]',
        tag: 'Email Design System',
      },
      {
        id: 'adobe-xd',
        name: 'Adobe XD',
        category: 'uiux',
        categoryLabel: 'Prototyping',
        brandColor: '#FF61F6',
        bgLight: 'bg-[#FEF1FE]',
        borderLight: 'border-[#FCCFFB]',
        tag: 'Wireframes & UI',
      },
      {
        id: 'photoshop',
        name: 'Adobe Photoshop',
        category: 'uiux',
        categoryLabel: 'Asset Slicing',
        brandColor: '#31A8FF',
        bgLight: 'bg-[#EFF8FF]',
        borderLight: 'border-[#BFE4FF]',
        tag: 'Retina Assets & GIF',
      },
      {
        id: 'illustrator',
        name: 'Adobe Illustrator',
        category: 'uiux',
        categoryLabel: 'Vector Assets',
        brandColor: '#FF9A00',
        bgLight: 'bg-[#FFF7EB]',
        borderLight: 'border-[#FFE0B2]',
        tag: 'SVG & Vectors',
      },
    ],
  },
];

export const allSkillsList: SkillItem[] = skillsGrouped.flatMap((g) => g.skills);
