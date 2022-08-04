import axios from "@/plugins/axios";
import CrudApiService from "./crudApi.service";

export default class OrdersApiService extends CrudApiService {
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
