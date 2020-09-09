<template>
  <div
    v-if="totalPaginationPage > 1"
    class="pagination"
  >
    <div class="pagination__wrap">
      <button
        v-if="currentPaginationPage !== 1"
        class="pagination__button pagination__button_left"
        @click="goToPrevPage()"
      >
        <i class="icon-arrow pagination__icon_left">1</i>
      </button>
      <template v-for="i in totalPaginationPage">
        <template
          v-if="i === 1 || i === totalPaginationPage ||
            (i <= currentPaginationPage + 1 && i >= currentPaginationPage - 1) ||
            (i === totalPaginationPage - 2 && currentPaginationPage === totalPaginationPage) ||
            (i === currentPaginationPage + 1 && currentPaginationPage === 1)"
        >
          <button
            :key="i"
            class="pagination__button"
            :class="{'pagination__button_active': i === currentPaginationPage}"
            @click="getPageData(i)"
          >
            {{ i }}
          </button>
        </template>
        <template
          v-if="(i === currentPaginationPage - 2 && i > 1 && i < totalPaginationPage - 2) ||
            (i === currentPaginationPage + 2 && i < totalPaginationPage) ||
            (i === totalPaginationPage - 3 && currentPaginationPage === totalPaginationPage)
          "
        >
          ...
        </template>
      </template>
      <button
        v-if="currentPaginationPage !== totalPaginationPage"
        class="pagination__button pagination__button_right"
        @click="goToNextPage()"
      >
        <i class="icon-arrow pagination__icon_right">2</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationTemplate',
  props: {
    totalPaginationPage: {
      type: Number,
      default: () => 0,
    },
    currentPaginationPage: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  beforeMount() {
    console.log('currentPaginationPage', this.currentPaginationPage);
    console.log('totalPaginationPage', this.totalPaginationPage);
  },
  methods: {
    getPageData(i) {
      this.$store.commit('stateLoader', true);
      setTimeout(() => {
        this.$store.commit('stateLoader', false);
      }, 500);
      this.$emit('getFilteredTable', i);
    },
    goToNextPage() {
      this.$store.commit('stateLoader', true);
      setTimeout(() => {
        this.$store.commit('stateLoader', false);
      }, 500);
      this.$emit('getFilteredTable', this.currentPaginationPage + 1);
    },
    goToPrevPage() {
      this.$store.commit('stateLoader', true);
      setTimeout(() => {
        this.$store.commit('stateLoader', false);
      }, 1000);
      this.$emit('getFilteredTable', this.currentPaginationPage - 1);
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/sass/variables";

.pagination {
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 18px;

  &__wrap {
    color: $color-cornflower-blue;
  }

  &__button {
    min-width: 30px;
    padding: 8px 6px;
    transition: all .3s ease-in;
    cursor: pointer;
    box-sizing: border-box;
    outline: none;
    border-radius: 4px;
    font: 400 12px/16px $font-global-medium;
    color: $color-cornflower-blue;
    margin: 0 3px;

    &_left {
      border-radius: 5px 0 0 5px;
      transform: rotate(90deg);
      font-size: 8px;
      color: $color-cornflower-blue;

      & i {
        transform: rotate(-90%);
      }
    }

    &_right {
      border-radius: 0 5px 5px 0;
      transform: rotate(-90deg);
      font-size: 8px;
      color: $color-cornflower-blue;
    }

    &:hover {
      opacity: 0.8;
    }

    &_active {
      color: $color-cornflower-blue;
      color: $color-white;
      border-radius: 4px;
    }
  }
}

.icon-arrow {
  font-size: 8px !important;
}
</style>
