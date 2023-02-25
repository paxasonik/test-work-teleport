<template>
  <q-dialog v-model="icon" >
    <q-card class="registration">
      <q-card-section class="row items-center q-pb-none">
        <q-space/>
        <q-btn v-close-popup dense flat icon="close" round/>
      </q-card-section>

      <q-card-section class="row items-center q-pb-none flex-center">
        <div class="text-h5 q-mb-none">Регистрация</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-px-sm q-pt-sm">
          <q-input
            ref="email"
            v-model="email"
            :rules="[ required, validationEmail, short ]"
            clearable
            label="Email"
            lazy-rules
            outlined
            type="email"
          >
          </q-input>
          <q-input
            ref="username"
            v-model="username"
            :rules="[ required, short ]"
            clearable
            label="Пользователь"
            lazy-rules
            outlined
            type="username"
          >
          </q-input>
          <q-input
            ref="password"
            v-model="password"
            :rules="[ required, short ]"
            :type="passwordVisibility.passwordFieldType"
            clearable
            label="Пароль"
            lazy-rules
            outlined
          >
            <template v-slot:append>
              <switch-visibility
                :passwordVisibility="passwordVisibility"
                @[Emit.SET_VISIBILITY]="setVisibility"
              />
            </template>
          </q-input>
          <q-input
            ref="repassword"
            v-model="repassword"
            :rules="[ required, short, diffPassword ]"
            :type="passwordVisibility.passwordFieldType"
            clearable
            label="Повторить пароль"
            lazy-rules
            outlined
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
      <q-card-actions class="q-px-lg q-pb-xl flex-center">
        <q-btn
          :label="btnLabelReg"
          class="text-white text-capitalize bg-blue"
          @click="submit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-btn :label="btnLabelReg" flat class="text-grey-6 text-capitalize" @click="icon = true"/>
</template>


<script>
import { useQuasar } from 'quasar'
import { Emit, btnLabelReg, nameVisibilityIcon, passwordType, nameToken, notifyIcon, notifyColor, notifyMessage } from 'src/utils/constants'
import requiredMixin from 'src/mixins/requiredMixin';
import shortMixin from 'src/mixins/shortMixin';
import diffPasswordMixin from 'src/mixins/diffPasswordMixin';
import validationEmailMixin from 'src/mixins/validationEmailMixin';
import SwitchVisibility from 'components/switchVisibility.vue';

const $q = useQuasar()

export default {
  name: 'RegistrationModal',
  components: { SwitchVisibility },
  mixins: [ requiredMixin, shortMixin, diffPasswordMixin, validationEmailMixin ],
  data() {
    return {
      $q,
      Emit,
      btnLabelReg,
      email: '',
      username: '',
      password: '',
      repassword: '',
      icon: false,
      passwordVisibility: {
        isVisibility: false,
        visibilityIcon: nameVisibilityIcon,
        passwordFieldType: passwordType,
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
      this.$refs.email.validate()
      this.$refs.username.validate()
      this.$refs.password.validate()
      this.$refs.repassword.validate()

      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.$q.notify({
          icon: notifyIcon,
          color: notifyColor,
          message: notifyMessage
        })
        localStorage.setItem(nameToken, String(this.randomNumber))
        this.$router.push({ name: 'HomeAuth' })
      }
    },
    setVisibility(value) {
      this.passwordVisibility = value
    },
  }
}
</script>

<style scoped lang="scss">
.registration {
  width: 100%;
  .q-card__section {
    h4 {
      color: #545E79;
    }
  }
  .q-card__actions {
    button {
      border-radius: 6px;
      min-width: 185px;
      min-height: 40px;
    }
  }
}
</style>
