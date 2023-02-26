export default {

  // Поменять статус пользователя
  changeStatus(state, rowIndex) {
    state.userList[rowIndex].status = !state.userList[rowIndex].status
  },

  // Добавить нового пользователя
  addUser(state, user) {
    state.userList.push(user)
  },

}
