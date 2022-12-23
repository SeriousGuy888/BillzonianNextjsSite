import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  excerpt?: string
  metadata: {
    title?: string
    date?: string
    image?: string
  }
}

export const readPostsData = () => {
  const postsDir = path.join(process.cwd(), "posts")
  const fileNames = fs.readdirSync(postsDir)

  const posts = fileNames.map((fileName): BlogPost => {
    const slug = fileName.replace(/.md$/g, "")
    const markdownWithMeta = fs.readFileSync(
      path.join(postsDir, fileName),
      "utf8",
    )

    function firstFourLines(file: any, options: any) {
      file.excerpt = file.content.slice(0, 200)
      return "i dont know why i need to return a string here"
    }

    const { data, excerpt } = matter(markdownWithMeta, {
      excerpt: firstFourLines,
    })

    return {
      slug,
      excerpt,
      metadata: JSON.parse(JSON.stringify(data)), // allows Date objects to be serialised
    }
  })

  return posts
}
