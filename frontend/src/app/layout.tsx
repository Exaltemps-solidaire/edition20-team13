import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RoleProvider } from "./role-context";
import { FormationProvider } from "./formation/statut-context";
import { AppShell } from "./app-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ENDOmind — Fiches mémo",
  description: "Fiches mémo ENDOmind pour les bénévoles sur le terrain",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <RoleProvider>
          <FormationProvider>
            <AppShell>{children}</AppShell>
          </FormationProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
