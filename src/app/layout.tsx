import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import StyledComponentsRegistry from "@/lib/styled-components-registry";

const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Sistema Rangooo",
  description:
    "Seu delivery mais rápido, seu negócio mais organizado. O Rangooo cuida de tudo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          <Header />
          {children}
          <Toaster />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
