export default {

  // Список пользователей
  userList: ({userList}) => userList,

  // Инкрементировать последнее id пользователя
  getIncrementId: ({userList}) => userList[userList.length-1]?.id + 1,

  // Общее количество пользователей
  countUsers: ({userList}) => userList.length,

}
