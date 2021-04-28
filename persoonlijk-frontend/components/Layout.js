import styles from "./Layout.module.css";
import Head from "next/head";
import Link from "next/link";
const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vacation Postcard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">
            <a>Vacation Postcard</a>
          </Link>
        </h1>
        <p className={styles.description}>Write a fun post card for home</p>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
  /* <Link href="/weather">
          <a>Het weer</a>
        </Link> */
};

export default Layout;
