<template>
  <main class="p-3">
    <div class="add-new-order-section">

      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-2 mb-4 border-bottom">
        <h1>الرحلات</h1>
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
          <b-form class="search-form d-flex" @submit.prevent="searchByRequestId">
            <b-form-input v-model="request_id" required placeholder="بحث برقم الطلب المرتبط"></b-form-input>
            <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
          </b-form>

          <b-form class="search-form d-flex" @submit.prevent="searchByTripId">
            <b-form-input v-model="trip_id" required placeholder="بحث برقم الرحلة "></b-form-input>
            <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
          </b-form>

          <b-form class="search-form d-flex" @submit.prevent="searchByPhoneId">
            <b-form-input v-model="phone" required placeholder="بحث بجوال العميل"></b-form-input>
            <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
          </b-form>

          <b-form class="search-form d-flex" @submit.prevent="searchByPlaceId">
            <b-form-input v-model="from_place" required placeholder="بحث من مدينة"></b-form-input>
            <b-form-input v-model="to_place" required placeholder="الى مدينة "></b-form-input>
            <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-search"></i></b-button>
          </b-form>

          <b-form class="search-form d-flex" @submit.prevent="remove">
            <b-button type="submit" class="me-1 ms-1" variant="light"><i class="fas fa-times"></i></b-button>
          </b-form>

        </div>

        <div v-if="response" class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr class="bg-success text-white">
              <th scope="col">صاحب الرحلة</th>
              <th scope="col">رقم الرحلة</th>
              <th scope="col">الجنسية</th>
              <th scope="col">وصف الرحلة</th>
              <th scope="col">مسار الرحلة</th>
              <th scope="col">الطلبات المرتبطة</th>
              <th scope="col">نوع الرحلة</th>
              <th scope="col">مرحلة الرحلة</th>
              <th scope="col">تاريخ الإضافة</th>
<!--              <th scope="col">شات لم يتم الرد عليها</th>-->
              <th scope="col">الرحلة</th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="res in response" :key="res.id">
                <td v-if="res.masafr.name">
                  <router-link :to="'/traveller/' + res.masafr.id">{{ res.masafr.name }}</router-link>
                </td>
                <td>
                    <span v-if="res.id">{{ res.id }}</span>
                </td>
                <td>
                  <span>{{ res.masafr.nationality }}</span>
                </td>
                <td>
                  <span v-if="res.description">{{ res.description }}</span>
                  <span v-else></span>
                </td>
                <td>
                  <span v-if="res.from_place">{{ res.from_place }} -> {{ res.to_place }}</span>
                  <span v-else></span>
                </td>
                <td>
                  <span v-for="related_request in res.related_requests" :key="related_request.id">
                    {{ related_request.request_id }}
                    <br>
                  </span>
                </td>
                <td>
                  <span v-if="res.trip_category">{{ res.trip_category.categorie_name }}</span>
                </td>
                <td>
                  <span v-for="related_request in res.related_requests" :key="related_request.id" class="d-flex">
                    <span>{{ related_request.id }}</span> &nbsp;
                    <span v-if="related_request.offer_status === '-1'">
                      <b-badge variant="danger">ملغي</b-badge>
                    </span>
                    <span v-else-if="related_request.offer_status === '0'">
                      <b-badge variant="warning">منتهي</b-badge>
                    </span>
                    <span v-else-if="related_request.offer_status === '1'">
                      <b-badge variant="info">فعال</b-badge>
                    </span>
                    <span v-else-if="related_request.offer_status === '2'">
                      <b-badge variant="light" class="text-black">معلق</b-badge>
                    </span>
                    <span v-else-if="related_request.offer_status === '3'">
                      <b-badge variant="secondary">جاري التاكيد</b-badge>
                    </span>
                    <span v-else-if="related_request.offer_status === '4'">
                      <b-badge variant="primary">جاري التنفيذ</b-badge>
                    </span>
                    <span v-else-if="related_request.offer_status === '5'">
                      <b-badge variant="success">منفذ</b-badge>
                    </span>
                    <br>
                  </span>
                </td>
                <td>
                  <span v-if="res.created_at">{{ res.created_at }}</span>
                  <span v-else></span>
                </td>
<!--                <td>-->
<!--                  <span v-if="res.masafr.chats.message_not_seen">-->
<!--                    <span v-for="message_not_seen in res.masafr.chats.message_not_seen" :key="message_not_seen.id">-->
<!--                      {{ message_not_seen.id }}-->
<!--                      <br>-->
<!--                    </span>-->
<!--                  </span>-->
<!--                </td>-->
                <td>
                  <span v-for="related_request in res.related_requests" :key="related_request.id" class="d-flex">
                    <span>{{ related_request.id }}</span> &nbsp;
                    <span v-if="related_request.offer_status === '-1'">
                      <b-badge variant="danger">ملغي</b-badge>
                    </span>
                    <span v-else-if="related_request.offer_status === '0'">
                      <b-badge variant="warning">منتهي</b-badge>
                    </span>
                    <span v-else-if="related_request.offer_status === '1'">
                      <b-badge variant="info">فعال</b-badge>
                    </span>
                    <span v-else-if="related_request.offer_status === '2'">
                      <b-badge variant="light" class="text-black">معلق</b-badge>
                    </span>
                    <span v-else-if="related_request.offer_status === '3'">
                      <b-badge variant="secondary">جاري التاكيد</b-badge>
                    </span>
                    <span v-else-if="related_request.offer_status === '4'">
                      <b-badge variant="primary">جاري التنفيذ</b-badge>
                    </span>
                    <span v-else-if="related_request.offer_status === '5'">
                      <b-badge variant="success">منفذ</b-badge>
                    </span>
                    <br>
                  </span>
                </td>
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
  </main>
</template>

<script>
import store from "../../store";
import router from "../../router";

export default {
  name: "Trips",
  data() {
    return {
      response: '',
      request_id: null,
      trip_id: null,
      phone: '',
      from_place: '',
      to_place: '',
      spinner: false,
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

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-trips';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "filter": 11,
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

      this.response = responseData.data.data

      this.spinner = false;

    },

    async searchByRequestId () {

      this.response = ''
      this.spinner = true;

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-trips';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "filter": 0,
        "request_id": this.request_id,
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

      if (responseData.data.data.length > 0) {
        this.response = responseData.data.data
      } else {
        this.msg = "لاتوجد بيانات"
      }


      this.spinner = false;

    },

    async searchByTripId () {

      this.response = ''
      this.spinner = true;

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-trips';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "filter": 1,
        "trip_id": this.trip_id,
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

      if (responseData.data.data.length > 0) {
        this.response = responseData.data.data
      } else {
        this.msg = "لاتوجد بيانات"
      }


      this.spinner = false;

    },

    async searchByPhoneId () {

      this.response = ''
      this.spinner = true;

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-trips';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "filter": 2,
        "phone": this.phone,
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

      if (responseData.data.data.length > 0) {
        this.response = responseData.data.data
      } else {
        this.msg = "لاتوجد بيانات"
      }


      this.spinner = false;

    },

    async searchByPlaceId () {

      this.response = ''
      this.spinner = true;

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-trips';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "filter": 3,
        "from_place": this.from_place,
        "to_place": this.to_place,
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

      if (responseData.data.data.length > 0) {
        this.response = responseData.data.data
      } else {
        this.msg = "لاتوجد بيانات"
      }

      this.spinner = false;
    },

    remove() {
      this.to_place = ''
      this.from_place = ''
      this.phone = ''
      this.request_id = ''
      this.trip_id = ''

      this.loadData()
    },
    async deleteUser(id) {
      this.spinner = false
      this.response = ''

      const url = 'https://msafr.we-work.pro/api/auth/admin/delete-trip';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "trip_id": id
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