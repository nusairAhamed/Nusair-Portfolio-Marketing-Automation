import { ServiceItem } from '../types';

export const services: ServiceItem[] = [
  {
    id: 'automate-hubspot',
    number: '01',
    tagline: '01 — HUBSPOT & AUTOMATION',
    title: 'Marketing Hub & Automation',
    description:
      'Configuring robust marketing operations, multi-branch nurture workflows, behavioral segmentation, and dynamic HubL templates in HubSpot.',
    features: [
      'HubSpot Marketing Hub setup & lead operations',
      'Automated multi-stage nurture workflows',
      'Smart lists & behavioral segmentation',
      'HubSpot forms & lead capture funnels',
      'Custom-coded HubSpot landing pages & templates',
      'Dynamic HubL templating & personalization',
      'Multi-platform sync (Salesforce, Mailchimp)',
    ],
    gradientType: 'automate',
  },
  {
    id: 'build-email-dev',
    number: '02',
    tagline: '02 — EMAIL ENGINEERING',
    title: 'Responsive Email Development',
    description:
      'Architecting bulletproof, responsive HTML email systems that look pixel-perfect across Outlook, Gmail, Apple Mail, and modern mobile clients.',
    features: [
      'Responsive HTML email development',
      'Modular email component systems',
      'Figma → HTML precision translation',
      'Cross-client compatibility & VML fallbacks',
      'Advanced dark mode styling & overrides',
      'Semantic email accessibility (WCAG AA)',
      'Rigorous Litmus / Email on Acid validation',
    ],
    gradientType: 'build',
  },
  {
    id: 'improve-qa',
    number: '03',
    tagline: '03 — QA & OPTIMIZATION',
    title: 'QA & Optimization',
    description:
      'Deep diagnostic testing and campaign optimization eliminating rendering glitches, deliverability risks, and performance bottlenecks before send.',
    features: [
      'Comprehensive Litmus & Email on Acid testing',
      'Outlook desktop bug resolution (tables, DPI, mso)',
      'Mobile responsive breakpoint verification',
      'Email file weight & image CDN optimization',
      'Campaign troubleshooting & emergency triage',
      'Deliverability & spam-filter diagnostic review',
      'Template refactoring for maintainability',
    ],
    gradientType: 'improve',
  },
];
