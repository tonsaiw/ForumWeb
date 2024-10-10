import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import { ReactQueryProvider } from "./ReactQueryProvider";

// App Router, and it is the root layout for all pages in your application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
