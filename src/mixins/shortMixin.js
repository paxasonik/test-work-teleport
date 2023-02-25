export default {
  methods: {
    short(val) {
      return (val && val.length > 3 || 'Значение слишком короткое')
    },
  },
}
