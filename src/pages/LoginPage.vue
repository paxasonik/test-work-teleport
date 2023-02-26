<template>
  <q-page class="window-height window-width row justify-center items-center login">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card class="shadow-0">
          <q-card-section>
            <h4 class="text-h5 q-mb-none q-mt-xl text-center text-grey">Авторизация</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-sm">
              <q-input
                ref="login"
                v-model="login"
                :rules="[ required, short, correctLogin ]"
                type="text"
                clearable
                outlined
                label="Логин"
                lazy-rules
                class="q-pb-lg"
              >
              </q-input>
              <q-input
                ref="password"
                v-model="password"
                :rules="[ required, short, correctPassword ]"
                :type="passwordVisibility.passwordFieldType"
                clearable
                outlined
                label="Пароль"
                lazy-rules
                class="q-pb-lg"
              >
                <template v-slot:append>
                  <switch-visibility
                    :passwordVisibility="passwordVisibility"
                    @[Emit.SET_VISIBILITY]="setVisibility"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg flex-center">
            <q-btn
              :label="btnLabelExit"
              class="text-white bg-blue shadow-0 my-button"
              @click="submit"/>
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm q-mb-xl">
            <q-btn :label="btnLabelReg" flat class="text-grey-6 text-capitalize" @click="registration"/>
            <registration-modal
              v-model="isShowModal"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { Emit, btnLabelReg, btnLabelExit, nameVisibilityIcon, passwordType, nameToken, notifyIcon, notifyColor, notifyMessage } from 'src/utils/constants'
import RegistrationModal from 'components/modal/RegistrationModal.vue';
import requiredMixin from 'src/mixins/requiredMixin';
import shortMixin from 'src/mixins/shortMixin';
import correctPasswordMixin from 'src/mixins/correctPasswordMixin';
import correctLoginMixin from 'src/mixins/correctLoginMixin';
import SwitchVisibility from 'components/SwitchVisibility.vue';

const $q = useQuasar()

export default {
  name: 'IndexPage',
  components: { SwitchVisibility, RegistrationModal },
  mixins: [ requiredMixin, shortMixin, correctPasswordMixin, correctLoginMixin ],
  data() {
    return {
      $q,
      Emit,
      btnLabelReg,
      btnLabelExit,
      login: '',
      password: '',
      isShowModal: false,
      passwordVisibility: {
        visibilityIcon: nameVisibilityIcon,
        passwordFieldType: passwordType,
        isVisibility: false,
      },
    }
  },
  computed: {
    randomNumber() {
      return Math.floor(Math.random() * 1E16)
    },
  },
  methods: {
    submit() {
      this.$refs.login.validate()
      this.$refs.password.validate()

      if (!this.$refs.login.hasError && !this.$refs.password.hasError) {
        this.$q.notify({
          icon: notifyIcon,
          color: notifyColor,
          message: notifyMessage
        })
        localStorage.setItem(nameToken, String(this.randomNumber))
        this.$router.push({name: 'HomeAuth'})
      }
    },
    setVisibility(value) {
      this.passwordVisibility = value
    },
    registration() {
      this.isShowModal = !this.isShowModal
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  .q-card {
    width: 500px;
    min-height: 330px;
    border-radius: 16px;
    filter: drop-shadow(0px 8px 12px rgba(85, 132, 255, 0.35));
  }
  .q-card__actions {
    button {
      min-width: 185px;
      filter: drop-shadow(0px 8px 12px rgba(85, 132, 255, 0.35));
    }
  }
}
</style>
