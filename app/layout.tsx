import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CivOps — The Enterprise OS for Manufacturing Operations",
  description:
    "CivOps gives mid-market manufacturers a unified operations platform — role-specific HMI screens, structured batch execution, AI agents, and native PLC integration. Deployed in weeks, not years.",
  metadataBase: new URL("https://civops.io"),
  openGraph: {
    title: "CivOps — The Enterprise OS for Manufacturing Operations",
    description:
      "Role-specific HMI, batch execution, AI agents, and OPC-UA integration for mid-market manufacturers.",
    url: "https://civops.io",
    siteName: "CivOps",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivOps — The Enterprise OS for Manufacturing Operations",
    description:
      "Role-specific HMI, batch execution, AI agents, and OPC-UA integration for mid-market manufacturers.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon-180.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
