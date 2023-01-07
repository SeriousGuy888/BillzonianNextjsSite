import { NextPage } from "next"
import { BlogPost } from "../../utils/posts"
import styles from "./ArticleHeader.module.scss"

const ArticleHeader: NextPage<{ post: BlogPost }> = ({
  post: { title, date, tags },
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftCol}>
        <h3 className={styles.title}>{title ?? "Untitled Post"}</h3>
        <p className={styles.date}>{date?.split("T")[0] ?? ""}</p>
      </div>
      <div className={styles.tags}>
        {(tags ?? []).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default ArticleHeader
