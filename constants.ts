import { Job, UserProfile } from './types';

export const MOCK_USER_PROFILE: UserProfile = {
  name: "Alex Dev",
  headline: "Senior Frontend Engineer | React | TypeScript",
  skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "UI/UX"],
  experienceLevel: "Senior"
};

export const INITIAL_BLOCKED_KEYWORDS = ["unpaid", "commission only", "volunteer"];

export const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "TechFlow Systems",
    location: "San Francisco, CA (Remote)",
    description: "We are looking for a Senior React Engineer with strong TypeScript skills to lead our dashboard team. Experience with Gemini API is a plus.",
    postedDate: "2 hours ago",
    isExpired: false,
    source: "NATIVE",
    logoUrl: "https://picsum.photos/id/1/48/48",
    keywords: ["React", "TypeScript", "Redux"],
  },
  {
    id: "2",
    title: "Marketing Specialist - Commission Based",
    company: "GrowthHackerz",
    location: "New York, NY",
    description: "Join our aggressive sales team. This is a commission-only role with unlimited upside. Cold calling required.",
    postedDate: "1 week ago",
    isExpired: false,
    source: "THIRD_PARTY",
    logoUrl: "https://picsum.photos/id/2/48/48",
    keywords: ["Sales", "Commission", "Marketing"],
  },
  {
    id: "3",
    title: "React Native Developer",
    company: "MobileFirst Inc",
    location: "Austin, TX",
    description: "Building the next generation mobile app. Must know React Native and iOS bridges.",
    postedDate: "3 weeks ago",
    isExpired: true, // This should be filtered
    source: "NATIVE",
    logoUrl: "https://picsum.photos/id/3/48/48",
    keywords: ["React Native", "iOS", "Android"],
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: "Startup A",
    location: "Remote",
    description: "Looking for a rockstar ninja to work for equity only until we get funding.",
    postedDate: "1 day ago",
    isExpired: false,
    source: "THIRD_PARTY",
    logoUrl: "https://picsum.photos/id/4/48/48",
    keywords: ["Full Stack", "Equity", "Unpaid"],
  },
  {
    id: "5",
    title: "Lead UI/UX Designer",
    company: "Creative Studio",
    location: "London, UK",
    description: "Design beautiful interfaces for web applications. Proficiency in Figma and Tailwind CSS required.",
    postedDate: "5 hours ago",
    isExpired: false,
    source: "NATIVE",
    logoUrl: "https://picsum.photos/id/5/48/48",
    keywords: ["Figma", "UI/UX", "Tailwind"],
  }
];