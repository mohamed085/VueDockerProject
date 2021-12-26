<template>
  <div class="p-3">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
      <h1>اضافة عميل جديد</h1>
    </div>

    <b-form @submit.prevent="addNewCustomer">
      <b-form-group label-cols="2" label="اسم العميل">
        <b-form-input v-model="customer.name"></b-form-input>
      </b-form-group>

      <b-button class="mt-4 mb-4" type="submit" variant="success">حفظ العميل</b-button>
    </b-form>

  </div>
</template>

<script>
export default {
  name: "AddNewCustomer",
  data() {
    return {
      customer: {
        name: ''
      }
    }
  },
  methods: {
    addNewCustomer() {

    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-family: 'Almarai', sans-serif;
}

</style>