import { useEffect, useState } from "react";
import { debounceFn } from "../utils/debounce.utils";

type Props = {
  scrollBehavior?: ScrollBehavior;
  elementNode: HTMLElement | null;
  defaultScrollValue?: number;
};

type scrollToPositionProps = {
  top?: number;
  left?: number;
  scrollBehavior?: ScrollBehavior;
};

type ResetScrollValueProps = {
  scrollBehavior?: ScrollBehavior;
  scrollBackToTop?: boolean;
};

const useScrollToPosition = ({
  elementNode,
  scrollBehavior = "instant",
  defaultScrollValue = 0
}: Props) => {
  const [position, setPosition] = useState(defaultScrollValue);

  const listenToScrollPosition = debounceFn((event: Event): void => {
    setPosition((event.target as HTMLElement).scrollTop);
  }, 100);

  const scrollToPosition = (props?: scrollToPositionProps): void => {
    if (elementNode) {
      elementNode.scrollTo({
        top: typeof props?.top === "number" ? props.top : position,
        left: props?.left || undefined,
        behavior: props?.scrollBehavior || scrollBehavior
      });
    }
  };

  const resetScrollValue = ({
    scrollBackToTop,
    scrollBehavior
  }: ResetScrollValueProps): void => {
    setPosition(0);
    scrollBackToTop &&
      scrollToPosition({
        top: 0,
        scrollBehavior
      });
  };

  useEffect(() => {
    if (elementNode) {
      elementNode.addEventListener("scroll", listenToScrollPosition);
    }

    return () =>
      elementNode?.removeEventListener("scroll", listenToScrollPosition);
  }, [elementNode]);

  return {
    scrollPosition: position,
    scrollToPosition,
    resetScrollValue
  };
};

export default useScrollToPosition;
