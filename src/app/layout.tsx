import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Voice2Note",
  description: "A super niubi project.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <Toaster />
            {children}
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
