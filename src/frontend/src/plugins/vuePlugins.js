import Vue from "vue";
import { createResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        /*
         * Теперь в компонентах мы можем обратиться к методам api с помощью $api.***
         *
         * Например: $api.dough – внутри набор методов
         *
         */
        $api() {
          // Функция возвращает объект, в нем объекты с методами для каждого вида api-данных
          return createResources();
        },
      },
    });
  },
};

Vue.use(plugins);
