<template>
    <footer class="bg-[#FBFBFB] py-8 px-4 md:px-8 lg:px-16"
        v-if="$route.name !== 'SignPage' && $route.name !== 'OtpPage' && $route.name !== 'ResetPassword'">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Brand and Social Links -->
            <div class="space-y-4">
                <img @click="this.$router.push('/homePage')" src="../assets/logo1.png" alt="DailyMart Logo"
                    class="w-52 scale-[1.5]">
                <p class="text-gray-600 text-sm">Make it simple and convenient to support the brands you believe in.</p>
                <div class="flex space-x-4 text-gray-600">
                    <a href="https://www.facebook.com/profile.php?id=61566981593865&mibextid=ZbWKwL" target="_blank"
                        aria-label="Facebook" class="hover:text-gray-800">
                        <img class="w-6" src="../assets/facebook.png" alt="">
                    </a>
                    <!-- <a  href="" aria-label="Twitter" target="_blank" class="hover:text-gray-800">
                        <img class="w-6" src="../assets/twitter.png" alt="">
                    </a> -->
                    <a href="https://www.instagram.com/daily_mart99/profilecard/?igsh=dXRjb2w0ZjFlcHBu" target="_blank"
                        aria-label="Instagram" class="hover:text-gray-800">
                        <img class="w-7" src="../assets/instagram.png" alt="">
                    </a>
                </div>
            </div>

            <!-- Products Section -->
            <div v-if="$route.name !== 'CardCharts' && $route.name !== 'manageUsers' && $route.name !== 'AdminList' && $route.name !== 'productsPage' && $route.name !== 'editDelete'" class="products-section md:mt-20">
                <h3 class="text-gray-800 font-semibold mb-3">Products</h3>
                <div class="flex flex-wrap">
                    <div class="w-1/2 sm:w-1/2 mb-2">
                        <ul class="space-y-2 text-gray-600">
                            <li><router-link to="/productsPage/bab69910f7dc80c257a9_snacks"
                                    class="hover:underline">Snacks</router-link></li>
                            <li><router-link to="/productsPage/bab69910f7dc80c257a9_bevrages"
                                    class="hover:underline">Beverage</router-link></li>
                            <li><router-link to="/productsPage/bab69910f7dc80c257a9_dairy" class="hover:underline">Dairy
                                    Products</router-link></li>
                            <li><router-link to="/productsPage/bab69910f7dc80c257a9_fruits"
                                    class="hover:underline">Vegetables &
                                    Fruits</router-link></li>
                        </ul>
                    </div>
                    <div class="w-1/2 sm:w-1/2 mb-2">
                        <ul class="space-y-2 text-gray-600">
                            <li><router-link to="/productsPage/bab69910f7dc80c257a9_frozen"
                                    class="hover:underline">Frozen Goods</router-link></li>
                            <li><router-link to="/productsPage/bab69910f7dc80c257a9_oils"
                                    class="hover:underline">Cooking Oil</router-link></li>
                            <li><router-link to="/productsPage/bab69910f7dc80c257a9oils_sauces"
                                    class="hover:underline">Sauces</router-link></li>
                            <li><router-link to="/productsPage/bab69910f7dc80c257a9_cleaning"
                                    class="hover:underline">Cleaning Products</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Shop with us Section -->
            <div class="md:mt-20 md:text-center md:pe-14 p-0">
                <h3 class="text-gray-800 font-semibold mb-3">Shop with us</h3>
                <ul class="space-y-2 text-gray-600">
                    <li><router-link to="/PlansWrapperComponent" class="hover:underline">Plans</router-link></li>
                    <li><router-link to="/offersPage" class="hover:underline">Offers</router-link></li>
                </ul>
            </div>

            <!-- Contact Us Section -->
            <div class="md:mt-20">
                <h3 class="text-gray-800 font-semibold mb-3">Contacts us</h3>
                <ul class="space-y-2 text-gray-600">
                    <li>
                        <a href="mailto:dailymart556@gmail.com" target="_blank"
                            class="flex items-center hover:underline">
                            <img class="w-5 me-2" src="../assets/mail.png" alt=""> contact@dailymart.com
                        </a>
                    </li>
                    <li>
                        <a href="tel:01100293308" target="_blank" class="flex items-center hover:underline">
                            <img class="w-5 me-2" src="../assets/phone-call.png" alt=""> 01100293308
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div
            class="container mx-auto mt-8 border-t border-gray-200 pt-6 text-gray-600 text-sm text-center md:text-left">
            <div class="flex flex-col md:flex-row justify-between">
                <span>Copyright © 2024 DailyMart</span>
                <div class="flex space-x-4">
                    <router-link to="#" class="hover:underline">Terms and Conditions</router-link>
                    <router-link to="#" class="hover:underline">Privacy Policy</router-link>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'footerCom',
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>