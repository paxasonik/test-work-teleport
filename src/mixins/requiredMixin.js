export default {
  methods: {
    required(val) {
      return (val && val.length > 0 || 'Поле должно быть заполнено')
    },
  },
}
