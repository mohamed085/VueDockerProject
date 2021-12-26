<template>
  <div>
    <header-nav></header-nav>

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <b-modal id="my-modal">{{ msg }}</b-modal>

    <main v-if="!spinner">
      <div class="pe-3 ps-3 pt-4 pb-5">
        <div class="pb-2 row border-bottom">
          <div class="col-3 d-flex flex-column justify-content-center align-items-center">
            <b-avatar :src="data.photo" size="9rem"></b-avatar>
            <b-form-rating
                class="mt-2"
                v-model="data.rate"
                color="#008000"
                show-value
                show-value-max
                precision="2"
            ></b-form-rating>
          </div>

          <div class="col-3 d-flex flex-column  justify-content-center">
            <h3><b-badge variant="success">الاسم: {{ data.name }}</b-badge></h3>
            <span>مسافر</span>
            <span v-if="data.trust == 0">غير موثق</span>
            <span v-else-if="data.trust == 1">موثق</span>
            <span>رقم الهاتف: {{ data.phone }}</span>
            <span>الجنسيه: {{ data.nationality }}</span>
            <span>البريد الالكتروني: {{ data.email }}</span>
          </div>

          <div class="col-6 d-flex flex-column justify-content-center align-items-center">
            <div class="d-flex">
              <b-avatar class="me-3" :src="data.car_image_east" size="6rem"></b-avatar>
              <b-avatar class="me-3" :src="data.car_image_north" size="6rem"></b-avatar>
              <b-avatar class="me-3" :src="data.car_image_west" size="6rem"></b-avatar>
            </div>
            <div class="d-flex flex-column mt-2">
              <span>موديل السياره: {{ data.car_model }}</span>
              <span>اسم السياره: {{ data.car_name }}</span>
              <span>رقم السياره: {{ data.car_number }}</span>
            </div>
            <div class="mt-2">
              <h6>تاريخ اخر دخول: {{ data.updated_at }}</h6>
              <h6>تاريخ التسجيل: {{ data.created_at }}</h6>
            </div>
          </div>
        </div>

        <div class="pt-4 pb-4 d-flex justify-content-center border-bottom">
          <div class="user-details-card me-3 ms-3 d-flex flex-column justify-content-center align-items-center">
            <h5 class="mt-3">{{ data.balance }} ريال</h5>
            <h5 class="mt-3">الخرنة</h5>
            <div class="user-details-card-footer d-flex justify-content-center align-items-center pt-2 pb-2 bg-success text-white w-100">
              اقراء المزيد
            </div>
          </div>

          <div class="user-details-card me-3 ms-3 d-flex flex-column justify-content-center align-items-center">
            <h5 class="mt-3">0.00 ريال</h5>
            <h5 class="mt-3">التامين المحجوز</h5>
            <div class="user-details-card-footer d-flex justify-content-center align-items-center pt-2 pb-2 bg-success text-white w-100">
              اقراء المزيد
            </div>
          </div>

          <div class="user-details-card me-3 ms-3 d-flex flex-column justify-content-center align-items-center">
            <h5 class="mt-3">0.00 ريال</h5>
            <h5 class="mt-3">قيمة طلب محجوز</h5>
            <div class="user-details-card-footer d-flex justify-content-center align-items-center pt-2 pb-2 bg-success text-white w-100">
              اقراء المزيد
            </div>
          </div>

          <div class="user-details-card me-3 ms-3 d-flex flex-column justify-content-center align-items-center">
            <h5 class="mt-3">0.00 ريال</h5>
            <h5 class="mt-3">قيمة الكوبونات</h5>
            <div class="user-details-card-footer d-flex justify-content-center align-items-center pt-2 pb-2 bg-success text-white w-100">
              اقراء المزيد
            </div>
          </div>

          <div class="user-details-card me-3 ms-3 d-flex flex-column justify-content-center align-items-center">
            <h5 class="mt-3">0.00 ريال</h5>
            <h5 class="mt-3">نقاط سلبية</h5>
            <div class="user-details-card-footer d-flex justify-content-center align-items-center pt-2 pb-2 bg-success text-white w-100">
              اقراء المزيد
            </div>
          </div>

        </div>

        <div class="pt-4 pb-4 d-flex flex-column justify-content-center border-bottom">
          <b-form @submit.prevent="sendMessage">
            <div class="btns d-flex justify-content-center">
              <b-form-group v-slot="{ ariaDescribedby }">
                <div class="d-flex">
                  <div class="d-flex">
                    <b-form-radio v-model="type" :aria-describedby="ariaDescribedby" name="some-radios" value="0"></b-form-radio><span class="ms-2">إرسال إشعار</span>
                  </div>
                  <div class="d-flex">
                    <b-form-radio v-model="type" :aria-describedby="ariaDescribedby" name="some-radios" value="3"></b-form-radio><span class="ms-2">إرسال SMS</span>
                  </div>
                  <div class="d-flex">
                    <b-form-radio v-model="type" :aria-describedby="ariaDescribedby" name="some-radios" value="2"></b-form-radio><span class="ms-2">إرسال بريد</span>
                  </div>
                  <div class="d-flex">
                    <b-form-radio v-model="type" :aria-describedby="ariaDescribedby" name="some-radios" value="1"></b-form-radio><span class="ms-2">إرسال نوافذ</span>
                  </div>
                </div>
              </b-form-group>
            </div>

            <div class="d-flex mt-3">
              <b-form-input class="me-3" type="text" v-model="subject" placeholder="المشرف يضع الملاحظاته هنا" required></b-form-input>
              <b-button type="submit" class="pe-3 ps-3" variant="success">حفظ</b-button>
            </div>
            <span class="me-2 ms-2 text-secondary">في حال لم يتم اختيار طريقة الارسال سوف يتم ارسال الملاحظات عن طريق الاشعارات</span>
          </b-form>
        </div>


        <div class="pt-4 pb-4 d-flex flex-column justify-content-center border-bottom">
          <h3 class="header">رحالتي</h3>

          <div v-if="spinner1" class="d-flex justify-content-center align-items-center pt-4 pb-4">
            <b-spinner variant="success" style="width: 2rem; height: 2rem;" type="grow" label="Spinning"></b-spinner>
          </div>

          <div class="table-responsive" v-if="!spinner1">
            <table class="table table-hover" v-if="!responseErr">
              <thead>
              <tr class="bg-success text-white">
                <th scope="col">رقم الرحلة</th>
                <th scope="col">وصف الرحلة</th>
                <th scope="col">مسار الرحلة</th>
                <th scope="col">الطلبات المرتبطة</th>
                <th scope="col">نوع الرحلة</th>
                <th scope="col">مرحلة الرحلة</th>
                <th scope="col">تاريخ الإضافة</th>
                <th scope="col">شات لم يتم الرد عليها</th>
                <th scope="col">وقت اخر دخول</th>
                <th scope="col">الرحلة</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="res in response" :key="res.id">
                <td>
                  <span v-if="res.id">{{ res.id }}</span>
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
                    {{ related_request.id }}
                  </span>
                </td>
                <td>-</td>
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
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              </tbody>
            </table>
            <div v-else>{{ responseErr }}</div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import HeaderNav from "@/components/ui/header-nav";
export default {
name: "TravellerInfo",
  components: {
    HeaderNav
  },
  data() {
    return {
      spinner: false,
      spinner1: false,
      spinner2: false,
      spinner3: false,
      data: '',
      response: '',
      responseErr: '',
      rate: 3.35,
      type: 0,
      subject: '',
      msg: ''
    }
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.replace("/login")
    }
    this.loadTravellerInfo(this.$route.params.id);
  },
  methods: {
    async loadTravellerInfo(id) {
      this.spinner = true;

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

      let url = "https://msafr.we-work.pro/api/auth/admin/get-masafr-info"

      const response = await fetch(url, requestOptions);

      const responseData = await response.json();

      this.data = responseData.data;

      if (!this.data) {
        await this.$router.replace("/404")
      }

      this.spinner = false

      await this.loadData(this.data.id)

    },
    async loadData(id) {

      this.spinner1 = true

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-all-masafr-trips';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "masafr_id": id,
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
        this.response = responseData.data
      } else {
        this.responseErr = "لاتوجد رحلات"
      }

      this.spinner1 = false
    },
    async sendMessage() {
      this.spinner = true

      let myHeaders = new Headers();

      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");


      let raw = JSON.stringify({
        "type": 1,
        "subject": this.subject,
        "send_by": this.type,
        "type_of_template": 0,
        "users": [this.$route.params.id]
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch("https://msafr.we-work.pro/api/auth/admin/send-notifications-or-emails", requestOptions);

      const responseData = await response.json();

      if (responseData.status) {
        this.status = true
        this.msg = 'تم الإرسال بنجاح'
      } else {
        this.status = false
        this.msg = 'لم يتم الإرسال'
      }

      this.$bvModal.show("my-modal")

      this.spinner = false

    },
  }
}
</script>

<style scoped>
@import "https://getbootstrap.com/docs/5.1/examples/dashboard-rtl/";
@import "../assets/css/bootstrap.rtl.min.css";
@import "../assets/css/dashboard.rtl.css";
@import url('https://fonts.googleapis.com/css2?family=Almarai&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@600&display=swap');

main {
  background-color: #dddddd;
  min-height: 90vh;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.border-bottom {
  border-bottom: 1px solid green !important;
}

.user-details-card {
  border: 1px solid green;
  width: 150px;
  height: 170px;
  border-radius: 15px;
}

.user-details-card-footer {
  cursor: pointer;
}

.user-details-card-footer:hover {
  background-color: #dddddd !important;
  color: green !important;
}

.header {
  font-family: 'Almarai', sans-serif;
}
</style>