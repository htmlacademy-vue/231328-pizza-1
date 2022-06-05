import { DOUGH, SIZES, SAUCES, INGREDIENTS, MISC } from "@/common/constants";

/*eslint-disable */
/*
 * Объедение двух массивов объектов по id
 */
const normalizerById = (first, second) => {
  return Object.values(first.reduce((acc, { id: id, ...n }) => {
    Object.entries(n).forEach(([k, v]) => acc[id][k] = (acc[id][k] || [v] == Number() ? Number() : "") + v);
    return acc;
  }, Object.fromEntries(second.map(n => [n.id, { ...n }]))));
};
/*eslint-enable */

export const normalizeDough = (dough) => {
  return normalizerById(DOUGH, dough);
};

export const normalizeSizes = (sizes) => {
  return normalizerById(SIZES, sizes);
};

export const normalizeSauces = (sauces) => {
  return normalizerById(SAUCES, sauces);
};

export const normalizeIngredients = (ingredients) => {
  return normalizerById(INGREDIENTS, ingredients);
};

export const normalizeMisc = (misc) => {
  let arr = normalizerById(MISC, misc);
  arr.map((item) => {
    item.miscId = item.id;
    delete item.id;
  });
  return arr;
};
