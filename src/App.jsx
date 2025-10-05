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

import BackgroundParticles from "./components/BackgroundParticles.jsx";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-primary w-full overflow-hidden">
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
            {/* Navbar */}
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Navbar />
              </div>
            </div>

            {/* Hero Section with Particles */}
            <div
              className={`bg-primary ${styles.flexStart} relative`}
              style={{ minHeight: "100vh" }} // full-screen hero
            >
              <BackgroundParticles /> {/* animated background */}
              <div className={`${styles.boxWidth}`}>
                <Hero />
              </div>
            </div>

            {/* Skills + Education */}
            <div
              className={`bg-primary ${styles.flexCenter} ${styles.paddingX}`}
            >
              <div className={`${styles.boxWidth}`}>
                <SkillsAndExperience />
                <Education />
              </div>
            </div>

            {/* Achievements */}
            <Achievements />

            {/* Projects + Extra Curricular */}
            <div
              className={`bg-primary ${styles.flexCenter} ${styles.paddingX}`}
            >
              <div className={`${styles.boxWidth}`}>
                <Projects />
                <ExtraCurricular />
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
