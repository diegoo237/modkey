import localFont from "next/font/local";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "./app.css";

const grotesk = localFont({
  src: "../../public/fonts/ClashGrotesk-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-clash",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={grotesk.variable}>
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
