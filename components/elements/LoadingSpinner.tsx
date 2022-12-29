import styles from "../../styles/LoadingSpinner.module.scss"
import { motion } from "framer-motion"
import { LogoNoFill } from "../logos"
import { NextPage } from "next"

const LoadingSpinner: NextPage<{ width?: string; height?: string }> = ({
  width,
  height,
}) => {
  return (
    <div className={styles.loadingContainer}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          ease: "easeIn",
        }}
      >
        <LogoNoFill width={width ?? "100%"} height={height ?? "100%"} />
        <h3>Loading...</h3>
      </motion.span>
    </div>
  )
}

export default LoadingSpinner
