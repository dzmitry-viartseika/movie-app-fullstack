<template>
  <div class="app-login">
    <form class="app-login-form">
      <div class="app-login-form__title">
        Login
      </div>
      <div class="app-login-form-field">
        <textInput />
      </div>
    </form>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    ><path
      fill="#0099ff"
      fill-opacity="1"
      d="M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,122.7C840,139,960,213,
      1080,229.3C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,
      1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
    ></path></svg>
  </div>
</template>

<script>
import textInput from '@/components/elements/textInput';

export default {
  name: 'LoginPage',
  components: {
    textInput,
  },
};
</script>

<style scoped lang="scss">
@import "../sass/variables";

  .app-login {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    &-form {
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;
      max-height: 90%;
      background: $color-white;
      border-radius: $borderRadius;

      &-field {
        position: relative;
      }
    }

    svg {
      position: absolute;
      bottom: 0;
      display: block;
      transform-origin: bottom;
      animation: animated 1s cubic-bezier(.23, 1, .32, 1) forwards;
    }
  }
</style>
