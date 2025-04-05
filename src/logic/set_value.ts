type SetValueStrategy = (element: HTMLInputElement, value: any) => void;

const setValueStrategies: Record<string, SetValueStrategy> = {
  text(element, value) {
    element.value = value;
  },
  checkbox(element, value) {
    element.checked = value;
  },
};

export const executeSetValueStrategy: SetValueStrategy = (element, value) => {
  const strategy = setValueStrategies[element.type] || setValueStrategies.text;

  return strategy(element, value);
};
