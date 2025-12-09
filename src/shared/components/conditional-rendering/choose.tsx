import { Children, isValidElement, ReactNode } from "react";
import { When } from "./when";
import { Otherwise } from "./otherwise";
import { ChooseChild, WhenProps } from "./types";

function isChooseChild(child: unknown): child is ChooseChild {
  if (!isValidElement(child)) return false;

  return child.type === When || child.type === Otherwise;
}

export function Choose({ children }: { children: ReactNode }) {
  let otherwise: ReactNode = null;

  const arrayChildren = Children.toArray(children);

  for (const child of arrayChildren) {
    if (!isChooseChild(child)) {
      console.warn("<Choose /> can contain only <When /> or <Otherwise />");
      continue;
    }

    // we can assume that the props are of type WhenProps because child.type === When
    if (child.type === When && (child.props as WhenProps).condition) {
      return child;
    }

    if (child.type === Otherwise) {
      otherwise = child;
    }
  }

  return otherwise;
}
