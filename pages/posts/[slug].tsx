import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { getAllPostSlugs, getPostByFileName } from "../../utils/posts"

const Post: NextPage<{ [key: string]: string }> = ({ title, content }) => {
  return (
    <>
      <h1>{title ?? "Untitled Post"}</h1>
      <article>{content}</article>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string

  return {
    props: getPostByFileName(slug + ".md", ["title", "content"]),
    revalidate: 120,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllPostSlugs(),
    fallback: true,
  }
}

export default Post
