import styles from "./Layout.module.css";
import Head from "next/head";
import Link from "next/link";
const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>De Naald</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">
            <a>De Naald</a>
          </Link>
        </h1>
        <p className={styles.description}>Het nieuws komt er heet van</p>
        <Link href="/subscribe">
          <a>Schrijf je in voor onze nieuwsbrief</a>
        </Link>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
