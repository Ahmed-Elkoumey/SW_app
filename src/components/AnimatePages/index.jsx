import { motion } from "framer-motion";
import React from "react";

export default function AnimatedPages({ childern }) {
  return (
    <motion.main
      initial={{ opacity: 0.5 ,x: 600,}}
      animate={{
         //translateX
        opacity: 1,
        // rotate: 360,
      }}
      transition={{ duration: 2, type: "spring", stiffness: 60 }}
    >
      {childern}
    </motion.main>
  );
}
