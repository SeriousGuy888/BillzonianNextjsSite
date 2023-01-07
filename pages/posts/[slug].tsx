import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import {
  BlogPost,
  getAllPostSlugs,
  getPostBySlug,
  markdownToHtml,
} from "../../utils/posts"

const Post: NextPage<BlogPost> = ({ title, content }) => {
  return (
    <>
      <h1>{title ?? "Untitled Post"}</h1>
      <article dangerouslySetInnerHTML={{ __html: content ?? "" }} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string
  const postData = getPostBySlug(slug)
  const content = await markdownToHtml(postData.content || "")

  return {
    props: { ...postData, content },
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
