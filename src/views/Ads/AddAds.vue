<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
      <h1>اضافة اعلان</h1>
    </div>

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else>
      <div v-if="msg">
        <h3 class="mb-4">{{ msg }}</h3>
        <div v-if="status">
          <router-link class="ads-link" to="/ads">الاعلانات</router-link>
        </div>

        <div v-else-if="!status">
          <span class="ads-link" @click="refreshLink">اضافة الاعلان مرة اخري</span>
        </div>
      </div>

      <b-form v-else @submit.prevent="addAds">

        <b-badge>{{ this.msg }}</b-badge>

        <b-form-group label-cols="2" label="الموضوع">
          <b-form-input v-model="subject" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group label-cols="2" label="رابط الموقع">
          <b-form-input v-model="link" type="url" required></b-form-input>
        </b-form-group>

        <b-form-group label-cols="2" label="اسم الرحلة">
          <input type="file" @change="onFileChange($event)" required>
        </b-form-group>

        <div v-if="image" class="mb-2">
          <b-img class="image" :src="image"></b-img>
        </div>

        <b-form-group label-cols="2" label="عدد التكرار">
          <b-form-input v-model="daily_repeat" type="number" required></b-form-input>
        </b-form-group>

        <b-form-group label-cols="2" label="المدة">
          <b-form-input v-model="appear_time" type="number" required></b-form-input>
        </b-form-group>


        <b-form-group label-cols="2"  label="حركة الاعلان">
          <b-form-group class="d-flex">
            <div class="d-flex">
              <b-form-radio class="me-2 ms-2" v-model="animation_type" name="شريط" value="0"></b-form-radio>
              <span>شريط</span>
            </div>
            <div class="d-flex">
              <b-form-radio class="me-2 ms-2" v-model="animation_type" name="منبثق" value="1"></b-form-radio>
              <span>منبثق</span>
            </div>
          </b-form-group>
        </b-form-group>

        <b-form-group label-cols="2" label="موجوده بالشات">
          <b-form-checkbox v-model="in_chats" size="lg" switch></b-form-checkbox>
        </b-form-group>

        <b-form-group label-cols="2" label="صفحات المسافر">
          <b-form-group>
            <b-form-checkbox-group class="d-flex" id="checkbox-group-2" v-model="masafr_places">
              <div class="d-flex">
                <b-form-checkbox value="1"></b-form-checkbox>
                <span class="me-2 ms-2">الرئيسية</span>
              </div>

              <div class="d-flex">
                <b-form-checkbox value="2"></b-form-checkbox>
                <span class="me-2 ms-2">الشات</span>
              </div>

              <div class="d-flex">
                <b-form-checkbox value="3"></b-form-checkbox>
                <span class="me-2 ms-2">الفواتير</span>
              </div>

              <div class="d-flex">
                <b-form-checkbox value="4"></b-form-checkbox>
                <span class="me-2 ms-2">الطلب</span>
              </div>
            </b-form-checkbox-group>
          </b-form-group>
        </b-form-group>

        <b-form-group label-cols="2" label="صفحات العميل">
          <b-form-group>
            <b-form-checkbox-group class="d-flex" id="checkbox-group-2" v-model="user_places">
              <div class="d-flex">
                <b-form-checkbox value="1"></b-form-checkbox>
                <span class="me-2 ms-2">الرئيسية</span>
              </div>

              <div class="d-flex">
                <b-form-checkbox value="2"></b-form-checkbox>
                <span class="me-2 ms-2">الشات</span>
              </div>

              <div class="d-flex">
                <b-form-checkbox value="3"></b-form-checkbox>
                <span class="me-2 ms-2">الفواتير</span>
              </div>

              <div class="d-flex">
                <b-form-checkbox value="4"></b-form-checkbox>
                <span class="me-2 ms-2">الطلب</span>
              </div>
            </b-form-checkbox-group>
          </b-form-group>
        </b-form-group>

        <b-form-group label-cols="2" label="الايام">
          <b-form-group>
            <b-form-checkbox-group class="d-flex" id="checkbox-group-2" v-model="days">
              <div class="d-flex">
                <b-form-checkbox value="1"></b-form-checkbox>
                <span class="me-2 ms-2">السبت</span>
              </div>

              <div class="d-flex">
                <b-form-checkbox value="2"></b-form-checkbox>
                <span class="me-2 ms-2">الحد</span>
              </div>

              <div class="d-flex">
                <b-form-checkbox value="3"></b-form-checkbox>
                <span class="me-2 ms-2">الاثنين</span>
              </div>

              <div class="d-flex">
                <b-form-checkbox value="4"></b-form-checkbox>
                <span class="me-2 ms-2">الثلاثاء</span>
              </div>


              <div class="d-flex">
                <b-form-checkbox value="5"></b-form-checkbox>
                <span class="me-2 ms-2">الاربعاء</span>
              </div>


              <div class="d-flex">
                <b-form-checkbox value="6"></b-form-checkbox>
                <span class="me-2 ms-2">الخميس</span>
              </div>

              <div class="d-flex">
                <b-form-checkbox value="7"></b-form-checkbox>
                <span class="me-2 ms-2">الجمعة</span>
              </div>
            </b-form-checkbox-group>
          </b-form-group>
        </b-form-group>

        <b-form-group label-cols="2" label="ارسال الي">
          <b-form-radio-group v-model="person_target">
            <div class="d-flex">
              <b-form-radio value="1" required></b-form-radio>
              <span class="me-2 ms-2">كل العملاء</span>
            </div>

            <div class="d-flex">
              <b-form-radio value="2" required></b-form-radio>
              <span class="me-2 ms-2">كل المسافرين</span>
            </div>

            <div class="d-flex">
              <b-form-radio value="3" required></b-form-radio>
              <span class="me-2 ms-2">كل الزوار</span>
            </div>
          </b-form-radio-group>
        </b-form-group>


        <b-button class="mt-4 mb-4 w-25" type="submit" variant="outline-success">اضافة الاعلان</b-button>

      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddAds",
  data() {
    return {
      spinner: false,
      subject: '',
      link: '',
      site_after_announcement: '',
      appear_time: '',
      daily_repeat: '',
      image: '',
      animation_type: '',
      all_days: '',
      in_chats: '',
      masafr_places: [],
      user_places: [],
      days: [],
      person_target: [],
      file: '',
      msg: '',
      status: false
    }
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
      this.$emit('input', this.file);
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        this.image = e.target.result;
      }
    },
    async addAds() {

      this.spinner = true;
      let myHeaders = new Headers();

      const token = this.$store.getters.token;

      myHeaders.append("authToken", token);
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "subject": this.subject,
        "link": this.link,
        "site_after_announcement": 5,
        "appear_time": this.appear_time,
        "daily_repeat": this.daily_repeat,
        "image": this.file,
        "animation_type": this.animation_type,
        "person_target": this.person_target,
        "all_days": this.days.length == 7 ? 1 : 0,
        "days": this.days,
        "user_places": this.user_places,
        "masafr_places": this.masafr_places
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch("https://msafr.we-work.pro/api/auth/admin/create-advertisings", requestOptions);

      const responseData = await response.json();

      if (responseData.status) {
        this.status = true
        this.msg = 'تم إضافة الاعلان بنجاح'
      } else {
        this.status = false
        this.msg = 'لم يتم اضافة الاعلان'
      }

      this.spinner = false;

    },
    refreshLink() {
      this.msg = ''
      this.status = false
    }
  },
}
</script>

<style scoped>
h1, h2, h3 {
  font-family: 'Almarai', sans-serif;
}
img {
  max-height: 300px;
  max-width: 400px;
}

.ads-link {
  background-color: #198754;
  color: #ffffff;
  margin: 10px;
  padding: 5px 25px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.ads-link:hover {
  background-color: #ffffff;
  color: #198754;
}

</style>