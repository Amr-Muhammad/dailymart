<template>
    <footer class="bg-[#FBFBFB] py-8 px-4 md:px-8 lg:px-16">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Brand and Social Links -->
            <div class="space-y-4">
                <img src="../assets/logo1.png" alt="DailyMart Logo" class="w-52 scale-[1.5]">
                <p class="text-gray-600 text-sm">Make it simple and convenient to support the brands you believe in.</p>
                <div class="flex space-x-4 text-gray-600">
                    <a href="" aria-label="Facebook" class="hover:text-gray-800">
                        <img class="w-6" src="../assets/facebook.png" alt="">
                    </a>
                    <a href="#" aria-label="Twitter" class="hover:text-gray-800">
                        <img class="w-6" src="../assets/twitter.png" alt="">
                    </a>
                    <a href="#" aria-label="Instagram" class="hover:text-gray-800">
                        <img class="w-7" src="../assets/instagram.png" alt="">
                    </a>
                </div>
            </div>

            <!-- Products Section -->
            <div class="products-section md:mt-20">
                <h3 class="text-gray-800 font-semibold mb-3">Products</h3>
                <div class="flex flex-wrap">
                    <div class="w-1/2 sm:w-1/2 mb-2">
                        <ul class="space-y-2 text-gray-600">
                            <li><a href="#" class="hover:underline">Snacks</a></li>
                            <li><a href="#" class="hover:underline">Beverage</a></li>
                            <li><a href="#" class="hover:underline">Dairy Products</a></li>
                            <li><a href="#" class="hover:underline">Bakery</a></li>
                        </ul>
                    </div>
                    <div class="w-1/2 sm:w-1/2 mb-2">
                        <ul class="space-y-2 text-gray-600">
                            <li><a href="#" class="hover:underline">Frozen Goods</a></li>
                            <li><a href="#" class="hover:underline">Canned Goods</a></li>
                            <li><a href="#" class="hover:underline">Sauces</a></li>
                            <li><a href="#" class="hover:underline">Cleaning Products</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Shop with us Section -->
            <div class="md:mt-20 md:text-center md:pe-14 p-0">
                <h3 class="text-gray-800 font-semibold mb-3">Shop with us</h3>
                <ul class="space-y-2 text-gray-600">
                    <li><a href="#" class="hover:underline">Plans</a></li>
                    <li><a href="#" class="hover:underline">Offers</a></li>
                </ul>
            </div>

            <!-- Contact Us Section -->
            <div class="md:mt-20">
                <h3 class="text-gray-800 font-semibold mb-3">Contacts us</h3>
                <ul class="space-y-2 text-gray-600">
                    <li>
                        <a href="mailto:contact@company.com" class="flex items-center hover:underline">
                            <img class="w-5 me-2" src="../assets/mail.png" alt=""> contact@company.com
                        </a>
                    </li>
                    <li>
                        <a href="tel:01100293308" class="flex items-center hover:underline">
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
                    <a href="#" class="hover:underline">Terms and Conditions</a>
                    <a href="#" class="hover:underline">Privacy Policy</a>
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