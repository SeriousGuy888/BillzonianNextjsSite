import { GetStaticProps, NextPage } from "next/types"
import { getAllPosts } from "../../utils/posts"
import styles from "../../styles/Posts.module.scss"
import Link from "next/link"

interface PageProps {
  posts: { [key: string]: string }[]
}

const Posts: NextPage<PageProps> = ({ posts }) => {
  return (
    <section className={styles.postGrid}>
      {posts.map((post) => (
        <Link
          key={post.slug}
          className={styles.cardContainer}
          href={`/posts/${post.slug}`}
        >
          <div className={styles.card}>
            <div>
              <h3>{post.title}</h3>

              {post.date && (
                <p className={styles.date}>{post.date.split("T")[0]}</p>
              )}
            </div>

            {post.excerpt && (
              <>
                <hr />
                <p className={styles.excerpt}>{post.excerpt}</p>
              </>
            )}
          </div>
        </Link>
      ))}
    </section>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = getAllPosts(["title", "date", "slug", "excerpt"])

  return {
    props: { posts },
  }
}

export default Posts
