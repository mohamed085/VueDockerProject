<template>
  <div class="all-orders-section p-3">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1>الفواتير</h1>
    </div>

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else>

      <div class="table-responsive">
        <table class="table  table-hover">
          <thead>
          <tr class="bg-success text-white">
            <th scope="col">اسم العميل</th>
            <th scope="col">اسم المسافر</th>
            <th scope="col">رقم الفاتورة</th>
            <th scope="col">رقم الطلب</th>
            <th scope="col">رقم الرحلة</th>
            <th scope="col">حالة الرحلة</th>
            <th scope="col">الحالة</th>
            <th scope="col">تاريخ الفاتورة</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="res in response.data" :key="res.id">
              <td>
                <span v-if="res.request_trip">{{ res.request_trip.request.user.name }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.request_trip">{{  res.request_trip.trip.masafr.name }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.id">{{ res.id }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.request_trip">{{  res.request_trip.request.id }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.request_trip">{{  res.request_trip.trip.id }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.request_trip">{{  res.request_trip.offer_status }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="res.accepted == '-1'"><b-badge variant="danger">مرفوض</b-badge> </span>
                <span v-if="res.accepted == '0'"><b-badge variant="warning">لم يتم الرد</b-badge> </span>
                <span v-if="res.accepted == '1'"><b-badge variant="success">مقبول</b-badge></span>
              </td>
              <td>
                <span v-if="res.request_trip">{{  res.request_trip.created_at }}</span>
                <span v-else>-</span>
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
  name: "Invoice",
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

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-all-fatoorahs';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)

      let raw = JSON.stringify({
        "filter": '',
        "id": '',
        "phone": this.phoneKey,
        "from_place": this.fromCityKey,
        "to_place": this.toCityKey,
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
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

</style>