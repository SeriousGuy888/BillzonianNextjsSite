import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import ArticleHeader from "../../modules/articles/ArticleHeader"
import {
  BlogPost,
  getAllPostSlugs,
  getPostBySlug,
  markdownToHtml,
} from "../../utils/posts"

const Post: NextPage<BlogPost> = (post) => {
  return (
    <>
      <ArticleHeader post={post} />
      <article dangerouslySetInnerHTML={{ __html: post.content ?? "" }} />
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
