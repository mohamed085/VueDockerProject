import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
        { path: '/', component: () => import('../views/MainPage.vue')},
        { path: '/financial-transactions', component: () => import('../views/FinancialTransactions.vue') },
        { path: '/trips', component: () => import('../views/Trips/Trips.vue') },
        { path: '/add-new-trip-section', component: () => import('../views/Trips/AddNewTrip.vue') },
        { path: '/orders', component: () => import('../views/Orders/Orders.vue') },
        { path: '/add-new-order-section', component: () => import('../views/Orders/AddNewOrderSection.vue') },
        { path: '/response-to-order-requests', component: () => import('../views/Orders/ResponseToOrderRequests.vue') },
        { path: '/send-email-users', component: () => import('../views/SendEmailToUsers.vue') },
        { path: '/send-email-travellers', component: () => import('../views/SendEmailToTraveller') },
        { path: '/customers', component: () => import('../views/customers/Customers') },
        { path: '/add-new-customer', component: () => import('../views/customers/AddNewCustomer') },
        { path: '/customers', component: () => import('../views/customers/Customers') },
        { path: '/foreign-customers', component: () => import('../views/customers/ForeignCustomers') },
        { path: '/trusted-customers', component: () => import('../views/customers/TrustedCustomers') },
        { path: '/traveller', component: () => import('../views/Traveller/Travellers') },
        { path: '/foreign-traveller', component: () => import('../views/Traveller/ForeignTravellers') },
        { path: '/trusted-traveller', component: () => import('../views/Traveller/TrustedTravellers') },
        { path: '/edit-customer/:id', component: () => import('../views/customers/EditCustomer.vue') },
        { path: '/edit-traveller/:id', component: () => import('../views/Traveller/EditTraveller') },
        { path: '/customers-documentation', component: () => import('../views/customers/CustomerDocumentation') },
        { path: '/edit-customer-documentation/:type/:id', component: () => import('../views/customers/EditUserDocumentation') },
        { path: '/setting', component: () => import('../views/Setting') },
        { path: '/coupons', component: () => import('../views/coupon/Coupons') },
        { path: '/invoices', component: () => import('../views/Invoice') },
        { path: '/windows', component: () => import('../views/Windows') },
        { path: '/coupons-users', component: () => import('../views/coupon/CouponsUsers') },
        { path: '/add-new-coupon', component: () => import('../views/coupon/AddNewCoupon') },
        { path: '/edit-coupon/:id', component: () => import('../views/coupon/EditCoupon') },
        { path: '/chats', component: () => import('../views/Chats') },
        { path: '/ads', component: () => import('../views/Ads/AllAds') },
        { path: '/add-ads', component: () => import('../views/Ads/AddAds') },
        { path: '/complains', component: () => import('../views/Complain/complains') },
        { path: '/complain/:id', component: () => import('../views/Complain/complain') },
    ]
  },
  { path: '/user/:id', component: () => import('../views/UserInfo')},
  { path: '/traveller/:id', component: () => import('../views/TravellerInfo')},
  { path: '/login', component: () => import('../views/Auth.vue')},
  { path: '/:notFound(.*)', component: () => import('../views/NotFound') },
  { path: '/404', component: () => import('../views/NotFound') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
