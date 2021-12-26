<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1>المسافرون الموثقون</h1>
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


      <h2 class="mt-4 mb-3">المسافرون الموثقون</h2>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
          <tr class="bg-success text-white">
            <th scope="col">#</th>
            <th scope="col">الصورة</th>
            <th scope="col">الاسم</th>
            <th scope="col">الايميل</th>
            <th scope="col">الجنس</th>
            <th scope="col">رقم الهاتف</th>
            <th scope="col">رقم الهوية</th>
            <th scope="col">الجنسية</th>
            <th scope="col">الرصيد</th>
            <th scope="col">التوثيق</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="res in response.data" :key="res.id">
              <td></td>
              <td><b-avatar :src="res.photo"></b-avatar></td>
              <td>
                <router-link :to="'/traveller/' + res.id">{{ res.name }}</router-link>
              </td>
              <td>{{ res.email }}</td>
              <td>
                <span v-if="res.gender = 0">انثي</span>
                <span v-if="res.gender = 1">ذكر</span>
              </td>
              <td>{{ res.phone }}</td>
              <td>{{ res.national_id_number }}</td>
              <td>{{ res.nationality }}</td>
              <td>{{ res.balance }}</td>
              <td>
                <span v-if="res.trust = 0"><b-badge variant="danger">غير موثق</b-badge></span>
                <span v-else-if="res.trust = 1"><b-badge variant="success">موثق</b-badge></span>
              </td>
              <td class="d-flex icons">
                <router-link :to="'/traveller/' + res.id"><i class="fas fa-user"></i></router-link> |
                <router-link :to="'/edit-traveller/' + res.id"><i class="fas fa-user-edit"></i></router-link> |
                <span class="a" @click="deleteUser(res.id)"><i class="fas fa-user-times"></i></span>
              </td>

            </tr>
          </tbody>
        </table>

        <div v-if="msg" class="mt-2 d-flex justify-content-center">
          {{ msg }}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import router from "@/router";

export default {
  name: "Travellers",
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

      const url = 'https://msafr.we-work.pro/api/auth/admin/masafrs-trusts';

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


      this.response = responseData.data
      this.spinner = false;

    },
    remove() {
      this.$router.replace("/traveller")
    },
    async deleteUser(id) {
      this.spinner = false
      this.response = false

      const url = 'https://msafr.we-work.pro/api/auth/admin/delete-masafr';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "masafr_id": id
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