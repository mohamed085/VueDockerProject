<template>
  <div class="all-orders-section p-3">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1>اقسام الطلبات</h1>
    </div>

    <b-modal id="my-modal" hide-footer>
      <div class="d-block text-center">
        <h3>{{ msg }}</h3>
      </div>
    </b-modal>

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else>
      <div class="search-inputs mb-3 mt-2 d-flex flex-wrap">
        <b-form class="search-form d-flex" @submit.prevent="searchByPhone">
          <b-form-input v-model="phoneKey" required placeholder="بحث بالجوال"></b-form-input>
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
        </b-form>

        <b-form class="search-form d-flex" @submit.prevent="searchByPlace">
          <b-form-input v-model="fromCityKey" required placeholder="من مدينة"></b-form-input>
          <b-form-input v-model="toCityKey" required placeholder="الي مدينة"></b-form-input>
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
        </b-form>

        <b-form class="search-form d-flex" @submit.prevent="remove">
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-times"></i></b-button>
        </b-form>

      </div>

      <div v-if="response" class="table-responsive">
        <table class="table  table-hover">
          <thead>
          <tr class="bg-success text-white">
            <th scope="col">صورة العميل</th>
            <th scope="col">العميل</th>
            <th scope="col">الوصف</th>
            <th scope="col">رقم الطلب</th>
            <th scope="col">تاريخ الاضافة</th>
            <th scope="col">من</th>
            <th scope="col">الي</th>
            <th scope="col">حالة الطلب</th>
            <th scope="col">مطلوب تامين</th>
            <th scope="col">تخفيض</th>
            <th scope="col">اموال معلقة</th>
            <th scope="col">نهاية الرحلة</th>
            <th scope="col">الاستجابة علي الطلب</th>
            <th scope="col">المسافر المنفذ</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="res in response.data" :key="res.id">
              <td>
                <b-avatar :src="res.user.photo" v-if="res.user.photo"/>
                <span v-else>-</span>
              </td>
              <td>
                <router-link :to="'/user/' + res.user.id " v-if="res.user">{{ res.user.name }}</router-link>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.description">{{ res.description }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.id">{{ res.id }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.created_at">{{ res.created_at }}</span>
              </td>
              <td>
                <span v-if="res.from_place">{{ res.from_place }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.to_place">{{ res.to_place }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.request_trip">
                  <span v-for="request_trip in res.request_trip" :key="request_trip.id" class="d-flex flex-column">
                    <b-badge variant="danger" v-if="request_trip.offer_status === '-1'">ملغي</b-badge>
                    <b-badge variant="warning" v-else-if="request_trip.offer_status === '0'">غير مربوط</b-badge>
                    <b-badge variant="success" v-else-if="request_trip.offer_status === '1'">فعال</b-badge>
                    <b-badge variant="primary" v-else-if="request_trip.offer_status === '2'">معلق</b-badge>
                    <b-badge variant="secondary" v-else-if="request_trip.offer_status === '3'">جاري التاكيد</b-badge>
                    <b-badge variant="info" v-else-if="request_trip.offer_status === '4'">جاري التنفيذ</b-badge>
                    <b-badge variant="info" class="text-black" v-else-if="request_trip.offer_status === '5'">منفذ</b-badge>
                  </span>
                </span>
                <span v-else>-</span>
              </td>
              <td>
                <b-badge variant="danger" v-if="res.have_insurance = '0'">لا يوجد تامين</b-badge>
                <b-badge variant="success" v-else-if="res.have_insurance = '1'">يوجد تامين</b-badge>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.request_trip">{{ res.request_trip.discounts }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.request_trip">{{ res.request_trip.insurance_hold }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.max_day">{{ res.max_day }}</span>
                <span v-else>-</span>
              </td>
              <td>{{ res.user.admin.name }}</td>
              <td>-</td>
              <td class="d-flex icons">
                <span class="a" @click="deleteUser(res.id)"><i class="fas fa-trash"></i></span>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="msg">{{ msg }}</div>

      <div v-else>لم يتم الغثور علي بيانات</div>

    </div>

  </div>
</template>

<script>
import store from "../../store";
import router from "../../router";

export default {
  name: "Orders",
  data() {
    return {
      phoneKey: '',
      fromCityKey: '',
      toCityKey: '',
      spinner: false,
      response: '',
      msg: '',
      status: '',
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

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-requests';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({});

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      this.response = responseData.data

      this.spinner = false;

    },
    async deleteUser(id) {
      this.spinner = false
      this.response = ''

      const url = 'https://msafr.we-work.pro/api/auth/admin/delete-request-service';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "request_service_id": id
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);

      const responseData = await response.json();

      if (responseData.status) {
        this.status = true
        this.msg = 'تم الحذف بنجاح'
      } else {
        this.status = false
        this.msg = 'لم يتم الحذف'
      }

      this.$bvModal.show("my-modal")

      await this.loadData()

      this.spinner = false

    },
    async searchByPhone() {
      this.response = ''
      this.spinner = true;

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-requests';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "filter": 1,
        "phone": this.phoneKey,
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

      if (responseData.data.length > 0) {
        this.response = responseData
      } else {
        this.msg = "لاتوجد بيانات"
      }

      this.spinner = false;

    },
    async searchByPlace() {
      this.response = ''
      this.spinner = true;

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-requests';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "filter": 2,
        "from_place": this.fromCityKey,
        "to_place": this.toCityKey,
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

      console.log(responseData)

      if (responseData.data.data.length > 0) {
        this.response = responseData.data
      } else {
        this.msg = "لاتوجد بيانات"
      }

      this.spinner = false;

    },
    async remove() {
      this.spinner = true

      this.phoneKey = ''
      this.fromCityKey = ''
      this.toCityKey = ''

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