import styles from "./AddCard.module.css";
import { useState } from "react";
import Link from "next/link";


const AddCard = ({ onSubmit, weather, location, imgDes, imgSrc, cards, weathericon, isday}) => {
  const [error, setError] = useState(``);  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (location === ``) {
      setError(`Select a Location please`)
    } else {
      console.log(weathericon);
      const data = {
        from: `${e.target.from.value}`,
        to: `${e.target.to.value}`,
        message: `${e.target.content.value}`,
        location: `${location}`,
        weather: `${weather}`,
        slug: `message-from-`+ e.target.from.value + `-in-` + location + `-` + Math.floor(Math.random() * 20000) + 1,
        src: `${imgSrc}`,
        imgdescript: `${imgDes}`,
        weathericon: `${weathericon}`,
        isday: `${isday}`
      };

      e.target.reset();
      onSubmit(data);
    }
  };

  return (
    <section>
      <h3>Message For Home</h3>
      <p>{error}</p>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <input hidden value={location} readOnly/>
          <label className={styles.label}>
            Location:
            <input className="location" type="text" name="location" value={location} readOnly required />
          </label>

        <label className={styles.label}>
          From:
          <input type="text" name="from" required />
        </label>
        <label className={styles.label}>
          To:
          <input type="text" name="to" required />
        </label>
        <label className={styles.label}>
          Message:
          <textarea name="content" required maxLength="500"></textarea>
        </label>
        <input type="submit" value="Send Post Card"/>
      </form>
      <Link href={`/cards/${cards[cards.length - 1].slug}`}><a>Last post card: {process.env.LINK}/cards/{cards[cards.length - 1].slug}</a></Link>
    </section>
  );
};

export default AddCard;