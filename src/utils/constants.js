import {mapGetters} from "vuex";

const btnLabelReg = 'Зарегистрироваться';
const btnLabelExit = 'Вход';

const nameVisibilityIcon = 'visibility';
const nameNotVisibilityIcon = 'visibility_off';

const passwordType = 'password';
const textType = 'text';

const nameToken = 'xsrf_token';

const notifyIcon = 'done';
const notifyColor = 'positive';
const notifyMessage = 'Авторизация';

const columns = [
  { name: 'id', label: 'Идентификатор', field: 'id' },
  { name: 'phone', label: 'Телефон', field: 'phone' },
  { name: 'fullName', label: 'ФИО', field: 'fullName' },
  { name: 'balance', label: 'Баланс', field: 'balance' },
  { name: 'status', label: 'Статус', field: 'status' },
]

const pagination = {
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
}

const options = [
  10, 15, 20, 30, 40
]

const Emit = {
  SET_VISIBILITY: 'setVisibility',
  HIDE: 'hide',
  OK: 'ok',
};

const Getters = {
  getIncrementId: 'home/getIncrementId',
  userList: 'home/userList',
  countUsers: 'home/countUsers',
};

const Mutations = {
  addUser: 'home/addUser',
  changeStatus: 'home/changeStatus',
};

export {
  Emit,
  Getters,
  Mutations,
  btnLabelReg,
  btnLabelExit,
  nameVisibilityIcon,
  nameNotVisibilityIcon,
  passwordType,
  textType,
  nameToken,
  notifyIcon,
  notifyColor,
  notifyMessage,
  columns,
  pagination,
  options,
}
