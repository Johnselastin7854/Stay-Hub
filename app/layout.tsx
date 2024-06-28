import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Container from "@/components/layout/Container";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Stay Hub",
  description: "Book Your Hotel",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <StoreProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <main className="flex flex-col min-h-screen bg-secondary">
                <Navbar />
                <section className="flex-grow ">
                  <Container>{children}</Container>
                </section>
              </main>
            </ThemeProvider>
          </body>
        </html>
      </StoreProvider>
    </ClerkProvider>
  );
}
