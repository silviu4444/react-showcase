const useScrollUtility = () => {
  const getElements = (): HTMLElement[] => {
    const html = document.querySelector("html") as HTMLElement;
    const body = document.querySelector("body") as HTMLElement;

    return [html, body];
  };

  const enableOverscrollNone = () => {
    getElements().forEach((element) => {
      element.classList.add("overscroll-none");
    });
  };

  const disableOverscrollNone = () => {
    getElements().forEach((element) => {
      element.classList.remove("overscroll-none");
    });
  };

  return {
    enableOverscrollNone,
    disableOverscrollNone
  };
};

export default useScrollUtility;
