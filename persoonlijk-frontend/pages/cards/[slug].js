import Comments from "../../components/Comments";
import Layout from "../../components/Layout";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";

const Card = ({ data }) => {
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
      </>
    </Layout>
  );
};

export default Card;

export const getStaticProps = async ({ params }) => {
  const r = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/cards/?slug=${params.slug}`
  );
  const data = await r.json();

  return {
    props: {
      data: data.pop(),
    },
    revalidate: 1,
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
};
