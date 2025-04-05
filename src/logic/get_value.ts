type GetValueStrategy = (element: HTMLInputElement) => any;

const getValueStrategies: Record<string, GetValueStrategy> = {
  text(element) {
    return element.value;
  },
  checkbox(element) {
    return element.checked;
  },
};

export const executeGetValueStrategy: GetValueStrategy = (element) => {
  const strategy = getValueStrategies[element.type] || getValueStrategies.text;

  return strategy(element);
};
