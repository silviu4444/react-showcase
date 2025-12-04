import { useEffect, useState } from "react";
import useScrollToPosition from "./use-scroll-to-position";

type Props = {
  scrollBehavior?: ScrollBehavior;
  position?: number;
};

const useScrollRestore = (props?: Props) => {
  const [elementNode, setElementNode] = useState<HTMLElement | null>(null);
  const { scrollToPosition, resetScrollValue, scrollPosition } =
    useScrollToPosition({
      elementNode,
      scrollBehavior: props?.scrollBehavior || "instant",
      defaultScrollValue: props?.position
    });

  const ref = (node: HTMLDivElement) => {
    setElementNode(node);
  };

  useEffect(() => {
    elementNode && scrollToPosition({ top: props?.position });
  }, [elementNode]);

  return { ref, resetScrollValue, scrollPosition };
};

export default useScrollRestore;
