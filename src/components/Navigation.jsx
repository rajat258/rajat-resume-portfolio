import { motion } from "framer-motion";
import { ease } from "../config/animations";
import { navItems, profile } from "../data/resume";

export function Navigation({ ready }) {
  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: -18 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
      transition={{ duration: 0.72, ease }}
    >
      <a className="brand" href="#hero">
        {profile.handle} / portfolio
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <motion.a
            key={item.href}
            href={item.href}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.22, ease }}
          >
            {item.label}
          </motion.a>
        ))}
      </nav>
    </motion.header>
  );
}
