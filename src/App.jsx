import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GlobalStyles } from './components/UI';
import { LoadingScreen, Hero, PhotoSection, Message, Details, Closing } from './components/Sections';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <GlobalStyles />
      <AnimatePresence>{loading && <LoadingScreen onComplete={() => setLoading(false)} />}</AnimatePresence>

      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full text-stone-800"
        >
          <Hero />
          <PhotoSection />
          <Message />
          <Details />
          <Closing />
        </motion.main>
      )}
    </>
  );
}
