'use client'
import "./globals.css";
import Header from "./Header";
import GlobalContextProvider from "./GlobalContextProvider";
import PopUpLayer from "./components/popUps/PopUpLayer";
import { useRef } from "react";

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <title>Graflow</title>
      </head>
      <body
        className={`h-screen w-screen font-mono`}
      >
        <GlobalContextProvider>
            <div className="w-full h-full grid grid-rows-[auto_1fr]">
              <Header></Header>
              <main className="h-full w-full">
                {children}
              </main>
            </div>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
