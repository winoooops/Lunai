import { useEffect } from "react";

const useMouseNearEdge = (condition: boolean, threshold: number, effect: () => void, direction: "left" | "right" = "left") => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if((direction === "left" && e.clientX < threshold) || (direction === "right" && e.clientX > window.innerWidth - threshold)) {
        condition && effect();
      }
    } 

    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [condition, threshold, effect]);
}

export default useMouseNearEdge;