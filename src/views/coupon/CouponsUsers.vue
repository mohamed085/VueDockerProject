<template>
  <div class="pb-5">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1>العملاء</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">مشاركة <i class="far fa-share-square"></i></button>
          <button type="button" class="btn btn-sm btn-outline-secondary">تصدير <i class="fas fa-file-download"></i></button>
        </div>
      </div>
    </div>

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else>
      <div class="search-inputs mb-3 mt-2 d-flex flex-wrap">

        <b-form class="search-form d-flex" @submit.prevent="search('phone')">
          <b-form-input v-model="phoneKey" required placeholder="بحث بالجوال"></b-form-input>
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
        </b-form>

      </div>

      <h2 class="mt-4 mb-3">مستخدمين الكوبونات</h2>
      <div class="table-responsive" v-if="response.data > 0">
        <table class="table table-hover">
          <thead>
          <tr class="bg-success text-white">
            <th scope="col">الاسم</th>
            <th scope="col">الهاتف</th>
            <th scope="col">استخدام كوبون اخر</th>
            <th scope="col">تاريخ الاضافة</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="res in response.data" :key="res.id">
            <td>
              <span v-if="res.user.name">{{ res.user.name }}</span>
            </td>
            <td>{{ res.user.phone }}</td>
            <td>
              <b-form-checkbox v-model="useOtherCoupon" name="check-button" switch></b-form-checkbox>
            </td>
            <td>{{ res.created_at }}</td>
          </tr>
          </tbody>
        </table>

      </div>

      <div class="btn-group me-2" v-if="response.data > 0">
        <button type="button" class="btn btn-outline-success">يستخدم كوبون اخر</button>
        <button type="button" class="btn btn-outline-success">تنفيذ</button>
        <button type="button" class="btn btn-outline-success">لا يستخدم كوبون اخر</button>
        <button type="button" class="btn btn-outline-success">حذف المحدد مع امكانية استخدام كوبون</button>
      </div>

      <div v-else>
        لا يوجد بيانات متوفره الان
      </div>
    </div>



  </div>
</template>

<script>
import router from "../../router";
import store from "../../store";

export default {
  name: "CouponsUsers",
  data() {
    return {
      phoneKey: '',
      useOtherCoupon: true,
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
  methods: {
    async loadData() {
      this.spinner = true;

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-all-copon-user';

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

      this.response = responseData.data

      console.log(responseData)
      console.log(this.response)

      this.spinner = false;

    },

    search() {
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

</style>