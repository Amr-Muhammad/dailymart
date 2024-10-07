import App from './App.vue'
import { createApp } from 'vue'
import { initializeApp } from "firebase/app";
import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import service from './mixins/service';
import axios from 'axios';

// import roles from './roles';
import "@/assets/styles/output.css";
import 'animate.css';

import HomePage from './components/homePage.vue';
import UserAccount from './components/userAccount.vue';
import UserProfile from './components/userProfile.vue';
import userWishlist from './components/userWishlist.vue';
import userWeeklyOrders from './components/userWeeklyOrders.vue';
import MyOrders from './components/myOrders.vue';
import LoginPage from './components/loginPage.vue'; //Should be deleted!

// Menna Pages
import SignPage from './components/signPage.vue';
import ProductsPage from './components/productsPage.vue';
import OffersPage from './components/offersPage.vue';
import ErrorPage from './components/errorPage.vue';
import ManageProducts from './components/manageProducts.vue';
import EditDeleteProducts from './components/edit-deleteProducts.vue';
import CategroyPage from './components/categroyPage.vue';
import ProductDetail from './components/productdetail.vue';


//farha
import EmailGetHelp from './components/EmailGetHelp.vue'
import ImpactHeading from './components/ChartsHeadre.vue'
import BoycottWrapper from './components/BoycottingWrapper.vue'
import PlansWrapperComponent from './components/PlansWrapper.vue'
import AdminMangement from './components/AdminMangement.vue'
import manageAdmins from './components/manageAdmins.vue'
import ManageUsers from './components/manageUsers.vue';
import AdminWeeklyOrder from './components/adminWeeklyOrder.vue';
import AdminAccount from './components/adminAccount.vue';
import CardCharts from './components/AdminCrdsCharts.vue'
import AdminChartsDashboard from './components/AdminDashboard.vue'
import OtpPage from './components/OtpPage.vue'
import ResetPassword from './components/ResetPassword.vue'; 



// import ManageMyPlan from './components/manageMyPlan.vue';
import Cart from './components/Cart.vue';
import DeliveryOrders from './components/deliveryOrders.vue';




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

async function checkForUser() {
    if (localStorage.getItem('userId') && localStorage.getItem('role')) {
        let userId = localStorage.getItem('userId')
        let role = localStorage.getItem('role')
        let userData = await service.methods.getLoggedUser(userId, role)

        if (!userData.profilePicture) {

            if (userData.gender == 'male') {
                userData.profilePicture = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/userAvatar/maleImage.json')).data
            }
            else {
                userData.profilePicture = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/userAvatar/femaleImage.json')).data
            }
            await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/${role}/${userId}.json`, { profilePicture: userData.profilePicture })
        }
        await store.dispatch('setUserData', [userId, userData])
        store.state.isDataLoading = false

    }
    else {
        store.state.isDataLoading = false
    }
}

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
            // { path: 'manageMyPlan', component: ManageMyPlan },
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
            { path: 'adminweeklyorder/:id', component: AdminWeeklyOrder },
            { path: 'manageProducts', component: ManageProducts },
            { path: 'editDelete/:id?', component: EditDeleteProducts },
        ]
    },
    { path: '/deliveryOrders', component: DeliveryOrders },
    { path: '/loginpage', component: LoginPage },
    {
        path: '/signPage/:id?',
        name: 'SignPage',
        component: SignPage,
        beforeEnter: (to, from, next) => {
            const validateId = ['', 'user', 'admin', 'delivery']
            if (validateId.includes(to.params.id)) {
                next()
            }
            else {
                next({ name: 'ErrorPage' })
            }
        }
    },
    { path: '/productsPage/:id', component: ProductsPage },
    { path: '/offersPage', component: OffersPage },
    { path: '/cart', component: Cart },
    { path: '/CategroyPage', component: CategroyPage },
    { path: '/productdetail/:id', component: ProductDetail },
    //farha
    { path: '/ImpactHeading', component: ImpactHeading }, //wrapper  anyone
    { path: '/BoycottWrapper', component: BoycottWrapper }, //wrapper anyone
    { path: '/PlansWrapperComponent', component: PlansWrapperComponent }, //wrapper anyone
    { path: '/EmailGetHelp', component: EmailGetHelp }, //wrapper
    { path: '/otp/:otp', name: 'OtpPage', component: OtpPage },
    { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
    // { path: '/AdminForm', component: AdminForm },
    // { path: '/AdminListItem', component: AdminListItem },

    // { path: '/weeklyProducts', component: WeeklyOrderProducts }, //eh da!!!
    { path: '/AdminChartsDashboard', component: AdminChartsDashboard },
    { path: '/CardCharts', component: CardCharts },
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

// router.beforeEach((to, from, next) => {
//     if (store.state.loggedUserData) {
//         const userRole = store.state.loggedUserData.role
//         const allowedRoutes = roles[userRole].canAccess

//         if (allowedRoutes.includes('/' + to.path.split('/')[1])) {
//             next()
//         }
//         else if (to.path.split('/')[1].includes('signPage')) {
//             next('/')
//         }
//         else {
//             next({ name: 'ErrorPage' })
//         }
//     }
//     else {
//         if (to.path.includes(`/signPage`) || to.path.includes(`/homePage`) || to.path.includes(`/PlansWrapperComponent`) || to.path.includes(`/ImpactHeading`) || to.path.includes(`/BoycottWrapper`)) {
//             next()
//         }
//         else {
//             if (to.path !== '/') {
//                 next('/'); // Redirect to home page for any other route
//             } else {
//                 next('/signPage'); // If already on home, do nothing
//             }
//         }
//     }
// })

initializeApp(firebaseConfig);
checkForUser().then(() => {
    const app = createApp(App);
    app.use(router);
    app.use(store);
    app.mount('#app');
});