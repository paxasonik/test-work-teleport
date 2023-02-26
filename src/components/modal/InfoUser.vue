<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin add__user q-pt-sm q-pb-md modal-info__user">
      <q-card-section class="row items-center q-pb-none">
        <q-space/>
        <q-btn v-close-popup dense flat icon="close" @click="onDialogHide"/>
      </q-card-section>
      <q-card-section class="row items-center flex-center q-pb-lg">
        <div class="text-h5 q-mb-none">Добавить пользователя</div>
      </q-card-section>
      <q-card-section class="q-pa-lg modal-info__user-body">
        <div class="q-pb-sm"><span class="text-grey q-mr-sm">Идентификатор:</span> {{infoUser?.id}}</div>
        <div class="q-pb-sm"><span class="text-grey q-mr-sm">Телефон:</span> {{infoUser?.phone}}</div>
        <div class="q-pb-sm"><span class="text-grey q-mr-sm">ФИО:</span> {{infoUser?.fullName}}</div>
        <div class="q-pb-sm"><span class="text-grey q-mr-sm">Баланс:</span> {{infoUser?.balance}}</div>
        <div class="q-pb-sm"><span class="text-grey q-mr-sm">Статус:</span> {{statusName(infoUser?.status)}}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import statusNameMixin from 'src/mixins/statusNameMixin';
import { Emit } from 'src/utils/constants';

export default {
  name: "InfoUser",
  mixins: [ statusNameMixin ],
  props: {
    infoUser: {
      type: Object,
      default: () => ({}),
    }
  },
  methods: {
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit(Emit.HIDE)
    },
  }
}
</script>

<style scoped lang="scss">
.modal-info__user {
  .modal-info__user-body {
    font-size: 16px;
    &>div
      span{
        font-weight: 600;
      }
  }
}
</style>
