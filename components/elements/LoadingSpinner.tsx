import styles from "../../styles/LoadingSpinner.module.scss"
import { motion, } from "framer-motion"
import { LogoNoFill } from "../logos"

function LoadingSpinner() {
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
    >
      <LogoNoFill width={"100%"} height={"100%"} />
    </motion.div>
  )
}

export default LoadingSpinner
