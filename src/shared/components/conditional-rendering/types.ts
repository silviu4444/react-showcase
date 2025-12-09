import { ReactElement, ReactNode } from "react";

export type WhenProps = {
  condition: unknown;
  children: ReactNode;
};

export type OtherwiseProps = {
  children: ReactNode;
};

export type ChooseChild =
  | ReactElement<WhenProps>
  | ReactElement<OtherwiseProps>;
