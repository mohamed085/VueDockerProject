<template>
  <main>
    <header-nav></header-nav>

    <div class="container-fluid">
      <div class="row">
        <sidebar-nav></sidebar-nav>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>

      </div>
    </div>

  </main>
</template>

<script>

import HeaderNav from "@/components/ui/header-nav";
import SidebarNav from "@/components/ui/sidebar-nav";
export default {
  name: 'Home',
  components: {
    SidebarNav,
    HeaderNav

  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.replace("/login")
    }
  }
}
</script>

<style scoped>
@import "https://getbootstrap.com/docs/5.1/examples/dashboard-rtl/";
@import "../assets/css/bootstrap.rtl.min.css";
@import "../assets/css/dashboard.rtl.css";
@import url('https://fonts.googleapis.com/css2?family=Almarai&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@600&display=swap');

main {
  background-color: #dddddd;
  min-height: 90vh;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

</style>