export const getFieldValue = (event: Event | unknown) => {
  const isEvent = event instanceof Event;

  if (!isEvent) {
    return event;
  }

  const field = event.target;

  if (field instanceof HTMLSelectElement) {
    return field.value;
  }

  if (field instanceof HTMLInputElement && field.type === "checkbox") {
    return field.checked;
  }

  if (field instanceof HTMLInputElement && field.type === "file") {
    return [...(field.files || [])];
  }

  return (field as HTMLInputElement).value;
};
