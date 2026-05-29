import type { Metadata, Viewport } from "next";
import { Fraunces, Noto_Serif_Bengali, Hind_Siliguri } from "next/font/google";
import "./styles/main.scss";

const latin = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-latin",
  style: ["normal", "italic"],
});

const display = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "ঈদ পুনর্মিলনী ২০২৬ — ধোপাদী মাধ্যমিক বিদ্যালয়",
  description:
    "ধোপাদী মাধ্যমিক বিদ্যালয়ের প্রাক্তন শিক্ষক ও শিক্ষার্থীদের ঈদ পুনর্মিলনী ২০২৬। ৩০শে মে ২০২৬, শনিবার — স্মৃতির টানে, সবাই একসাথে।",
  openGraph: {
    title: "ঈদ পুনর্মিলনী ২০২৬ — ধোপাদী মাধ্যমিক বিদ্যালয়",
    description: "স্মৃতির টানে, সবাই একসাথে। ৩০শে মে ২০২৬, শনিবার।",
    images: ["/posters/invitation.jpeg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#06140f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className={`${latin.variable} ${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
