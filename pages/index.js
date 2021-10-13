import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home({ posts, categories }) {
  const [filter, setFilter] = useState(1);

  let projects = posts.filter(post => post.category.id === filter);
  const setprojects = id => {
    setFilter(id);
  };

  const transition = { duration: 0.7, ease: [0.4, 0.13, 0.23, 0.9] };

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog next strapi</title>
        <meta name='description' content='Omar Blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Hello World</h1>
      <h2>Strapi Demo</h2>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => {
            setFilter(cat.id);
          }}>
          {cat.name}
        </button>
      ))}
      {projects.map(post => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: transition,
          }}
          key={post.id}>
          <h1>{post.title}</h1>
          <h2>{post.description}</h2>
          <Link href={`/${post.id}`}>see more</Link>
        </motion.div>
      ))}
    </div>
  );
}
export async function getServerSideProps() {
  const posts = await axios.get("http://localhost:1337/posts");
  const categories = await axios.get("http://localhost:1337/categories");

  return {
    props: {
      posts: posts.data,
      categories: categories.data,
    },
  };
}
