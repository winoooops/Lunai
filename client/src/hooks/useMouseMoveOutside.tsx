import { useEffect, useRef } from "react"

const useMouseMoveOutside = (condition: boolean, effect: () => void, isAutoHide: boolean) => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(!isAutoHide) return;

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