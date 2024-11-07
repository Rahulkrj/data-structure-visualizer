import React from 'react';
import { Box } from '@mui/material';
import { motion } from "framer-motion";

export default function SquarBox({text, height, selected, secondorySelected, children}) {

  const style = () => {
    const s = {
      height: height,
      width: height, // Since it's a square, width is the same as height
      border: '2px solid black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',
      backgroundColor: 'lightgray',
  }
  if (selected) {
    s.backgroundColor = 'red';
    s.border = '2px solid white';
    s.color = 'white';
  } else if (secondorySelected) {
    s.backgroundColor = 'blue';
    s.border = '2px solid white';
    s.color = 'white';
    s.animation= 'blink 0.5s infinite'
  }
  return s;
  }
  

  return (
    <motion.div
        className="container"
        whileHover={{ scale: 1, rotate: 360 }}
        whileTap={{ scale: 0.8, rotate: -180, borderRadius: "100%" }}
        >
            <Box
                sx={style}
            >
        <h1>{text}</h1>
    </Box>
    </motion.div>
  );
}