import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ease } from "../config/animations";

export function TypewriterLoader({ onDone }) {
  const command = "npx react-native init rajat-resume...";
  const [text, setText] = useState("");
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let index = 0;
    let doneTimer;
    const interval = window.setInterval(() => {
      setText(command.slice(0, index));
      index += 1;
      if (index > command.length) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setExiting(true);
          doneTimer = window.setTimeout(onDone, 540);
        }, 620);
      }
    }, 38);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: exiting ? 0 : 1, y: exiting ? -18 : 0 }}
      transition={{ duration: 0.52, ease }}
    >
      <div className="loader-line" aria-label={command}>
        <span className="loader-prompt">~</span>
        <span>{text}</span>
        <span className="loader-cursor" />
      </div>
    </motion.div>
  );
}
