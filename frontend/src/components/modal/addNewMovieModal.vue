<template>
  <div class="app-modal">
    <div class="app-modal-wrap">
      <div class="app-modal-wrap-header">
        <div class="app-modal-wrap-header__title">
          {{ $t('addNewMovieModal.title') }}
        </div>
        <div
          class="app-modal-wrap-header__close"
          @click="closeModal"
        >
          <i class="custom-icon-close app-modal-wrap-header__icon"></i>
        </div>
      </div>
      <div class="app-modal-wrap-content">
        <transition
          name="fade-content"
          mode="out-in"
        >
          <div>
            <div class="admin-form-field">
              <div class="admin-form-field__label">
                <!--                {{ $t('requestCallModal.name') }}--> 123
              </div>
              <!--              <textInput-->
              <!--                :typeInput="'text'"-->
              <!--                :autofocus="true"-->
              <!--                :value.sync="user.name"-->
              <!--                :class="{'error': $validator.errors.has('name')}"-->
              <!--                :errorStatus="$validator.errors.has('name')"-->
              <!--              >-->
              <!--              </textInput>-->
              <!--              <transition name="fade-el">-->
              <!--                <span-->
              <!--                  v-show="$validator.errors.has('name')"-->
              <!--                  class="validation"-->
              <!--                >-->
              <!--                  {{ $validator.errors.first('name') }}-->
              <!--                </span>-->
              <!--              </transition>-->
            </div>
            <div class="admin-form-field">
              <div class="admin-form-field__label">
                <!--                {{ $t('landingPage.contactsPage.phone') }}--> 123
              </div>
              <!--              <textInput-->
              <!--                :typeInput="'tel'"-->
              <!--                :value.sync="user.phone"-->
              <!--                :class="{'error': $validator.errors.has('phone')}"-->
              <!--                :errorStatus="$validator.errors.has('phone')"-->
              <!--                :phone="true"-->
              <!--              >-->
              <!--              </textInput>-->
              <!--              <transition name="fade-el">-->
              <!--                <span-->
              <!--                  v-show="$validator.errors.has('phone')"-->
              <!--                  class="validation"-->
              <!--                >-->
              <!--                  {{ $validator.errors.first('phone') }}-->
              <!--                </span>-->
              <!--              </transition>-->
            </div>
          </div>
        </transition>
        <transition name="fade-el">
          <div
            v-if="validationError.status"
            class="app-modal__error"
          >
            {{ validationError.text }}
          </div>
        </transition>
      </div>
      <div class="app-modal-wrap-footer">
        <div class="app-modal-wrap-footer__item">
          <button
            class="app__button app__button_primary"
            @click="sendForm"
          >
            {{ $t('global.send') }}
          </button>
        </div>
      </div>
    </div>
    <div
      v-shortkey="['esc']"
      class="app-modal__overlay"
      @click="closeModal"
      @shortkey="closeModal"
    ></div>
  </div>
</template>

<script>
import moviesApi from '@/api/movies/moviesApi';

export default {
  name: 'AddNewMovieModal',
  data() {
    return {
      validationError: {
        text: '',
        status: false,
      },
      movie: {
        title: '',
        description: '',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    sendForm() {
      moviesApi.addNewMovie().then((resp) => {
        console.log('resp', resp.data);
      }).catch((e) => {
        console.log(e);
      });
    },
  },
};
</script>

<style scoped lang="scss">
  .app-modal-wrap {
    width: 400px;
  }
</style>
