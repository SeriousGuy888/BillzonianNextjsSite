import { GetStaticProps, NextPage } from "next/types"
import { BlogPost, readPostsData } from "../../utils/posts"
import styles from "../../styles/Posts.module.scss"
import Link from "next/link"

interface PageProps {
  posts: BlogPost[]
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
              <h3 className={styles.title}>{post.metadata.title}</h3>

              {post.metadata.date && (
                <p className={styles.date}>
                  {post.metadata.date.split("T")[0]}
                </p>
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

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const posts = readPostsData()

  return {
    props: {
      posts,
    },
  }
}

export default Posts
