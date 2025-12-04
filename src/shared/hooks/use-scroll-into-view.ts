type Props = {
  scrollBehavior?: ScrollBehavior;
};

const useScrollIntoView = (props?: Props) => {
  return (selector: string): void => {
    setTimeout(() => {
      const element = document.querySelector(selector);
      element?.scrollIntoView({ behavior: props?.scrollBehavior || "smooth" });
    });
  };
};

export default useScrollIntoView;
