import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { createApi } from 'unsplash-js';


export default function Home({ data }) {
  const unsplash = createApi({ accessKey: `1lxPdRKp0QkSVk45S7e_g6OoYnIUN14TiDmtZEufkck`});
  const name = `brugge`;
  // feed example
  /*unsplash.search.getPhotos({
      query: name,
      page: 1,
      perPage: 1,
      orientation: 'portrait',
    }).then(result => {
    if (result.errors) {
      // handle error here
      console.log('error occurred: ', result.errors[0]);
    } else {
      const feed = result.response;

      // extract total and results array from response
      const { total, results } = feed;

      // handle success here
      console.log(`received ${results.length} photos out of ${total}`);
      console.log('first photo: ', results[0]);
    }
  });*/

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
