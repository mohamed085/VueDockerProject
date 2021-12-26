<template>
  <div class="test">
    <send-email></send-email>
  </div>
</template>

<script>
import SendEmail from "@/components/SendEmail";
export default {
name: "Test",
  components: {SendEmail}
}
</script>

<style scoped>
.test {
  background-color: #5c636a;
  min-width: 100vh;
  min-height: 90vh;
}
</style>