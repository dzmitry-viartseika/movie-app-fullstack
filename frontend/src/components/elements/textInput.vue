<template>
  <div class="app-field">
    <label
      v-if="inputSettings.labelText"
      class="app-field__label"
    >{{ inputSettings.labelText }}</label>
    <div class="app-field__wrap">
      <input
        class="app-field__input"
        :type="inputSettings.typeInput"
        :placeholder="inputSettings.placeholder"
      >
      <i
        v-if="inputSettings.icon"
        :class="inputSettings.icon"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    inputSettings: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../sass/variables";

  .app-field {

    &__input {
      background: $color-recent-gray;
      border: none;
      width: 300px;
      height: 40px;
      padding: 5px 35px 5px 15px;
      display: flex;
      align-items: center;
      font: $font-size-base $font-global-medium;
      color: $color-white;
      border-radius: $borderRadius;
    }

    &__wrap {
      position: relative;

      i {
        position: absolute;
        right: 10px;
        top: 10px;
        color: $color-white;
        font-size: $font-size-base;
      }
    }
  }

::placeholder {
  color: $color-silver-chalice;
  opacity: 1;
}

:-ms-input-placeholder {
  color: $color-silver-chalice;
}

::-ms-input-placeholder {
  color: $color-silver-chalice;
}
</style>
