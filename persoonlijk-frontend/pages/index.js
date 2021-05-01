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
  const [cards, setCards] = useState(data);

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

  const getLocation = () => {
    console.log(`klik`);
    const getCoordintes = () =>{
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
  
    const success = (pos)=> {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.warn(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
        return;
  
    }
  
    const error = (err)=> {
        console.log(`ERROR(${err.code}): ${err.message}`);
    }
  
    navigator.geolocation.getCurrentPosition(success, error, options);
}
  
// Step 2: Get city name
    const getCity = (coordinates) => {
        let xhr = new XMLHttpRequest();
        let lat = coordinates[0];
        let lng = coordinates[1];
      
        // Paste your LocationIQ token below.
        xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.22f3c538b9020272ffb667ec3f30797b&lat=" +
        lat + "&lon=" + lng + "&format=json", true);
        xhr.send();
        xhr.onreadystatechange = x => {
        let result = x.target;
          if(result.readyState == 4 && result.status == 200){         
              let response = JSON.parse(xhr.responseText);
              let city = response.address.city;
              console.log(city);
          }
        }
    }
      
    getCoordintes();
   }

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

  const handleSubmit = async (card) => {
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
      console.log(result);
      const tmp = [...cards, result];
      console.log(tmp);
      setCards(tmp);
    }
  }

  return (
    <Layout>
      <button onClick={getLocation}> klik hier voor je locatie</button>
      <img src={imgSrc} alt={imgDes} width="200"></img>
    <AddCard onSubmit={handleSubmit} handleSetLocation={handleSetLocation} location={location} weather={weather}/>
    </Layout>
    /*<div className={styles.grid}>
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

/*export const getStaticProps = async () => {
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
};*/
