"use client";
import { ReactNode } from "react";
import { Footer, Header, Link } from "@cruk/cruk-react-components";
import "@cruk/cruk-react-components/lib/index.css";

import { ReactQueryProvider } from "../contexts/ReactQueryProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="cruk">
      <ReactQueryProvider>
        <body style={{ color: "#000000", backgroundColor: "#FFFFFF" }}>
          <Header themeName="cruk" />
          <main>
            <div
              id="main"
              style={{
                minHeight: "calc(100vh - 200px)",
                margin: "0 auto",
                width: "100%",
                maxWidth: "var(--breakpoint-desktop-large)",
              }}
            >
              <div
                className="color-props spacing-props"
                data-bg-color="background-light"
                data-padding-bottom="l"
                data-padding-top="s"
                data-padding-horizontal="s"
                data-margin-horizontal="auto"
                data-margin-vertical="none"
                style={{ maxWidth: "var(--content-max-width)" }}
              >
                {children}
              </div>
            </div>
          </main>
          <div
            className="color-props spacing-props"
            data-bg-color="background-light"
            data-padding-bottom="xxl"
            style={{ clear: "both" }}
          >
            <Footer themeName="cruk">
              <Link
                appearance="secondary"
                href="https://www.cancerresearchuk.org/about-us/contact-us"
              >
                Contact us
              </Link>
            </Footer>
          </div>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
