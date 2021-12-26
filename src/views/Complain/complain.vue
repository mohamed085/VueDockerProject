<template>
  <div class="mb-5">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
      <h1>الشكاوي</h1>
    </div>

    <b-modal id="bv-modal-example" hide-footer>
      <div class="d-block text-center">
        <h3>{{ msg }}</h3>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">اغلاق</b-button>
    </b-modal>


    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else class="mt-3">
      <b-form @submit.prevent="save">
        <div class="row">
          <div class="col-9">
            <div class="row d-flex">
              <div class="col-8">
                <div class="card">
                  <h3>بيانات الشكوي</h3>
                  <span>رقم الشكوي: {{ this.$route.params.id }}</span>
                  <span>تاريخ الشكوي: {{ data.created_at }}</span>
                </div>
              </div>
            </div>
            <div class="row d-flex">
              <div class="col-6">
                <div class="card">
                  <h3>بيانات العميل</h3>
                  <div class="row">
                    <div class="col-6 mt-3">
                      <span>اسم العميل: {{ data.user.name }}</span>
                      <br>
                      <span>رقم الطلب: {{ data.related_request_service }}</span>
                      <div class="d-flex mt-3">
                        <b-form-checkbox v-model="user_negative"></b-form-checkbox>
                        <span class="me-2 ms-2">نقاط سلبية علية</span>
                      </div>
                    </div>
                    <div class="col-6">
                      <b-avatar size="10rem" :src="data.user.photo"></b-avatar>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card">
                  <h3>بيانات المسافر</h3>
                  <div class="row">
                    <div class="col-6 mt-3">
                      <span>اسم المسافر: {{ data.masafr.name }}</span>
                      <br>
                      <span>رقم الرحلة: {{ data.related_trip }}</span>
                      <div class="d-flex mt-3">
                        <b-form-checkbox v-model="masafr_negative"></b-form-checkbox>
                        <span class="me-2 ms-2">نقاط سلبية علية</span>
                      </div>
                    </div>
                    <div class="col-6">
                      <b-avatar size="10rem" :src="data.masafr.photo"></b-avatar>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="card">
              <b-form-group v-slot="{ ariaDescribedby }">
                <div class="radio-card d-flex">
                  <b-form-radio v-model="status" :aria-describedby="ariaDescribedby" name="some-radios" value="1"></b-form-radio>
                  <span class="me-2 ms-2">فتح</span>
                </div>
                <div class="radio-card d-flex">
                  <b-form-radio v-model="status" :aria-describedby="ariaDescribedby" name="some-radios" value="0"></b-form-radio>
                  <span class="me-2 ms-2">اغلاق</span>
                </div>
                <div class="radio-card d-flex">
                  <b-form-radio v-model="solved" :aria-describedby="ariaDescribedby" name="some-radios" value="1"></b-form-radio>
                  <span class="me-2 ms-2">تم الحل</span>
                </div>
              </b-form-group>
            </div>
            <b-button type="submit" variant="outline-success" class="w-100">حفظ</b-button>

          </div>
        </div>

        <div class="row mt-5">
          <div class="col-2 text-center">

            <div v-if="data.complainant == 0">
              <b-avatar class="mb-2" :src="data.user.photo" size="8rem" ></b-avatar>
              <h5>{{ data.user.name }}</h5>
            </div>

            <div v-else-if="data.complainant == 1">
              <b-avatar class="mb-2" :src="data.user.photo" size="8rem" ></b-avatar>
              <h5>{{ data.user.name }}</h5>
            </div>

            <h4>الشاكي</h4>

          </div>

          <div class="col-10 text-center">
            <b-textarea v-model="data.reason" rows="8" readonly></b-textarea>
          </div>
        </div>

        <div class="mt-5">

          <h2>تفاصيل الشكوي</h2>

          <div v-for="x in data.complain_list" :key="x.id">
            <div v-if="x.type == 0" class="col-9">
              <div class="d-flex msg justify-content-between">
                <div>
                  <div class="d-flex">
                    <div>
                      <b-avatar size="4rem" :src="data.user.photo"></b-avatar>
                    </div>
                    <div class="mt-auto mb-auto me-2 ms-2">
                      <span>{{ data.user.name }}</span>
                      <span>{{ x.created_at }}</span>
                    </div>
                  </div>
                </div>
                <div class="border">
                  <div>{{ x.subject }}</div>
                  <div v-if="x.attach"><img :src="x.attach"></div>
                </div>
              </div>
            </div>
            <div v-else-if="x.type == 1" class="col-9">
              <div class="d-flex msg justify-content-between">
                <div>
                  <div class="d-flex">
                    <div>
                      <b-avatar size="4rem" :src="data.masafr.photo"></b-avatar>
                    </div>
                    <div class="mt-auto mb-auto me-2 ms-2">
                      <span>{{ data.masafr.name }}</span>
                      <br>
                      <span>{{ x.created_at }}</span>
                    </div>
                  </div>
                </div>
                <div class="border">
                  <div>{{ x.subject }}</div>
                  <div v-if="x.attach"><img :src="x.attach"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </b-form>
    </div>



  </div>
</template>

<script>
export default {
  name: "complain",
  data() {
    return {
      spinner: false,
      data: '',
      user_negative: '',
      masafr_negative: '',
      solved: '',
      status: '',
      msg: ''
    }
  },
  created() {
    this.loadComplain(this.$route.params.id);
  },
  methods: {
    async loadComplain(id) {
      this.spinner = true;

      let myHeaders = new Headers();

      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "complain_id": id
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let url = "https://msafr.we-work.pro/api/auth/admin/get-a-complain"

      const response = await fetch(url, requestOptions);

      const responseData = await response.json();

      this.data = responseData.data;

      if (!this.data) {
        await this.$router.replace("/404")
      }


      this.spinner = false


    },
    async save() {
      this.spinner = true;

      let myHeaders = new Headers();

      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "complain_id": this.$route.params.id,
        "user_negative": this.user_negative,
        "masafr_negative": this.masafr_negative,
        "status": this.status,
        "solved": this.solved,
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let url = "https://msafr.we-work.pro/api/auth/admin/update-complain"

      const response = await fetch(url, requestOptions);

      const responseData = await response.json();

      if (responseData.status) {
        this.msg = "تم تعديل البيانات بنجاح"
      } else  {
        this.msg = "لم يتم تعديل البيانات"
      }

      this.$bvModal.show('bv-modal-example')

      this.spinner = false

    }

  }
}
</script>

<style scoped>
h1, h2, h3, h4 {
  font-family: 'Almarai', sans-serif;
}

.card {
  border: 1px solid #198754;
  border-radius: 15px;
  margin: 10px 0;
  padding: 20px 15px;
  background-color: #198754;
  color: #dddddd;
}

.card span {
  font-size: 16px;
  font-weight: bold;
}

.radio-card {
  padding: 10px 15px;
  background-color: #dddddd;
  color: #111111;
  border-radius: 15px;
  margin: 10px 0;
}

.w-100 {
  border-radius: 15px !important;
}

.msg {
  padding: 15px 25px;
  border-radius: 10px;
  border: 1px solid #5c636a;
  margin: 10px;
}

img {
  max-height: 150px;
  max-width: ;: 150px;
}

</style>