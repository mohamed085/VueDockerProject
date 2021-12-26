<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
      <h1>الاعلانات</h1>
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
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
          <tr class="bg-success text-white">
            <th scope="col">اسم الاعلان</th>
            <th scope="col">رابط الاعلان</th>
            <th scope="col">حركة الاعلان</th>
            <th scope="col">كل الايام</th>
            <th scope="col">مدة الظهور</th>
            <th scope="col">تكرار يومي</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="res in data" :key="res.id">
            <td>{{ res.subject }}</td>
            <td>
              <a :href="res.link" target="_blank">{{ res.link }}</a>
            </td>
            <td>
              <b-badge variant="success" v-if="res.animation_type = 0">منبثق</b-badge>
              <b-badge variant="danger" v-else-if="res.animation_type = 1">شريط</b-badge>
            </td>
            <td>
              <span v-if="res.all_days">لا</span>
              <span v-else-if="!res.all_days">نعم</span>
              <span v-else>-</span>
            </td>
            <td>{{ res.appear_time }}</td>
            <td>{{ res.daily_repeat }}</td>
            <td class="d-flex icons">
              <span class="a" @click="deleteUser(res.id)"><i class="fas fa-trash"></i></span>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AllAds",
  data() {
    return {
      spinner: false,
      data: '',
      msg: '',
      status: '',
    }
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.replace("/login")
    }
    this.loadAds()
  },
  methods: {
    async loadAds() {
      this.spinner = true;

      let myHeaders = new Headers();

      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)


      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = "https://msafr.we-work.pro/api/auth/admin/get-all-advertisings"

      const response = await fetch(url, requestOptions);

      const responseData = await response.json();

      this.data = responseData.data;

      this.spinner = false
    },
    async deleteUser(id) {
      this.spinner = false
      this.response = ''

      const url = 'https://msafr.we-work.pro/api/auth/admin/delete-advertising';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "advertising_id": id
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

      await this.loadAds()

      this.spinner = false

    }
  },
}
</script>

<style scoped>

h1, h2 {
  font-family: 'Almarai', sans-serif;
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