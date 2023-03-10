import Head from "next/head";
import { PostCard, Footer, About, Categories, PostWidget } from "../components";
import { getPosts } from "../services";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";
import styles from "../styles";

export default function Home({ posts, index }) {
  return (
    <>
      <div className="">
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="">
          <About />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`${styles.innerWidth} grid grid-cols-1 lg:grid-cols-1 gap-12`}
        >
          <motion.div
            variants={fadeIn("up", "spring", index * 0.25, 1.5)}
            className="lg:col-span-1 col-span-1 m-20 max-md:m-0"
          >
            {posts.map((post, index) => (
              <PostCard post={post.node} key={index} {...post} index={index} />
            ))}
          </motion.div>
        </motion.div>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
