import { Inter } from "next/font/google";
import MainLayout from '@/components/layout/MainLayout';
import './globals.css';
import MenuContextProvider from '@/context/MenuContext';
import StoreProvider from "@/components/StoreProvider";
import UserProvider from "@/components/UserProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SundarBahi",
  description: "A chatBot to help peoples",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <UserProvider>
        <ProtectedRoute>
        <html lang='en'>
      <body>
        <MenuContextProvider>
          <MainLayout>{children}</MainLayout>
        </MenuContextProvider>
      </body>
    </html>
        </ProtectedRoute>
      </UserProvider>
    </StoreProvider>
  );
}
