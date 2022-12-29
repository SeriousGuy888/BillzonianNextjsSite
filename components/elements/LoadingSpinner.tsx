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
        
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.1,
          ease: "easeInOut",
        }}
      >
        <LogoNoFill width={width ?? "100%"} height={height ?? "100%"} />
      </motion.span>
      <h3>Loading...</h3>
    </div>
  )
}

export default LoadingSpinner
