export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  technologies: string[];
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  date: string;
  detail?: string;
}
