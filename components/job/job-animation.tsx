import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import jobAnimate from '@/public/job-finding.json';

export default function JobAnimation() {
  return (
    <div className="flex items-center justify-center flex-col mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-2xl font-bold text-center"
      >
        Start browsing for jobs
      </motion.div>
      <Player autoplay loop src={jobAnimate}></Player>
    </div>
  );
}
