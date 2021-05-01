import styles from "./AddCard.module.css";
import { useState } from "react";


const AddCard = ({ onSubmit, handleSetLocation, weather}) => {
  const [location, setLocation] = useState(``);
  const [error, setError] = useState(``);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === ``) {
      setError(`Select a Location please`)
    } else {
      const data = {
        from: e.target.from.value,
        to: e.target.to.value,
        message: e.target.content.value,
        location: location,
        weather: weather,
        slug: `message-from-`+ e.target.from.value + `-in-` + location + `-` + Math.floor(Math.random() * 20000) + 1
      };

      e.target.reset();
      onSubmit(data);
    }
  };

  const handleOnClickSubmit = e => {
    e.preventDefault();

    setLocation(e.target.location.value)
    handleSetLocation(e);
  }

  return (
    <section>
      <h3>Message For Home</h3>
      <form onSubmit={e => handleOnClickSubmit(e)}>
        <div>
          <label className={styles.label}>
            Location:
            <input className="location" type="text" name="location" readOnly required />
             <p>{error}</p>
          </label>
          <input type="submit" value="Set Location" />
        </div>
      </form>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <input hidden value={location} readOnly/>
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
    </section>
  );
};

export default AddCard;
