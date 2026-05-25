import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "Kenneth Jonathan Halim",
  description: "Full-Stack Developer | Software Engineer | Tech Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
