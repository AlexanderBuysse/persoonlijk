import Comments from "../../components/Comments";
import Layout from "../../components/Layout";
import { useState } from "react";
import AddComment from "../../components/AddComment";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";

const Article = ({ data }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  const [comments, setComments] = useState(data.comments);

  const handleSubmit = async (comment) => {
    comment.article = data.id;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/comments/`,
      {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const result = await response.json();
      const tmp = [...comments, result];
      setComments(tmp);
    }
  };

  return (
    <Layout>
      <>
        <h2>{data.title}</h2>
        <ReactMarkdown source={data.content} escapeHtml={false} />
        <Comments comments={comments} />
        <AddComment onSubmit={handleSubmit} />
      </>
    </Layout>
  );
};

export default Article;

export const getStaticProps = async ({ params }) => {
  const r = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/?slug=${params.slug}`
  );
  const data = await r.json();

  return {
    props: {
      data: data.pop(), // The pop() method in JavaScript removes the last element of an array and returns that element. It will remove an item from the end of an array and return that item.
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const r = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?_limit=3&_sort=id:desc`
  );
  const data = await r.json();

  return {
    paths: data.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: true,
  };
};
