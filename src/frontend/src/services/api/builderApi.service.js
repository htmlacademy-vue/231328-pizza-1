import axios from "@/plugins/axios";
import ReadOnlyApiService from "./readOnlyApi.service";
import { merge } from "lodash";
import { DOUGH, SIZES, SAUCES, INGREDIENTS, MISC } from "@/common/constants";

export default class BuilderApiService extends ReadOnlyApiService {
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
