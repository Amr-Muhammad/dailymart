<template>
    <nav class="fixed start-0 end-0 top-0 bg-green-800 z-50"
        v-if="$route.name !== 'SignPage' && $route.name !== 'OtpPage' && $route.name !== 'ResetPassword'">

        <div class="navbar text-white w-11/12 mx-auto flex justify-between ">

            <router-link to="/" class="ps-3 notHveActive bg-transparent">
                <img class="w-14 scale-[3.2] relative translate-y-8" src="../assets/logo1.png" alt="">
            </router-link>

            <div class="navbar-center hidden lgScreen:flex gap-y-2 lgScreen:gap-y-0 ms-20">

                <ul class="menu menu-horizontal lg-screen-1st-nav px-1 gap-1">
                    <router-link to="/homePage" class="lg-screen-nav flex items-center">
                        <li class="font-semibold">HOME</li>
                    </router-link>
                    <router-link to="/CategroyPage" class="lg-screen-nav flex items-center">
                        <li class="font-semibold">EXPLORE</li>
                    </router-link>
                    <router-link to="/offersPage" class="lg-screen-nav flex items-center">
                        <li class="font-semibold">OFFERS</li>
                    </router-link>
                    <router-link to="/PlansWrapperComponent" class="lg-screen-nav flex items-center">
                        <li class="font-semibold">PLANS</li>
                    </router-link>
                    <router-link to="/BoycottWrapper" class="lg-screen-nav flex items-center">
                        <li class="font-semibold">BOYCOTT LIST</li>
                    </router-link>
                    <router-link v-if="loggedUserData.role == 'customer'" to="/EmailGetHelp"
                        class="lg-screen-nav flex items-center">
                        <li class="font-semibold">CONTACT US</li>
                    </router-link>
                </ul>

            </div>

            <div v-if="isDataLoading" class="skeleton w-36 h-8 rounded-md"></div>

            <div v-else-if="loggedUserId" class="userIcons">
                <div v-if="role == 'customer'" class="cart-wishlist-wOrders me-5 flex gap-3">
                    <router-link class="notHveActive"
                        :to="loggedUserData.planid ? '/useraccount/weeklyorders' : '/PlansWrapperComponent'">
                        <img title="Weekly Orders" class="w-6 filter invert grayscale brightness-0"
                            src="../assets/weeklyOrders.png" />
                    </router-link>
                    <router-link class="notHveActive" to="/useraccount/wishlist">
                        <img title="Wishlist" class="w-6 filter invert grayscale brightness-0"
                            src="../assets/wishlist.png" />
                    </router-link>
                    <router-link class="notHveActive" to="/cart">
                        <img title="Cart" class="w-6 filter invert grayscale brightness-0" src="../assets/cart.png" />
                    </router-link>
                </div>

                <div ref="avatar" class="relative inline-block text-left">
                    <div class="avatar rounded-full text-black">
                        <div class="w-12 rounded-full cursor-pointer" @click="isDropdownOpen = !isDropdownOpen">
                            <img :src="loggedUserData.profilePicture" />
                        </div>
                    </div>

                    <!-- Dropdown menu -->
                    <div ref="dropdodwn" v-if="isDropdownOpen"
                        class="absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg">
                        <div class="py-1 flex flex-col" role="menu" aria-orientation="vertical"
                            aria-labelledby="options-menu">
                            <router-link v-if="loggedUserData.role == 'customer'"
                                @click="isDropdownOpen = !isDropdownOpen" to="/useraccount"
                                class="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                User Account
                            </router-link>
                            <button v-if="loggedUserData.role != 'visitor'" @click="logOut()"
                                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>


                <div class="dropdown lgScreen:pe-0">

                    <div tabindex="0" role="button" class="btn btn-ghost lgScreen:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content rounded-box mt-3 w-52 p-2 shadow text-black bg-white relative z-50 -translate-x-32">
                        <router-link to="/homePage" class="lg-screen-nav flex items-center">
                            <li class="font-semibold">HOME</li>
                        </router-link>
                        <router-link to="/CategroyPage" class="lg-screen-nav flex items-center">
                            <li class="font-semibold">EXPLORE</li>
                        </router-link>
                        <router-link to="/offersPage" class="lg-screen-nav flex items-center">
                            <li class="font-semibold">OFFERS</li>
                        </router-link>
                        <router-link to="/PlansWrapperComponent" class="lg-screen-nav flex items-center">
                            <li class="font-semibold">PLANS</li>
                        </router-link>
                        <router-link to="/BoycottWrapper" class="lg-screen-nav flex items-center">
                            <li class="font-semibold">BOYCOTT LIST</li>
                        </router-link>
                        <router-link v-if="role == 'customer'" to="/EmailGetHelp"
                            class="lg-screen-nav flex items-center">
                            <li class="font-semibold">CONTACT US</li>
                        </router-link>
                    </ul>

                </div>

            </div>

            <div v-else>
                <router-link to="/signPage">
                    <button class="bg-white text-black px-6 py-1 rounded-md">Login</button>
                </router-link>

                <div class="lgScreen:hidden">

                    <div class="dropdown">
                        <div tabindex="0" role="button" class="btn btn-ghost lgScreen:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        <ul tabindex="0"
                            class="menu menu-sm dropdown-content  rounded-box mt-3 w-52 p-2 gap-y-2 lgScreen:gap-y-0 shadow text-black bg-white -translate-x-32">
                            <router-link to="/homePage" class="lg-screen-nav flex items-center">
                                <li class="font-semibold">HOME</li>
                            </router-link>
                            <router-link to="/CategroyPage" class="lg-screen-nav flex items-center">
                                <li class="font-semibold">EXPLORE</li>
                            </router-link>
                            <router-link to="/offersPage" class="lg-screen-nav flex items-center">
                                <li class="font-semibold">OFFERS</li>
                            </router-link>
                            <router-link to="/PlansWrapperComponent" class="lg-screen-nav flex items-center">
                                <li class="font-semibold">PLANS</li>
                            </router-link>
                            <router-link to="/BoycottWrapper" class="lg-screen-nav flex items-center">
                                <li class="font-semibold">BOYCOTT LIST</li>
                            </router-link>
                            <router-link to="/EmailGetHelp" class="lg-screen-nav flex items-center">
                                <li class="font-semibold">CONTACT US</li>
                            </router-link>
                        </ul>
                    </div>

                </div>

            </div>
        </div>

        <div v-if="$route.name !== 'SignPage' && $route.name !== 'OtpPage' && $route.name !== 'ResetPassword'"
            class="navbar bg-[#FBFBFB] text-gray-900 border-b border-stone-400 ">

            <div class="w-11/12 mx-auto lgScreen:justify-center flex justify-end">

                <div class="lgScreen:hidden">

                    <div class="dropdown">
                        <div tabindex="0" role="button" class="btn btn-ghost lgScreen:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        <ul tabindex="0"
                            class="menu menu-sm dropdown-content  rounded-box mt-3 w-52 p-2 gap-y-2 lgScreen:gap-y-0 shadow text-black bg-white -translate-x-32">
                            <li class="flex flex-row items-center pb-2">
                                <img src="../assets/snack.png" alt="" class="w-6 p-0" />
                                <router-link to="/productsPage/bab69910f7dc80c257a9_snacks"
                                    class="ps-1">Snacks</router-link>
                            </li>
                            <li class="flex flex-row items-start">
                                <img src="../assets/beverage.png" alt="" class="w-6 p-0" />
                                <router-link to="/productsPage/bab69910f7dc80c257a9_bevrages"
                                    class="ps-1">Beverage</router-link>
                            </li>
                            <li class="flex flex-row items-center">
                                <img src="../assets/dairy.png" alt="" class="w-6 p-0" />
                                <router-link to="/productsPage/bab69910f7dc80c257a9_dairy" class="ps-1">Dairy
                                    Products</router-link>
                            </li>
                            <li class="flex flex-row items-center">
                                <img src="../assets/veges&fruits.png" alt="" class="w-6 p-0" />
                                <router-link to="/productsPage/bab69910f7dc80c257a9_fruits" class="ps-1">Vegetables &
                                    Fruits</router-link>
                            </li>
                            <li class="flex flex-row items-center">
                                <img src="../assets/frozen-food.png" alt="" class="w-6 p-0" />
                                <router-link to="/productsPage/bab69910f7dc80c257a9_frozen" class="ps-1">Frozen
                                    Goods</router-link>
                            </li>
                            <li class="flex flex-row items-center">
                                <img src="../assets/cooking-oil.png" alt="" class="w-6 p-0" />
                                <router-link to="/productsPage/bab69910f7dc80c257a9_oils" class="ps-1">Cooking
                                    Oil</router-link>
                            </li>
                            <li class="flex flex-row items-center">
                                <img src="../assets/veges&fruits.png" alt="" class="w-6 p-0" />
                                <router-link to="/productsPage/bab69910f7dc80c257a9oils_sauces"
                                    class="ps-1">Sauces</router-link>
                            </li>
                            <li class="flex flex-row items-center">
                                <img src="../assets/cleaning.png" alt="" class="w-6 p-0" />
                                <router-link to="/productsPage/bab69910f7dc80c257a9_cleaning" class="ps-1">Cleaning
                                    Products</router-link>
                            </li>
                        </ul>
                    </div>

                </div>

                <div class="navbar-center hidden lgScreen:flex justify-center items-center">
                    <ul tabindex="0" class="menu menu-horizontal py-0 flex lgScreen:gap-0.5">
                        <li class="flex flex-row items-center hover:text-red-700">
                            <img src="../assets/snack.png" alt="" class="w-6 p-0" />
                            <router-link to="/productsPage/bab69910f7dc80c257a9_snacks"
                                class="ps-1">Snacks</router-link>
                        </li>
                        <li class="flex flex-row lg:items-center hover:text-red-700">
                            <img src="../assets/beverage.png" alt="" class="w-6 p-0" />
                            <router-link to="/productsPage/bab69910f7dc80c257a9_bevrages"
                                class="ps-1">Beverage</router-link>
                        </li>
                        <li class="flex flex-row items-center hover:text-red-700">
                            <img src="../assets/dairy.png" alt="" class="w-6 p-0" />
                            <router-link to="/productsPage/bab69910f7dc80c257a9_dairy" class="ps-1">Dairy
                                Products</router-link>
                        </li>
                        <li class="flex flex-row items-center hover:text-red-700">
                            <img src="../assets/veges&fruits.png" alt="" class="w-6 p-0" />
                            <router-link to="/productsPage/bab69910f7dc80c257a9_fruits" class="ps-1">Vegetables &
                                Fruits</router-link>
                        </li>
                        <li class="flex flex-row items-center hover:text-red-700">
                            <img src="../assets/frozen-food.png" alt="" class="w-6 p-0" />
                            <router-link to="/productsPage/bab69910f7dc80c257a9_frozen" class="ps-1">Frozen
                                Goods</router-link>
                        </li>
                        <li class="flex flex-row items-center hover:text-red-700">
                            <img src="../assets/cooking-oil.png" alt="" class="w-6 p-0" />
                            <router-link to="/productsPage/bab69910f7dc80c257a9_oils" class="ps-1">Cooking
                                Oil</router-link>
                        </li>
                        <li class="flex flex-row items-center hover:text-red-700">
                            <img src="../assets/sauces.png" alt="" class="w-6 p-0" />
                            <router-link to="/productsPage/bab69910f7dc80c257a9oils_sauces"
                                class="ps-1">Sauces</router-link>
                        </li>
                        <li class="flex flex-row items-center hover:text-red-700">
                            <img src="../assets/cleaning.png" alt="" class="w-6 p-0" />
                            <router-link to="/productsPage/bab69910f7dc80c257a9_cleaning" class="ps-1">Cleaning
                                Products</router-link>
                        </li>
                    </ul>
                </div>

            </div>


        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'navBar',
    data() {
        return {
            userImage: null,
            subscribed: null,
            userId: null,
            userData: null,
            isDropdownOpen: false,
            role: localStorage.getItem('role')
        }
    },
    async mounted() {
        document.addEventListener('click', this.handleClickOutsideDropdown)
        if (this.loggedUserData) {
            this.loading = false
        }
    },
    methods: {
        async logOut() {
            this.isDropdownOpen = !this.isDropdownOpen
            this.$store.dispatch('logout')
            this.$router.push('/signPage')
        },
        handleClickOutsideDropdown(event) {
            let avatar = this.$refs.avatar
            let dropdodwn = this.$refs.dropdodwn
            if (this.isDropdownOpen && dropdodwn && !dropdodwn.contains(event.target) && !avatar.contains(event.target)) {
                this.isDropdownOpen = false
            }
        }
    },
    computed: {
        ...mapState(['loggedUserId', 'loggedUserData', 'isDataLoading'])
    }
}

</script>

<style scoped>
.lg-screen-active-nav {
    background-color: white;
    color: blue;
}

.router-link-exact-active:not(.notHveActive),
.router-link-active:not(.notHveActive) {
    background-color: white;
    color: #166534;
    border-radius: 0.250rem;

}
</style>