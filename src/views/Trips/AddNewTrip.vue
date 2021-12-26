<template>
  <main class="p-3">
    <div class="add-new-order-section">

      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-2 mb-4 border-bottom">
        <h1>اضافة قسم رحلات جديد</h1>
      </div>

      <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
        <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
      </div>

      <h3>
        <b-badge variant="light" class="text-black" v-if="response"> {{ response }}</b-badge>
      </h3>

      <b-form v-if="!spinner" @submit.prevent="addNewTripe">
        <div class="d-flex row">
          <b-form-group class="col-6" label-cols="2" label="اسم الرحلة">
            <b-form-input v-model="tripe.title"></b-form-input>
          </b-form-group>

          <b-form-group class="col-6" label-cols="2" label="الموضوع">
            <b-form-input v-model="tripe.subject"></b-form-input>
          </b-form-group>
        </div>

        <div class="d-flex flex-wrap row">
          <b-form-group class="col-2" label-cols="2" label="مفتوح">
            <b-form-checkbox switch size="lg" v-model="tripe.open"></b-form-checkbox>
          </b-form-group>

          <b-form-group class="col-2" label-cols="5" label="مدينة واحدة">
            <b-form-checkbox switch size="lg" v-model="tripe.oneCity"></b-form-checkbox>
          </b-form-group>

          <b-form-group class="col-2" label-cols="2" label="اسبوعي">
            <b-form-checkbox switch size="lg" v-model="tripe.weekly"></b-form-checkbox>
          </b-form-group>

          <b-form-group class="col-2" label-cols="2" label="عداد">
            <b-form-checkbox switch size="lg" v-model="tripe.counter"></b-form-checkbox>
          </b-form-group>

          <b-form-group class="col-2" label-cols="2" label="سعودي">
            <b-form-checkbox switch size="lg" v-model="tripe.saudi"></b-form-checkbox>
          </b-form-group>

        </div>

        <b-form-group label-cols="2" label="اسم الرحلة">
          <input type="file" @change="onFileChange($event)">
        </b-form-group>

        <div>
          <b-img :src="tripe.logo" fluid></b-img>
        </div>
        <b-button class="w-25 mt-4 mb-4" type="submit" variant="success">حفظ القسم</b-button>
      </b-form>
    </div>
  </main>
</template>

<script>
import store from "../../store";
import router from "../../router";

export default {
  name: "AddNewTrip",
  data() {
    return {
      tripe: {
        title: '',
        subject: '',
        saudi: true,
        oneCity: false,
        counter: true,
        weekly: true,
        open: true,
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
    async addNewTripe() {
      this.spinner = true;

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)

      let formdata = new FormData();
      formdata.append("categorie_name", this.tripe.subject);
      formdata.append("photo", this.file);
      formdata.append("title", this.tripe.title);
      formdata.append("only_saudi", Number(this.tripe.saudi));
      formdata.append("weekly", Number(this.tripe.weekly));
      formdata.append("counter", Number(this.tripe.counter));
      formdata.append("special_dlivery", Number(this.tripe.counter));
      formdata.append("two_place", Number(this.tripe.oneCity));
      formdata.append("active", Number(this.tripe.open));


      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const response = await fetch("https://msafr.we-work.pro/api/auth/admin/create-new-request-categorie", requestOptions);

      const responseData = await response.json();

      if (!responseData.status) {
        this.response = 'لم يتم حفظ البيانات من فضلك تاكد من ادخال كل البيانات';
      } else {
        this.response = 'تم حفظ قسم رحلات جديد'
      }

      console.log(responseData)

      this.spinner = false
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      this.$emit('input', this.file);
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        this.tripe.logo = e.target.result;
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