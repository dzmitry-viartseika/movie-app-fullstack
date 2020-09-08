<template>
  <div class="app-button">
    <button
      class="app-button__btn"
      @click="buttonSettings.buttonClickEvent"
      :class="[
        {'app-button__btn_border': buttonSettings.borderButton},
        {'app-button__btn_primary': buttonSettings.primaryButton}
      ]"
    >
      <i
        v-if="buttonSettings.icon"
        :class="buttonSettings.icon"
      ></i>
      <span>{{ buttonSettings.buttonText }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonTemplate',
  props: {
    buttonSettings: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../sass/variables";

</style>
