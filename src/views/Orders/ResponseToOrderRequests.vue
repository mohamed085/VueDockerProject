<template>
  <main class="p-3">
    <div class="add-new-order-section">

      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-2 mb-4 border-bottom">
        <h1>الاستجابة على  الطلبات</h1>
      </div>

      <div class="d-flex justify-content-between">
        <h4><b-badge variant="danger">ملاحظة يجب  وضع رسائل تأكيد قبل الإلغاء </b-badge></h4>
        <h4><b-badge variant="danger">ملاحظة المال تبع العميل المحجوز ومرتبط بطلب لايستخدم بطلب اخر حتى يتم الفك </b-badge></h4>
      </div>

      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
          <tr class="bg-success text-white">
            <th scope="col">#</th>
            <th scope="col">اسم المسافر</th>
            <th scope="col">الرحلة</th>
            <th scope="col">كود الإستلام</th>
            <th scope="col">كود التسليم</th>
            <th scope="col">حالة العروض</th>
            <th scope="col">وقت انتهاء الرحلة </th>
            <th scope="col">الدفع</th>
            <th scope="col">رسوم التأمين</th>
            <th scope="col">سعر التوصيل</th>
            <th scope="col">رسوم الموفع</th>
            <th scope="col">تخفيض</th>
            <th scope="col">طلبات الالغاء</th>
            <th scope="col">الإجمالى</th>
            <th scope="col">الشات</th>
            <th scope="col">الفانورة</th>
            <th scope="col">النتيجة</th>
            <th scope="col">التقيم</th>
            <th scope="col">تخذ القرار</th>
            <th scope="col">الاسباب</th>
          </tr>
          </thead>
          <tbody>
          <tr>

          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </main>

</template>

<script>
export default {
name: "ResponseToOrderRequests"
}
</script>

<style scoped>
h1, h2 {
  font-family: 'Almarai', sans-serif;
}

.table .icons a {
  margin: 0 5px;
  color: #111;
}

.table .icons a:hover {
  color: #0a53be;
}

.search-form {
  border: 1px solid #ddd;
  padding: 0;
  border-radius: 7px;
  margin: 5px;
  background-color: #ffffff;
}

.search-form input {
  border: none;
}

.search-form button {
  padding: 0 5px;
}

</style>