<template>
  <div class="p-3">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
      <h1>توثيق العميل</h1>
    </div>

    <div class="row">
      <div class="col-10">
        <div class="row">
          <div class="col-6 d-flex">
            <b-avatar size="8rem" :src="data.photo"></b-avatar>
            <h3 class="mt-auto mb-auto ms-3">البيانات السابقة</h3>
          </div>
          <div class="col-6 d-flex">
            <avatar></avatar>
            <h3 class="mt-auto mb-auto ms-3">البيانات الجديدة</h3>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="cars-image d-flex justify-content-center m-3">
              <div class="car-image d-flex flex-column ms-3">
                <b-avatar variant="info" size="5rem" :src="data.photo"></b-avatar>
                <b-button class="btn-sm mt-2 fas fa-plus" variant="outline-success"></b-button>
              </div>
              <div class="car-image d-flex flex-column ms-2">
                <b-avatar variant="info" size="5rem" src="https://placekitten.com/300/300"></b-avatar>
                <b-button class="btn-sm mt-2 fas fa-plus" variant="outline-success"></b-button>
              </div>
              <div class="car-image d-flex flex-column ms-2">
                <b-avatar variant="outline-dark" size="5rem">صورة السيارة</b-avatar>
                <b-button class="btn-sm mt-2 fas fa-plus" variant="outline-success"></b-button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="cars-image d-flex justify-content-center m-3">
              <div class="car-image d-flex flex-column ms-3">
                <b-avatar variant="info" size="5rem" src="https://placekitten.com/300/300"></b-avatar>
                <b-button class="btn-sm mt-2 fas fa-plus" variant="outline-success"></b-button>
              </div>
              <div class="car-image d-flex flex-column ms-2">
                <b-avatar variant="info" size="5rem" src="https://placekitten.com/300/300"></b-avatar>
                <b-button class="btn-sm mt-2 fas fa-plus" variant="outline-success"></b-button>
              </div>
              <div class="car-image d-flex flex-column ms-2">
                <b-avatar variant="outline-dark" size="5rem">صورة السيارة</b-avatar>
                <b-button class="btn-sm mt-2 fas fa-plus" variant="outline-success"></b-button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="car-details">
              <div class="row m-2">
                <div class="col">
                  <input type="text" class="form-control" placeholder="اسم السيارة">
                </div>
                <div class="col">
                  <input type="text" class="form-control" placeholder="الموديل">
                </div>
              </div>
              <div class="row m-2">
                <div class="col">
                  <input type="text" class="form-control" placeholder="رقم الهوية">
                </div>
                <div class="col">
                  <input type="text" class="form-control" placeholder="الجنسية">
                </div>
              </div>
              <div class="row m-2">
                <div class="col">
                  <input type="text" class="form-control" placeholder="الاسم المستعار">
                </div>
                <div class="col">
                  <input type="text" class="form-control" placeholder="الاسم الحقيقي">
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="car-details">
              <div class="row m-2">
                <div class="col">
                  <input type="text" class="form-control" placeholder="اسم السيارة">
                </div>
                <div class="col">
                  <input type="text" class="form-control" placeholder="الموديل">
                </div>
              </div>
              <div class="row m-2">
                <div class="col">
                  <input type="text" class="form-control" placeholder="رقم الهوية">
                </div>
                <div class="col">
                  <input type="text" class="form-control" placeholder="الجنسية">
                </div>
              </div>
              <div class="row m-2">
                <div class="col">
                  <input type="text" class="form-control" placeholder="الاسم المستعار">
                </div>
                <div class="col">
                  <input type="text" class="form-control" placeholder="الاسم الحقيقي">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <div class="photo photo-old mt-3 mb-4">
              <img src="https://picsum.photos/1024/400/?image=41">
              <b-button class="btn btn-sm mt-2 fas fa-plus" variant="dark"></b-button>
            </div>
          </div>
          <div class="col-2 d-flex flex-column align-items-center justify-content-center">
            <b-button class="swap-icon fas fa-arrows-alt-h" variant="outline-dark"></b-button>
          </div>
          <div class="col-5">
            <div class="photo photo-new mt-3 mb-4">
              <img src="https://picsum.photos/1024/400/?image=41">
              <b-button class="btn btn-sm mt-2 fas fa-plus" variant="dark"></b-button>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <div class="photo photo-old mt-3 mb-4">
              <img src="https://picsum.photos/1024/400/?image=41">
              <b-button class="btn btn-sm mt-2 fas fa-plus" variant="dark"></b-button>
            </div>
          </div>
          <div class="col-2 d-flex flex-column align-items-center justify-content-center">
            <b-button class="swap-icon fas fa-arrows-alt-h" variant="outline-dark"></b-button>
          </div>
          <div class="col-5">
            <div class="photo photo-new mt-3 mb-4">
              <img src="https://picsum.photos/1024/400/?image=41">
              <b-button class="btn btn-sm mt-2 fas fa-plus" variant="dark"></b-button>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <b-textarea class="m-3" rows="4" placeholder="ملاحظات المشرف"></b-textarea>
          </div>
        </div>
      </div>

      <div class="col-2 d-flex flex-column justify-content-center align-items-center">
        <b-form-group>
          <div class="d-flex">
            <b-form-radio name="some-radios" value="true"></b-form-radio>
            <h4><b-badge class="ms-2 p-2" variant="success">قبول التوثيق</b-badge></h4>
          </div>
          <div class="d-flex mt-2">
            <b-form-radio name="some-radios" value="false"></b-form-radio>
            <h4><b-badge class="ms-2 p-2 " variant="danger">رفض التوثيق</b-badge></h4>
          </div>
        </b-form-group>

        <b-textarea rows="5" placeholder="الاسباب"></b-textarea>

        <b-button class="w-100 mt-4" variant="success">حفظ</b-button>

      </div>
    </div>


  </div>

</template>

<script>
import Avatar from "../../components/ui/avatar";
export default {
  name: "EditCustomerDocumentation",
  components: {
    Avatar
  },
  data() {
    return {
      data: ''
    }
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.replace("/login")
    }
    this.loadTravellerInfo(this.$route.params.id);
  },
  methods: {
    async loadTravellerInfo(id) {
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

      console.log(this.data)

      this.spinner = false
    },
  }
}
</script>

<style scoped>
h1, h2 {
  font-family: 'Almarai', sans-serif;
}

.hidden {
  display: none;
}

.car-photo {
  width: 150px;
  height: 150px;
}

.photo {
  border: 1px solid #727272;
  height: 200px;
  position: relative;
}

.photo-old {
  margin-right: 20px;
}

.photo-new {
  margin-left: 20px;
}

.photo img {
  width: 100%;
  height: 100%;
}

.photo button {
  position: absolute;
  bottom: -15px;
  left: 16px;
  padding: 5px 10px;
  border-radius: 15px;
}

.swap-icon {
  font-size: 150%;
  margin: 5px;
}

input:focus, textarea:focus {
  outline: none !important;
  border-color: #727272;
  box-shadow: 0 0 10px #aeaeae;
}

</style>