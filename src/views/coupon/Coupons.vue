<template>
  <div class="pb-5">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1>الكوبونات</h1>
    </div>

    <b-modal id="my-modal" hide-footer>
      <div class="d-block text-center">
        <h3>{{ msg }}</h3>
      </div>
    </b-modal>


    <h2 class="mt-4 mb-3">الكوبونات الموجودة</h2>
    <button @click="addNewCoupon" type="button" class="btn btn-sm btn-outline-success mb-3"><i class="far fa-plus"></i> إضافة كوبون جديد</button>


    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr class="bg-success text-white">
            <th scope="col">صورة الهدية</th>
            <th scope="col">اسم الكوبون</th>
            <th scope="col">تاريخ بداية الكوبون</th>
            <th scope="col">تاريخ نهاية الكوبون</th>
            <th scope="col">الكمية</th>
            <th scope="col">القيمة</th>
            <th scope="col">نوع الكوبون</th>
            <th scope="col">الحاصلين</th>
            <th scope="col">تاريخ الإضافة</th>
            <th scope="col">تعديل</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="res in response.data.data" :key="res.id">
            <td>
              <b-avatar :src="res.gift_picture"></b-avatar>
            </td>
            <td>{{ res.copon_name }}</td>
            <td>{{ res.copon_start_date }}</td>
            <td>{{ res.copon_end_date }}</td>
            <td>{{ res.amount }}</td>
            <td>{{ res.value }}</td>
            <td>{{ res.copon_type }}</td>
            <td>{{ res.used }}</td>
            <td>{{ res.created_at }}</td>
            <td class="d-flex icons">
              <router-link :to="'/edit-coupon/' + res.id"><i class="fas fa-edit"></i></router-link> |
              <span class="a" @click="deleteUser(res.id)"><i class="fas fa-trash"></i></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import router from "../../router";
import store from "../../store";

export default {
  name: "Coupons",
  data() {
    return {
      spinner: false,
      response: '',
      msg: ''
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

      const url = 'https://msafr.we-work.pro/api/auth/admin/get-all-copons';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      this.response = responseData

      this.spinner = false;

    },
    async search() {

    },
    addNewCoupon() {
      router.push('/add-new-coupon')
    },
    async deleteUser(id) {
      this.spinner = true
      this.response = ''

      const url = 'https://msafr.we-work.pro/api/auth/admin/delete-copon';

      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "copon_id": id
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

      this.spinner = false

      await this.loadData()


    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-family: 'Almarai', sans-serif;
}

.table .icons a {
  margin: 0 5px;
  color: #111;
}

.table .icons a:hover {
  color: #0a53be;
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