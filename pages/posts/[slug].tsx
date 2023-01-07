import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import {
  getAllPostSlugs,
  getPostByFileName,
  markdownToHtml,
} from "../../utils/posts"

const Post: NextPage<{ [key: string]: string }> = ({ title, content }) => {
  return (
    <>
      <h1>{title ?? "Untitled Post"}</h1>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string
  const postData = getPostByFileName(slug + ".md", ["title", "content"])
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
