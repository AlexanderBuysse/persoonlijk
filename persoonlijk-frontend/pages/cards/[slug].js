import Layout from "../../components/Layout";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import styles from "../../components/AddCard.module.css";


const Card = ({ data }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <>
      <section>
      <h3>Message For Home</h3>
      <form className={styles.form}>
          <label className={styles.label}>
            Location:
            <input className="location" type="text" name="location" value={data.location} readOnly required />
          </label>

        <label className={styles.label}>
          From:
          <input type="text" value={data.from} name="from" required />
        </label>
        <label className={styles.label}>
          To:
          <input type="text" value={data.to} name="to" required />
        </label>
        <label className={styles.label}>
          Message:
          <textarea name="content" required maxLength="500" value={data.message}></textarea>
        </label>
      </form>
      <p>Last post card: {process.env.LINK}/cards/{data.slug}</p>
      </section>
        <h2>{data.from}</h2>
        <p>{data.to}</p>
        <p>{data.location}</p>
        <p>{data.message}</p>
        <p>{data.weather}</p>
        <img src={data.src} alt={data.Imgdescript} width="200"></img>
      </>
    </Layout>
  );
};

export default Card;

export const getStaticProps = async ({ params }) => {
  const r = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/cards/?slug=${params.slug}`
  );
  const data = await r.json();

  return {
    props: {
      data: data.pop(),
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const r = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/cards?_limit=3&_sort=id:desc`
  );
  const data = await r.json();
  return {
    paths: data.map((card) => ({
      params: {
        slug: card.slug,
      },
    })),
    fallback: true,
  };
};
