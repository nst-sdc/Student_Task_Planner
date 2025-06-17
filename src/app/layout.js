import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/AuthGuard";
import AuthInitializer from "@/components/AuthInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Student Task Planner",
  description: "A modern task management application for students"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthInitializer />
        <div className="flex flex-col min-h-full">
          <Navbar />
          <div className="flex flex-grow">
            <Sidebar />
            <main className="flex-grow">
              <AuthGuard>
                {children}
              </AuthGuard>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
