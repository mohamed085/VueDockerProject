<template>
  <div class="p-3">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
      <h1>اضافة كوبون جديد</h1>
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
          <div class="d-flex mb-3">
            <b-form-radio v-model="coupon.type" size="lg" value="coupon" required></b-form-radio>
            <h4 class="mt-auto mb-auto ms-2">خصم</h4>
          </div>

          <b-form-group label-cols="2" label="اسم الكوبون">
            <b-form-input v-model="coupon.name" required></b-form-input>
          </b-form-group>

          <b-form-group label-cols="2" label="الكمية">
            <b-form-input v-model="coupon.quantity" type="number" required></b-form-input>
          </b-form-group>

          <b-form-group label-cols="2" label="قيمة الخصم">
            <b-form-input v-model="coupon.discount" type="number" required></b-form-input>
          </b-form-group>

          <b-form-group label-cols="2" label="رسالة الخطأ (اسم الكود موجود)">
            <b-form-input v-model="coupon.errorCodeAlreadyExist" required></b-form-input>
          </b-form-group>

          <b-form-group label-cols="2" label="رسالة الخطأ (اسم الكود غير موجود)">
            <b-form-input v-model="coupon.errorCodeNotExist" required></b-form-input>
          </b-form-group>

          <b-form-group label-cols="2" label="رسالة التكرار">
            <b-form-input v-model="coupon.repeatError" required></b-form-input>
          </b-form-group>

          <b-form-group label-cols="2" label="اسم الفوز">
            <b-form-input v-model="coupon.winMessage" required></b-form-input>
          </b-form-group>

          <div class="row g-3">
            <div class="col">
              <b-form-group label-cols="3" label="تاريخ بداية الكوبون">
                <b-form-input type="date" v-model="coupon.startDate" required></b-form-input>
              </b-form-group>
            </div>
            <div class="col">
              <b-form-group label-cols="3" label="تاريخ انتهاء الكوبون">
                <b-form-input type="date" v-model="coupon.endDate" required></b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="d-flex mt-5 mb-3">
            <b-form-radio v-model="coupon.type" size="lg" value="gift"></b-form-radio>
            <h4 class="mt-auto mb-auto ms-2">هدية</h4>
          </div>

          <b-form-group label-cols="2" label="مخصص لرقم">
            <b-form-input v-model="coupon.phone"></b-form-input>
          </b-form-group>

          <b-form-group label-cols="2" label="رابط">
            <b-form-input v-model="coupon.link"></b-form-input>
          </b-form-group>

        </b-form-group>

        <b-button class="mt-4 mb-4 w-25" type="submit" variant="outline-success">حفظ الكوبون</b-button>
      </b-form>

    </div>
  </div>
</template>

<script>
export default {
  name: "AddNewCoupon",
  data() {
    return {
      coupon: {
        type: '',
        name: '',
        quantity: 0,
        discount: 0.0,
        errorCodeAlreadyExist: 'نعتذر منك استخدام كامل العددواصبح الخصم غير متوفر',
        errorCodeNotExist: 'نعتذر منك هذا الكود غير صحيح',
        repeatError: 'نعتذر منك لقد استخدمتم كود سابق',
        winMessage: 'مبروك حصولك علي خصم 10 ريال',
        startDate: null,
        endDate: null,
        phone: '',
        link: '',
      },
      msg: '',
      spinner: false,
      status: false
    }
  },

  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.replace("/login")
    }
  },
  methods: {
    async addNewCoupon() {
      let myHeaders = new Headers();
      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)

      let formdata = new FormData();
      formdata.append("copon_name", this.coupon.name);
      formdata.append("copon_start_date", this.coupon.startDate);
      formdata.append("copon_end_date", this.coupon.endDate);
      formdata.append("amount", this.coupon.quantity);
      formdata.append("value", this.coupon.discount);
      formdata.append("copon_full_amount_err", this.coupon.errorCodeAlreadyExist);
      formdata.append("not_exsist_copon_err", this.coupon.errorCodeNotExist);
      formdata.append("has_used_copon_before_err", this.coupon.repeatError);
      formdata.append("copon_success", this.coupon.winMessage);
      formdata.append("copon_type", this.coupon.type == "coupon" ? "0" : "1");
      formdata.append("phones", this.coupon.phone);
      formdata.append("phones", this.coupon.link);

      let url = "https://msafr.we-work.pro/api/auth/admin/create-copon"

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      console.log(responseData)

      if (responseData.status) {
        this.msg = "تم اضافة الكوبون بنجاح"
      } else {
        this.msg = "لم يتم اضافة الكوبون"
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