import { createSignal } from "solid-js";

export const createSubmit = () => {
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const [submitCount, setSubmitCount] = createSignal(0);

  const logSubmit = () => {
    setIsSubmitted(true);
    setSubmitCount((prev) => prev + 1);
  };

  const resetSubmit = (keepIsSubmitted?: boolean, keepSubmitCount?: boolean) => {
    if (!keepIsSubmitted) {
      setIsSubmitted(false);
    }

    if (!keepSubmitCount) {
      setSubmitCount(0);
    }
  };

  return { isSubmitted, submitCount, logSubmit, resetSubmit };
};
