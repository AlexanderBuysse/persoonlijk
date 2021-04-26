const Comments = ({ comments = [] }) => {
  return (
    <section>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.name}</strong>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Comments;
