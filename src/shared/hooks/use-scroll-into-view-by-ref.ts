import { useEffect, useState } from "react";

type Props = {
  scrollBehavior?: ScrollBehavior;
  enabled?: boolean;
};

const useScrollIntoViewByRef = (props?: Props) => {
  const [elementNode, setElementNode] = useState<HTMLElement | null>(null);

  const ref = (node: HTMLDivElement) => {
    setElementNode(node);
  };

  useEffect(() => {
    if (typeof props?.enabled === "boolean" && !props.enabled) {
      return;
    }

    elementNode?.scrollIntoView({
      behavior: props?.scrollBehavior || "smooth"
    });
  }, [elementNode]);

  return { ref };
};

export default useScrollIntoViewByRef;
