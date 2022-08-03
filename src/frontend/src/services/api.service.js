import { DOUGH, SIZES, SAUCES, INGREDIENTS, MISC } from "@/common/constants";
import axios from "@/plugins/axios";
import { merge } from "lodash";
import JwtService from "@/services/jwt.service";

export class ReadOnlyApiService {
  // resource — приватное свойство класса. Добавляем его к базовому URL, чтобы получить
  // финальный URL, на который нужно отправлять запросы
  #resource;

  //constructor() вызоветься автоматичемки, в нем мы инициализируем объект
  constructor(resource) {
    this.#resource = resource;
  }

  // запрос на получение списка сущностей
  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  // запрос на получение одной сущности по id
  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource) {
    super(resource);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class BuilderApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource) {
    super(resource);
    // В нем имя вызываемой сущности из API
    this.#resource = resource;
    // Добавили данные для нормализации
    this.dough = DOUGH;
    this.sizes = SIZES;
    this.sauces = SAUCES;
    this.ingredients = INGREDIENTS;
    this.misc = MISC;
  }

  // Смердживание двух объектов по id
  _normalizerById(first, second) {
    return merge(first, second);
    // return Object.values(
    //   first.reduce((acc, { id: id, ...n }) => {
    //     Object.entries(n).forEach(
    //       ([k, v]) =>
    //         (acc[id][k] = (acc[id][k] || [v] == Number() ? Number() : "") + v)
    //     );
    //     return acc;
    //   }, Object.fromEntries(second.map((n) => [n.id, { ...n }])))
    // );
  }

  async query(config = {}) {
    // Получили данные из API
    const { data } = await axios.get(this.#resource, config);
    // Вернули нормализованые данные
    return this._normalizerById(this[this.#resource], data);
  }
}

export class OrdersApiService extends CrudApiService {
  #resource;
  constructor(resource) {
    super(resource);
    this.#resource = resource;
  }

  _createRequest(order) {
    order.pizzas.forEach((pizza) => {
      delete pizza.id;
      pizza.ingredients = pizza.ingredients.map(({ id, quantity }) => {
        return { ingredientId: id, quantity };
      });
    });

    order.misc = order.misc.map(({ id, quantity }) => {
      return { miscId: id, quantity };
    });

    order.misc = order.misc.filter((misc) => misc.quantity !== 0);

    if (order.isPickup) order.address = null;

    delete order.isFormValid;
    delete order.isPickup;

    return order;
  }

  async post(order) {
    const { data } = await axios.post(
      this.#resource,
      this._createRequest(order)
    );
    return data;
  }
}

export class AuthApiService {
  // задаём токен авторизации
  setAuthHeader() {
    // получаем токен из LocalStorage с помощью JWT-сервиса
    const token = JwtService.getToken();
    // добавляем заголовок авторизации в axios как Bearer token
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    // отправляем логин/пароль для авторизации на сервере
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    // делаем логаут на сервере
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    // получаем профиль залогиненного пользователя
    const { data } = await axios.get("whoAmI");
    return data;
  }
}
