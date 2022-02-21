export const doughs = [
  {
    name: "Тонкое",
    value: "light",
  },
  {
    name: "Толстое",
    value: "large",
  },
];

export const sizes = [
  {
    name: "23 см",
    value: "small",
  },
  {
    name: "32 см",
    value: "normal",
  },
  {
    name: "45 см",
    value: "big",
  },
];

export const sauces = [
  {
    name: "Томатный",
    value: "tomato",
  },
  {
    name: "Сливочный",
    value: "creamy",
  },
];

export const normalizeIngredients = (ingredients) => {
  const preparedData = [];
  ingredients.map((item) => {
    preparedData.push({
      ...item,
      value: item.image.split("/").pop().split(".", "1")[0],
    });
  });
  return preparedData;
};

export const normalizeData = (data, preparedParam) => {
  const preparedData = [];
  data.map((item) => {
    preparedData.push({
      ...item,
      value: preparedParam.find(({ name }) => item.name === name).value,
    });
  });
  return preparedData;
};
