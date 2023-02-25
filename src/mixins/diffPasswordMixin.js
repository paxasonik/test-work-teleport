export default {
  methods: {
    diffPassword (val) {
      const val2 = this.$refs.password.value
      return (val && (val===val2) || 'Пароль не совпадает!')
    },
  },
}
