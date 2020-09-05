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
          <textInput :inputSettings="inputSettings"></textInput>
        </div>
        <div class="action">
          <buttonTemplate :buttonSettings="buttonSettings" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import buttonTemplate from '@/components/elements/buttonTemplate';
import textInput from '@/components/elements/textInput';

export default {
  name: 'HeaderTemplate',
  components: {
    buttonTemplate,
    textInput,
  },
  computed: {
    buttonSettings() {
      return {
        buttonText: 'Add movie',
        buttonClickEvent: this.addNewMovie,
        borderButton: true,
      };
    },
    inputSettings() {
      return {
        labelText: '',
        placeholder: '1231',
        icon: 'custom-icon-film-solid',
        typeInput: 'text',
        buttonClickEvent: this.searchMovie,
      };
    },
  },
  methods: {
    addNewMovie() {
      console.log('addNewMovie');
    },
    searchMovie() {
      console.log('searchMovie');
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
