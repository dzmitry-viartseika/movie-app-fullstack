<template>
  <div class="landing-page-modal">
    <div class="landing-page-modal-wrap">
      <div class="landing-page-modal-wrap-header">
        <div class="landing-page-modal-wrap-header__title">
          123
        </div>
        <div
          class="landing-page-modal-wrap-header__close"
          @click="closeModal"
        >
          <i class="ub-icon-close landing-page-modal-wrap-header__icon"></i>
        </div>
      </div>
      <div class="landing-page-modal-wrap-content">
        <transition
          name="fade-content"
          mode="out-in"
        >
          <div>
            <div class="admin-form-field">
              <div class="admin-form-field__label">
                {{ $t('requestCallModal.name') }}
              </div>
              <textInput
                :typeInput="'text'"
                :autofocus="true"
                :value.sync="user.name"
                :class="{'error': $validator.errors.has('name')}"
                :errorStatus="$validator.errors.has('name')"
              >
              </textInput>
              <transition name="fade-el">
                <span
                  v-show="$validator.errors.has('name')"
                  class="validation"
                >
                  {{ $validator.errors.first('name') }}
                </span>
              </transition>
            </div>
            <div class="admin-form-field">
              <div class="admin-form-field__label">
                {{ $t('landingPage.contactsPage.phone') }}
              </div>
              <textInput
                :typeInput="'tel'"
                :value.sync="user.phone"
                :class="{'error': $validator.errors.has('phone')}"
                :errorStatus="$validator.errors.has('phone')"
                :phone="true"
              >
              </textInput>
              <transition name="fade-el">
                <span
                  v-show="$validator.errors.has('phone')"
                  class="validation"
                >
                  {{ $validator.errors.first('phone') }}
                </span>
              </transition>
            </div>
          </div>
        </transition>
        <transition name="fade-el">
          <div
            v-if="validationError.status"
            class="landing-page-modal__error"
          >
            {{ validationError.text }}
          </div>
        </transition>
      </div>
      <div class="landing-page-modal-wrap-footer">
        <div class="landing-page-modal-wrap-footer__item">
          <button
            class="landing-page__button landing-page__button_primary"
            @click="sendForm"
          >
            send
          </button>
        </div>
      </div>
    </div>
    <div
      v-shortkey="['esc']"
      class="landing-page-modal__overlay"
      @click="closeModal"
      @shortkey="closeModal"
    ></div>
  </div>
</template>

<script>
import validationErrorMessage from '@/locales/validationErrorMessage';
import textInput from '@/components/fields/textInput';
import formApi from '@/api/forms/formApi';

export default {
  name: 'RequestCall',
  components: {
    textInput,
  },
  data: () => ({
    activeBlock: 1,
    validationError: {
      text: '',
      status: false,
    },
    user: {
      name: '',
      phone: '',
    },
  }),
  beforeMount() {
    const dict = {
      en: {
        custom: {
          name: {
            required: validationErrorMessage.en.inputRequired,
          },
          phone: {
            required: validationErrorMessage.en.inputRequired,
          },
        },
      },
      ru: {
        custom: {
          name: {
            required: validationErrorMessage.ru.inputRequired,
          },
          phone: {
            required: validationErrorMessage.ru.inputRequired,
          },
        },
      },
    };
    this.$validator.localize(dict);
    this.$validator.attach({ name: 'name', rules: { required: true } });
    this.$validator.attach({ name: 'phone', rules: { required: true } });
  },
  methods: {
    closeModal() {
      this.$emit('closeRequestCallModal');
    },
    sendForm() {
      this.$validator.validateAll({
        name: this.user.name,
        phone: this.user.phone,
      }).then((result) => {
        if (result) {
          const form = {
            name: this.user.name,
            phone: this.user.phone,
          };
          formApi.requestCall(form).then(() => {
            this.activeBlock = 2;
            setTimeout(() => {
              this.$emit('closeRequestCallModal');
            }, 3000);
          }).catch((err) => {
            if (err.response && (err.response.data.statusCode === 500)) {
              this.validationError = {
                status: true,
                text: this.$t('requestModal.validationPhoneText'),
              };
              setTimeout(() => {
                this.validationError = {
                  status: false,
                  text: '',
                };
              }, 3000);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/sass/variables";

.landing-page-modal-wrap {
  width: 396px;
}

</style>
