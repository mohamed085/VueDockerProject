<template>
  <main class="p-3">
    <div class="add-new-order-section">

      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-2 mb-4 border-bottom">
        <h1>إرسال ايميل او اشعار للعملاء</h1>
      </div>


      <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
        <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
      </div>

      <div v-else>

        <div v-if="msg">
          <h3 class="mb-4">{{ msg }}</h3>
          <div v-if="status">
            <router-link class="ads-link" to="/">الصفحة الرئيسية</router-link>
          </div>

          <div v-else-if="!status">
            <span class="ads-link" @click="refreshLink">إرسال ايميل مرة اخري</span>
          </div>
        </div>

        <div v-else>
          <div v-if="selectedUser.length > 0" class="selected">
            <h4>المختارين</h4>
            <div class="people-selected d-flex flex-wrap ">
              <div v-for="user in selectedUser" :key="user.id" class="person pt-1 pb-1 ps-2 pe-2 mt-2 mb-2 me-2">
                <i @click="removeUser(user)" class="fas fa-minus"></i>
                {{ user.name }}
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-9 send-message pe-3 ps-1">
              <div class="send-message-container pt-2 pb-2 pe-1 ps-2">
                <b-form @submit.prevent="sendMessage">
                  <div class="row mb-3">
                    <label class="col-sm-2 mt-auto mb-auto col-form-label" >نوع الارسال</label>
                    <div class="col-sm-10 d-flex mt-auto mb-auto" >
                      <b-form-group class="mt-auto mb-auto">
                        <b-form-radio-group class="mt-auto mb-auto">
                          <div class="d-flex">
                            <b-form-radio v-model="send_by" class="mt-auto mb-auto" value="2"></b-form-radio><span class="mt-auto mb-auto me-1 ms-1">إرسال بريد</span>
                            <b-form-radio v-model="send_by" class="mt-auto mb-auto" value="0"></b-form-radio><span class="mt-auto mb-auto me-1 ms-1">إرسال شعار</span>
                          </div>
                        </b-form-radio-group>
                      </b-form-group>
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label class="col-sm-2 mt-auto mb-auto col-form-label" >العنوان</label>
                    <div class="col-sm-10 d-flex mt-auto mb-auto">
                      <b-form-input v-model="subject"></b-form-input>
                    </div>
                  </div>

                  <div class="row mb-3 templates">
                    <label class="col-sm-2 mt-auto mb-auto col-form-label">القوالب الجاهزة</label>
                    <div class="col-sm-10 d-flex mt-auto mb-auto">
                      <b-form-group class="mt-auto mb-auto">
                        <b-form-radio-group class="mt-auto mb-auto">
                          <div class="d-flex">
                            <b-form-radio class="mt-auto mb-auto" value="first"></b-form-radio><span class="mt-auto mb-auto me-1 ms-1">قالب رقم 1</span>
                            <!--                          <b-form-radio class="mt-auto mb-auto" value="first"></b-form-radio><span class="mt-auto mb-auto me-1 ms-1">قالب رقم 2</span>-->
                            <!--                          <b-form-radio class="mt-auto mb-auto" value="first"></b-form-radio><span class="mt-auto mb-auto me-1 ms-1">قالب رقم 3</span>-->
                            <!--                          <b-form-radio class="mt-auto mb-auto" value="first"></b-form-radio><span class="mt-auto mb-auto me-1 ms-1">قالب رقم 4</span>-->
                          </div>
                        </b-form-radio-group>
                      </b-form-group>

                    </div>
                  </div>

                  <b-button class="w-25 mb-3 mt-2" type="submit" variant="outline-success">ارسال</b-button>

                </b-form>
              </div>
            </div>

            <div class="col-3 all-people pt-2 pb-2 pe-1 ps-1">
              <div v-if="userSpinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
                <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
              </div>
              <div v-else>
                <h4>العدد: {{ users.data.length }}</h4>
                <div class="people d-flex flex-column pt-3 pb-3 pe-2 ps-2">
                  <h6 v-for="user in users.data" :key="user.id">
                    <i @click="selectUser(user)" class="fas fa-plus me-2 text-success"></i>
                    {{ user.name }}
                  </h6>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>


    </div>
  </main>
</template>

<script>
export default {
  name: "SendEmail",
  data() {
    return {
      users: {},
      selectedUser: [],
      userSpinner: false,
      subject: '',
      send_by: 2,
      type_of_template: 1,
      usersId: [],
      spinner: false,
      msg: '',
      status: false
    }
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.replace("/login")
    }
    this.loadUsers()
  },
  methods: {
    async loadUsers() {
      this.userSpinner = true;

      let myHeaders = new Headers();

      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch("https://msafr.we-work.pro/api/auth/admin/get-users-name", requestOptions);

      const responseData = await response.json();

      this.users = responseData;

      this.userSpinner = false

    },
    selectUser(user) {
      this.selectedUser.push(user)
    },
    removeUser(user) {
      for( let i = 0; i < this.selectedUser.length; i++){
        if ( this.selectedUser[i] === user) {
          this.selectedUser.splice(i, 1);
        }
      }
    },
    async sendMessage() {
      this.spinner = true

      let myHeaders = new Headers();

      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)
      myHeaders.append("Content-Type", "application/json");

      let users = [];

      this.selectedUser.forEach((user) => {
        users.push(user.id)
      })

      let raw = JSON.stringify({
        "type": 0,
        "subject": this.subject,
        "send_by": this.send_by,
        "type_of_template": 0,
        "users": users
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch("https://msafr.we-work.pro/api/auth/admin/send-notifications-or-emails", requestOptions);

      const responseData = await response.json();


      if (responseData.status) {
        this.status = true
        this.msg = 'تم الإرسال بنجاح'
      } else {
        this.status = false
        this.msg = 'لم يتم الإرسال'
      }


      this.spinner = false

    },
    refreshLink() {
      this.msg = ''
      this.status = false
    }
  }
}
</script>

<style scoped>
h1, h2, h4 {
  font-family: 'Almarai', sans-serif;
}

.people-selected {
  border-bottom: 1px solid #727272;
  border-top: 1px solid #727272;
}

.person {
  border: 1px solid #727272;
  border-radius: 5px;
}

.person i {
  color: red;
  cursor: pointer;
}

.all-people {
  padding-top: 10px;
  border-top: 1px solid #727272;
  border-bottom: 1px solid #727272;
}

.people i {
  cursor: pointer;
}

.send-message-container {
  border-bottom: 1px solid #727272;
  border-top: 1px solid #727272;
  min-height: 100%;
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