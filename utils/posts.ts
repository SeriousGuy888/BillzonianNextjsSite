import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { SearchableItem } from "../pages/api/search"
import { remark } from "remark"
import remarkHtml from "remark-html"

// export interface BlogPost {
//   slug: string
//   frontMatter: FrontMatter
//   content?: string
// }

interface FrontMatter {
  title?: string
  date?: string
  image?: string
  excerpt?: string
  tags?: string[]
}

const postsDir = path.resolve("posts")

const getSlug = (fileName: string) => fileName.replace(/\.md$/, "")
const getPostFileNames = () => {
  return fs.readdirSync(postsDir)
}

const goodifyFrontMatter = (frontMatter: FrontMatter) =>
  JSON.parse(JSON.stringify(frontMatter))

export const getAllPostSlugs = (): { params: { slug: string } }[] => {
  const fileNames = getPostFileNames()
  return fileNames.map((fileName) => ({
    params: {
      slug: getSlug(fileName),
    },
  }))
}

export const getAllPosts = (fields: string[]) => {
  const fileNames = getPostFileNames()

  return fileNames
    .map((fileName) => getPostByFileName(fileName, fields))
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export const getPostByFileName = (
  fileName: string,
  fieldsNeeded: string[] = [],
) => {
  const fileContents = fs.readFileSync(path.join(postsDir, fileName))
  const { data, content } = matter(fileContents)

  const frontMatter = goodifyFrontMatter(data)

  const outputData: { [key: string]: string } = {}
  fieldsNeeded.forEach((field) => {
    if (field === "slug") {
      outputData[field] = getSlug(fileName)
    }
    if (field === "content") {
      outputData[field] = content
    }

    if (typeof frontMatter[field] !== "undefined") {
      outputData[field] = frontMatter[field]
    }
  })

  return outputData
}

export const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(remarkHtml).process(markdown)
  return result.toString()
}

export const getAllPostsAsSearchables = (): SearchableItem[] => {
  const posts = getAllPosts(["excerpt", "tags", "title", "slug"])
  const searchables: SearchableItem[] = []

  posts.forEach((post) => {
    const { excerpt, tags, title } = post
    const searchableText = `${post.slug} ${excerpt ?? ""} ${tags ?? ""} ${
      title ?? ""
    }`.toLowerCase()

    searchables.push({
      linkPath: `/posts/${post.slug}`,
      title: title ?? "Untitled Post",
      searchableText,
    })
  })

  return searchables
}
