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
        <i class="custom-icon-arrow-paginate pagination__icon pagination__icon_left"></i>
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
        <i class="custom-icon-arrow-paginate pagination__icon pagination__icon_right"></i>
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
  methods: {
    getPageData(i) {
      console.log('i', i);
      this.$emit('getFilteredTable', i);
    },
    goToNextPage() {
      console.log('this.currentPaginationPage', this.currentPaginationPage);
      this.$emit('getFilteredTable', this.currentPaginationPage + 1);
    },
    goToPrevPage() {
      console.log('this.currentPaginationPage', this.currentPaginationPage);
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

    i {
      font-size: $font-size-huge;
    }
  }

  &__button {
    min-width: 30px;
    padding: 8px 6px;
    transition: all .3s ease-in;
    cursor: pointer;
    box-sizing: border-box;
    outline: none;
    border-radius: $borderRadius;
    font: 400 12px/16px $font-global-medium;
    color: $color-cornflower-blue;
    margin: 0 3px;
    font-size: $font-size-huge;

    &_left {
      border-radius: 5px 0 0 5px;
      transform: rotate(180deg);
      font-size: 8px;
      color: $color-cornflower-blue;

      & i {
        transform: rotate(-90%);
      }
    }

    &_right {
      border-radius: 0 5px 5px 0;
      transform: rotate(0deg);
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
