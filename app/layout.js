"use client";
import TaskContextProvider from "@/context/ListContext";
import { usePathname } from "next/navigation";
import { Exo_2 } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Meta from "@/components/Meta";
import AuthContextProvider from "@/context/AuthContext";

const exo2 = Exo_2({
  weight: ["200", "400", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <Meta />
      <style jsx global>
        {`
          html {
            font-family: ${exo2.style.fontFamily};
          }
        `}
      </style>
      <body className="bg-secondary text-heading">
        {pathname.includes("auth") ? (
          ""
        ) : (
          <AuthContextProvider>
            <Navbar />
          </AuthContextProvider>
        )}
        <TaskContextProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </TaskContextProvider>
      </body>
    </html>
  );
}
