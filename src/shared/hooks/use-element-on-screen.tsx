import { useEffect, useState } from "react";

type Props = { options: IntersectionObserverInit };

const useElementOnScreen = (props?: Props) => {
  const [elementNode, setElementNode] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const ref = (node: HTMLDivElement) => {
    setElementNode(node);
  };

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, props?.options);

    if (elementNode) {
      observer.observe(elementNode);
    }

    return () => {
      if (elementNode) {
        observer.unobserve(elementNode);
      }
    };
  }, [elementNode, props?.options]);

  return { ref, isVisible };
};

export default useElementOnScreen;
