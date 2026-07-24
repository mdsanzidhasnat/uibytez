import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CurrencyProvider } from "@/lib/currency-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// TODO: Replace SITE_URL_PLACEHOLDER with your actual domain once purchased (e.g. "https://uibytez.com").
const SITE_URL_PLACEHOLDER = "https://uibytez.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL_PLACEHOLDER),
  title: {
    default: "UIBytez — Web Design, Digital Marketing & UI/UX Agency",
    template: "%s — UIBytez",
  },
  description:
    "UIBytez is a digital agency specializing in website design & development, digital marketing (SEO), product branding, UI/UX design, graphic design, and video editing.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "UIBytez",
    title: "UIBytez — Web Design, Digital Marketing & UI/UX Agency",
    description:
      "UIBytez is a digital agency specializing in website design & development, digital marketing (SEO), product branding, UI/UX design, graphic design, and video editing.",
    // TODO: Replace with a real OG image (1200x630px) once created.
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UIBytez — Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UIBytez — Web Design, Digital Marketing & UI/UX Agency",
    description:
      "UIBytez is a digital agency specializing in website design & development, digital marketing (SEO), product branding, UI/UX design, graphic design, and video editing.",
    // TODO: Replace with a real OG image once created.
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <CurrencyProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <WhatsAppButton />
            </CurrencyProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
