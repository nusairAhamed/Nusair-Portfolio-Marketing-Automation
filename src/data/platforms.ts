export interface PlatformItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  logo: string;
  features: string[];
  accentColor?: string;
  featured?: boolean;
}

export const platformsData: PlatformItem[] = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'Marketing Hub & CRM Automation',
    badge: 'Core Expertise',
    description: 'Advanced Marketing Hub implementation, automated nurture workflows, dynamic HubL templates, custom CRM properties, and lead-scoring pipelines.',
    logo: '/assets/platforms/hubspot-new.png',
    features: ['Marketing Hub Pro & Enterprise', 'Dynamic HubL Coding', 'Automated Workflows', 'Smart List Segmentation'],
    accentColor: '#FF7A59',
    featured: true,
  },
  {
    id: 'salesforce',
    name: 'Salesforce Marketing Cloud',
    category: 'Enterprise ESP & Journey Builder',
    badge: 'Enterprise ESP',
    description: 'Dynamic journey orchestration, Email Studio campaign deployment, multi-channel segmentation, and enterprise-grade personalization.',
    logo: '/assets/platforms/salesforce.png',
    features: ['Email Studio & Automation Studio', 'Journey Builder Funnels', 'Data Extensions & Filters', 'Cross-Device QA'],
    accentColor: '#00A1E0',
  },
  {
    id: 'adobe-campaign',
    name: 'Adobe Campaign',
    category: 'Enterprise Delivery & Orchestration',
    badge: 'Enterprise Campaign',
    description: 'Large-scale transactional and promotional campaign delivery, multi-channel execution, dynamic content blocks, and delivery monitoring.',
    logo: '/assets/platforms/adobe-campaign.png',
    features: ['Campaign Workflows', 'Dynamic Personalization', 'Targeting & Delivery QA', 'Multi-Brand Templates'],
    accentColor: '#EB1000',
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'Campaign Automation & Audience',
    badge: 'Automation & Journeys',
    description: 'End-to-end campaign deployment, customer journey automation, behavioral tagging, merge-tag dynamic content, and audience segmentation.',
    logo: '/assets/platforms/mailchimp.png',
    features: ['Customer Journeys', 'Custom HTML Templates', 'Audience Tagging & Groups', 'A/B Testing & Analytics'],
    accentColor: '#FFE01B',
  },
  {
    id: 'insider',
    name: 'Insider',
    category: 'AI-Driven Journey Orchestration',
    badge: 'Growth Management',
    description: 'Cross-channel journey mapping, predictive audience segmentation, personalized messaging triggers, and conversion optimization.',
    logo: '/assets/platforms/insider.png',
    features: ['Architect Journey Orchestration', 'Predictive Segmentation', 'Dynamic Content Delivery', 'Cross-Channel Triggers'],
    accentColor: '#FF5A36',
  },
  {
    id: 'taxi-for-email',
    name: 'Taxi for Email',
    category: 'Modular Design Systems & Syntax',
    badge: 'Email Design System',
    description: 'Building and governing scalable, brand-consistent email design systems with modular syntax, editable locked fields, and seamless ESP export.',
    logo: '/assets/platforms/taxi-for-email.png',
    features: ['Taxi Syntax Architecture', 'Modular Brand Systems', 'ESP Export Optimization', 'Template Governance'],
    accentColor: '#00B4D8',
  },
  {
    id: 'luxsci',
    name: 'LuxSci',
    category: 'Secure & Compliant Email Delivery',
    badge: 'Security & Compliance',
    description: 'High-assurance email delivery, HIPAA-compliant transactional architecture, TLS encryption enforcement, and secure SMTP relay integration.',
    logo: '/assets/platforms/luxsci.png',
    features: ['HIPAA-Compliant Email', 'Enforced TLS & S/MIME', 'Secure High-Volume Relay', 'Audit & Delivery Logs'],
    accentColor: '#2B3A67',
  },
];
