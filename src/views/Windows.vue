<template>
  <div class="all-orders-section p-3">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1>النوافذ</h1>
    </div>

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else>

      <div class="table-responsive">
        <table class="table  table-hover">
          <thead>
          <tr class="bg-success text-white">
            <th scope="col">رأها </th>
            <th scope="col">اسم المستقبل</th>
            <th scope="col">عنوان النافذة</th>
            <th scope="col">محتوى  النافذة</th>
            <th scope="col">تاريخ الاضافه</th>
            <th scope="col">وقت المشاهدة</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="res in response.data" :key="res.id">
              <td>
                <span v-for="person in res.persons" :key="person.id">
                  <b-badge variant="danger" v-if="person.showed == 1">مشاهدة</b-badge>
                  <b-badge variant="success" v-else-if="person.showed == 0">انتظار</b-badge>
                  <br>
                </span>
              </td>
              <td>
                <span v-for="person in res.persons" :key="person.id">
                  <span v-if="res.type == 0">
                    <router-link :to="'/user/' + person.user.id">{{ person.user.name }}</router-link>
                    <br>
                  </span>
                  <span v-else-if="res.type == 1">
                    <router-link :to="'/traveller/' + person.masafr.id">{{ person.masafr.name }}</router-link>
                    <br>
                  </span>
                </span>
              </td>
              <td>{{ res.title }}</td>
              <td>{{ res.subject }}</td>
              <td>{{ res.created_at }}</td>
              <td>
                <span v-for="person in res.persons" :key="person.id">{{ person.seen_time }}</span>
                <br>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>


  </div>
</template>

<script>
import store from "../store";
import router from "../router";

export default {
name: "Windows",
  data() {
    return {
      spinner: false,
      response: ''
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

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-all-windows';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)


      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();


      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }

      this.response = responseData

      console.log(responseData)
      console.log(this.response)

      this.spinner = false;

    },
    async search() {

    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-family: 'Almarai', sans-serif;
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