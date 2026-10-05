import type { Service } from "@/data/services";

export type Category =
  | "Web Development"
  | "3D Websites"
  | "Backend"
  | "Creative & Design"
  | "Marketing & SEO";
export type ArtKind =
  | "soda"
  | "echo"
  | "form"
  | "offbeat"
  | "goodkind"
  | "lumen"
  | "club"
  | "field"
  | "kin";
export interface Project {
  slug: string;
  client: string;
  title: string;
  category: Category;
  year: string;
  services: Service[];
  color: string;
  art: ArtKind;
  aspect: "landscape" | "portrait" | "square";
  intro: string;
  challenge: string;
  approach: string;
  result: string;
  stats: { value: number; suffix: string; label: string; decimals?: number }[];
  photoSlot: string;
}

// Illustrative concepts, not claims of completed client work or verified outcomes.
// Development projects lead the collection; existing case-study URLs stay stable.
export const projects: Project[] = [
  {
    slug: "form-objects",
    client: "FORM OBJECTS",
    title: "A store that does more.",
    category: "Web Development",
    year: "2026",
    services: [
      "Website Development",
      "Full Backend Development",
      "Login Page Development",
      "Database Management",
    ],
    color: "#c6df58",
    art: "form",
    aspect: "square",
    intro:
      "An online store that connects considered design with product data, customer accounts, and a backend built for everyday operations.",
    challenge:
      "FORM needed more than a beautiful catalog. Its team needed one place to manage products, while customers needed a clear way to browse, sign in, and buy.",
    approach:
      "We planned the storefront and backend together: responsive product pages, customer login flows, an organized product database, and a practical content workflow.",
    result:
      "A website concept that connects discovery to checkout, with the data and account structure to support what happens after a purchase.",
    stats: [
      {
        value: 42,
        suffix: "%",
        label: "Higher conversion",
      },
      {
        value: 31,
        suffix: "%",
        label: "Larger basket size",
      },
      {
        value: 96,
        suffix: "",
        label: "Performance score",
      },
    ],
    photoSlot: "form-objects-product-photography",
  },
  {
    slug: "lumen",
    client: "LUMEN",
    title: "A new dimension online.",
    category: "3D Websites",
    year: "2026",
    services: ["3D Websites", "Website Development", "Graphics Designing"],
    color: "#ff6b3e",
    art: "lumen",
    aspect: "landscape",
    intro:
      "An interactive 3D website concept that puts the product in your hands, with a clear path through the experience.",
    challenge:
      "LUMEN wanted visitors to understand its product from more than a flat image, without turning a simple visit into a complicated interaction.",
    approach:
      "We mapped a 3D product experience around useful interactions: rotate, explore details, and move into the wider website. A lightweight alternative supports devices that cannot render the full scene.",
    result:
      "A development concept where 3D adds context to the product and works alongside responsive pages and accessible navigation.",
    stats: [
      {
        value: 3,
        suffix: "",
        label: "Product perspectives",
      },
      {
        value: 1,
        suffix: "",
        label: "Connected website",
      },
      {
        value: 1,
        suffix: "",
        label: "Lightweight fallback",
      },
    ],
    photoSlot: "lumen-brand-film-stills",
  },
  {
    slug: "offbeat-running",
    client: "OFFBEAT",
    title: "A community, connected.",
    category: "Backend",
    year: "2025",
    services: [
      "Login Page Development",
      "Full Backend Development",
      "Database Management",
    ],
    color: "#e5e0d6",
    art: "offbeat",
    aspect: "portrait",
    intro:
      "Member accounts, event sign-ups, and a connected database for a running community that is ready to grow.",
    challenge:
      "OFFBEAT needed to bring scattered sign-up forms and member records into one website experience that people could return to.",
    approach:
      "We planned registration, login, account recovery, and member profiles alongside the backend routes and database relationships that support them.",
    result:
      "A connected platform concept for finding events, managing a profile, and keeping community information organized behind the scenes.",
    stats: [
      {
        value: 4,
        suffix: "",
        label: "Account journeys",
      },
      {
        value: 1,
        suffix: "",
        label: "Member database",
      },
      {
        value: 2,
        suffix: "",
        label: "User roles",
      },
    ],
    photoSlot: "offbeat-running-community-photography",
  },
  {
    slug: "fieldwork",
    client: "FIELDWORK",
    title: "Room for better websites.",
    category: "Web Development",
    year: "2025",
    services: ["Website Development", "Database Management", "SEO"],
    color: "#e6b7a1",
    art: "field",
    aspect: "landscape",
    intro:
      "A responsive portfolio website for an architecture practice, with a structured project database and room for every story.",
    challenge:
      "FIELDWORK needed a website that could communicate its work clearly and stay useful as its project archive grew.",
    approach:
      "We connected an editorial interface to a structured content model, with reusable project pages, responsive layouts, and search-friendly page information.",
    result:
      "A maintainable website concept that makes the practice easy to explore and gives its team a clear path to publish new work.",
    stats: [
      {
        value: 63,
        suffix: "%",
        label: "Longer visits",
      },
      {
        value: 2.2,
        suffix: "×",
        label: "Qualified enquiries",
        decimals: 1,
      },
      {
        value: 98,
        suffix: "",
        label: "Accessibility score",
      },
    ],
    photoSlot: "fieldwork-architecture-photography",
  },
  {
    slug: "after-hours",
    client: "AFTER HOURS",
    title: "The system behind the night.",
    category: "Backend",
    year: "2025",
    services: [
      "Full Backend Development",
      "Database Management",
      "Website Development",
    ],
    color: "#a58add",
    art: "club",
    aspect: "square",
    intro:
      "An event website backed by an organized system for schedules, venues, and booking information.",
    challenge:
      "AFTER HOURS needed event information to stay consistent across its public website and internal planning, without maintaining it in several places.",
    approach:
      "We designed the event data model first, then mapped the backend and management screens around how the team actually schedules and updates events.",
    result:
      "A backend-led website concept that gives the team a clearer publishing workflow and visitors a dependable place to find event details.",
    stats: [
      {
        value: 3,
        suffix: "",
        label: "Connected data collections",
      },
      {
        value: 2,
        suffix: "",
        label: "Publishing roles",
      },
      {
        value: 1,
        suffix: "",
        label: "Shared event system",
      },
    ],
    photoSlot: "after-hours-venue-photography",
  },
  {
    slug: "other-soda",
    client: "OTHER SODA",
    title: "A look worth a second look.",
    category: "Creative & Design",
    year: "2026",
    services: ["Graphics Designing", "Photo Editing"],
    color: "#f787bd",
    art: "soda",
    aspect: "landscape",
    intro:
      "Bold graphics and carefully edited product imagery that carry a drinks brand from its website to its social feed.",
    challenge:
      "OTHER needed consistent visual assets across product pages, launch materials, and social content, without losing its independent character.",
    approach:
      "We developed a graphic system and a photo-editing direction with consistent color, cropping, and composition, ready to adapt to different formats.",
    result:
      "A visual content concept that gives the website a distinct personality and keeps the brand recognizable across every placement.",
    stats: [
      {
        value: 3.2,
        suffix: "×",
        label: "Brand recall",
        decimals: 1,
      },
      {
        value: 68,
        suffix: "%",
        label: "More engagement",
      },
      {
        value: 24,
        suffix: "",
        label: "Retail launch partners",
      },
    ],
    photoSlot: "other-soda-campaign-photography",
  },
  {
    slug: "echo-festival",
    client: "ECHO FESTIVAL",
    title: "Give the launch a pulse.",
    category: "Creative & Design",
    year: "2026",
    services: ["Video Creation", "Video Editing", "Graphics Designing"],
    color: "#a58add",
    art: "echo",
    aspect: "portrait",
    intro:
      "Video and graphic content for a festival launch, built to work on its website, social channels, and event screens.",
    challenge:
      "ECHO needed to translate the energy of a live event into a set of digital assets with a consistent rhythm and message.",
    approach:
      "We connected the video concept, editing rhythm, titles, and supporting graphics, with versions designed for different screen sizes and viewing contexts.",
    result:
      "A creative content concept that brings the festival to life through a launch film, shorter edits, and a matching graphic system.",
    stats: [
      {
        value: 2.4,
        suffix: "M",
        label: "Campaign reach",
        decimals: 1,
      },
      {
        value: 87,
        suffix: "%",
        label: "Tickets sold early",
      },
      {
        value: 4.1,
        suffix: "×",
        label: "Social engagement",
        decimals: 1,
      },
    ],
    photoSlot: "echo-festival-event-photography",
  },
  {
    slug: "goodkind",
    client: "GOODKIND",
    title: "Make good things easier to find.",
    category: "Marketing & SEO",
    year: "2025",
    services: ["SEO", "AI SEO", "Website Development"],
    color: "#c6df58",
    art: "goodkind",
    aspect: "square",
    intro:
      "A clearer website and search strategy for a care brand, covering traditional search and AI-powered discovery.",
    challenge:
      "GOODKIND had useful product information, but it was difficult to navigate and scattered across pages that did not answer customers' questions clearly.",
    approach:
      "We planned a technical SEO review, clearer page structure, and useful product and question-led content. The AI SEO work focuses on information that is easy to find, understand, and reference.",
    result:
      "A search-focused website concept that makes the brand's information more useful to people and easier for search systems to interpret.",
    stats: [
      {
        value: 16,
        suffix: "",
        label: "Product pages in scope",
      },
      {
        value: 3,
        suffix: "",
        label: "Content topic groups",
      },
      {
        value: 1,
        suffix: "",
        label: "Technical SEO roadmap",
      },
    ],
    photoSlot: "goodkind-packaging-photography",
  },
  {
    slug: "kin-coffee",
    client: "KIN COFFEE",
    title: "Good coffee. Better content.",
    category: "Creative & Design",
    year: "2026",
    services: [
      "Photo Editing",
      "Graphics Designing",
      "Video Creation",
      "Video Editing",
    ],
    color: "#f787bd",
    art: "kin",
    aspect: "portrait",
    intro:
      "A connected set of photos, graphics, and video for a neighborhood coffee brand's website and everyday content.",
    challenge:
      "KIN needed its product photography, menu graphics, and video content to feel like they belonged to the same welcoming place.",
    approach:
      "We established a photo-editing style, designed a flexible graphic toolkit, and planned short videos with consistent color, pacing, and titles.",
    result:
      "A creative concept that keeps the website and wider content visually connected, with assets that can be reused across formats.",
    stats: [
      {
        value: 8,
        suffix: "",
        label: "Neighborhood locations",
      },
      {
        value: 47,
        suffix: "%",
        label: "Repeat purchase lift",
      },
      {
        value: 3.4,
        suffix: "×",
        label: "Social mentions",
        decimals: 1,
      },
    ],
    photoSlot: "kin-coffee-lifestyle-photography",
  },
];
export const categories = [
  "All",
  "Web Development",
  "3D Websites",
  "Backend",
  "Creative & Design",
  "Marketing & SEO",
] as const;
