<template>

    <div>
        <h2 class="ms-20 text-2xl font-semibold ">Your Wishlist
            <span class="text-gray-400 text-[16px]">
                <span>({{ itemsNumber }} </span>
                <span> items)</span>
            </span>
        </h2>
    </div>
    <!-- Looped products -->
    <!-- <div class="items-wrapper px-4 sm:px-6 lg:px-8 mt-10">
        <div v-for="(item, index) in items" :key="item.id"
            class="flex flex-col lg:flex-row lg:justify-between lg:items-center my-7 space-y-4 lg:space-y-0">

            <div class="flex justify-center lg:justify-start lg:flex-1">
                <img class="w-44" :src="item.image" alt="Product Image">
            </div>

            <div class="text-center lg:text-left lg:flex-1 space-y-4">
                <div class="text-lg font-semibold">{{ item.name }}</div>
                <div class="flex justify-center lg:justify-start">
                    <div class="rating flex space-x-1">
                        <input type="radio" name="rating-{{ item.id }}" class="mask mask-star-2 bg-orange-400"
                            v-for="star in 5" :key="star" :checked="star <= item.rating" disabled />
                    </div>
                </div>
                <p class="text-xl font-bold">{{ item.price }} E£</p>
            </div>

            <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-center">
                <button class="mainGreenBtn font-semibold">
                    Add To Cart
                </button>
                <button class="flex items-center justify-center w-16 h-8">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 10.585L14.293 8.293L15.707 9.707L13.414 12L15.707 14.293L14.293 15.707L12 13.414L9.707 15.707L8.293 14.293L10.585 12L8.293 9.707L9.707 8.293L12 10.585ZM12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4Z"
                            fill="#000" />
                    </svg>
                </button>
            </div>

            <hr v-if="index < items.length - 1" class="w-10/12 mx-auto my-4 border-gray-300">
        </div>
    </div> -->

    <!-- <div class="items-wrapper  px-6 lg:px-8 mt-10 mx-12">
        <div
            class="flex flex-col lg:flex-row lg:justify-between lg:items-center my-7 space-y-4 lg:space-y-0 shadow-lg p-4 rounded-lg bg-white">

            <div class="flex lg:justify-start justify-center lg:ms-12 ms-0 lg:flex-1">
                <img class="w-5/12 " src="../assets/6223000504383_-_47_-_57g-1-removebg-preview.png"
                    alt="Product Image">
            </div>

            <div class="text-center lg:text-left lg:flex-1 space-y-4">
                <div class="text-lg font-semibold">Big Chips</div>
                <div class="flex justify-center lg:justify-start">
                    <div class="rating flex space-x-1">
                        <input type="radio" name="rating-1" class="mask mask-star-2 bg-orange-400" disabled />
                        <input type="radio" name="rating-1" class="mask mask-star-2 bg-orange-400" disabled />
                        <input type="radio" name="rating-1" class="mask mask-star-2 bg-orange-400" checked disabled />
                        <input type="radio" name="rating-1" class="mask mask-star-2 bg-orange-400" disabled />
                        <input type="radio" name="rating-1" class="mask mask-star-2 bg-orange-400" disabled />
                    </div>
                </div>
                <p class="text-xl font-bold">10.00 E£</p>
            </div>

            <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-center">
                <button class="mainGreenBtn font-semibold">
                    Add To Cart
                </button>
                <button class="flex items-center justify-center w-16 h-8">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 10.585L14.293 8.293L15.707 9.707L13.414 12L15.707 14.293L14.293 15.707L12 13.414L9.707 15.707L8.293 14.293L10.585 12L8.293 9.707L9.707 8.293L12 10.585ZM12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4Z"
                            fill="#000" />
                    </svg>
                </button>
            </div>
        </div>

        <hr class="w-10/12 mx-auto my-4 border-gray-300">
    </div> -->


    <div class="items-wrapper w-full px-4 mt-10">

        <div v-if="wishlist != null">
            <div v-for="item in wishlist" :key="item[0]"
                class="flex flex-wrap items-center justify-between my-7 mx-16 p-3 rounded-lg shadow-md bg-white">

                <div class="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
                    <img class="w-6/12 max-w-xs" :src="item[1].image_url" :alt="item[1].english_name">
                </div>

                <div class="w-full md:w-2/4 flex flex-col md:items-start text-center md:text-left mb-4 md:mb-0">
                    <div class="text-lg font-semibold mb-2">{{ item[1].english_name }}</div>
                    <div class="rating flex justify-center mb-2">
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                    </div>
                    <p class="text-lg font-semibold">{{ item[1].price }} E£</p>
                </div>

                <div class="w-full md:w-1/4 flex md:flex-row flex-col md:items-center">
                    <button @click="addToCart(item[0], item[1])" class="mainGreenBtn font-semibold me-2">
                        Add To Cart
                    </button>
                    <svg @click="deleteItem(item[0])" class="mx-auto cursor-pointer mt-3 md:mt-0" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 10.585L14.293 8.293L15.707 9.707L13.414 12L15.707 14.293L14.293 15.707L12 13.414L9.707 15.707L8.293 14.293L10.585 12L8.293 9.707L9.707 8.293L12 10.585ZM12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4Z"
                            fill="#000" />
                    </svg>
                </div>
            </div>

            <hr class="w-10/12 mx-auto my-4 border-gray-300">
        </div>


        <div v-if="wishlist == null" class="flex items-center justify-center flex-col">
            <img src="../assets/Empty-removebg-preview.png" alt="">
            <button class="mainGreenBtn">
                <router-link to="/CategroyPage">Back Shopping?</router-link>
            </button>
        </div>
    </div>




</template>

<script>
import service from '@/mixins/service';

export default {
    data() {
        return {
            wishlist: null,
            itemsNumber: null,
            userId: 'bab69910f7dc80c'
        }
    },
    methods: {
        async getWishlist() {
            this.wishlist = await service.methods.get_cart_wishlist(this.userId, 'wishlist')
            if (this.wishlist) {
                this.wishlist = Object.entries(this.wishlist)
                this.itemsNumber = this.wishlist.length
            }
            else {
                this.itemsNumber = 0
            }
        },
        async deleteItem(productId) {
            await service.methods.deleteItem_cart_wishlist(this.userId, productId, 'wishlist')
            this.getWishlist()
        },
        async addToCart(productId, product) {
            console.log(await service.methods.addTo_cart_wishlist(this.userId, productId, product, 'cart'));
        },
    },
    mounted() {
        this.getWishlist()
    }
}
</script>

<style scoped></style>