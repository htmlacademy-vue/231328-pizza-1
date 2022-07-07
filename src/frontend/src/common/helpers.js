import { DOUGH, SIZES, SAUCES, INGREDIENTS, MISC } from "@/common/constants";

import resources from "@/common/resources";
import {
  ReadOnlyApiService,
  AuthApiService,
  CrudApiService,
} from "@/services/api.service";

// setAuth принимает store в качестве аргумента для того, чтобы задать
// токен авторизации и вызвать действие для получения профиля пользователя.
// isAuthenticated переводим в true в действии сразу же после получения данных о пользователе.
export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

/*
 * Вернет объект, в нем объекты с методами для каждого вида api-данных
 * Далее в vue/vuexPlugins.js мы их добавим в глобальную область видимости
 *
 * В resources мы храним названия api данных
 *
 * Например, в dough запишем объект с методами для получения размеров пиццы
 * $api.dough
 */
export const createResources = () => {
  return {
    // Там class-функции, через new присваиваем копию (api.service.js)
    [resources.DOUGH_API]: new ReadOnlyApiService(resources.DOUGH_API),
    [resources.INGREDIENTS_API]: new ReadOnlyApiService(
      resources.INGREDIENTS_API
    ),
    [resources.SAUCES_API]: new ReadOnlyApiService(resources.SAUCES_API),
    [resources.SIZES_API]: new ReadOnlyApiService(resources.SIZES_API),
    [resources.AUTH_API]: new AuthApiService(resources.AUTH_API),

    [resources.ORDERS_API]: new CrudApiService(resources.ORDERS_API),
    [resources.ADDRESSES_API]: new CrudApiService(resources.ADDRESSES_API),
  };
};

/*
 * Объедение двух массивов объектов по id
 *
 */
const normalizerById = (first, second) => {
  return Object.values(
    first.reduce((acc, { id: id, ...n }) => {
      Object.entries(n).forEach(
        ([k, v]) =>
          (acc[id][k] = (acc[id][k] || [v] == Number() ? Number() : "") + v)
      );
      return acc;
    }, Object.fromEntries(second.map((n) => [n.id, { ...n }])))
  );
};

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
