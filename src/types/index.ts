export interface EmailProject {
  id: string;
  number: string;
  title: string;
  category: string;
  client?: string;
  description: string;
  tags: string[];
  image: string;
  secondImage?: string;
  caseStudyUrl?: string;
  interactiveType?: 'colour-picker' | 'hotspot' | 'responsive-media' | 'animation' | string;
}

export interface ClientEmailBuild {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  thumbnail: string;
  fullImage: string;
  highlights: string[];
  techStack: string[];
}

export interface ClientWork {
  id: string;
  number: string;
  clientName: string;
  clientBadge: string;
  industry: string;
  region: string;
  role: string;
  timeframe: string;
  description: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  builds: ClientEmailBuild[];
  bgGradient: 'blue' | 'purple' | 'green' | 'warm';
}

export interface SelectedProject {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  role: string;
  tools: string[];
  focus: string;
  deliverables: string[];
  image: string;
  bgGradient: 'blue' | 'purple' | 'green' | 'warm';
  caseStudyUrl?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  tagline: string;
  title: string;
  description: string;
  features: string[];
  gradientType: 'build' | 'automate' | 'improve';
}

export interface ProcessTool {
  name: string;
  iconKey: string;
}

export interface ProcessStep {
  step: string;
  name: string;
  microLabel: string;
  title: string;
  description: string;
  tools?: ProcessTool[];
  image: string;
  labels?: string[];
}

export interface CareerItem {
  id: string;
  role: string;
  company: string;
  dates: string;
  location?: string;
  description: string;
  responsibilities: string[];
  tools: string[];
  isCurrent?: boolean;
}
