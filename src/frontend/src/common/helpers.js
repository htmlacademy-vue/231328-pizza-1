export const normalizeDough = (dough) => {
  return dough.map((item) => ({
    ...item,
    value: item.name === "Тонкое" ? "light" : "large",
    checked: item.name === "Толстое",
  }));
};

export const normalizeSizes = (sizes) => {
  return sizes.map((item) => ({
    ...item,
    value:
      item.multiplier === 1
        ? "small"
        : item.multiplier === 2
        ? "normal"
        : "large",
    checked: item.name === "32 см",
  }));
};

export const normalizeSauces = (sizes) => {
  return sizes.map((item) => ({
    ...item,
    value: item.name === "Томатный" ? "tomato" : "creamy",
    checked: item.name === "Сливочный",
  }));
};

export const normalizeIngredients = (ingredients) => {
  return ingredients.map((item) => ({
    ...item,
    value: item.image.split("/").pop().split(".", "1")[0],
    count: 0,
  }));
};
