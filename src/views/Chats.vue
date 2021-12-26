<template>
  <div class="p-3">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
      <h1>صفحة الشات</h1>
    </div>

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else>
      <div class="search-inputs mb-3 mt-2 d-flex flex-wrap">
        <b-form class="search-form d-flex" @submit.prevent="search('request_id')">
          <b-form-input v-model="request_id" required placeholder="بحث برقم الطلب"></b-form-input>
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
        </b-form>

        <b-form class="search-form d-flex" @submit.prevent="search('id')">
          <b-form-input v-model="request_id" required placeholder="بحث برقم الرحلة "></b-form-input>
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
        </b-form>

        <b-form class="search-form d-flex" @submit.prevent="search('id')">
          <b-form-input v-model="request_id" required placeholder="بحث بالجوال "></b-form-input>
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
        </b-form>

        <b-form class="search-form d-flex" @submit.prevent="search('date')">
          <b-form-input type="date" v-model="request_id" required placeholder="بحث الجميع من تاريخ"></b-form-input>
          <b-form-input type="date" v-model="request_id" required placeholder="إالي تاريخ"></b-form-input>
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
        </b-form>
      </div>

      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
          <tr class="bg-success text-white">
            <th scope="col">اسم العميل</th>
            <th scope="col">رقم الطلب</th>
            <th scope="col">تاريخ البدء</th>
            <th scope="col">حالة الطلب</th>
            <th scope="col">مسافر</th>
            <th scope="col">رقم الرحلة</th>
            <th scope="col">نشاط المحادثة</th>
            <th scope="col">غير مقروء</th>
            <th scope="col">بلاغ تلفظ</th>
            <th scope="col">هل يوجد مرفق</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="res in responseData" :key="res.id">
              <td>
                <span v-if="res.request">
                  <router-link :to="'/user/' + res.request.user.id">{{ res.request.user.name }}</router-link>
                </span>
              </td>
              <td>
                <span v-if="res.request">{{ res.request.id }}</span>
              </td>
             <td>
                <span v-if="res.request">{{ res.request.created_at }}</span>
             </td>
             <td>
               <b-badge variant="danger" v-if="res.offer_status == '-1'">ملغي</b-badge>
               <b-badge variant="warning" v-else-if="res.offer_status == '0'">غير مربوط</b-badge>
               <b-badge variant="secondary" v-else-if="res.offer_status == '1'">فعال</b-badge>
               <b-badge variant="dark" v-else-if="res.offer_status == '2'">معلق</b-badge>
               <b-badge variant="info" v-else-if="res.offer_status == '3'">جاري التاكيد</b-badge>
               <b-badge variant="primary" v-else-if="res.offer_status == '4'">جاري التنفيذ</b-badge>
               <b-badge variant="success" v-else-if="res.offer_status == '5'">منفذ</b-badge>
             </td>
             <td>
                <span v-if="res.trip">
                  <router-link :to="'/traveller/' + res.trip.masafr.id">{{ res.trip.masafr.name }}</router-link>
                </span>
             </td>
             <td>
                <span v-if="res.trip">{{ res.trip.id }}</span>
             </td>
             <td>
                <span v-if="res.message">{{ res.message.created_at }}</span>
             </td>
             <td>
                <span v-if="res.message">{{ res.message.message_not_seen_count }}</span>
             </td>
             <td>
                <span v-if="res.message">{{ res.message.pronunciation_statements_count }}</span>
             </td>
             <td>
                <span v-if="res.message">{{ res.message.attached_chat_count }}</span>
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
  name: "Chats",
  data() {
    return {
      spinner: false,
      responseData: '',
      request_id: '',
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

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-all-chats';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)

      let raw = JSON.stringify({
        "paginateCount": 100
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();


      this.responseData = responseData.data

      console.log(this.responseData)

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