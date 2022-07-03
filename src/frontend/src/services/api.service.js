import axios from "@/plugins/axios";
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

// наследуемся от BaseApiService, так как класс не подразумевает CRUD операции
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
