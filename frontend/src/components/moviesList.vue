<template>
  <div class="app-movies-list">
    <loader v-if="ifLoader" />
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
    totalPaginationPage={{ totalPaginationPage }}
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
import loader from '@/components/loader';

export default {
  name: 'MoviesList',
  components: {
    movieItem,
    addNewMovieModal,
    noDataTemplate,
    paginationTemplate,
    loader,
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
      ifLoader: false,
      queryParams: {
        page: 1,
        perPage: 2,
      },
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
    this.ifLoader = true;
    const {
      page = this.queryParams.page,
      perPage = this.queryParams.perPage,
    } = this.queryParams;
    this.queryParams = {
      page,
      perPage,
    };
    moviesApi.getPaginatedMovies(page, perPage)
      .then((resp) => {
        console.log('resp.data', resp.data);
        this.ifLoader = false;
        this.moviesList = resp.data.docs;
        this.currentPaginationPage = resp.data.page;
        this.totalPaginationPage = resp.data.totalDocs;
      })
      .catch((err) => {
        this.ifLoader = false;
        console.error(err);
      });
  },
  methods: {
    getFilteredTable(page = 1, perPage = 2) {
      this.currentPaginationPage = page;
      moviesApi.getPaginatedMovies(page, perPage)
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
