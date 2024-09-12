import { createApp } from 'vue'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import { createRouter, createWebHistory } from 'vue-router'
import "@/assets/styles/output.css";
import HomePage from './components/homePage.vue';
import UserAccount from './components/userAccount.vue';
import UserProfile from './components/userProfile.vue';
import userWishlist from './components/userWishlist.vue';
import userWeeklyOrders from './components/userWeeklyOrders.vue';
import MyOrders from './components/myOrders.vue';
import LoginPage from './components/loginPage.vue';
import TestComponent from './components/testComponent.vue';
// import { getAuth } from 'firebase/auth';

// Menna Pages
import SignPage from './components/signPage.vue';
import ProductsPage from './components/productsPage.vue';
import OffersPage from './components/offersPage.vue';
import ErrorPage from './components/errorPage.vue';
import ManageProducts from './components/manageProducts.vue';
import EditDeleteProducts from './components/edit-deleteProducts.vue';


import Cart from './components/Cart.vue';
import CategroyPage from './components/categroyPage.vue';


//Farha
// import ImpactHeading from './components/ChartsHeadre.vue'
// import BoycottWrapper from './components/BoycottingWrapper.vue'
// import BoycottProducts from './components/BoycottingProducts.vue'
// import RollerCoasterCarousel from './components/BoycottingCaroselLogo.vue'
// import PlansWrapperComponent from './components/PlansWrapper.vue'
// import CartProducts from './components/Cart.vue'
// import TopPicksForYou from './components/TopPicks.vue'
// import HowItWorks from './components/HowItWorks.vue'
// import PlansCrds from './components/PlansCrds.vue'
// import FAQSection from './components/FaqPlans.vue'
// import AdminHeader from './components/AdminHeader.vue'
// import AdminSidebar from './components/AdminSidebar.vue'
// import AdminForm from './components/AdminForm.vue'
// import AdminMangement from './components/AdminMangement.vue'
// import AdminListItem from './components/AdminListItem.vue'
// import AdminList from './components/AdminList.vue'
// import EmailGetHelp from './components/EmailGetHelp.vue';

const routes = [
    { path: '/', component: HomePage },
    {
        path: '/homePage', component: HomePage
        // , meta: {
        //     requiresAuth: true
        // }
    },
    {
        path: '/useraccount',
        component: UserAccount,
        children: [
            { path: '', redirect: '/useraccount/userprofile' },
            { path: 'userprofile', component: UserProfile },
            { path: 'wishlist', component: userWishlist },
            { path: 'weeklyorders', component: userWeeklyOrders },
            { path: 'myorders', component: MyOrders }
        ]
    },
    { path: '/loginpage', component: LoginPage },
    { path: '/signPage', component: SignPage },
    { path: '/productsPage/:id', component: ProductsPage },
    { path: '/offersPage', component: OffersPage },
    { path: '/test', component: TestComponent },
    { path: '/manageProducts', component: ManageProducts },
    { path: '/editDelete', component: EditDeleteProducts },
    { path: '/cart', component: Cart },
    { path: '/CategroyPage', component: CategroyPage },
    { path: '/:NotFound(.*)*', name: 'ErrorPage', component: ErrorPage },

    //Farha

    // { path: '/ImpactHeading', component: ImpactHeading },
    // { path: '/BoycottWrapper', component: BoycottWrapper },
    // { path: '/BoycottProducts', component: BoycottProducts },
    // { path: '/RollerCoasterCarousel', component: RollerCoasterCarousel },
    // { path: '/PlansWrapperComponent', component: PlansWrapperComponent },
    // { path: '/CartProducts', component: CartProducts },
    // { path: '/TopPicksForYou', component: TopPicksForYou },
    // { path: '/HowItWorks', component: HowItWorks },
    // { path: '/PlansCrds', component: PlansCrds },
    // { path: '/FAQSection', component: FAQSection },
    // { path: '/EmailGetHelp', component: EmailGetHelp },
    // { path: '/AdminHeader', component: AdminHeader },
    // { path: '/AdminSidebar', component: AdminSidebar },
    // { path: '/AdminForm', component: AdminForm },
    // { path: '/AdminMangement', component: AdminMangement },
    // { path: '/AdminListItem', component: AdminListItem },
    // { path: '/AdminList', component: AdminList }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'router-link-active'
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


createApp(App).use(router).mount('#app')


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