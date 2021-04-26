import Layout from "../components/Layout";
import { useState } from "react";

const Subscribe = () => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const email = e.target.email.value;
    if (email) {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      const result = await r.json();
      if (!result.succeeded) {
        setError(result.reason);
      }
      setSuccess(true);
      setSending(false);
    }
  };

  const getForm = () => {
    if (error) {
      return <p>Whoeps, er ging iets mis: {error}</p>;
    }
    if (sending) {
      return <p>Aan het inschrijven...</p>;
    }
    if (success) {
      return <p>Je bent ingeschreven, welkom!</p>;
    }
    return (
      <form onSubmit={handleSubmit}>
        <label>
          e-mail:
          <input type="email" name="email" id="email" />
        </label>
        <input type="submit" value="Inschrijven" />
      </form>
    );
  };

  return (
    <Layout>
      <h2>Door het oog van de naald</h2>
      <p>Schrijf je in voor onze nieuwsbrief</p>
      {getForm()}
    </Layout>
  );
};

export default Subscribe;
