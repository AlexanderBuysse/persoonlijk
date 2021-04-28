import styles from "./AddCard.module.css";

const AddCard = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      from: e.target.from.value,
      to: e.target.to.value,
      content: e.target.content.value,
    };

    e.target.reset();
    onSubmit(data);
  };

  return (
    <section>
      <h3>Message For Home</h3>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
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
        <input type="submit" value="Send"/>
      </form>
    </section>
  );
};

export default AddCard;
