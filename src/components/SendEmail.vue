<template>
  <div class="sendEmail">
    <div class="header"></div>

  </div>
</template>

<script>
export default {
  name: "SendEmail",
  props: ['id']
}
</script>

<style scoped>
.sendEmail {
  position: fixed;
  top: 100px;
  left: 25px;
  min-height: 60vh;
  width: 80%;
  z-index: 10;
}
</style>