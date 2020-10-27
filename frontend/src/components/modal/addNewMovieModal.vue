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
            <div class="app-form-field">
              <textInput
                :labelText="this.$t('global.titleFieild')"
                :typeInput="'text'"
                :autofocus="true"
                :value.sync="movie.title"
                :class="{'error': $validator.errors.has('title')}"
                :errorStatus="$validator.errors.has('title')"
              >
              </textInput>
              <transition name="fade-el">
                <span
                  v-if="$validator.errors.has('title')"
                  class="app__validation"
                >
                  {{ $validator.errors.first('title') }}
                </span>
              </transition>
            </div>
            <div class="app-form-field">
              <textAreaTemplate
                :labelText="this.$t('global.titleFieild')"
                :value.sync="movie.description"
                :class="{'error': $validator.errors.has('description')}"
                :errorStatus="$validator.errors.has('description')"
              />
              <transition name="fade-el">
                <span
                  v-if="$validator.errors.has('description')"
                  class="app__validation"
                >
                  {{ $validator.errors.first('description') }}
                </span>
              </transition>
            </div>
            <div class="app-form-field">
              <textInput
                :typeInput="'text'"
                :labelText="this.$t('global.year')"
                :value.sync="movie.year"
                :class="{'error': $validator.errors.has('year')}"
                :errorStatus="$validator.errors.has('year')"
              >
              </textInput>
              <transition name="fade-el">
                <span
                  v-if="$validator.errors.has('year')"
                  class="app__validation"
                >
                  {{ $validator.errors.first('year') }}
                </span>
              </transition>
            </div>
            <div class="app-form-field">
              <fileUpload />
            </div>
          </div>
        </transition>
      </div>
      <div class="app-modal-wrap-footer">
        <div class="app-modal-wrap-footer__item">
          <buttonTemplate :buttonSettings="buttonSettings" />
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
import uploadApi from '@/api/uploads/uploadApi';
import validationErrorMessage from '@/locales/validationErrorMessage';
import textInput from '@/components/elements/textInput';
import textAreaTemplate from '@/components/elements/textAreaTemplate';
import buttonTemplate from '@/components/elements/buttonTemplate';
import fileUpload from '@/components/elements/fileUpload';

export default {
  name: 'AddNewMovieModal',
  components: {
    textInput,
    buttonTemplate,
    textAreaTemplate,
    fileUpload,
  },
  data() {
    return {
      validationError: {
        text: '',
        status: false,
      },
      movie: {
        title: '',
        description: '',
        year: '',
      },
      selectedFile: null,
      file: '',
      message: '',
    };
  },
  computed: {
    buttonSettings() {
      return {
        buttonText: this.$t('global.send'),
        primaryButton: true,
        buttonClickEvent: this.sendForm,
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
    const dict = {
      en: {
        custom: {
          title: {
            required: validationErrorMessage.en.inputRequired,
          },
          description: {
            required: validationErrorMessage.en.inputRequired,
          },
          year: {
            required: validationErrorMessage.en.inputRequired,
          },
        },
      },
      ru: {
        custom: {
          title: {
            required: validationErrorMessage.ru.inputRequired,
          },
          description: {
            required: validationErrorMessage.ru.inputRequired,
          },
          year: {
            required: validationErrorMessage.ru.inputRequired,
          },
        },
      },
    };
    this.$validator.localize(dict);
    this.$validator.attach({ name: 'title', rules: { required: true } });
    this.$validator.attach({ name: 'description', rules: { required: true } });
    this.$validator.attach({ name: 'year', rules: { required: true } });
  },
  methods: {
    onSelect() {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const file = this.$refs.file.files[0];
      this.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = 'Filetype is wrong!!';
      }
      if (file.size > 500000) {
        this.message = 'Too large, max size allowed is 500kb';
      }
    },
    async onSubmit() {
      console.log('wertey');
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        await uploadApi.addPreview(formData);
        this.message = 'Uploaded!!';
      } catch (err) {
        console.log(err);
        this.message = err.response.data.error;
      }
    },
    closeModal() {
      this.$emit('closeModal');
    },
    sendForm() {
      this.$validator.validateAll({
        title: this.movie.title,
        description: this.movie.description,
        year: this.movie.year,
      }).then((result) => {
        if (result) {
          moviesApi.addNewMovie(this.movie).then((resp) => {
            this.movie._id = resp.data._id;
            this.moviesList.unshift(this.movie);
            this.closeModal();
          }).catch((e) => {
            console.log(e);
          });
        }
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
