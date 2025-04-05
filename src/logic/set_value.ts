export const setFieldValue = (field: HTMLElement, value: any) => {
  if (field instanceof HTMLSelectElement) {
    field.value = value;

    return;
  }

  if (field instanceof HTMLInputElement && field.type === "checkbox") {
    field.checked = value;

    return;
  }

  (field as HTMLInputElement).value = value;
};
