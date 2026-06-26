import { motion } from "framer-motion";
import { ease } from "../config/animations";
import { contributionCells } from "../data/resume";

export function ContributionGraph({ ready }) {
  return (
    <div className="contribution-graph" aria-label="Contribution activity">
      {contributionCells.map((level, index) => (
        <motion.span
          key={index}
          className={`level-${level}`}
          initial={{ opacity: 0.2, scale: 0.72 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0.2, scale: 0.72 }}
          transition={{ delay: 0.46 + index * 0.015, duration: 0.38, ease }}
        />
      ))}
    </div>
  );
}
