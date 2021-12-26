<template>
  <header class="navbar sticky-top bg-success flex-md-nowrap p-0 shadow">
    <router-link to="/" class="navbar-brand d-flex col-md-3 col-lg-2 me-0 px-3">
      <img class="logo-img" src="../../assets/img/logo.jpeg">
      <span class="logo-name d-flex align-items-center">مسافر</span>
    </router-link>

    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="عرض/إخفاء لوحة التنقل">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <b-dropdown variant="success" class="nav-link p-0 me-2 ms-2 mt-0 mb-0" toggle-class="text-decoration-none" no-caret>
          <template #button-content>
            <i class="fas fa-chevron-down"></i>
            <b-avatar class="ms-2"></b-avatar>
          </template>
          <b-dropdown-item @click="logout">تسجيل الخروج</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "header-nav",
  methods: {
    logout() {
      this.$store.dispatch("logout")

      this.$router.replace('/login')

    }
  }
}
</script>

<style scoped>
.logo-img {
  margin: 0 10px;
  width: 35px;
  height: 30px;
}

.logo-name {
  font-family: 'Cairo', sans-serif;
}

.navbar-brand .logo-name {
  color: #fff;
}

.navbar-brand:hover .logo-name {
  color: #6c757d;
}

</style>