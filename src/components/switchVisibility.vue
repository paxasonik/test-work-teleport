<template>
  <q-icon
    :name="passwordVisibility.visibilityIcon" class="cursor-pointer" @click="switchVisibility"/>
</template>

<script>
import { Emit, nameVisibilityIcon, nameNotVisibilityIcon, passwordType, textType } from 'src/utils/constants'

export default {
  name: "switchVisibility",
  props: {
    passwordVisibility: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    switchVisibility() {
      let { isVisibility, passwordFieldType, visibilityIcon } = this.passwordVisibility

      isVisibility = !isVisibility
      passwordFieldType = isVisibility ? textType : passwordType
      visibilityIcon = isVisibility ? nameNotVisibilityIcon : nameVisibilityIcon
      this.$emit(Emit.SET_VISIBILITY, { isVisibility, visibilityIcon, passwordFieldType })
    },
  }
}
</script>

<style scoped>

</style>
