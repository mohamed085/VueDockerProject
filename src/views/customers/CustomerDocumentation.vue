<template>
  <div class="p-3">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
      <h1>توثيق العملاء والمسافرين</h1>
    </div>

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else>

      <div class="search-inputs mb-3 mt-2 d-flex flex-wrap">

        <b-form class="search-form d-flex" @submit.prevent="searchByNationality">
          <b-form-input v-model="nationalityKey" required placeholder="بحث بالجنسية"></b-form-input>
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
        </b-form>

        <b-form class="search-form d-flex" @submit.prevent="searchByPhone">
          <b-form-input v-model="phoneKey" required placeholder="بحث بالجوال"></b-form-input>
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
        </b-form>

        <b-form class="search-form d-flex" @submit.prevent="searchById">
          <b-form-input v-model="idKey" required placeholder="بحث برقم الهوايه"></b-form-input>
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
        </b-form>

        <b-form class="search-form d-flex" @submit.prevent="remove">
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-times"></i></b-button>
        </b-form>

      </div>

      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
          <tr class="bg-success text-white">
            <th scope="col">الصورة</th>
            <th scope="col">الاسم</th>
            <th scope="col">النوع</th>
            <th scope="col">نوع التعديل</th>
            <th scope="col">الجنسية</th>
            <th scope="col">تاريخ الانضمام</th>
            <th scope="col">القرار</th>
            <th scope="col">قبول التوثيق</th>
            <th scope="col">متخذ القرار</th>
            <th scope="col">وقت الطلب</th>
            <th scope="col">تحرير البيانات</th>
          </tr>
          </thead>
          <tbody >
          <tr v-for="res in responseData" :key="res.id">
            <td>
              <b-avatar :src="res.id_photo"></b-avatar>
            </td>
            <td>
              <router-link v-if="res.type == 0" :to="'/user/' + res.person_id">{{ res.name }}</router-link>
              <router-link v-if="res.type == 1" :to="'/traveller/' + res.person_id">{{ res.name }}</router-link>
            </td>
            <td>
              <span v-if="res.type == 0">عميل</span>
              <span v-if="res.type == 1">مسافر</span>
            </td>
            <td>
              <b-badge variant="warning" v-if="res.update_type == 0">بيانات</b-badge>
              <b-badge variant="danger" v-if="res.update_type == 1">توثيق</b-badge>
              <b-badge variant="primary" v-if="res.update_type == 2">بيانات وتوثيق</b-badge>
            </td>
            <td>{{ res.nationality }}</td>
            <td>-</td>
            <td>
              <b-badge variant="warning" v-if="res.admin_response == 0">لم يتم الرد</b-badge>
              <b-badge variant="success" v-else-if="res.admin_response == 1">تم القبول</b-badge>
              <b-badge variant="danger" v-else-if="res.admin_response == -1">مرفوض</b-badge>
            </td>
            <td>{{ res.updated_at }}</td>
            <td>{{ res.decision_maker }}</td>
            <td>{{ res.created_at }}</td>
            <td class="d-flex icons">
              <router-link :to="'/edit-customer-documentation/' + res.type + '/' + res.person_id "><i class="fas fa-user-edit"></i></router-link>
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
import store from "../../store";
import router from "../../router";

export default {
  name: "CustomerDocumentation",
  data() {
    return {
      nameKey: '',
      emailKey: '',
      nationalityKey: '',
      phoneKey: '',
      idKey: '',
      spinner: false,
      responseData: '',
      msg: ''
    }
  },
  created() {
    if (!store.getters.isAuthenticated) {
      router.push('/login')
    }
    this.loadData()
  },
  methods: {
    async loadData() {
      this.spinner = true;

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-trusted-info';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (responseData.data.data.length > 0) {
        this.responseData = responseData.data.data
      } else {
        this.msg = "لا يوجد عملاء الان"
      }

      this.spinner = false;

    },
    async searchByNationality() {
      this.responseData = ''

      this.spinner = true

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-trusted-info';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "filter": 0,
        "nationality": this.nationalityKey,
        "paginateCount": 100,
        "page": 1
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (responseData.data.data.length > 0) {
        this.responseData = responseData.data.data
      } else {
        this.msg = "لاتوجد بيانات"
      }


      this.spinner = false;


    },
    async searchByPhone() {
      this.responseData = ''

      this.spinner = true

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-trusted-info';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "filter": 1,
        "phone": this.phoneKey,
        "paginateCount": 100,
        "page": 1
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (responseData.data.data.length > 0) {
        this.responseData = responseData.data.data
      } else {
        this.msg = "لاتوجد بيانات"
      }


      this.spinner = false;


    },
    async searchById() {
      this.responseData = ''

      this.spinner = true

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-trusted-info';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "filter": 2,
        "national_id_number": this.idKey,
        "paginateCount": 100,
        "page": 1
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (responseData.data.data.length > 0) {
        this.responseData = responseData.data.data
      } else {
        this.msg = "لاتوجد بيانات"
      }


      this.spinner = false;


    },
    async remove() {
      this.spinner = true

      this.idKey = ''
      this.phoneKey = ''
      this.nationalityKey = ''

      await this.loadData();

      this.spinner = false
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-family: 'Almarai', sans-serif;
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

.table .icons a {
  margin: 0 5px;
  color: #111;
}

.table .icons a:hover {
  color: #0a53be;
}
a {
  color: #111111;
  text-decoration: none;
  padding: 2px 5px;
}

a:hover {
  color: #198754;
  border-bottom: 1px solid #198754;
  padding: 2px 5px;
}


</style>