import styles from "./Layout.module.css";
import Head from "next/head";
import Link from "next/link";
const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vakantie postkaartje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">
            <a>Vakantie postkaartje</a>
          </Link>
        </h1>
        <p className={styles.description}>Schrijf een leuk postkaartje voor thuis</p>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
  /* <Link href="/weather">
          <a>Het weer</a>
        </Link> */
};

export default Layout;
