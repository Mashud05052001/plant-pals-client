"use client";
import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

type TProps = {
  children: ReactNode;
  className?: string;
};

const MotionOpacityContainer = ({ children, className }: TProps) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default MotionOpacityContainer;
