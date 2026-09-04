import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beirut Neighborhoods Poll",
  description:
    "A quick, informal poll: which neighborhood of Beirut people live in.",
  openGraph: {
    title: "Beirut Neighborhoods Poll",
    description: "Vote and watch the city fill in by neighborhood.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
