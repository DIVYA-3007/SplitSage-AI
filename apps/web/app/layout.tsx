import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}