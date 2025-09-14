import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Comentado
import "./globals.css";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// }); // Comentado

export const metadata: Metadata = {
  title: "Serviço Social / Alojamento - Sport Club Internacional",
  description: "Site institucional do Departamento de Serviço Social e Alojamento do Sport Club Internacional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
