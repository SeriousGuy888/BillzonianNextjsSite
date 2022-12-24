import fs from "fs"
import path from "path"
import matter from "gray-matter"

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

const dirName = "posts"

const getSlug = (fileName: string) => fileName.replace(/\.md$/, "")

const goodifyFrontMatter = (frontMatter: FrontMatter) =>
  JSON.parse(JSON.stringify(frontMatter))

export const getAllPostSlugs = (): { params: { slug: string } }[] => {
  const fileNames = fs.readdirSync(dirName)
  return fileNames.map((fileName) => ({
    params: {
      slug: getSlug(fileName),
    },
  }))
}

export const getPosts = (): BlogPost[] => {
  const fileNames = fs.readdirSync(dirName)

  return fileNames.map((fileName) => {
    const slug = getSlug(fileName)
    const readFiles = fs.readFileSync(path.join(dirName, fileName))
    const { data } = matter(readFiles)

    return {
      slug,
      frontMatter: goodifyFrontMatter(data),
    }
  })
}

export const getPost = (slug: string): BlogPost => {
  const file = fs.readFileSync(path.join(dirName, `${slug}.md`))
  const { data, content } = matter(file)

  return {
    slug,
    frontMatter: goodifyFrontMatter(data),
    content
  }
}
