import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  weight: ["100", "300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Douglas Miranda Tosi | Advogado Criminalista",
  description:
    "Advocacia criminalista especializada em Direito Penal, Tribunal do Júri, Habeas Corpus e defesa criminal. Cuiabá – MT, atendimento nacional.",
  keywords: "advogado criminalista, direito penal, tribunal do júri, habeas corpus, Cuiabá, Mato Grosso",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${josefin.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          if (history.scrollRestoration) history.scrollRestoration = 'manual';
          window.scrollTo(0, 0);
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
