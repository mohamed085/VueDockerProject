<template>
  <div class="p-3">

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
      <h1>تحرير البيانات الشخصية</h1>
    </div>

    <main class="container">
      <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
        <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
      </div>

      <div v-else>
        <div v-if="msg">
          <b-badge variant="success" class="p-2 large">{{ msg }}</b-badge>
          <router-link to="/customers"></router-link>
        </div>

        <div v-else>
          <b-form class="row" @submit.prevent="save">
            <div class="col-8 mt-5">
              <b-form-group label-cols="2" label="الاسم">
                <b-form-input v-model="data.name"></b-form-input>
              </b-form-group>

              <b-form-group label-cols="2" label="الرقم السري">
                <b-form-input type="password" v-model="password"></b-form-input>
              </b-form-group>

              <b-form-group label-cols="2" label="الايميل">
                <b-form-input type="email" v-model="data.email"></b-form-input>
              </b-form-group>

              <b-form-group label-cols="2" label="رقم الجوال">
                <b-form-input v-model="data.phone"></b-form-input>
              </b-form-group>

              <b-form-group label-cols="2" label="الهوية">
                <b-form-input v-model="data.national_id_number"></b-form-input>
              </b-form-group>

              <b-form-group label-cols="2" label="الجنسية">
                <b-form-input v-model="data.nationality"></b-form-input>
              </b-form-group>

            </div>

            <div class="col-4">
              <div class="row">
                <div class="col-6">
                  <div class="profile-photo photo">
                    <img :src="data.photo">
                  </div>
                </div>
                <div class="col-6">
                  <div class="profile-photo photo">
                    <img :src="newPhoto">
                    <input type="file" accept="image/" class="hidden" ref="fileNewImage" @change="changeNewImage">
                    <b-button @click="browseNewImage" class="btn-sm mt-2 fas fa-plus" variant="dark"></b-button>
                    <h6 class="text-danger fw-bold mt-3">الصورة الشخصية الجديدة</h6>
                  </div>
                </div>
              </div>

              <div class="row mt-5">
                <div class="col-6">
                  <div class="photo">
                    <img :src="data.id_photo">
                  </div>
                </div>
                <div class="col-6">
                  <div class="photo">
                    <img :src="newIdPhoto">
                    <input type="file" accept="image/" class="hidden" ref="fileNewIdImage" @change="changeNewIdImage">
                    <b-button @click="browseNewIdImage" class="btn-sm mt-2 fas fa-plus" variant="dark"></b-button>
                    <h6 class="text-danger fw-bold mt-3">صورة الهوية الجديدة</h6>
                  </div>
                </div>
              </div>

            </div>

            <b-button class="mt-4 mb-4 w-25" type="submit" variant="outline-success">حفظ التعديلات</b-button>

          </b-form>

        </div>
      </div>

    </main>

  </div>
</template>

<script>
export default {
  name: "EditCustomer",
  data() {
    return {
      data: '',
      password: '',
      spinner: false,
      newPhoto: '',
      newFile: '',
      newIdPhoto: '',
      newIdFile: '',
      msg: ''
    }
  },
  created() {
    this.loadUserInfo(this.$route.params.id)
  },
  methods: {
    async save() {
      this.spinner = true

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token);

      let formdata = new FormData();
      formdata.append("user_id", this.$route.params.id);
      formdata.append("name", this.data.name);
      formdata.append("password", this.password);
      formdata.append("email", this.data.email);
      formdata.append("phone", this.data.phone);
      formdata.append("national_id_number", this.data.national_id_number);
      formdata.append("nationality", this.data.nationality);
      formdata.append("gender", this.data.gender);
      formdata.append("photo", this.newFile);
      formdata.append("id_photo", this.newIdFile);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const response = await fetch("https://msafr.we-work.pro/api/auth/admin/update-masafr", requestOptions);

      const responseData = await response.json();

      if (responseData.status) {
        this.msg = "تم تعديل البيانات بنجاح"
      } else {
        this.msg = "لم يتم تعديل البيانات بنجاح"
      }

      console.log(responseData)

      this.spinner = false
    },
    browseNewImage() {
      this.$refs.fileNewImage.click();
    },
    changeNewImage(e) {
      this.newFile = e.target.files[0];
      this.$emit('input', this.newFile);
      let reader = new FileReader();
      reader.readAsDataURL(this.newFile);
      reader.onload = e => {
        this.newPhoto = e.target.result;
      }
    },
    browseNewIdImage() {
      this.$refs.fileNewIdImage.click();
    },
    changeNewIdImage(e) {
      this.newIdFile = e.target.files[0];
      this.$emit('input', this.newIdFile);
      let reader = new FileReader();
      reader.readAsDataURL(this.newIdFile);
      reader.onload = e => {
        this.newIdPhoto = e.target.result;
      }

    },
    async loadUserInfo(id) {
      this.spinner = true;

      let myHeaders = new Headers();

      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "user_id": id
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let url = "https://msafr.we-work.pro/api/auth/admin/get-user-info"

      const response = await fetch(url, requestOptions);

      const responseData = await response.json();

      this.data = responseData.data;

      if (!this.data) {
        await this.$router.replace("/404")
      }

      this.spinner = false

    },
  }
}
</script>

<style scoped>
h1, h2 {
  font-family: 'Almarai', sans-serif;
}

.profile-photo , .profile-photo img {
  border-radius: 50%;
}

.photo {
  border: 1px solid #727272;
  height: 150px;
  position: relative;
}

.photo button {
  position: absolute;
  bottom: -15px;
  left: 16px;
  padding: 5px 10px;
  border-radius: 15px;
}

.photo img {
  width: 100%;
  height: 100%;
}

.hidden {
  display: none;
}

.large {
  font-size: 16px;
}
</style>