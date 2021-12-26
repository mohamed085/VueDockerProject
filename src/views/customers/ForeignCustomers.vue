<template>
  <div class="pb-5">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1>العملاء الاجانب</h1>
    </div>

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else>
      <div class="search-inputs mb-3 mt-2 d-flex flex-wrap">
        <b-form class="search-form d-flex" @submit.prevent="remove">
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-times"></i></b-button>
        </b-form>
      </div>

      <h2 class="mt-4 mb-3">العملاء الموجودين</h2>
      <table class="table table-hover">
        <thead>
        <tr class="bg-success text-white">
          <th scope="col">الصورة</th>
          <th scope="col">الاسم</th>
          <th scope="col">الجنسية</th>
          <th scope="col">النوع</th>
          <th scope="col">التقيم</th>
          <th scope="col">حالة العميل</th>
          <th scope="col">رصيد</th>
          <th scope="col">عدد الطلبات</th>
          <th scope="col">الطلبات الفعالة</th>
          <th scope="col">متخذ القرار</th>
          <th scope="col">عدد الشكاوي</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="res in response.data" :key="res.id">
          <td>
            <b-avatar :src="res.photo"></b-avatar>
          </td>
          <td>
            <router-link :to="'/user/' + res.id ">
              {{ res.name }}
            </router-link>
          </td>
          <td>{{ res.nationality }}</td>
          <td>
            <span v-if="res.gender == 1">ذكر</span>
            <span v-if="res.gender == 0">انثي</span>
          </td>
          <td>{{ res.rate }}</td>
          <td>
            <b-badge variant="danger" v-if="res.is_verified == 0">لم يتم تاكيد كود التحقق</b-badge>
            <b-badge variant="success" v-else-if="res.is_verified == 1">تم تاكيد كود التحقق</b-badge>
          </td>
          <td>{{ res.balance }}</td>
          <td>{{ res.requests_count }}</td>
          <td>{{ res.request_trip_not_finished_count }}</td>
          <td>
            <span v-if="res.admin">{{ res.admin.name }}</span>
          </td>
          <td>{{ res.complains_count }}</td>
          <td class="d-flex icons">
            <router-link :to="'/user/' + res.id"><i class="fas fa-user"></i></router-link> |
            <router-link :to="'/edit-customer/' + res.id"><i class="fas fa-user-edit"></i></router-link> |
            <span class="a" @click="deleteUser(res.id)"><i class="fas fa-user-times"></i></span>
          </td>
        </tr>
        </tbody>
      </table>

      <div v-if="msg" class="d-flex justify-content-center">
        {{ msg }}
      </div>

    </div>

  </div>
</template>

<script>
import router from "../../router";
import store from "../../store";

export default {
  name: "Customers",
  data() {
    return {
      nameKey: '',
      emailKey: '',
      nationalityKey: '',
      phoneKey: '',
      idKey: '',
      response: '',
      spinner: false,
      msg: ''
    }
  },
  created() {
    if (!store.getters.isAuthenticated) {
      router.push('/login')
    }
    this.loadData()
  },
  methods:{
    async loadData() {
      this.spinner = true;

      const url = 'https://msafr.we-work.pro/api/auth/admin/users-foreigners';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (responseData.data.data.length > 0) {
        this.response = responseData.data
      } else {
        this.msg = "لا يوجد عملاء الان"
      }

      this.spinner = false;

    },
    search(type) {
      console.log(type)
    },
    remove() {
      this.$router.replace("/customers")
    },
    async deleteUser(id) {
      this.spinner = false
      this.response = false

      const url = 'https://msafr.we-work.pro/api/auth/admin/delete-user';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "user_id": id
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      await fetch(url, requestOptions);

      this.spinner = false

      await this.loadData()

    }

  }
}
</script>

<style scoped>
h1, h2 {
  font-family: 'Almarai', sans-serif;
}

.table .icons a {
  margin: 0 5px;
  color: #111;
}

.table .icons a:hover {
  color: #0a53be;
}

.search-form {
  border: 1px solid #ddd;
  padding: 0;
  border-radius: 7px;
  margin: 5px;
  background-color: #ffffff;
}

.search-form input {
  border: none;
}

.search-form button {
  padding: 0 5px;
}

a, .a {
  color: #111111;
  text-decoration: none;
  padding: 2px 5px;
  cursor: pointer;
}

a:hover, .a:hover {
  color: #198754 !important;
  border-bottom: 1px solid #198754;
  padding: 2px 5px;
}

</style>