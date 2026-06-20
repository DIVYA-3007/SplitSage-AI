import "./globals.css";

import { AnalyticsProvider } from "@/context/AnalyticsContext";
import { AuthProvider } from "@/context/AuthContext";

import ToastProvider from "@/components/providers/ToastProvider";

export const metadata = {
  title: "SplitSage AI",
  description: "AI Powered Expense Splitter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className="bg-slate-950 text-white">

        <AuthProvider>

          <AnalyticsProvider>

            <ToastProvider />

            {children}

          </AnalyticsProvider>

        </AuthProvider>

      </body>

    </html>
  );
}