import type { Metadata } from "next";
import { Anton, Manrope, Caveat } from "next/font/google";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const caveat = Caveat({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "Codie® | Web Development, Design & SEO",
    template: "%s | Codie®",
  },
  description:
    "Codie is a web development agency building websites, 3D experiences, backends, login systems, and databases, supported by graphics, photo and video services, SEO, and AI SEO.",
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${manrope.variable} ${caveat.variable}`}
      >
        <MotionProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navigation />
          {children}
          <Footer />
        </MotionProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
