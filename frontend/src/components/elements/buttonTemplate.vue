<template>
  <div class="app-button">
    <button
      class="app-button__btn"
      @click="buttonSettings.buttonClickEvent"
      :class="{'app-button__btn_border': buttonSettings.borderButton}"
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

.app-button {

  &__btn {
    text-align: center;
    font: $font-size-base $font-global-medium;
    height: 40px;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: $borderRadius;
    transition: background-color .15s ease-in, border-color .15s ease-in, color .15s ease-in;
    cursor: pointer;
    border: 1px solid transparent;

    &_primary {
      background: $color-dodger-blue;
      color: $color-white;

      &:hover {
        background: $color-cornflower-blue;
      }
    }

    &_cancel {
      background: transparent;
      color: $color-dodger-blue;
      transition: background-color .15s ease-in;

      &:hover {
        background: rgba($color-dodger-blue, .08);
      }
    }

    &_border {
      color: $color-white;
      border: 1px solid $color-white;
      transition: border-color .15s ease-in, color .15s ease-in;

      &:hover {
        border-color: $color-silver-chalice;
        color: $color-silver-chalice;
      }
    }
  }
}

</style>
