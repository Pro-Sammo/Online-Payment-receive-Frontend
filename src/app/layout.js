import "./globals.css";
import { Providers } from "./providers";
import Nav from "@/components/Navbar";
import CustomProvider from "@/redux/customprovider";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body>
        {/* <NextTopLoader /> */}
        <Providers>
          <CustomProvider>
            <Nav />
            {children}
          </CustomProvider>
        </Providers>
      </body>
    </html>
  );
}
