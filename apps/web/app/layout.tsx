import "./globals.css";

import { AnalyticsProvider } from "@/context/AnalyticsContext";
import { AuthProvider } from "@/context/AuthContext";

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

      <body>

        <AuthProvider>

          <AnalyticsProvider>

            {children}

          </AnalyticsProvider>

        </AuthProvider>

      </body>

    </html>
  );
}