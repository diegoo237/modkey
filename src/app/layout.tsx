import localFont from "next/font/local";
import Header from "@/components/Header";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "./app.css";
import ViewCanvas from "@/components/ViewCanvas";

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
      <body className="overflow-x-hidden bg-stone-800">
        <Header />
        <main>
          {children}
          <ViewCanvas />
        </main>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
