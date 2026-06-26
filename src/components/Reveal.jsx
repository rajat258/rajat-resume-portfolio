import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease, revealStates } from "../config/animations";

export function Reveal({
  children,
  className = "",
  delay = 0,
  amount = 0.18,
  ready = true,
  variant = "rise",
  eager = false,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount, margin: "0px 0px -12% 0px" });
  const states = revealStates[variant] || revealStates.rise;
  const visible = ready && (eager || isInView);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={states.hidden}
      animate={visible ? states.visible : states.hidden}
      transition={{ duration: 0.82, delay: visible ? delay : 0, ease }}
    >
      {children}
    </motion.div>
  );
}
