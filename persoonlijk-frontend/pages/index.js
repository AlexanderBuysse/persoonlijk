import Head from "next/head";
import Layout from "../components/Layout";
import Location from "../components/Location";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import AddCard from "../components/AddCard";
import LocationDetial from "../components/LocationDetail";
import Image from 'next/image'

export default function Home({ data }) {
  const [imgSrc, setImgSrc] = useState(`/../public/assets/placeholder.jpeg`);
  const [imgDes, setImgDes] = useState(`placeholder`);
  const [weather, setWeather] = useState(``);
  const [weatherResult, setWeatherResult] = useState();  
  const [location, setLocation] = useState(``);
  const [cards, setCards] = useState(data);
  const [error, setError] = useState();

  const getWeather = async (text) => {
    console.log(text);
      const r = await fetch("/api/weather", {
        method: "POST",
        body: `${text}`
      });
      const result = await r.json();
       setWeatherResult(result);
      setWeather(result.result.current.condition.text);
  };

  const getPhoto = async (text) => {
    console.log(text);
      const r = await fetch("/api/unsplash", {
        method: "POST",
        body: `${text} ${weather}`
      });
      const result = await r.json();

      setImgDes(result.results[0].description);
      setImgSrc(result.results[0].urls.small);
  };

  const handleSubmit = async (card) => {
    console.log(card);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/cards/`,
      {
        method: "POST",
        body: JSON.stringify(card),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const result = await response.json();
      const tmp = [...cards, result];
      setCards(tmp);
    }
  }

  return (
    <Layout>
      <div className={styles.flex}>
        <div>
          <div className={styles.imageright}>
            <Image src={imgSrc} alt={imgDes} width="200" height="300"/>
          </div>
          <Location error={error} setError={setError} location={location} setLocation={setLocation} getWeather={getWeather} getPhoto={getPhoto}/>
        </div>
        <LocationDetial weatherResult={weatherResult}/>
      </div>
      <AddCard onSubmit={handleSubmit} location={location} weather={weather} imgDes={imgDes} imgSrc={imgSrc} cards={cards}/>
    </Layout>
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

/*export const getStaticPaths = async () => {
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
};*/