<template>
  <q-page>
    <q-table
      title="Пользователи"
      :rows="userList"
      :columns="columns"
      :filter="filter"
      row-key="name"
      v-model:pagination="pagination"
      hide-pagination
      class="shadow-0 q-pa-md table__user"
    >
      <template v-slot:top-right>
        <q-input outlined v-model="filter" placeholder="Поиск">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-uppercase"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" @click="showModal(props)" class="cursor-pointer">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <div class="flex items-center justify-between" v-if="col.name === 'status'">
              <span class="q-pt-sm">{{ statusName(col.value) }}</span>
              <q-btn  size="md" @click.stop="changeStatus(props)" :color="col.value ? 'green' : 'red'" label="Поменять статус" />
            </div>
            <div class="column items-start" v-else>
              {{ col.value }}
            </div>
          </q-td>
        </q-tr>
      </template>

    </q-table>

    <div class="flex items-center justify-between q-pa-md table__user-bottom">
      <div class="flex items-center">
        <q-pagination
          direction-links
          gutter="20px"
          color="grey"
          active-color="primary"
          v-model="pagination.page"
          :max="pagesNumber"
        />
        <span class="q-ml-xl">Всего {{ countUsers }} записей</span>
      </div>
      <div class="flex items-center">
        <span class="q-mr-xl">Показывать на странице</span>
        <q-select outlined v-model="pagination.rowsPerPage" :options="options" />
      </div>
    </div>
  </q-page>

  <info-user
    v-model="isShowModal"
    :infoUser="infoUser"
  >
  </info-user>
</template>

<script>
import InfoUser from 'components/modal/InfoUser.vue';
import statusNameMixin from 'src/mixins/statusNameMixin';
import { Getters, Mutations, columns, pagination, options } from 'src/utils/constants';
import { mapGetters } from 'vuex'

export default {
  name: "HomeAuthPage",
  mixins: [ statusNameMixin ],
  components: {InfoUser},
  data() {
    return {
      columns,
      pagination,
      options,
      filter: '',
      isShowModal: false,
      infoUser: {},
    }
  },
  computed: {
    ...mapGetters({
      userList: Getters.userList,
      countUsers: Getters.countUsers,
    }),
    pagesNumber() {
      return Math.ceil( this.userList.length / this.pagination.rowsPerPage )
    },
  },
  methods: {
    changeStatus(value) {
      this.$store.commit( Mutations.changeStatus, value?.rowIndex )
    },
    showModal(value) {
      this.isShowModal = !this.isShowModal
      this.infoUser = this.isShowModal ? value?.row : {}
    }
  },
}
</script>

<style scoped lang="scss">
.table__user {
  th {
    text-align: left !important;
    font-size: 16px;
    color: #BAC1D1;
  }
  td {
    font-size: 14px;
  }
}
.table__user-bottom {
  span {
    color: #BAC1D1 !important;
  }
}
</style>
