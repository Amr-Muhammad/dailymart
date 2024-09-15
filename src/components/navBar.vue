<template>
    <nav class="fixed start-0 end-0 top-0 bg-green-800 z-50">

        <div class="navbar text-white w-11/12 mx-auto flex justify-between ">

            <div class="ps-3">
                <router-link to="/homePage">
                    <img class="w-14 scale-[3.2] relative translate-y-8" src="../assets/logo1.png" alt="">
                </router-link>
            </div>

            <div class="navbar-center hidden lgScreen:flex gap-y-2 lgScreen:gap-y-0">
                <ul class="menu menu-horizontal px-1">
                    <li>
                        <router-link to="/homePage">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/CategroyPage">Explore</router-link>
                    </li>
                    <li>
                        <router-link to="/offersPage">Offers</router-link>
                    </li>
                    <li>
                        <router-link to="/PlansWrapperComponent">Plans</router-link>
                    </li>
                    <li>
                        <router-link to="/EmailGetHelp">Contact Us</router-link>
                    </li>
                    <!-- <li v-if="!isLogged">
                        <router-link to="/loginpage">Login</router-link>
                    </li> -->
                    <li v-if="isLogged" @click="logOut()"><a>Log out</a></li>
                </ul>
            </div>

            <div class="userIcons">
                <div class="cart-wishlist-wOrders me-5 flex gap-3">
                    <router-link to="/useraccount/weeklyorders">
                        <img title="Weekly Orders" class="w-6 filter invert grayscale brightness-0" src="../assets/weeklyOrders.png" />
                    </router-link>
                    <router-link to="/useraccount/wishlist">
                        <img title="Wishlist" class="w-6 filter invert grayscale brightness-0" src="../assets/wishlist.png" />
                    </router-link>
                    <router-link to="/cart">
                        <img title="Cart" class="w-6 filter invert grayscale brightness-0" src="../assets/cart.png" />
                    </router-link>
                </div>

                <div class=" avatar rounded-full text-black">
                    <div class="w-12 rounded-full">
                        <router-link to="/useraccount">
                            <!-- <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> -->
                            <img :src="userImage" />
                        </router-link>
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
                        <li>
                            <router-link to="/homePage">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/CategroyPage">Explore</router-link>
                        </li>
                        <li>
                            <router-link to="/offersPage">Offers</router-link>
                        </li>
                        <li>
                            <router-link to="/PlansWrapperComponent">Plans</router-link>
                        </li>
                        <li>
                            <router-link to="/EmailGetHelp">Contact Us</router-link>
                        </li>
                    </ul>

                </div>

            </div>

        </div>

        <div class="navbar bg-[#FBFBFB] text-gray-900 border-b border-stone-400 ">

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

                <div class="navbar-center hidden lgScreen:flex justify-center">
                    <ul tabindex="0" class="menu menu-horizontal py-0 flex lgScreen:gap-3">
                        <li class="flex flex-row items-center">
                            <img src="../assets/snack.png" alt="" class="w-6 p-0" />
                            <router-link to="/productsPage/bab69910f7dc80c257a9_snacks"
                                class="ps-1">Snacks</router-link>
                        </li>
                        <li class="flex flex-row lg:items-center items-start">
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
                            <img src="../assets/sauces.png" alt="" class="w-6 p-0" />
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


        </div>
    </nav>
</template>

<script>
import axios from 'axios';
import { signOut, getAuth } from 'firebase/auth'
export default {
    name: 'navBar',
    data() {
        return {
            isLogged: false,
            userImage: null
        }
    },
    async mounted() {
        // onAuthStateChanged(getAuth(), user => {
        //     if (user) {
        //         this.isLogged = true
        //     }
        //     else {
        //         this.isLogged = false
        //     }
        // })
        //     ,
        await this.getProfilePicture()

    },
    methods: {
        async logOut() {
            await signOut(getAuth())
            // let res = await signOut(getAuth())
            // console.log(res);
            this.$router.push('./loginPage')
        }
        ,
        async getProfilePicture() {
            let user = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/users/bab69910f7dc80c.json')).data
            if (user.profilePicture) {
                this.userImage = user.profilePicture
            }
            else {
                if (user.gender == 'male') {
                    this.userImage = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/userAvatar/maleImage.json')).data
                } else {
                    this.userImage = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/userAvatar/maleImage.json')).data
                }
            }
        }
    }
}
</script>

<style scoped></style>
