import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stay Hub",
  description: "Book your hotel ",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" h-screen flex  items-center justify-center">
      {children}
    </div>
  );
}
