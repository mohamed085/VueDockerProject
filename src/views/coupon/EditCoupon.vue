<template>
  <div class="p-3">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
      <h1>تعديل كوبون</h1>
    </div>

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else>
      <div v-if="msg">
        <h3 class="mb-4">{{ msg }}</h3>
        <div v-if="status">
          <router-link class="ads-link" to="/coupons">الكوبنات</router-link>
        </div>

        <div v-else-if="!status">
          <router-link class="ads-link" to="/coupons">الكوبنات</router-link>
        </div>
      </div>

      <b-form v-else @submit.prevent="addNewCoupon">
        <b-form-group>
          <div v-if="coupon.copon_type == '1'">
            <div class="d-flex mb-3" >
              <h4 class="mt-auto mb-auto ms-2">خصم</h4>
            </div>

            <b-form-group label-cols="2" label="اسم الكوبون">
              <b-form-input v-model="coupon.copon_name"></b-form-input>
            </b-form-group>

            <b-form-group label-cols="2" label="الكمية">
              <b-form-input v-model="coupon.amount" type="number"></b-form-input>
            </b-form-group>

            <b-form-group label-cols="2" label="قيمة الخصم">
              <b-form-input v-model="coupon.value" type="number"></b-form-input>
            </b-form-group>

            <b-form-group label-cols="2" label="رسالة الخطأ (اسم الكود موجود)">
              <b-form-input v-model="coupon.copon_full_amount_err"></b-form-input>
            </b-form-group>

            <b-form-group label-cols="2" label="رسالة الخطأ (اسم الكود غير موجود)">
              <b-form-input v-model="coupon.not_exsist_copon_err"></b-form-input>
            </b-form-group>

            <b-form-group label-cols="2" label="رسالة التكرار">
              <b-form-input v-model="coupon.has_used_copon_before_err"></b-form-input>
            </b-form-group>

            <b-form-group label-cols="2" label="اسم الفوز">
              <b-form-input v-model="coupon.copon_success"></b-form-input>
            </b-form-group>

            <b-form-group label-cols="2" label="صورة الكوبون">
              <img class="img" :src="coupon.gift_picture">
            </b-form-group>

            <div class="row g-3">
              <div class="col">
                <b-form-group label-cols="3" label="تاريخ بداية الكوبون">
                  <b-form-input type="date" v-model="coupon.copon_start_date"></b-form-input>
                </b-form-group>
              </div>
              <div class="col">
                <b-form-group label-cols="3" label="تاريخ انتهاء الكوبون">
                  <b-form-input type="date" v-model="coupon.copon_end_date"></b-form-input>
                </b-form-group>
              </div>
            </div>
          </div>

          <div v-else-if="coupon.copon_type == '2'">
            <div class="d-flex mt-5 mb-3" >
              <h4 class="mt-auto mb-auto ms-2">هدية</h4>
            </div>

            <b-form-group label-cols="2" label="مخصص لرقم">
              <b-form-input v-model="coupon.name"></b-form-input>
            </b-form-group>

            <b-form-group label-cols="2" label="لقد حصلت علي">
              <b-form-input v-model="coupon.name"></b-form-input>
            </b-form-group>

            <b-form-group label-cols="2" label="رابط">
              <b-form-input v-model="coupon.name"></b-form-input>
            </b-form-group>

          </div>

        </b-form-group>
        <b-button class="mt-4 mb-4 w-25" type="submit" variant="outline-success">حفظ التعديلات</b-button>
      </b-form>

    </div>
  </div>
</template>

<script>
export default {
  name: "EditCoupon",
  data() {
    return {
      coupon: '',
      spinner: false,
      msg: '',
      status: false
    }
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.replace("/login")
    }
    this.loadCouponInfo(this.$route.params.id);
  },
  methods: {
    async loadCouponInfo(id) {
      let myHeaders = new Headers();
      this.spinner = true;

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

      let url = "https://msafr.we-work.pro/api/auth/admin/get-copon"
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!responseData.status) {
        await this.$router.replace("/404")
      }

      this.coupon = responseData.data

      console.log(this.coupon)

      this.spinner = false;

    },
    async addNewCoupon() {
      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)

      let formdata = new FormData();
      formdata.append("copon_name", this.coupon.copon_name);
      formdata.append("copon_start_date", this.coupon.copon_start_date);
      formdata.append("copon_end_date", this.coupon.copon_end_date);
      formdata.append("amount", this.coupon.amount);
      formdata.append("value", this.coupon.value);
      formdata.append("copon_type", this.coupon.copon_type);
      formdata.append("copon_full_amount_err", this.coupon.copon_full_amount_err);
      formdata.append("not_exsist_copon_err", this.coupon.not_exsist_copon_err);
      formdata.append("has_used_copon_before_err", this.coupon.has_used_copon_before_err);
      formdata.append("copon_success", this.coupon.copon_success);
      formdata.append("copon_id", this.coupon.id);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      let url = "https://msafr.we-work.pro/api/auth/admin/update-copon"

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      console.log(responseData)

      if (responseData.status) {
        this.msg = "تم تعديل الكوبون بنجاح"
      } else {
        this.msg = "لم يتم تعديل الكوبون"
      }
      this.status = responseData.status
    }
  }

}
</script>

<style scoped>
h1, h2, h4 {
  font-family: 'Almarai', sans-serif;
}

.img {
  max-width: 500px;
  max-height: 300px;
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