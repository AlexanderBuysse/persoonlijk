import Layout from "../components/Layout";
import { useState } from "react";

const Weather = () => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const getWeather = async (e) => {
      const r = await fetch("/api/weather", {
        method: "POST",
        body: "Kortrijk"
      });
      const result = await r.json();
      if (!result.succeeded) {
        setError(result.reason);
      }

      console.log(result);
  };

  return (
    <Layout>
      <h2>Door het oog van de naald</h2>
      <p onClick={e => getWeather(e)}>Schrijf je in voor onze nieuwsbrief</p>
    </Layout>
  );
};

export default Weather;
