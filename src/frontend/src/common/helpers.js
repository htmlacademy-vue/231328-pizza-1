import resources from "@/common/resources";
import {
  AuthApiService,
  CrudApiService,
  BuilderApiService,
  OrdersApiService,
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
    [resources.DOUGH_API]: new BuilderApiService(resources.DOUGH_API),
    [resources.INGREDIENTS_API]: new BuilderApiService(
      resources.INGREDIENTS_API
    ),
    [resources.SAUCES_API]: new BuilderApiService(resources.SAUCES_API),
    [resources.SIZES_API]: new BuilderApiService(resources.SIZES_API),
    [resources.MISC_API]: new BuilderApiService(resources.MISC_API),

    [resources.AUTH_API]: new AuthApiService(resources.AUTH_API),

    [resources.ORDERS_API]: new OrdersApiService(resources.ORDERS_API),
    [resources.ADDRESSES_API]: new CrudApiService(resources.ADDRESSES_API),
  };
};
