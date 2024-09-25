import { createApp } from 'vue'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
// import { getAuth } from 'firebase/auth';

import "@/assets/styles/output.css";
import 'animate.css';

import HomePage from './components/homePage.vue';
import UserAccount from './components/userAccount.vue';
import UserProfile from './components/userProfile.vue';
import userWishlist from './components/userWishlist.vue';
import userWeeklyOrders from './components/userWeeklyOrders.vue';
import MyOrders from './components/myOrders.vue';
import LoginPage from './components/loginPage.vue'; //Should be deleted!
import TestComponent from './components/testComponent.vue';

// Menna Pages
import SignPage from './components/signPage.vue';
import ProductsPage from './components/productsPage.vue';
import OffersPage from './components/offersPage.vue';
import ErrorPage from './components/errorPage.vue';
import ManageProducts from './components/manageProducts.vue';
import EditDeleteProducts from './components/edit-deleteProducts.vue';

import CategroyPage from './components/categroyPage.vue';
// Second Page
import ProductDetail from './components/productdetail.vue';


//farha
import EmailGetHelp from './components/EmailGetHelp.vue'
import ImpactHeading from './components/ChartsHeadre.vue'
import BoycottWrapper from './components/BoycottingWrapper.vue'
import PlansWrapperComponent from './components/PlansWrapper.vue'
import AdminMangement from './components/AdminMangement.vue'
import manageAdmins from './components/manageAdmins.vue'
import UsersList from './components/manageUsers.vue';
import AdminWeeklyOrder from './components/adminWeeklyOrder.vue';
import ManageUsers from './components/manageUsers.vue';
import AdminAccount from './components/adminAccount.vue';
import ManageMyPlan from './components/manageMyPlan.vue';
import Cart from './components/Cart.vue';



const routes = [
    { path: '/', component: HomePage },
    { path: '/homePage', component: HomePage, meta: { requiresAuth: true } },
    {
        path: '/useraccount',
        component: UserAccount,
        children: [
            { path: '', redirect: '/useraccount/userprofile' },
            { path: 'userprofile', component: UserProfile },
            { path: 'wishlist', component: userWishlist },
            { path: 'weeklyorders/:id?', component: userWeeklyOrders },
            { path: 'myorders', component: MyOrders },
            { path: 'manageMyPlan', component: ManageMyPlan },
        ]
    },
    {
        path: '/adminaccount',
        component: AdminAccount,
        children: [
            { path: '', redirect: '/adminaccount/manageusers' },
            { path: 'manageusers', component: ManageUsers },
            { path: 'weeklyorders', component: userWeeklyOrders },
            { path: 'myorders', component: MyOrders },
            { path: 'manageAdmins', component: manageAdmins }, //wrapper
            { path: 'AdminMangement', component: AdminMangement }, //wrapper
            { path: 'manageusers', component: UsersList },
            { path: 'adminweeklyorder/:id', component: AdminWeeklyOrder },
            { path: 'manageProducts', component: ManageProducts },
            { path: 'editDelete/:id?', component: EditDeleteProducts },
        ]
    },
    { path: '/loginpage', component: LoginPage },
    { path: '/signPage', name: "SignPage", component: SignPage },
    { path: '/productsPage/:id', component: ProductsPage },
    { path: '/offersPage', component: OffersPage },
    { path: '/test', component: TestComponent },
    { path: '/cart', component: Cart },
    { path: '/CategroyPage', component: CategroyPage },
    { path: '/productdetail/:id', component: ProductDetail },
    //farha
    { path: '/ImpactHeading', component: ImpactHeading }, //wrapper
    { path: '/BoycottWrapper', component: BoycottWrapper }, //wrapper
    { path: '/PlansWrapperComponent', component: PlansWrapperComponent }, //wrapper
    { path: '/EmailGetHelp', component: EmailGetHelp }, //wrapper

    { path: '/:NotFound(.*)*', name: 'ErrorPage', component: ErrorPage },

]


const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'router-link-active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            // When using the back/forward buttons, savedPosition helps restore scroll
            return savedPosition;
        } else {
            // Scroll to top when navigating to a new route
            return { top: 0, behavior: 'smooth' };
        }
    }
})

const firebaseConfig = {
    apiKey: "AIzaSyBD8KdPw88r_d0leV3UqO-AEDuJ_jv0Zmg",
    authDomain: "dailymart-5c550.firebaseapp.com",
    databaseURL: "https://dailymart-5c550-default-rtdb.firebaseio.com",
    projectId: "dailymart-5c550",
    storageBucket: "dailymart-5c550.appspot.com",
    messagingSenderId: "609429849774",
    appId: "1:609429849774:web:b4ed4d2106fe70a4780f3f",
    measurementId: "G-CPQVNJ36EH"
};
initializeApp(firebaseConfig);


createApp(App).use(store).use(router).mount('#app')




// router.beforeEach((to, from, next) => {
//     // console.log(getAuth());

//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (getAuth().currentUser) {
//             next();
//         } else {
//             alert("You don't have access")
//             next('/loginPage')
//         }
//     }
//     else {
//         next()
//     }
// })