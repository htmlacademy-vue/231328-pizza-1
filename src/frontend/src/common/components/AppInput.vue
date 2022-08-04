<template>
  <label :class="['input', format == 'big' && 'input--big-label']">
    <span v-if="title">{{ title }}</span>
    <input
      ref="input"
      :value="value"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :autofocus="autofocus"
      v-on="inputListeners"
    />
  </label>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    title: {
      type: String,
      default: "",
    },
    format: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // Передаем все слушатели событий на компоненте
    // https://ru.vuejs.org/v2/guide/components-custom-events.html#Подписка-на-нативные-события-в-компонентах
    inputListeners: function () {
      var vm = this;
      // `Object.assign` объединяет объекты вместе, чтобы получить новый объект
      return Object.assign(
        {},
        // Мы добавляем все слушатели из родителя
        this.$listeners,
        // Затем мы можем добавить собственные слушатели или
        // перезаписать поведение некоторых существующих.
        {
          // Это обеспечит, что будет работать v-model на компоненте
          input: function (event) {
            vm.$emit("input", event.target.value);
          },
        }
      );
    },
  },
};
</script>

<style></style>
