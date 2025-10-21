export const ScrollToAnchor = () => {
  const hash = window.location.hash?.replace("#", "");

  if (hash) {
    const target = document.getElementById(hash);

    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return null;
};
