import { createSignal, onCleanup, onMount } from "solid-js";

export const createHashObserver = (baseUrl: string) => {
  let isUserNavigation = false;
  let timerId: number | undefined;
  const [hash, setHash] = createSignal("");

  const isHash = (...args: string[]) => {
    return args.some((arg) => hash() === arg);
  };

  const onNavigation = (event: MouseEvent) => {
    const target = event.target as HTMLAnchorElement;
    const href = target.href;
    const hash = new URL(href).hash;

    isUserNavigation = true;
    setHash(hash);
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      isUserNavigation = false;
    }, 1000);
  };

  onMount(() => {
    const sections = document.querySelectorAll("section[id]");
    const options: IntersectionObserverInit = {
      threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
      if (isUserNavigation) {
        return;
      }

      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        const visibleEntry = visibleEntries[0];
        // const visibleRatio = visibleEntry.intersectionRatio;
        const sectionId = visibleEntry.target.getAttribute("id");

        if (!sectionId) {
          return;
        }

        const newHash = `#${sectionId}`;

        setHash(newHash);
        history.replaceState(null, "", baseUrl + newHash);
      }
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    onCleanup(() => {
      observer.disconnect();
      clearTimeout(timerId);
    });
  });

  return {
    isHash,
    onNavigation
  };
};
