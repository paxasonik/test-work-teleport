<template>
  <q-layout view="hHh lpR fFf">

    <Header/>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import Header from "components/Header.vue";

export default {
  name: "AuthLayout",
  components: { Header },
}
</script>

<style scoped>

</style>
