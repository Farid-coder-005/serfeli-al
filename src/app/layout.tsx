import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import LoadingBar from "@/components/LoadingBar";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Sərfəli Al - Azərbaycanın ən ağıllı alış platforması",
  description: "Bütün mağazalardakı qiymətləri müqayisə edin, real endirimləri tapın və kəşbək qazanın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <body className={`${inter.className} ${montserrat.variable} min-h-screen bg-[#F8FAFC] flex flex-col antialiased text-[#1e293b] selection:bg-[#166534]/10`}>
        <div className="premium-bg-overlay" />
        <Providers>
          <LoadingBar />
          <Header />
          <main className="flex-1 flex flex-col w-full min-h-screen relative z-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
