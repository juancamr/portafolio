import { ModeToggle } from "@/components/theme-button";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import LanguageButton from "@/components/language-button";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { SendMailDialog } from "@/components/send-mail-dialog";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Juan Carlos",
  description: "Mi portafolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        ></meta>
      </head>
      <body className={montserrat.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="py-8 px-4 md:px-16 lg:px-20 xl:px-40 fixed w-screen dark:bg-slate-950 z-40 bg-white">
            <nav className="w-full flex">
              <span className="text-3xl font-bold mr-auto">{"{ JM }"}</span>
              <div className="flex items-center space-x-3">
                <div className="hidden lg:block">
                  <LanguageButton />
                </div>
                <ModeToggle />
                <SendMailDialog />
              </div>
            </nav>
          </header>
          {children}
          <footer>this is the footer</footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
