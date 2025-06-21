import { useEffect, useRef, useState } from 'react';

const useResponsiveWidth = (breakpoint: number = 768) => {
  const [isMobileSize, setIsMobileSize] = useState(window.innerWidth <= breakpoint);
  const prevWidth = useRef(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currWidth = window.innerWidth;
      
      // Only trigger re-render when crossing the breakpoint threshold
      if (currWidth <= breakpoint && prevWidth.current > breakpoint) {
        setIsMobileSize(true);
      } else if (currWidth > breakpoint && prevWidth.current <= breakpoint) {
        setIsMobileSize(false);
      }
      
      prevWidth.current = currWidth;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobileSize;
};

export default useResponsiveWidth; 