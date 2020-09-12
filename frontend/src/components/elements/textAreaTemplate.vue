<template>
  <div class="app-textarea">
    <div
      v-if="labelText"
      class="app-textarea__label"
    >
      {{ labelText }}
    </div>
    <textarea
      class="app-textarea__input"
      name="description"
      v-model="model"
    ></textarea>
    <i
      v-if="errorStatus"
      class="custom-icon-info-valid app-textarea__icon app-textarea__icon_error"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'TextAreaTemplate',
  props: {
    labelText: {
      type: String,
      default: () => '',
    },
    errorStatus: {
      type: Boolean,
      default: () => false,
    },
    value: {
      value: {
        type: [String, Number],
      },
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(data) {
        this.$emit('update:value', data);
      },
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../sass/variables";

  .app-textarea {
    margin-bottom: 15px;
    position: relative;

    &__label {
      display: block;
      margin-bottom: 5px;
    }

    &__input {
      background: $color-white;
      border: 1px solid $color-gallery;
      width: 100%;
      height: 120px;
      padding: 15px;
      display: flex;
      align-items: center;
      font: $font-size-base $font-global-medium;
      color: $color-black;
      border-radius: $borderRadius;
      transition: border-color .15s ease-in;
      resize: none;

      &:focus {
        border-color: $color-cornflower-blue;
      }
    }

    &.error {

      .app-textarea__input {
        border-color: $color-cardinal!important;
      }
    }

    &__icon {
      color: $color-cardinal!important;
      position: absolute;
      right: 10px!important;
      top: 30px!important;
      font-size: $font-size-base!important;
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
