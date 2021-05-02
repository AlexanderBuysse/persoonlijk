import Layout from "../../components/Layout";
import LocationDetial from "../../components/LocationDetail";
import Image from 'next/image'

import { useRouter } from "next/router";
import styles from "../../components/AddCard.module.css";
import style from "../../styles/Home.module.css"


const Card = ({ data }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading...</p>;
  }
  console.log(process.env.LINK_HOME);

  return (
    <Layout>
      <>
      <section>
      <h3>Greetings from {data.location}</h3>
      <div className={style.flex}>
        <div className={style.imageright}>
          <Image className={style.border} src={data.src} alt={data.Imgdescript} width="200" height="300"/>
        </div>
        <LocationDetial weathericon={data.weathericon} isday={data.isday} weather={data.weather}/>
      </div>
      
      <form className={styles.form}>
          <label className={styles.label}>
            Location:
            <input className="location" type="text" name="location" value={data.location} readOnly required />
          </label>

        <label className={styles.label}>
          From:
          <input readOnly type="text" value={data.from} name="from" required />
        </label>
        <label className={styles.label}>
          To:
          <input readOnly type="text" value={data.to} name="to" required />
        </label>
        <label className={styles.label}>
          Message:
          <textarea readOnly name="content" required maxLength="500" value={data.message}></textarea>
        </label>
      </form>
      <p>Link of card-- {process.env.LINK_HOME}/cards/{data.slug}</p>
      </section>
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
