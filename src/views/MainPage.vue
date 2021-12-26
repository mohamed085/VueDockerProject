<template>
  <main class="pe-3 ps-3 pt-4">

    <div v-if="spinner" class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <b-spinner variant="success" style="width: 3rem; height: 3rem;" type="grow" label="Spinning"></b-spinner>
    </div>


    <div v-else>
      <div class="cards d-flex flex-wrap justify-content-center align-items-center">
        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.masafrs_count }}</h3>
          <h4 class="text-center">المسافرين</h4>
          <router-link to="/traveller" class="read-more d-flex justify-content-center">
            <h5>إقراء المزيد</h5>
          </router-link>
        </div>

        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.masafrs_foreigners }}</h3>
          <h4 class="text-center">المسافرين الاجانب</h4>
          <router-link to="/foreign-traveller" class="read-more d-flex justify-content-center">
            <h5>إقراء المزيد</h5>
          </router-link>
        </div>


        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.masafrs_trusts }}</h3>
          <h4 class="text-center">المسافرين موثقون</h4>
          <router-link to="/trusted-traveller" class="read-more d-flex justify-content-center">
            <h5>إقراء المزيد</h5>
          </router-link>
        </div>

      </div>

      <div class="cards d-flex flex-wrap justify-content-center align-items-center">
        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.users_count }}</h3>
          <h4 class="text-center">العملاء</h4>
          <router-link to="/customers" class="read-more d-flex justify-content-center">
            <h5>إقراء المزيد</h5>
          </router-link>
        </div>

        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.users_foreigners }}</h3>
          <h4 class="text-center">العملاء الاجانب</h4>
          <router-link to="/foreign-customers" class="read-more d-flex justify-content-center">
            <h5>إقراء المزيد</h5>
          </router-link>
        </div>


        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.users_trusts }}</h3>
          <h4 class="text-center">العملاء موثقون</h4>
          <router-link to="/trusted-customers" class="read-more d-flex justify-content-center">
            <h5>إقراء المزيد</h5>
          </router-link>
        </div>

      </div>

      <div class="cards d-flex flex-wrap justify-content-center align-items-center">

        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.chat_rooms }}</h3>
          <h4 class="text-center">محادثات الشات</h4>
          <span class="read-more d-flex justify-content-center">
            <router-link to="/chats">
              <h5>إقراء المزيد</h5>
            </router-link>
          </span>
        </div>

        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.chat_rooms }}</h3>
          <h4 class="text-center">رسائل الادارة</h4>
          <span class="read-more d-flex justify-content-center">
            <router-link to="/chats">
              <h5>إقراء المزيد</h5>
            </router-link>
          </span>
        </div>

        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.masafrs_count }}</h3>
          <h4 class="text-center">توثيق الهوية</h4>
          <span class="read-more d-flex justify-content-center">
            <router-link to="/customers-documentation">
              <h5>إقراء المزيد</h5>
            </router-link>
          </span>
        </div>

      </div>

      <div class="cards d-flex flex-wrap justify-content-center align-items-center">
        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.request_services }}</h3>
          <h4 class="text-center">الطلبات</h4>
          <router-link to="/orders" class="read-more d-flex justify-content-center">
            <h5>إقراء المزيد</h5>
          </router-link>
        </div>

        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.trips }}</h3>
          <h4 class="text-center">الرحلات</h4>
          <router-link to="/trips" class="read-more d-flex justify-content-center">
            <h5>إقراء المزيد</h5>
          </router-link>
        </div>

        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.finished_requests }}</h3>
          <h4 class="text-center">طلبات منفذه</h4>
          <span class="read-more d-flex justify-content-center">
            <h5>إقراء المزيد</h5>
          </span>
        </div>

        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.canceled_requests }}</h3>
          <h4 class="text-center">طلبات الالغاء</h4>
          <span class="read-more d-flex justify-content-center">
            <h5>إقراء المزيد</h5>
          </span>
        </div>

        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.complains }}</h3>
          <h4 class="text-center">الشكاوي</h4>
          <router-link to="/complains" class="read-more d-flex justify-content-center">
            <h5>إقراء المزيد</h5>
          </router-link>
        </div>

      </div>


      <div class="cards d-flex flex-wrap justify-content-center align-items-center">
        <div class="users-card d-flex flex-column justify-content-center align-items-center m-3">
          <h3 class="text-center">{{ data.unverified_users }}</h3>
          <h4 class="text-center">عملاء لم يفعل الكود</h4>
          <router-link to="#" class="read-more d-flex justify-content-center">
            <h5>إقراء المزيد</h5>
          </router-link>
        </div>
      </div>

      </div>

  </main>
</template>

<script>

export default {
  name: "MainPage",
  data() {
    return {
      data: {},
      spinner: false
    }
  },
  created() {
    this.loadMainData()
  },
  methods: {
    async loadMainData() {
      this.spinner = true;

      let myHeaders = new Headers();

      const token = this.$store.getters.token;

      myHeaders.append("authToken", token)

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch("https://msafr.we-work.pro/api/auth/admin/main-page-info", requestOptions);

      const responseData = await response.json();

      this.data = responseData.data;

      this.spinner = false
    }
  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@500&display=swap');

.users-card {
  border-radius: 5px;
  border: 1px solid rgba(25,135,84,1)!important;
  min-width: 230px;
  min-height: 170px;
  cursor: pointer;
}

.users-card:hover {
  background-color: rgba(25,135,84,1)!important;
  color: #ffffff;
}

.users-card h4 {
  font-family: 'Cairo', sans-serif;
}

.cards {
  border-bottom: 1px solid #198754;
  padding-bottom: 15px;
  margin-bottom: 15px;
}

.read-more {
  margin-top: 10px;
  width: 100%;
  padding: 8px 0 5px;
  background-color: #198754;
  color: #ffffff;
}

.users-card:hover .read-more {
  background-color: #ffffff;
  color: #198754;
}

a, a:hover {
 text-decoration: none;
  color: inherit;
}


</style>