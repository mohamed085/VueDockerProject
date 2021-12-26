<template>
  <div class="p-3">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
      <h1>المعاملات المالية والخزانة</h1>
    </div>

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else>
      <div class="search-inputs mb-3 mt-2 d-flex flex-wrap">
        <b-form class="search-form d-flex" @submit.prevent="searchByPhone">
          <b-form-input v-model="phoneKey" required placeholder="بحث برقم الهاتف"></b-form-input>
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
        </b-form>

        <b-form class="search-form d-flex" @submit.prevent="searchByDate">
          <b-form-input type="date" v-model="dateKey1" required placeholder="بحث الجميع من تاريخ"></b-form-input>
          <b-form-input type="date" v-model="dateKey2" required placeholder="إالي تاريخ"></b-form-input>
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
        </b-form>

        <b-form class="search-form d-flex" @submit.prevent="remove">
          <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-times"></i></b-button>
        </b-form>

      </div>

      <div class="table-responsive" v-if="response">
        <table class="table table-hover">
          <thead>
          <tr class="bg-success text-white">
            <th scope="col">#</th>
            <th scope="col">اسم العميل</th>
            <th scope="col">تاريخ الطلب</th>
            <th scope="col">رقم الطلب</th>
            <th scope="col">اسم المسافر</th>
            <th scope="col">قيمة الفاتورة</th>
            <th scope="col">تفاصيل الفاتورة</th>
            <th scope="col">طريقة الدفع</th>
            <th scope="col">عمولة علي العميل</th>
            <th scope="col">تخفيض</th>
            <th scope="col">فك تامين</th>
            <th scope="col">يدخل بخزنة المسافر</th>
            <th scope="col">الحالة</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="res in response.data" :key="res.id">
            <td v-if="res.id">{{ res.id }}</td>
            <td>
              <router-link :to="'/user/' + res.request_trip.request.user.id" v-if="res.request_trip">{{ res.request_trip.request.user.name }}</router-link>
              <span v-else></span>
            </td>
            <td>
              <span v-if="res.request_trip">{{ res.request_trip.request.created_at }}</span>
              <span v-else></span>
            </td>
            <td>
              <span v-if="res.request_trip">{{ res.request_trip.request_id }}</span>
              <span v-else></span>
            </td>
            <td>
                <router-link :to="'/traveller/' + res.request_trip.trip.masafr.id" v-if="res.request_trip">{{ res.request_trip.trip.masafr.name }}</router-link>
            </td>
            <td>
              <span v-for="fatoorah in res.fatoorah" :key="fatoorah.id">
                <span v-if="fatoorah.type = 'fatoorahValue'">{{ fatoorah.fatoorahValue }}</span>
              </span>
            </td>
            <td>
              <span v-for="fatoorah in res.fatoorah" :key="fatoorah.id">
                <span >{{ fatoorah.id }} --> {{ fatoorah.value }}</span>
                <br>
              </span>
            </td>
            <td>
              <span v-if="res.request_trip === '0'"><b-badge variant="danger">اونلاين</b-badge> </span>
              <span v-else-if="res.request_trip === '1'"><b-badge variant="info">كاش</b-badge></span>
              <span v-else>-</span>
            </td>
            <td>
              <span v-if="res.request_trip">{{ res.request_trip.website_service }}</span>
            </td>
            <td>
              <span v-if="res.request_trip">{{ res.request_trip.discounts }}</span>
            </td>
            <td>
              <span v-if="res.request_trip">{{ res.request_trip.insurance_hold }}</span>
            </td>
            <td>
              <span v-if="res.request_trip">{{ res.request_trip.insurance_hold }}</span>
            </td>
            <td>
              <div v-if="res.request_trip">
                <b-badge variant="danger" v-if="res.request_trip.offer_status === '-1'">ملغي</b-badge>
                <b-badge variant="warning" v-else-if="res.request_trip.offer_status === '0'">غير مربوط</b-badge>
                <b-badge variant="success" v-else-if="res.request_trip.offer_status === '1'">فعال</b-badge>
                <b-badge variant="primary" v-else-if="res.request_trip.offer_status === '2'">معلق</b-badge>
                <b-badge variant="secondary" v-else-if="res.request_trip.offer_status === '3'">جاري التاكيد</b-badge>
                <b-badge variant="info" v-else-if="res.request_trip.offer_status === '4'">جاري التنفيذ</b-badge>
                <b-badge variant="light" class="text-black" v-else-if="res.request_trip.offer_status === '5'">منفذ</b-badge>
              </div>
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
import store from "../store";
import router from "../router";

export default {
  name: "FinancialTransactions",
  data() {
    return {
      response: '',
      phoneKey: '',
      idKey: '',
      dateKey1: null,
      dateKey2: null,
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
  methods: {
    async loadData() {
      this.spinner = true;

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-transactions-for-fiscal-year';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)

      let urlencoded = new URLSearchParams();

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();


      if (responseData.data.length > 0) {
        this.response = responseData
        this.response.data.forEach(data => {
          let fatoorahValue = 0
          data.fatoorah.forEach(fatoorah => {
            fatoorahValue += parseInt(fatoorah.value)
          })
          data.fatoorah.push({
            fatoorahValue: fatoorahValue,
            type: 'fatoorahValue'
          })
        })
      } else {
        this.msg = "لاتوجد بيانات"
      }

      this.spinner = false;

    },

    async searchByPhone() {

      this.response = ''

      this.spinner = true

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-transactions-for-fiscal-year';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "filter": 1,
        "phone": this.phoneKey,
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
        this.response.data.forEach(data => {
          let fatoorahValue = 0
          data.fatoorah.forEach(fatoorah => {
            fatoorahValue += parseInt(fatoorah.value)
          })
          data.fatoorah.push({
            fatoorahValue: fatoorahValue,
            type: 'fatoorahValue'
          })
        })
      } else {
        this.msg = "لاتوجد بيانات"
      }


      this.spinner = false;
    },

    async searchByDate() {

      this.response = ''

      this.spinner = true

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-transactions-for-fiscal-year';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "filter": 3,
        "from_date": this.dateKey1,
        "to_date": this.dateKey2,
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
        this.response.data.forEach(data => {
          let fatoorahValue = 0
          data.fatoorah.forEach(fatoorah => {
            fatoorahValue += parseInt(fatoorah.value)
          })
          data.fatoorah.push({
            fatoorahValue: fatoorahValue,
            type: 'fatoorahValue'
          })
        })
      } else {
        this.msg = "لاتوجد بيانات"
      }

      this.spinner = false;
    },

    remove() {
      this.dateKey1 = ''
      this.dateKey2 = ''
      this.phoneKey = ''
      this.idKey = ''

      this.loadData()
    }

  }

}
</script>

<style scoped>
h1, h2, h4 {
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