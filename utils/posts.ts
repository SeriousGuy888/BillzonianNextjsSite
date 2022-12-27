import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { SearchableItem } from "../pages/api/search"

export interface BlogPost {
  slug: string
  frontMatter: FrontMatter
  content?: string
}

interface FrontMatter {
  title?: string
  date?: string
  image?: string
  excerpt?: string
  tags?: string[]
}

const postsDir = path.resolve("posts")

const getSlug = (fileName: string) => fileName.replace(/\.md$/, "")

const goodifyFrontMatter = (frontMatter: FrontMatter) =>
  JSON.parse(JSON.stringify(frontMatter))

export const getAllPostSlugs = (): { params: { slug: string } }[] => {
  const fileNames = fs.readdirSync(postsDir)
  return fileNames.map((fileName) => ({
    params: {
      slug: getSlug(fileName),
    },
  }))
}

export const getAllPostMetadata = (): BlogPost[] => {
  const fileNames = fs.readdirSync(postsDir)

  return fileNames.map((fileName) => {
    const slug = getSlug(fileName)
    const readFiles = fs.readFileSync(path.join(postsDir, fileName))
    const { data } = matter(readFiles)

    return {
      slug,
      frontMatter: goodifyFrontMatter(data),
    }
  })
}

export const getPost = (slug: string): BlogPost => {
  const file = fs.readFileSync(path.join(postsDir, `${slug}.md`))
  const { data, content } = matter(file)

  return {
    slug,
    frontMatter: goodifyFrontMatter(data),
    content,
  }
}

export const getAllPostsAsSearchables = (): SearchableItem[] => {
  const posts = getAllPostMetadata()
  const searchables: SearchableItem[] = []

  posts.forEach((post) => {
    const { excerpt, tags, title } = post.frontMatter
    const searchableText = `${post.slug} ${excerpt ?? ""} ${
      tags?.join(" ") ?? ""
    } ${title ?? ""}`.toLowerCase()

    searchables.push({
      linkPath: `/posts/${post.slug}`,
      title: title ?? "Untitled Post",
      searchableText,
    })
  })

  return searchables
}
