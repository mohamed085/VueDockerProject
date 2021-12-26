<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar bg-success collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">

        <li class="nav-item">
          <router-link to="/" exact class="nav-link" aria-current="page">
            <i class="far fa-file"></i>الصفحة الرئيسية
          </router-link>
        </li>

        <li class="nav-item">
          <div @click="displayItems('customer')" :class="displayCustomerSubItem" class="nav-link d-flex justify-content-between" aria-current="page">
            <router-link to="" class="sub-nav-link">
              <i class="fas fa-users"></i>العملاء
            </router-link>
            <div>
              <i v-if="displayCustomerSubItem" class="fas fa-chevron-up"></i>
              <i v-if="!displayCustomerSubItem" class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div v-if="displayCustomerSubItem" class="ms-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link to="/customers" exact class="nav-link" aria-current="page">
                  <i class="fas fa-users"></i>كل العملاء
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/foreign-customers" exact class="nav-link" aria-current="page">
                  <i class="fas fa-users"></i>العملاء الاجانب
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/trusted-customers" exact class="nav-link" aria-current="page">
                  <i class="fas fa-users"></i>العملاء الموثقون
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <div @click="displayItems('traveller')" :class="displayTravellerSubItem" class="nav-link d-flex justify-content-between" aria-current="page">
            <router-link to="" class="sub-nav-link">
              <i class="fas fa-users"></i>المسافرون
            </router-link>
            <div>
              <i v-if="displayTravellerSubItem" class="fas fa-chevron-up"></i>
              <i v-if="!displayTravellerSubItem" class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div v-if="displayTravellerSubItem" class="ms-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link to="/traveller" exact class="nav-link" aria-current="page">
                  <i class="fas fa-users"></i>كل المسافرين
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/foreign-traveller" exact class="nav-link" aria-current="page">
                  <i class="fas fa-users"></i>المسافرون الاجانب
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/trusted-traveller" exact class="nav-link" aria-current="page">
                  <i class="fas fa-users"></i>المسافرون الموثقون
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <router-link to="/customers-documentation" class="nav-link" aria-current="page">
            <i class="far fa-file"></i>قبول توثيق وتعديل الهوية
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/financial-transactions" exact class="nav-link" aria-current="page">
            <i class="far fa-file"></i>المعاملات المالية والخزانة
          </router-link>
        </li>

        <li class="nav-item">
          <div @click="displayItems('tripe')" class="nav-link d-flex justify-content-between" aria-current="page">
            <router-link to="" class="sub-nav-link">
              <i class="far fa-file"></i> الرحلات
            </router-link>
            <div>
              <i v-if="displayTripeSubItem" class="fas fa-chevron-up"></i>
              <i v-if="!displayTripeSubItem" class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div v-if="displayTripeSubItem" class="ms-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link to="/trips" exact class="nav-link" aria-current="page">
                  <i class="far fa-file"></i>كل الرحلات
                </router-link>
              </li>
<!--              <li class="nav-item">-->
<!--                <router-link to="/add-new-trip-section" exact class="nav-link" aria-current="page">-->
<!--                  <i class="fas fa-plus"></i>اضافة اقسام رحلات-->
<!--                </router-link>-->
<!--              </li>-->
            </ul>
          </div>

        </li>

        <li class="nav-item">
          <div @click="displayItems('order')" class="nav-link d-flex justify-content-between" aria-current="page">
            <router-link to="" class="sub-nav-link">
              <i class="far fa-file"></i> الطلبات
            </router-link>
            <div>
              <i v-if="displayOrdersSubItem" class="fas fa-chevron-up"></i>
              <i v-if="!displayOrdersSubItem" class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div v-if="displayOrdersSubItem" class="ms-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link to="/orders" exact class="nav-link" aria-current="page">
                  <i class="far fa-file"></i>كل الطلبات
                </router-link>
              </li>
<!--              <li class="nav-item">-->
<!--                <router-link to="/add-new-order-section" exact class="nav-link" aria-current="page">-->
<!--                  <i class="fas fa-plus"></i>اضافة اقسام طلبات-->
<!--                </router-link>-->
<!--              </li>-->
            </ul>
          </div>

        </li>

        <li class="nav-item">
          <router-link to="/send-email-users" exact class="nav-link" aria-current="page">
            <i class="fas fa-envelope-square"></i>إرسال ايميل او اشعار للعملاء
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/send-email-travellers" exact class="nav-link" aria-current="page">
            <i class="fas fa-envelope-square"></i>إرسال ايميل او اشعار للمسافرين
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/windows" exact class="nav-link" aria-current="page">
            <i class="fas fa-plus"></i>النوافذ
          </router-link>
        </li>

        <li class="nav-item">
          <div @click="displayItems('advertising')" :class="displayAdvertisingSubItem" class="nav-link d-flex justify-content-between" aria-current="page">
            <router-link to="" class="sub-nav-link">
              <i class="far fa-file"></i>إعلانات
            </router-link>
            <div>
              <i v-if="displayAdvertisingSubItem" class="fas fa-chevron-up"></i>
              <i v-if="!displayAdvertisingSubItem" class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div v-if="displayAdvertisingSubItem" class="ms-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link to="/ads" exact class="nav-link" aria-current="page">
                  <i class="far fa-file"></i>كل الاعلانات
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/add-ads" exact class="nav-link" aria-current="page">
                  <i class="far fa-file"></i>إضافة اعلان
                </router-link>
              </li>
            </ul>
          </div>
        </li>


        <li class="nav-item">
          <div @click="displayItems('invoice')" :class="displayInvoiceSubItem" class="nav-link d-flex justify-content-between" aria-current="page">
            <router-link to="" class="sub-nav-link">
              <i class="fas fa-users"></i>عمليات الرصيد
            </router-link>
            <div>
              <i v-if="displayInvoiceSubItem" class="fas fa-chevron-up"></i>
              <i v-if="!displayInvoiceSubItem" class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div v-if="displayInvoiceSubItem" class="ms-3">
            <ul class="nav flex-column">
<!--              <li class="nav-item">-->
<!--                <router-link to="#" exact class="nav-link" aria-current="page">-->
<!--                  <i class="fas fa-users"></i>سحب رصيد-->
<!--                </router-link>-->
<!--              </li>-->
<!--              <li class="nav-item">-->
<!--                <router-link to="#" exact class="nav-link" aria-current="page">-->
<!--                  <i class="fas fa-plus"></i>اضافة رصيد-->
<!--                </router-link>-->
<!--              </li>-->
              <li class="nav-item">
                <router-link to="/invoices" exact class="nav-link" aria-current="page">
                  <i class="fas fa-user"></i>الفواتير
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <div @click="displayItems('coupon')" class="nav-link d-flex justify-content-between" aria-current="page">
            <router-link to="" class="sub-nav-link">
              <i class="far fa-file"></i>الكوبونات
            </router-link>
            <div>
              <i v-if="displayCouponSubItem" class="fas fa-chevron-up"></i>
              <i v-if="!displayCouponSubItem" class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div v-if="displayCouponSubItem" class="ms-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link to="/coupons" exact class="nav-link" aria-current="page">
                  <i class="far fa-file"></i>الكوبونات الموجودة
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/coupons-users" exact class="nav-link" aria-current="page">
                  <i class="fas fa-users"></i>الاشخاص المستفدين بالكوبونات
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/add-new-coupon" exact class="nav-link" aria-current="page">
                  <i class="fas fa-plus"></i>اضافة كوبون جديد
                </router-link>
              </li>
            </ul>
          </div>

        </li>

        <li class="nav-item">
          <router-link to="/setting" class="nav-link" aria-current="page">
            <i class="far fa-file"></i>اعدادات عامة
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/complains" class="nav-link" aria-current="page">
            <i class="far fa-file"></i>الشكاوي
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/chats" class="nav-link" aria-current="page">
            <i class="far fa-file"></i>محدثات الشات
          </router-link>
        </li>

<!--        <li class="nav-item">-->
<!--          <div @click="displayItems('archive')" :class="displayArchivesSubItem" class="nav-link d-flex justify-content-between" aria-current="page">-->
<!--            <router-link to="" class="sub-nav-link">-->
<!--              <i class="fas fa-users"></i>الارشيف-->
<!--            </router-link>-->
<!--            <div>-->
<!--              <i v-if="displayArchivesSubItem" class="fas fa-chevron-up"></i>-->
<!--              <i v-if="!displayArchivesSubItem" class="fas fa-chevron-down"></i>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div v-if="displayArchivesSubItem" class="ms-3">-->
<!--            <ul class="nav flex-column">-->
<!--              <li class="nav-item">-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </li>-->

      </ul>

    </div>
  </nav>
</template>

<script>
export default {
  name: "sidebar-nav",
  data() {
    return {
      displayCustomerSubItem: false,
      displayOrdersSubItem: false,
      displayTripeSubItem: false,
      displayCouponSubItem: false,
      displayInvoiceSubItem: false,
      displayArchivesSubItem: false,
      displayAdvertisingSubItem: false,
      displayTravellerSubItem: false,
    }
  },
  methods: {
    displayItems(item) {
      if (item === 'customer')
        this.displayCustomerSubItem = !this.displayCustomerSubItem
      else if (item === 'traveller')
        this.displayTravellerSubItem = !this.displayTravellerSubItem
      else if (item === 'order')
        this.displayOrdersSubItem = !this.displayOrdersSubItem
      else if (item === 'tripe')
        this.displayTripeSubItem = !this.displayTripeSubItem
      else if (item === 'coupon')
        this.displayCouponSubItem = !this.displayCouponSubItem
      else if (item === 'invoice')
        this.displayInvoiceSubItem = !this.displayInvoiceSubItem
      else if (item === 'archive')
        this.displayArchivesSubItem = !this.displayArchivesSubItem
      else if (item === 'advertising')
        this.displayAdvertisingSubItem = !this.displayAdvertisingSubItem
    }
  }
}
</script>

<style scoped>
.sidebar {
  overflow-y: auto;
  scrollbar-gutter: stable;
}

.sidebar::-webkit-scrollbar {
  width: 5px;
}

.sidebar::-webkit-scrollbar-track {
  background-color: #333;
  border-radius: 100px;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  border-radius: 100px;
}



.nav-link {
  cursor: pointer;
  font-size: 16px;
  color: #ffffff !important;
}

.sub-nav-link {
  color: #ffffff;
  text-decoration: none;
}

.nav-item {
  padding: 0;
}

.nav-link.active,
.nav-link:hover,
.nav-link.router-link-active {
  background-color: #dddddd;
  color: #111111 !important;
}

.nav-link:hover .sub-nav-link,
.nav-link.active .sub-nav-link {
  color: #111111 !important;
}

.nav-link i {
  margin: 0 5px;
}

@media (max-width:1024px)  {
  .sidebar {
    margin-top: 0;
    padding-top: 10px;
  }
}


</style>