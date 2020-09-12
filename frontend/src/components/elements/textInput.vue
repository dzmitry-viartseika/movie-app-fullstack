<template>
  <div class="app-field">
    <label
      v-if="labelText"
      class="app-field__label"
    >{{ labelText }}</label>
    <div
      :class="{'app-field__wrap_error': errorStatus}"
      class="app-field__wrap"
    >
      <input
        ref="input"
        v-model="model"
        class="app-field__input"
        :type="typeInput"
        :placeholder="placeholder"
        :autofocus="autofocus"
        @keydown="handleEventClick($event)"
        @focus="inputFocusStatus(true)"
        @blur="inputFocusStatus(false)"
      >
      <i
        v-if="icon"
        :class="icon"
      ></i>
      <i
        v-if="errorStatus"
        class="custom-icon-info-valid app-field__icon app-field__icon_error"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    typeInput: {
      type: String,
      default: () => 'text',
    },
    autofocus: {
      type: Boolean,
      default: () => false,
    },
    value: {
      value: {
        type: [String, Number],
      },
    },
    icon: {
      type: String,
      default: () => '',
    },
    placeholder: {
      type: String,
      default: () => '',
    },
    labelText: {
      type: String,
      default: () => '',
    },
    errorStatus: {
      type: Boolean,
      default: () => false,
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
  mounted() {
    if (this.$refs !== undefined) {
      if (this.autofocus) {
        this.$refs.input.focus();
      }
    }
  },
  methods: {
    inputFocusStatus(e) {
      this.$emit('inputFocusStatus', e);
    },
    handleEventClick(e) {
      if (e.keyCode === 13) {
        this.$emit('handleEventClick');
      } else {
        this.$emit('changeInput');
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../sass/variables";

  .app-field {
    margin-bottom: 15px;

    &__label {
      display: block;
      margin-bottom: 5px;
    }

    &__input {
      background: $color-white;
      border: 1px solid $color-gallery;
      width: 100%;
      height: 40px;
      padding: 5px 35px 5px 15px;
      display: flex;
      align-items: center;
      font: $font-size-base $font-global-medium;
      color: $color-black;
      border-radius: $borderRadius;
      transition: border-color .15s ease-in;

      &:focus {
        border-color: $color-cornflower-blue;
      }
    }

    &__wrap {
      position: relative;

      i {
        position: absolute;
        right: 0;
        color: $color-black;
        font-size: $font-size-huge;
        top: 7px;
        right: 10px;
      }

      &_error {

        .app-field__input {
          border-color: $color-cardinal;
        }
      }
    }

    &__icon {
      color: $color-cardinal!important;
      position: absolute;
      right: 10px!important;
      top: 10px!important;
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
