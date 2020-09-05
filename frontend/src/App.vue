<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    language() {
      return this.$i18n.locale;
    },
  },
  beforeMount() {
    const language = window.navigator ? (window.navigator.language
        || window.navigator.systemLanguage
        || window.navigator.userLanguage) : 'ru';
    const systemLanguage = language ? language.substr(0, 2).toLowerCase() : 'ru';
    if (systemLanguage !== 'ru') {
      this.$i18n.locale = 'en';
    }
  },
};
</script>

<style lang="scss">
@import './sass/style';

@font-face {
  font-family: 'Ubuntu';
  font-display: swap;
  src: url('./assets/fonts/ubuntu/ubuntu.woff') format('woff');
  font-style: normal;
}

@font-face {
  font-family: 'Ubuntu-medium';
  src: url('./assets/fonts/ubuntu/ubuntumedium.woff') format('woff');
  font-style: normal;
}

@font-face {
  font-family: 'Ubuntu-bold';
  src: url('./assets/fonts/ubuntu/ubuntubold.woff') format('woff');
  font-style: normal;
}
</style>
