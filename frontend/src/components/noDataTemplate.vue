<template>
  <div class="app-no-data">
    <img
      :src="require(`@/assets/images/placeholder/${imageNoData}`)"
      class="app-no-data__img"
      alt="table"
    />
    <h3 class="app-no-data__title">
      {{ titleNoData }}
    </h3>
    <div
      v-if="descriptionNoData"
      class="app-no-data__explanation"
    >
      {{ descriptionNoData }}
    </div>
    <div
      v-if="buttonText"
      class="app-no-data__button"
    >
      <button
        class="app-no-data__button app-no-data__button_primary"
        @click="noData.buttonOnClick"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NoDataTemplate',
  props: {
    noData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      imageNoData: this.noData.image || 'list-app.svg',
      titleNoData: this.noData.title || this.$t('table.noData'),
      descriptionNoData: this.noData.description || false,
      buttonText: this.noData.buttonText || false,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../sass/variables";

.app-no-data {
  font-family: $font-global;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 35px;
  padding-top: 45px;

  &_landing {
    padding-top: 0;
    padding-bottom: 50px;
  }

  &__img {
    width: 247px;
    object-fit: cover;
    margin-bottom: -10px;
  }

  &__title {
    font: $font-size-h2 $font-global-medium;
    line-height: 1.125;
    color: $color-dodger-blue;
    margin-bottom: 6px;
  }

  &__explanation {
    font: $font-size-base $font-global-medium;
    line-height: 1.514;
    color: $color-silver-chalice;
    text-align: center;
    max-width: 386px;
  }

  &__button {
    margin-top: 16px;
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
  }
}
</style>
