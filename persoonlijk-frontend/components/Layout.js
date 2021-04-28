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
            <a>Persoonlijk</a>
          </Link>
        </h1>
        <p className={styles.description}>Schrijf een leuk postkaartje voor thuis</p>
        <Link href="/weather">
          <a>Het weer</a>
        </Link>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
