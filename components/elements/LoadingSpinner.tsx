import styles from "../../styles/LoadingSpinner.module.scss"
import { motion } from "framer-motion"
import { LogoNoFill } from "../logos"
import { NextPage } from "next"

const LoadingSpinner: NextPage<{ width?: string; height?: string }> = ({
  width,
  height,
}) => {
  return (
    <motion.div
      className={styles.loadingContainer}
      initial={{ opacity: 0.25 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.1,
        ease: "easeInOut",
      }}
      style={{
        width,
        height,
      }}
    >
      <LogoNoFill width={width ?? "100%"} height={height ?? "100%"} />
    </motion.div>
  )
}

export default LoadingSpinner
