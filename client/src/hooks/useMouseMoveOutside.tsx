import { useEffect, useRef } from "react"

const useMouseMoveOutside = (condition: boolean, effect: () => void) => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if(elementRef.current && !elementRef.current.contains(e.target as Node)) {
        condition && effect();
      } 
    }

    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  },[condition, effect])

  return { elementRef }
}

export default useMouseMoveOutside;