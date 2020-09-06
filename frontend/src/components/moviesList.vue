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
import noDataTemplate from '@/components/noDataTemplate';
import addNewMovieModal from '@/components/modal/addNewMovieModal';
import moviesApi from '@/api/movies/moviesApi';

export default {
  name: 'MoviesList',
  components: {
    movieItem,
    addNewMovieModal,
    noDataTemplate,
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
    moviesApi.getMoviesList().then((resp) => {
      this.moviesList = resp.data;
    }).catch((e) => {
      console.log(e);
    });
  },
  methods: {
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
      margin: 0 -8px;
    }

    &__title {
      font-size: 40px;
      color: $color-black;
    }
  }
</style>
