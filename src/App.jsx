import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./style";
import {
  Navbar,
  Hero,
  Education,
  SkillsAndExperience,
  ExtraCurricular,
  Footer,
  Projects,
  BlogPosts,
  Loading,
  Achievements,
} from "./components";

// 🌈 Import Exploding Beams Background
import { BackgroundBeamsWithCollision } from "./components/ui/shadcn-io/background-beams-with-collision";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-primary w-full overflow-hidden relative min-h-screen">
      <AnimatePresence>
        {isLoading ? (
          <Loading key="loading" />
        ) : (
          <motion.section
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.5 }}
          >
            {/* 🧭 Navbar */}
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Navbar />
              </div>
            </div>

            {/* 💫 Hero Section with Exploding Beams */}
            <div
              className={`bg-primary relative flex flex-col justify-center`}
              style={{ minHeight: "100vh" }}
            >
              {/* Background animation */}
              <BackgroundBeamsWithCollision className="absolute inset-0 -z-10" />

              {/* Hero content */}
              <div className={`${styles.boxWidth} relative z-20`}>
                <Hero />
              </div>
            </div>

            {/* ⚙️ Skills & Education */}
            <div
              className={`bg-primary ${styles.flexCenter} ${styles.paddingX}`}
            >
              <div className={`${styles.boxWidth}`}>
                <SkillsAndExperience />
                <Education />
              </div>
            </div>

            {/* 🏆 Achievements */}
            <Achievements />

            {/* 🚀 Projects & Extra Curricular */}
            <div
              className={`bg-primary ${styles.flexCenter} ${styles.paddingX}`}
            >
              <div className={`${styles.boxWidth}`}>
                <Projects />
                <ExtraCurricular />
              </div>
            </div>

            {/* 🦶 Footer */}
            <Footer />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
