import Head from "next/head";
// import Layout, { siteTitle } from "../components/layout";
// import utilStyles from "../styles/utils.module.css";
// import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
// import Date from "../components/date";
import { getPosts } from "../lib/api";

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export async function getServerSideProps(ctx) {
  let posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  console.log(posts)
  return (
    <div className={styles.container}>
      <Head>
        <title>CMS blog</title>
        <meta name="description" content="CMS Wordpress with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {posts.map((post, index) => (
          <div key={index}>
            <Link href={`/posts/${post.node.id}`}>
              <a style={{ color: "blue" }}>{post.node.title}</a>
            </Link>

            <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />

            <p>By {post.node.author.node.name}</p>
          </div>
        ))}
      </main>

      <footer className={styles.footer}>
        <p>Posts</p>
      </footer>
    </div>
  );
  // return (
  //   <Layout home>
  //     <Head>
  //       <title>{siteTitle}</title>
  //     </Head>
  //     <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
  //       <h2 className={utilStyles.headingLg}>Blog</h2>
  //       <ul className={utilStyles.list}>
  //         {allPostsData.map(({ id, date, title }) => (
  //           <li className={utilStyles.listItem} key={id}>
  //             <Link href={`/posts/${id}`}>
  //               <a>{title}</a>
  //             </Link>
  //             <br />
  //             <small className={utilStyles.lightText}>
  //               <Date dateString={date} />
  //             </small>
  //           </li>
  //         ))}
  //       </ul>
  //     </section>
  //   </Layout>
  // );
}
