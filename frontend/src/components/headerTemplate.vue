<template>
  <header class="app-header">
    <div class="app__container">
      <div class="app-header-row">
        <div
          class="logo"
          @click="proceedTo('/')"
        >
          <i class="custom-icon-film-solid"></i>
          <span class="logo__text">MovieDB</span>
        </div>
        <div class="search">
          <textInput
            :icon="'custom-icon-film-solid'"
            :placeholder="'1231'"
            :typeInput="'text'"
            @handleEventClick="getRequests"
            :value.sync="queryParams.search"
          />
        </div>
        <div class="language">
          <dropdown
            :dropdownOptions="dropdownOptions"
            @changeDropdown="changeLanguage"
          />
        </div>
        <div class="action">
          <buttonTemplate :buttonSettings="buttonSettings" />
        </div>
        <transition name="fade-el">
          <addNewMovieModal
            v-if="isVisibleModal"
            @closeModal="closeModal"
          />
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
import buttonTemplate from '@/components/elements/buttonTemplate';
import textInput from '@/components/elements/textInput';
import dropdown from '@/components/elements/dropdown';
import addNewMovieModal from '@/components/modal/addNewMovieModal';
import moviesApi from '@/api/movies/moviesApi';

export default {
  name: 'HeaderTemplate',
  components: {
    buttonTemplate,
    textInput,
    dropdown,
    addNewMovieModal,
  },
  data() {
    return {
      isVisibleModal: false,
      queryParams: {
        page: 1,
        perPage: 2,
        search: this.search,
      },
    };
  },
  computed: {
    moviesList: {
      get() {
        return this.$store.getters.moviesList;
      },
      set(data) {
        this.$store.dispatch('setMoviesList', data);
      },
    },
    language: {
      get() {
        return this.$i18n.locale;
      },
      set(data) {
        this.$i18n.locale = data;
      },
    },
    buttonSettings() {
      return {
        buttonText: 'Add movie',
        buttonClickEvent: this.addNewMovie,
        borderButton: true,
      };
    },
    dropdownOptions() {
      return {
        list: [
          {
            code: 'ru',
            text: 'Русский',
          },
          {
            code: 'en',
            text: 'English',
          },
        ],
        value: this.language,
      };
    },
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
  },
  methods: {
    getRequests() {
      const {
        page = this.queryParams.page,
        perPage = this.queryParams.perPage,
        search = this.queryParams.search,
      } = this.queryParams;
      this.queryParams = {
        page,
        perPage,
        search,
      };
      this.loader = true;
      moviesApi.getPaginatedMovies(page, perPage, search)
        .then((resp) => {
          console.log('resp.data', resp.data);
          this.loader = false;
          this.moviesList = resp.data.docs;
          this.totalPaginationPage = resp.data.limit;
          this.currentPaginationPage = resp.data.totalPages;
        }).catch((err) => {
          this.loader = false;
          console.error(err);
        });
    },
    closeModal() {
      this.isVisibleModal = false;
    },
    changeLanguage(code) {
      this.language = code;
      this.$i18n.locale = code;
      localStorage.setItem('language', code);
    },
    addNewMovie() {
      this.isVisibleModal = true;
    },
    proceedTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../sass/variables";

.app-header {
  width: 100%;
  background: $color-mirage;

  &-row {
    display: flex;
    justify-content: space-between;
    min-height: 50px;
    padding: 15px 0;
    align-items: center;
  }

  .logo {
    color: $color-white;
    cursor: pointer;
    transition: opacity .15s ease-in;

    &:hover {
      opacity: .8;
    }

    i {
      margin-right: 5px;
    }
  }

  .action {

  }
}
</style>
