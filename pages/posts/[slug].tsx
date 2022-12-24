import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { BlogPost, getAllPostSlugs, getPost } from "../../utils/posts"

const Post: NextPage<BlogPost> = ({ frontMatter, content }) => {
  return (
    <>
      <h1>{frontMatter.title}</h1>
      <article>{content}</article>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string

  return {
    props: getPost(slug),
    revalidate: 30,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllPostSlugs(),
    fallback: true,
  }
}

export default Post
