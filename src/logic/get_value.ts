export const getFieldValue = (event: Event) => {
  const field = event.target;

  if (field instanceof HTMLSelectElement) {
    return field.value;
  }

  if (field instanceof HTMLInputElement && field.type === "checkbox") {
    return field.checked;
  }

  return (field as HTMLInputElement).value;
};
