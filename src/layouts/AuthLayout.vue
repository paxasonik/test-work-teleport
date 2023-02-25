<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="flex justify-between">
          <div class="">
            Title
          </div>
          <q-btn label="Выйти" flat class="text-white text-capitalize" @click="logout"/>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { nameToken } from 'src/utils/constants'

export default {
  name: "AuthLayout",
  methods: {
    logout() {
      localStorage.removeItem(nameToken)
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style scoped>

</style>
