<template>

    <div>
        <h2 class="ms-10 text-2xl font-semibold ">Your Wishlist
            <span class="text-gray-400 text-[16px]">
                <span>({{ itemsNumber }} </span>
                <span> items)</span>
            </span>
        </h2>
    </div>

    <div class="items-wrapper w-full px-4 mt-10">

        <div v-if="wishlist != null">
            <div v-for="(item, index) in wishlist" :key="item[0]"
                class="flex flex-wrap items-center justify-between my-7 mx-16 p-3 rounded-lg shadow-md bg-white">

                <div class="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
                    <img class="w-6/12 max-w-xs" :src="item[1].image_url" :alt="item[1].english_name">
                </div>

                <div class="w-full md:w-2/4 flex flex-col md:items-start text-center md:text-left mb-4 md:mb-0">
                    <div class="text-lg font-semibold mb-2">{{ item[1].english_name }}</div>
                    <div class="rating flex justify-center mb-2">
                        <input v-for="star in 5" :key="star" type="radio" name="rating-{{ index }}"
                            :class="{ 'bg-orange-400': star <= allRates[index], 'bg-gray-300': star > allRates[index] }"
                            class="mask mask-star-2" disabled />
                    </div>
                    <p class="text-lg font-semibold">{{ item[1].onsale.split('%').length ==
                        2 ? item[1].price - (item[1].onsale.split('%')[0] * item[1].price /
                            100) :
                        item[1].price
                        }} EGP</p>
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
import { mapState } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            wishlist: null,
            itemsNumber: null,
            commentD: null,
            prdRate: null,
            allRates: [],
        }
    },
    computed: {
        ...mapState(['loggedUserId', 'loggedUserData'])
    },
    methods: {
        async getWishlist() {
            this.wishlist = await service.methods.get_cart_wishlist_weekly(this.loggedUserId, 'wishlist')
            if (this.wishlist) {
                this.wishlist = Object.entries(this.wishlist)
                this.itemsNumber = this.wishlist.length

                for (let i = 0; i < this.wishlist.length; i++) {
                    this.getProductRate(this.wishlist[i][0])
                }
            }
            else {
                this.itemsNumber = 0
            }
        },
        async getProductRate(productId) {
            try {
                const response = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/comments.json')).data;

                this.commentD = Object.entries(response).filter(item => item[1].productId === productId);

                if (this.commentD.length > 0) {
                    const totalRatings = this.commentD.reduce((sum, item) => {
                        return sum + parseFloat(item[1].rating);
                    }, 0);

                    const averageRating = totalRatings / this.commentD.length;

                    this.prdRate = averageRating;
                } else {
                    this.prdRate = 0;
                }

                this.allRates.push(Math.round(this.prdRate));

                // console.log(this.allRates)
                // console.log(this.prdRate)

            } catch (err) {
                console.log('Error:', err);
                this.prdRate = 0;
                this.allRates.push(this.prdRate);
                // console.log(this.prdRate)
            }
        },
        async deleteItem(productId) {
            await service.methods.deleteItem_cart_wishlist_weekly(this.loggedUserId, productId, 'wishlist')
            this.getWishlist()
        },
        async addToCart(productId, product) {
            console.log(await service.methods.addTo_cart_wishlist_weekly(this.loggedUserId, productId, product, 'cart'));
        },
    },
    mounted() {
        this.getWishlist()
    }
}
</script>

<style scoped></style>