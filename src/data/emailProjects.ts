import { EmailProject } from '../types';

export const emailProjects: EmailProject[] = [
  {
    id: 'interactive-colour-picker',
    number: '01',
    title: 'Interactive Colour Picker',
    category: '',
    client: 'Nissan',
    description: 'Interactive email experience allowing users to explore vehicle colours inside the inbox.',
    tags: ['HTML Email', 'CSS Carousel'],
    image: '/assets/color-selector.gif',
    caseStudyUrl: '/work/interactive-colour-picker',
    interactiveType: 'colour-picker',
  },
  {
    id: 'interactive-hotspot',
    number: '02',
    title: 'Interactive Hotspot Experience',
    category: '',
    client: 'Nissan',
    description: 'Interactive email experience exploring vehicle features via progressive enhancement.',
    tags: ['Interactive', 'Hotspots'],
    image: '/assets/Hotspot.gif',
    caseStudyUrl: '/work/interactive-hotspot',
    interactiveType: 'hotspot',
  },
  {
    id: 'responsive-media',
    number: '03',
    title: 'Responsive Media Experience',
    category: 'Responsive Email Development',
    description: 'Mobile + desktop image experience for optimal rendering across viewports.',
    tags: ['Responsive HTML', 'Mobile / Desktop'],
    image: '/assets/Responsiveness.gif',
    caseStudyUrl: '/work/responsive-email',
    interactiveType: 'responsive-media',
  },
  {
    id: 'dark-mode-compatibility',
    number: '04',
    title: 'Dark Mode Compatibility',
    category: 'Cross-Client · Dark Mode Optimization',
    description: 'Dynamic light and dark mode email rendering using custom CSS media queries and client-safe fallbacks.',
    tags: ['Dark Mode', '@media prefers-color-scheme', 'Email Compatibility'],
    image: '/assets/dark-mode-email.jpg',
    caseStudyUrl: '/work/dark-mode-compatibility',
    interactiveType: 'dark-mode',
  },
];


