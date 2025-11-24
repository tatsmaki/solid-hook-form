export const setFieldValue = (field: HTMLElement | null, value: any) => {
  if (!field) {
    return;
  }

  if (value === undefined) {
    return;
  }

  if (field instanceof HTMLSelectElement) {
    field.value = value;

    return;
  }

  if (field instanceof HTMLInputElement && field.type === "checkbox") {
    field.checked = value;

    return;
  }

  if (field instanceof HTMLInputElement && field.type === "file") {
    return;
  }

  (field as HTMLInputElement).value = value;
};
