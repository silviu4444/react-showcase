import { useEffect, useRef, useState } from "react";

type UseHoverTrackHoverInterestProps = {
  interestedAfterMs: number;
};

const useTrackHoverInterest = ({
  interestedAfterMs
}: UseHoverTrackHoverInterestProps) => {
  const [elementNode, setElementNode] = useState<HTMLElement | null>(null);
  const [isInterested, setIsInterested] = useState(false);
  const timerRef = useRef<any>(null);

  const handleMouseEnter = (): void => {
    timerRef.current = setTimeout(() => {
      setIsInterested(true);
    }, interestedAfterMs);
  };

  const handleMouseLeave = (): void => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
    setIsInterested(false);
  };

  useEffect(() => {
    if (elementNode) {
      elementNode.addEventListener("mouseenter", handleMouseEnter);
      elementNode.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (elementNode) {
        elementNode.removeEventListener("mouseenter", handleMouseEnter);
        elementNode.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [elementNode]);

  const ref = (node: HTMLDivElement) => {
    setElementNode(node);
  };
  return { ref, isInterested };
};

export default useTrackHoverInterest;
