import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import AddCard from "../components/AddCard";


export default function Home({ data }) {
  const [imgSrc, setImgSrc] = useState();
  const [imgDes, setImgDes] = useState(`placeholder`);
  const [weather, setWeather] = useState(``);
  const [isday, setIsDay] = useState(`unknown`);

  const getWeather = async (text) => {
      const r = await fetch("/api/weather", {
        method: "POST",
        body: `${text}`
      });
      const result = await r.json();
      //console.log(result.result.current.is_day);

      setWeather(result.result.current.condition.text);
      setIsDay(result.result.current.is_day);
  };


  const getPhoto = async (text) => {
      const r = await fetch("/api/unsplash", {
        method: "POST",
        body: `${text} ${weather}`
      });
      const result = await r.json();

      setImgDes(result.results[0].description);
      setImgSrc(result.results[0].urls.small);
  };

  const handleSetLocation = e => {
    e.preventDefault();
    //console.log(e.target.name.value);
    getPhoto(e.target.name.value);
    getWeather(e.target.name.value);
    //console.log(isday);
    //console.log(weather);
    e.target.reset();
  }

  const handleSubmit = (card) => {
    console.log(card);

  }

  return (
    <Layout>
      <img src={imgSrc} alt={imgDes}></img>
      <form onSubmit={(e) => handleSetLocation(e)} className={styles.form}>
        <label className={styles.label}>
          Location:
          <input type="text" name="name" required />
        </label>
        <input type="submit" value="Set Location" />
      </form>
    <AddCard onSubmit={handleSubmit} />
    </Layout>
    /*       <div className={styles.grid}>
        {data.map((article) => (
          <Link key={article.id} href={`/cards/${card.slug}`}>
            <a className={styles.card}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </a>
          </Link>
        ))}
      </div>*/
  );
}

export const getStaticProps = async () => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/cards?_sort=id:desc`
  );
  const data = await resp.json();

  return {
    props: {
      data,
    },
  };
};
