<template>

    <div class="mx-10 flex justify-between">
        <h2 class=" text-2xl font-semibold">Weekly Orders</h2>
        <!-- <p v-if="products != null" class="font-semibold italic">Your orders are expected to be delivered by friday, {{
            nextFriday }} , {{ days
            }}
            days,
            {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds</p> -->
    </div>

    <div v-if="products != null" class="items-wrapper w-full px-4 mt-10">

        <div v-for="(product, index) in products" :key="product"
            class="flex flex-wrap items-center justify-between my-7 mx-16 p-3 rounded-lg shadow-md bg-white">

            <div class="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
                <!-- <img class="w-6/12 max-w-xs" src="../assets/6223000504383_-_47_-_57g-1-removebg-preview.png"
                    alt="Big Chips"> -->
                <img class="w-6/12 max-w-xs" :src="product[1].image_url" alt="Big Chips">
            </div>

            <div class="w-full md:w-2/4 flex flex-col md:items-start text-center md:text-left mb-4 md:mb-0">
                <div class="text-lg font-semibold mb-2">{{ product[1].english_name }}</div>
                <div class="rating flex justify-center mb-2">
                    <input v-for="star in 5" :key="star" type="radio" :name="'rating-' + index"
                        :class="{ 'bg-orange-400': star <= allRates[index], 'bg-gray-300': star > allRates[index] }"
                        class="mask mask-star-2" disabled />
                </div>
                <p class="text-lg font-semibold">{{ product[1].price }}.00 E£</p>
            </div>

            <div class="w-full md:w-1/4 flex flex-col items-center md:items-end">
                <div class="flex items-center mb-2">
                    <button @click="patchQuantity(product[0], '-')"
                        class="secondaryBtn px-3 py-1 border border-gray-400 rounded-lg text-gray-600">-</button>
                    <span class="mx-3">{{ product[1].quantity }}</span>
                    <button @click="patchQuantity(product[0], '+')"
                        class="mainGreenBtn px-3 py-1 bg-green-500 text-white rounded-lg">+</button>
                </div>
                <button @click="deleteItem(product[0], '+')"
                    class="flex items-center justify-center px-3 py-1 rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 10.585L14.293 8.293L15.707 9.707L13.414 12L15.707 14.293L14.293 15.707L12 13.414L9.707 15.707L8.293 14.293L10.585 12L8.293 9.707L9.707 8.293L12 10.585ZM12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4Z"
                            fill="#000" />
                    </svg>
                </button>
            </div>
            <!-- <div class="block ms-auto">
                <p class="font-semibold italic">Your orders are expected to be delivered by friday, {{nextFriday}} , {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds</p>
            </div> -->

        </div>

        <hr class="w-10/12 mx-auto my-4 border-gray-300">

    </div>

    <div v-if="products == null" class="flex items-center justify-center flex-col">
        <img src="../assets/Empty-removebg-preview.png" alt="">
        <button class="mainGreenBtn">
            <router-link to="/CategroyPage">Back Shopping?</router-link>
        </button>
    </div>

    <div v-if="products != null" class="flex flex-wrap justify-between mx-20">
        <p class="font-semibold italic">
            Your orders are expected to be delivered by Friday,
            <span class="text-blue-600 font-bold">{{ nextFriday }}</span>,
            <span class="text-green-600 font-bold">{{ days }} days</span>,
            <span class="text-orange-600 font-bold">{{ hours }} hours</span>,
            <span class="text-red-600 font-bold">{{ minutes }} minutes</span>,
            <span class="text-purple-600 font-bold">{{ seconds }} seconds</span>
        </p>
        <!-- <p class="font-semibold italic">
            Your orders are expected to be delivered by Friday,
            <span class="text-blue-600 font-bold">{{ nextFriday }}</span>,
            <span class="badge bg-green-200 text-green-800">{{ days }} days</span>,
            <span class="badge bg-orange-200 text-orange-800">{{ hours }} hours</span>,
            <span class="badge bg-red-200 text-red-800">{{ minutes }} minutes</span>,
            <span class="badge bg-purple-200 text-purple-800">{{ seconds }} seconds</span>
        </p> -->
        <button class="mainGreenBtn">
            <router-link to="/CategroyPage">Add Prodcut</router-link>
        </button>
    </div>

</template>

<script>
import service from '@/mixins/service';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            products: null,
            days: null,
            hours: null,
            minutes: null,
            seconds: null,
            nextFriday: null,
            user: null,
            subscribed: null,
            commentD: null,
            prdRate: null,
            allRates: [],
        }
    },
    computed: {
        ...mapState(['loggedUserId', 'loggedUserData'])
    },
    methods: {
        async getWeeklyOrder() {
            this.products = await service.methods.get_cart_wishlist_weekly(this.loggedUserId, 'weeklyorders')
            if (this.products) {
                this.products = Object.entries(this.products)

                for (let i = 0; i < this.products.length; i++) {
                    this.getProductRate(this.products[i][0])
                    console.log(this.products[i][0])
                }
            }
        }
        ,
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
        }
        ,
        async deleteItem(productId) {
            try {
                await service.methods.deleteItem_cart_wishlist_weekly(this.loggedUserId, productId, 'weeklyorders')
                this.getWeeklyOrder()
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        async patchQuantity(productId, sign) {
            await service.methods.patchQuantity(this.loggedUserId, productId, 'weeklyorders', sign)
            this.getWeeklyOrder()
        }
        ,
        getTimeRemainingUntilFriday() {
            let now = new Date();
            let nextFriday = service.methods.getNextFriday()
            let timeDifference = nextFriday - now; // Time difference in milliseconds

            this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            this.minutes = Math.floor((timeDifference / 1000 / 60) % 60);
            this.seconds = Math.floor((timeDifference / 1000) % 60);

            let day = String(nextFriday.getDate()).padStart(2, '0'); // Get day and pad with 0 if needed
            let month = String(nextFriday.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so +1)
            let year = nextFriday.getFullYear(); // Get full year

            this.nextFriday = `${day}-${month}-${year}`;
        },
        async getLoggedUser() {
            this.user = await service.methods.getLoggedUser(this.loggedUserId)
        },
        async successfulSubscribe() {
            this.subscribed = this.$route.params.id
            if (this.subscribed && this.subscribed.includes('plink')) {
                await this.getLoggedUser()
                let subscribeData = {
                    planid: 'a1b2c3_subscription',
                    subscriptionStartDate: new Date()
                }
                await service.methods.planSubscribe(this.loggedUserId, subscribeData)
                location.assign('/useraccount/weeklyorders')
            }
        }
    },
    async mounted() {

        if (!this.loggedUserData.planid) {
            this.$router.push('/PlansWrapperComponent')
        }

        this.successfulSubscribe()
        this.getWeeklyOrder()
        setInterval(() => {
            this.getTimeRemainingUntilFriday()
        }, 1000);
    }
}
</script>

<style scoped></style>