<template>
  <div class="add-new-order-section p-3">

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-2 mb-4 border-bottom">
      <h1>اضافة قسم طلبات جديد</h1>
    </div>

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <h3>
      <b-badge variant="light" class="text-black" v-if="response"> {{ response }}</b-badge>
    </h3>


    <b-form v-if="!spinner" @submit.prevent="addNewOrder">
      <div class="d-flex row">
        <b-form-group class="col-6" label-cols="2" label="اسم القسم">
          <b-form-input v-model="order.title" required></b-form-input>
        </b-form-group>

        <b-form-group class="col-6" label-cols="2" label="الموضوع">
          <b-form-input v-model="order.subject" required></b-form-input>
        </b-form-group>
      </div>


      <div class="d-flex flex-wrap row">
        <b-form-group class="col-2" label-cols="2" label="مفتوح">
          <b-form-checkbox v-model="order.open" name="check-button" size="lg" switch required></b-form-checkbox>
        </b-form-group>

        <b-form-group class="col-2" label-cols="2" label="سعودي">
          <b-form-checkbox v-model="order.saudi" size="lg" switch required></b-form-checkbox>
        </b-form-group>

        <b-form-group class="col-2" label-cols="6" label="دفع الالكتروني">
          <b-form-checkbox v-model="order.payOnline" size="lg" switch required></b-form-checkbox>
        </b-form-group>

        <b-form-group class="col-2" label-cols="5" label="دفع يدوي">
          <b-form-checkbox v-model="order.payOffline" size="lg" switch required></b-form-checkbox>
        </b-form-group>

        <b-form-group class="col-2" label-cols="2" label="تامين">
          <b-form-checkbox v-model="order.tameen" size="lg" switch required></b-form-checkbox>
        </b-form-group>

        <b-form-group class="col-2" label-cols="7" label="امكانية رفع صور">
          <b-form-checkbox v-model="order.uploadPhoto" size="lg" switch required></b-form-checkbox>
        </b-form-group>

        <b-form-group class="col-2" label-cols="2" label="مدينة">
          <b-form-checkbox v-model="order.oneCity" size="lg" switch required></b-form-checkbox>
        </b-form-group>

        <b-form-group class="col-2" label-cols="2" label="مدينتين">
          <b-form-checkbox v-model="order.twoCity" size="lg" switch required></b-form-checkbox>
        </b-form-group>

        <b-form-group class="col-2" label-cols="4" label="كود واحد">
          <b-form-checkbox v-model="order.oneCode" size="lg" switch required></b-form-checkbox>
        </b-form-group>

        <b-form-group class="col-2" label-cols="2" label="كودين">
          <b-form-checkbox v-model="order.twoCode" size="lg" switch required></b-form-checkbox>
        </b-form-group>

      </div>

      <b-form-group label-cols="2" label="صورة قسم الرحلة">
        <input type="file" @change="onFileChange($event)" required>
      </b-form-group>

      <div>
        <b-img :src="order.logo" fluid></b-img>
      </div>

      <b-button class="mt-4 mb-4" type="submit" variant="success">حفظ القسم</b-button>
    </b-form>
  </div>
</template>

<script>
import store from "../../store";
import router from "../../router";

export default {
  name: "AddNewOrderSection",
  data() {
    return {
      order: {
        title: '',
        subject: '',
        open: true,
        saudi: true,
        payOnline: true,
        payOffline: true,
        tameen: true,
        uploadPhoto: true,
        oneCity: true,
        twoCity: true,
        oneCode: false,
        twoCode: true,
        logo: ''
      },
      spinner: false,
      response: '',
      file: ''

    }
  },

  created() {
    if (!store.getters.isAuthenticated) {
      router.push('/login')
    }
  },

  methods: {
    async addNewOrder() {
      this.spinner = true;

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)

      let formdata = new FormData();
      formdata.append("categorie_name", this.order.subject);
      formdata.append("photo", this.file);
      formdata.append("title", this.order.title);
      formdata.append("only_saudi", Number(this.order.saudi));
      formdata.append("weekly", Number(this.order.weekly));
      formdata.append("counter", Number(this.order.counter));
      formdata.append("special_dlivery", Number(this.order.counter));
      formdata.append("two_place", Number(this.order.oneCity));
      formdata.append("active", Number(this.order.open));
      formdata.append("payment_method", Number(this.order.payOnline));
      formdata.append("have_insurance", "1");
      formdata.append("have_photo", "1");
      formdata.append("two_codes", Number(this.order.twoCode));

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const response = await fetch("https://msafr.we-work.pro/api/auth/admin/create-new-trip-categorie", requestOptions);

      const responseData = await response.json();

      if (!responseData.status) {
        this.response = 'لم يتم حفظ البيانات من فضلك تاكد من ادخال كل البيانات';
      } else {
        this.response = 'تم حفظ قسم طلبات جديد'

      }

      this.spinner = false
    },

    onFileChange(e) {
      this.file = e.target.files[0];
      this.$emit('input', this.file);
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        this.order.logo = e.target.result;
      }
    }

  }
}
</script>

<style scoped>
h1, h2 {
  font-family: 'Almarai', sans-serif;
}
</style>