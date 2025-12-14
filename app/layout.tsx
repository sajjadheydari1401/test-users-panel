import "./globals.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "User Management Dashboard",
  description: "A small demo app to manage users",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
