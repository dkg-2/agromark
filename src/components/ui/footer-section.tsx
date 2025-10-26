'use client';
import React, { type ComponentProps, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LinkedinIcon } from "lucide-react";
import Link from "next/link"; // Import the Link component

// Types
interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

// Footer data - MODIFIED
const footerLinks: FooterSection[] = [
  {
    label: "Features",
    links: [
      { title: "Plant Disease Detection", href: "/plant-disease" },
      { title: "Crop Recommendation", href: "/crop-recommendation" },
      { title: "AI Chat Assistant", href: "/chat" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About Us", href: "/wip" },
      { title: "Privacy Policy", href: "/wip" },
      { title: "Terms of Services", href: "/wip" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Blog", href: "/wip" },
      { title: "Help", href: "/wip" },
    ],
  },
  {
    label: "Social Links",
    links: [
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/divyansh-gaur-665978308/",
        icon: LinkedinIcon,
      },
    ],
  },
];

// Footer Component
export function Footer() {
  return (
    <footer
      className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center
      rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]
      px-6 py-12 lg:py-16"
    >
      <div className="bg-foreground/20 absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        {/* Logo and Copy - MODIFIED */}
        <AnimatedContainer className="space-y-4">
          <Link
            href="/"
            className="text-2xl font-bold text-foreground transition-colors hover:text-primary"
          >
            AGROMARK
          </Link>
          <p className="mt-8 text-sm text-muted-foreground md:mt-0">
            © {new Date().getFullYear()} AGROMARK. All rights reserved.
          </p>
        </AnimatedContainer>

        {/* Links - MODIFIED */}
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-semibold uppercase text-foreground">
                  {section.label}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {section.links.map((link) => {
                    const isInternal = link.href.startsWith("/");
                    const linkClass =
                      "inline-flex items-center transition-all duration-300 hover:text-foreground";

                    return (
                      <li key={link.title}>
                        {isInternal ? (
                          <Link href={link.href} className={linkClass}>
                            {link.icon && <link.icon className="me-1 size-4" />}
                            {link.title}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className={linkClass}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.icon && <link.icon className="me-1 size-4" />}
                            {link.title}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

// Animation Wrapper
type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
