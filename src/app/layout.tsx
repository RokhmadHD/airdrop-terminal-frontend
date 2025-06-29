import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-provider";
import { UserProvider } from "@/contexts/UserProvider";
import { Header } from "@/components/layout/header";
import NextTopLoader from 'nextjs-toploader';
import { Footer } from "@/components/layout/footer";
import HeroCanvas from "@/components/section/HeroCanvas";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airdrop Terminal",
  description: "Find the latest crypto airdrops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <div className="relative flex min-h-screen flex-col w-full">
              <Header />
              <HeroCanvas/>
              <main className="flex-grow">{children}</main>
              {/* Tambahkan Footer di sini jika perlu */}
              <Footer />
            </div>
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}