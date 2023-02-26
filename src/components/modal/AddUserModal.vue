<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin add__user q-pt-sm q-pb-md">
      <q-card-section class="row items-center q-pb-none">
        <q-space/>
        <q-btn v-close-popup dense flat icon="close" @click="onDialogHide"/>
      </q-card-section>
      <q-card-section class="row items-center q-pb-none flex-center">
        <div class="text-h5 q-mb-none">Добавить пользователя</div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-px-sm q-pt-sm">
          <q-input
            ref="fullName"
            v-model="fullName"
            :rules="[ required ]"
            clearable
            label="ФИО"
            lazy-rules
            outlined
            type="text"
            class="q-pb-lg"
          >
          </q-input>
          <q-input
            ref="phone"
            v-model="phone"
            clearable
            label="Телефон"
            outlined
            type="text"
            class="q-pb-lg"
            mask="phone"
          >
          </q-input>
          <q-input
            ref="balance"
            v-model="balance"
            clearable
            label="Баланс"
            outlined
            type="text"
            class="q-pb-lg"
          >
          </q-input>
        </q-form>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" label="Добавить" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import requiredMixin from 'src/mixins/requiredMixin';
import { Emit, Getters, Mutations } from 'src/utils/constants';
import { mapGetters } from 'vuex';

export default {
  name: "AddUserModal",
  mixins: [ requiredMixin ],
  data() {
    return {
      fullName: '',
      phone: '',
      balance: '',
    }
  },
  computed: {
    ...mapGetters({
      getIncrementId: Getters.getIncrementId,
    }),
  },
  methods: {
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.phone = ''
      this.fullName = ''
      this.balance = ''
      this.$emit(Emit.HIDE)
    },
    onOKClick () {
      const { getIncrementId, phone, fullName, balance } = this

      if (!this.$refs.fullName.hasError) {
        this.$store.commit( Mutations.addUser, { id: getIncrementId, phone, fullName, balance, status: true } )

        this.phone = ''
        this.fullName = ''
        this.balance = ''

        this.$emit(Emit.OK)
        this.hide()
      }
    },
  },
}
</script>

<style scoped>

</style>
