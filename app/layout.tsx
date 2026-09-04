import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beirut Origins Map",
  description:
    "A quick, informal poll: where people are from, and where they live across Beirut's neighborhoods.",
  openGraph: {
    title: "Beirut Origins Map",
    description:
      "Vote and watch the city fill in — country of origin, mapped by neighborhood.",
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
