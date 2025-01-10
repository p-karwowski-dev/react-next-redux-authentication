import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <Nav />

            <header className={styles.header}>
              <Image
                src="/logo.svg"
                className={styles.logo}
                alt="logo"
                width={100}
                height={100}
              />
            </header>

            <main className={styles.main}>{children}</main>
            
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
