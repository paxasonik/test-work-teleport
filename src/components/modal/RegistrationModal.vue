<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin add__user q-pt-sm q-pb-md modal-info__user">
      <q-card-section class="row items-center q-pb-none">
        <q-space/>
        <q-btn v-close-popup dense flat icon="close" @click="onDialogHide"/>
      </q-card-section>
      <q-card-section class="row items-center flex-center q-pb-lg">
        <div class="text-h5 q-mb-none text-grey">Регистрация</div>
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
            class="q-pb-lg"
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
            class="q-pb-lg"
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
            class="q-pb-lg"
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
      <q-card-actions class="q-px-lg q-pb-xl flex-center">
        <q-btn
          :label="btnLabelReg"
          class="text-white bg-blue my-button"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>


<script>
import { useQuasar } from 'quasar'
import { Emit, btnLabelReg, nameVisibilityIcon, passwordType, nameToken, notifyIcon, notifyColor, notifyMessage } from 'src/utils/constants'
import requiredMixin from 'src/mixins/requiredMixin';
import shortMixin from 'src/mixins/shortMixin';
import diffPasswordMixin from 'src/mixins/diffPasswordMixin';
import validationEmailMixin from 'src/mixins/validationEmailMixin';
import SwitchVisibility from 'components/SwitchVisibility.vue';

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
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.email = ''
      this.username = ''
      this.password = ''
      this.repassword = ''
      this.$emit(Emit.HIDE)
    },
    onOKClick () {
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

        this.$emit(Emit.OK)
      }
    },
    setVisibility(value) {
      this.passwordVisibility = value
    },
  }
}
</script>

<style scoped>

</style>
