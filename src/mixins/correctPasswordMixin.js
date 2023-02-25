export default {
  methods: {
    correctPassword(val) {
      return (val.toLowerCase() === 'test' || 'Введите корректный пароль')
    },
  },
}
