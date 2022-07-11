// импортируем axios
import axios from "axios";

// создаём новый экземпляр axios с /api в качестве базового URL
const axiosInstance = axios.create({
  baseURL: "/api/",
});

// добавляем централизованную обработку ошибок при получении ответа от сервера
// Axios interceptors — единая точка входа, через которую проходят все axios-запросы и ответы от сервера.
axiosInstance.interceptors.response.use(
  (res) => {
    const defaultMessage = "Данные успешно получены";
    console.log(res?.response?.data?.error?.message || defaultMessage);
    return res;
  },
  (e) => {
    const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";
    console.log(e?.response?.data?.error?.message || defaultMessage);
    return Promise.reject(e);
  }
);

export default axiosInstance;
