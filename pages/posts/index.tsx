import { GetStaticProps, NextPage } from "next/types"
import { BlogPost, getAllPostMetadata } from "../../utils/posts"
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
              <h3>{post.frontMatter.title}</h3>

              {post.frontMatter.date && (
                <p className={styles.date}>
                  {post.frontMatter.date.split("T")[0]}
                </p>
              )}
            </div>

            {post.frontMatter.excerpt && (
              <>
                <hr />
                <p className={styles.excerpt}>{post.frontMatter.excerpt}</p>
              </>
            )}
          </div>
        </Link>
      ))}
    </section>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const posts = getAllPostMetadata()

  return {
    props: {
      posts,
    },
  }
}

export default Posts
