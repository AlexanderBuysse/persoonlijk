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
  const [location, setLocation] = useState();
  const [isday, setIsDay] = useState(`unknown`);

  const getWeather = async (text) => {
      const r = await fetch("/api/weather", {
        method: "POST",
        body: `${text}`
      });
      const result = await r.json();
      //console.log(result.result.current.is_day);
      console.log(text);
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
    console.log(e.target);
    setLocation(e.target.location.value)
    getPhoto(e.target.location.value);
    getWeather(e.target.location.value);
  }

  const handleSubmit = (card) => {
    console.log(card);
  }

  return (
    <Layout>
      <img src={imgSrc} alt={imgDes}></img>
    <AddCard onSubmit={handleSubmit} handleSetLocation={handleSetLocation} location={location} weather={weather}/>
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
