import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { SearchableItem } from "../pages/api/search"
import { remark } from "remark"
import remarkHtml from "remark-html"

export interface BlogPost {
  slug: string
  content?: string
  title?: string
  date?: string
  image?: string
  excerpt?: string
  tags?: string[]
  [key: string]: any
}

const postsDir = path.resolve("posts")

const getSlug = (fileName: string) => fileName.replace(/\.md$/, "")
const getPostFileNames = () => {
  return fs.readdirSync(postsDir)
}

const goodifyFrontMatter = (frontMatter: { [key: string]: any }) =>
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
    .sort((a, b) => ((a.date ?? 0) > (b.date ?? 0) ? -1 : 1))
}

export const getPostBySlug = (slug: string) => getPostByFileName(slug + ".md")

const getPostByFileName = (fileName: string, fieldsNeeded: string[] = []) => {
  const fileContents = fs.readFileSync(path.join(postsDir, fileName))

  const { data, content } = matter(fileContents)
  const frontMatter = goodifyFrontMatter(data)

  let outputData: BlogPost = {
    slug: getSlug(fileName),
  }

  if (fieldsNeeded.length === 0) {
    outputData = { ...outputData, ...frontMatter, content }
  } else {
    fieldsNeeded.forEach((field) => {
      if (field === "content") {
        outputData[field] = content
      }

      if (typeof frontMatter[field] !== "undefined") {
        outputData[field] = frontMatter[field]
      }

      if (field === "tags" && !(frontMatter[field] instanceof Array)) {
        console.warn(`BlogPost \`${fileName}\` tags are not an array!`)
        outputData[field] = undefined
      }
    })
  }

  return outputData
}

export const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(remarkHtml).process(markdown)
  return result.toString()
}

export const getAllPostsAsSearchables = (): SearchableItem[] => {
  const posts = getAllPosts(["excerpt", "tags", "title"])
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
