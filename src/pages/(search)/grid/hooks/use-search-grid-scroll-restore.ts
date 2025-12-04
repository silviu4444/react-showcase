import useScrollRestore from "@/shared/hooks/use-scroll-restore";
import { useEffect } from "react";
import { useSearchGridScrollPosition } from "./use-search-grid-scroll-position";

const useSearchGridScrollRestore = () => {
  const { position, setScrollPosition } = useSearchGridScrollPosition();
  const { ref, scrollPosition } = useScrollRestore({
    position: position,
    scrollBehavior: "instant"
  });

  useEffect(() => {
    setScrollPosition(scrollPosition);
  }, [scrollPosition]);

  return { ref };
};

export default useSearchGridScrollRestore;
