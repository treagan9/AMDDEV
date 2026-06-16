// src/components/shared/FadeSection.jsx
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

export var fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

function FadeSection({ children, ...props }) {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      {...props}
    >
      {children}
    </MotionBox>
  );
}

export default FadeSection;
