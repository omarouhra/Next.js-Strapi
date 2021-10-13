import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Link from "next/link";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog next strapi</title>
        <meta name='description' content='Omar Blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Hello World</h1>
      <h2>Strapi Demo</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <h2>{post.description}</h2>
          <Link href={`/${post.id}`}>read the blog</Link>
        </div>
      ))}
    </div>
  );
}
export async function getServerSideProps() {
  const posts = await axios.get("http://localhost:1337/posts");

  return {
    props: {
      posts: posts.data,
    },
  };
}
