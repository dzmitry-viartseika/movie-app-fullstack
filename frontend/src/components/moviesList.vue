<template>
  <div class="app-movies-list">
    <div class="app__container">
      <div class="app-movies-list__title">
        IMDB {{ $t('moviesList.top') }} 250
      </div>
      <div
        v-if="moviesList.length"
        class="app-movies-list__row"
      >
        <movieItem
          v-for="movie in moviesList"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      <div v-else>
        <transition
          name="fade-el"
        >
          <noDataTemplate
            :noData="noData"
          />
        </transition>
      </div>
    </div>
    {{ currentPaginationPage }}
    <paginationTemplate
      :totalPaginationPage="totalPaginationPage"
      :currentPaginationPage="currentPaginationPage"
      @getFilteredTable="getFilteredTable"
    />
    <transition name="fade-el">
      <addNewMovieModal
        v-if="isVisibleModal"
        @closeModal="closeModal"
      />
    </transition>
  </div>
</template>

<script>
import movieItem from '@/components/movieItem';
import paginationTemplate from '@/components/elements/paginationTemplate';
import noDataTemplate from '@/components/noDataTemplate';
import addNewMovieModal from '@/components/modal/addNewMovieModal';
import moviesApi from '@/api/movies/moviesApi';

export default {
  name: 'MoviesList',
  components: {
    movieItem,
    addNewMovieModal,
    noDataTemplate,
    paginationTemplate,
  },
  props: {
    movies: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isVisibleModal: false,
    };
  },
  computed: {
    totalPaginationPage: {
      get() {
        return this.$store.getters.totalPage;
      },
      set(data) {
        this.$store.dispatch('setTotalPage', data);
      },
    },
    currentPaginationPage: {
      get() {
        return this.$store.getters.currentPage;
      },
      set(data) {
        this.$store.dispatch('setCurrentPage', data);
      },
    },
    noData() {
      return {
        title: this.$t('placeholderMovie.titleNoData'),
        description: this.$t('placeholderMovie.descriptionNoData'),
        buttonText: this.$t('global.addMovie'),
        buttonOnClick: this.openModal,
      };
    },
    moviesList: {
      get() {
        return this.$store.getters.moviesList;
      },
      set(data) {
        this.$store.dispatch('setMoviesList', data);
      },
    },
  },
  beforeMount() {
    moviesApi.getPaginatedMovies(1, 6)
      .then((resp) => {
        console.log('resp', resp.data);
        this.moviesList = resp.data.docs;
        this.currentPaginationPage = 1;
        this.totalPaginationPage = resp.data.totalPages;
        // this.totalPaginationPage = resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    getFilteredTable(page = 1) {
      this.currentPaginationPage = page;
      moviesApi.getPaginatedMovies(page, 6)
        .then((resp) => {
          this.totalPaginationPage = resp.data.totalPages;
          this.moviesList = resp.data.docs;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    closeModal() {
      this.isVisibleModal = false;
    },
    openModal() {
      this.isVisibleModal = true;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../sass/variables";

  .app-movies-list {
    padding-top: 30px;

    &__row {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      margin: 20px -8px 0;
    }

    &__title {
      font-size: 40px;
      color: $color-black;
    }
  }
</style>
