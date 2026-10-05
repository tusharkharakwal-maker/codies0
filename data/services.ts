// One catalog for the services section, enquiry form, and API validation.
export const services = [
  "Website Development",
  "3D Websites",
  "Full Backend Development",
  "Login Page Development",
  "Database Management",
  "Graphics Designing",
  "Photo Editing",
  "Video Editing",
  "Video Creation",
  "SEO",
  "AI SEO",
] as const;

export type Service = (typeof services)[number];

export const serviceGroups = [
  {
    id: "development",
    title: "Web Development",
    headline: ["WEB", "DEVELOPMENT"],
    description:
      "Our core. From the first screen to the database behind it, we build websites that do more for your business.",
    items: services.slice(0, 5),
  },
  {
    id: "creative",
    title: "Creative & Design",
    headline: ["CREATIVE", "& DESIGN"],
    description:
      "Graphic design, photo editing, and video that give your website and content a distinct point of view.",
    items: services.slice(5, 9),
  },
  {
    id: "marketing",
    title: "Marketing & SEO",
    headline: ["MARKETING", "& SEO"],
    description:
      "Help people find what you have built, through search engines and AI-powered search.",
    items: services.slice(9),
  },
] as const;
