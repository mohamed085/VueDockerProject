<template>
  <div class="setting">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
      <h1>اعدادات عامة</h1>
    </div>

    <main class="p-3">

      <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
        <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
      </div>

      <h3>
        <b-badge variant="light" class="text-black" v-if="response"> {{ response }}</b-badge>
      </h3>


      <b-form v-if="!spinner" @submit.prevent="save">
        <b-form-group label-cols="2" label="عمولة علي العميل دفع الالكتروني">
          <b-form-input v-model="setting.x1" type="number" required></b-form-input>
        </b-form-group>

        <b-form-group label-cols="2" label="عمولة علي المسافر من الاتفاق">
          <b-form-input v-model="setting.x2" type="number" required></b-form-input>
        </b-form-group>

        <b-form-group label-cols="2" label="نسبة قيمة التامين علي العميل">
          <b-form-input v-model="setting.x3" type="number" required></b-form-input>
        </b-form-group>

        <b-form-group label-cols="2" label="اقصي شحن رصيد">
          <b-form-input v-model="setting.x4" type="number" required></b-form-input>
        </b-form-group>

        <b-form-group label-cols="2" label="اقصي مديونية علي المسافر">
          <b-form-input v-model="setting.x5" type="number" required></b-form-input>
        </b-form-group>

        <b-form-group label-cols="2" description="كل إرسال يتغير لمسافرين جدد" label="اقصي عدد رسائل تنبية للطلب">
          <b-form-input v-model="setting.x6" type="number" required></b-form-input>
        </b-form-group>

        <b-button class="mt-4 mb-4" type="submit" variant="success">حفظ التعديلات</b-button>
      </b-form>
    </main>

  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      setting: {
        x1: '',
        x2: '',
        x3: '',
        x4: '',
        x5: '',
        x6: '',
      },
      spinner: false,
      response: ''
    }
  },
  methods: {
    async save() {

      this.spinner = true

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "settings": [
          [
            {
              "id": 1,
              "value": this.setting.x1
            }
          ],
          [
            {
              "id": 2,
              "value": this.setting.x2
            }
          ],
          [
            {
              "id": 3,
              "value": this.setting.x3
            }
          ],
          [
            {
              "id": 4,
              "value": this.setting.x4
            }
          ],
          [
            {
              "id": 5,
              "value": this.setting.x5
            }
          ],
          [
            {
              "id": 6,
              "value": this.setting.x6
            }
          ]
        ]
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch("https://msafr.we-work.pro/api/auth/admin/update-application-settings", requestOptions);

      const responseData = await response.json();

      console.log(responseData)

      if (!responseData.status) {
        this.response = 'لم يتم حفظ البيانات من فضلك تاكد من ادخال كل البيانات';
      } else {
        this.response = 'تم حفظ التعديلات'

      }

      this.spinner = false

    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-family: 'Almarai', sans-serif;
}


</style>