<template>
  <q-header class="bg-white text-grey q-pt-lg header">
    <q-toolbar>
      <q-toolbar-title class="row">
        <router-link :to="{name: 'HomeAuth'}" class="col-2 text-grey">Logo</router-link>
        <div class="col"></div>
        <div class="flex flex-center justify-between col-4">
          <q-btn label="Добавить пользователя" class="my-button border-blue text-capitalize" @click="addUser"/>
          <q-btn label="Выйти" class="my-button border-blue text-capitalize" @click="logout"/>
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>

  <add-user-modal
    v-model="isShowModal"
  />

</template>

<script>
import { nameToken } from 'src/utils/constants';
import AddUserModal from "components/modal/AddUserModal.vue";

export default {
  name: "Header",
  components: { AddUserModal },
  data() {
    return {
      search: '',
      isShowModal: false,
    }
  },
  methods: {
    addUser() {
      this.isShowModal = !this.isShowModal
    },
    logout() {
      localStorage.removeItem(nameToken)
      this.$router.push({name: 'Login'})
    },
  }
}
</script>

<style scoped lang="scss">
.header {
  a {
    text-decoration: none;
  }
}
</style>
