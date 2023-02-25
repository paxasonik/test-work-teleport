export default {
  methods: {
    correctLogin(val) {
      return (val.toLowerCase() === 'test' || 'Введите корректный логин')
    },
  },
}
