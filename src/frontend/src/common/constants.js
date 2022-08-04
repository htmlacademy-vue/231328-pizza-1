export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";

export const DEFAULT_DOUGH_ID = 1;
export const DEFAULT_SIZE_ID = 2;
export const DEFAULT_SAUCE_ID = 2;

export const MIN_INGREDIENT_QUANTITY = 0;
export const MAX_INGREDIENT_QUANTITY = 3;

export const DOUGH = [
  { id: 1, value: "light", connotation: "на тонком тесте" },
  { id: 2, value: "large", connotation: "на толстом тесте" },
];

export const SIZES = [
  { id: 1, value: "small" },
  { id: 2, value: "normal" },
  { id: 3, value: "large" },
];

export const SAUCES = [
  { id: 1, value: "creamy" },
  { id: 2, value: "tomato" },
];

export const INGREDIENTS = [
  { id: 1, value: "mushrooms" },
  { id: 2, value: "cheddar" },
  { id: 3, value: "tomatoes" },
  { id: 4, value: "salmon" },
  { id: 5, value: "mozzarella" },
  { id: 6, value: "parmesan" },
  { id: 7, value: "blue_cheese" },
  { id: 8, value: "salami" },
  { id: 9, value: "ham" },
  { id: 10, value: "chile" },
  { id: 11, value: "onion" },
  { id: 12, value: "ananas" },
  { id: 13, value: "olives" },
  { id: 14, value: "bacon" },
  { id: 15, value: "jalapeno" },
];

export const MISC = [
  { id: 2, value: "sauce", quantity: 0 },
  { id: 3, value: "cola", quantity: 0 },
  { id: 3, value: "potato", quantity: 0 },
];

/* eslint-disable */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
/* eslint-enable */
