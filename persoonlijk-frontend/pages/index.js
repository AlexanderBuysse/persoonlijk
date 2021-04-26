import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  return (
    <Layout>
      <p>{process.env.NEXT_PUBLIC_DEMO}</p>
      <div className={styles.grid}>
        {data.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`}>
            <a className={styles.card}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
export const getStaticProps = async () => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?_sort=id:desc`
  );
  const data = await resp.json();

  return {
    props: {
      data,
    },
  };
};
