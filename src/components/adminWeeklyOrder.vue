<template>

    <div class="mx-20 flex justify-between">
        <h2 class=" text-2xl font-semibold">Weekly Orders</h2>
        <p v-if="products != null" class="italic text-lg font-bold  py-1 rounded-lg px-3"
            :class="status == 'Approved' ? 'text-[#166534] bg-green-100' : 'text-red-500 bg-orange-100'">Order {{
                status }}!</p>
    </div>

    <div v-if="products != null" class="items-wrapper w-full px-4 mt-10">

        <div v-for="product in products" :key="product"
            class="flex flex-wrap items-center justify-between my-7 mx-16 p-3 rounded-lg shadow-md bg-white">

            <div class="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
                <!-- <img class="w-6/12 max-w-xs" src="../assets/6223000504383_-_47_-_57g-1-removebg-preview.png"
                    alt="Big Chips"> -->
                <img class="w-6/12 max-w-xs" :src="product[1].image_url" alt="Big Chips">
            </div>

            <div class="w-full md:w-2/4 flex flex-col md:items-start text-center md:text-left mb-4 md:mb-0">
                <div class="text-lg font-semibold mb-2">{{ product[1].english_name }}</div>
                <!-- <div class="rating flex justify-center mb-2">
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" disabled />
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" disabled />
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked disabled />
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" disabled />
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" disabled />
                </div> -->
                <div class="rating flex justify-center mb-2">
                    <input v-for="star in 5" :key="star" type="radio" :name="'rating-' + index"
                        :class="{ 'bg-orange-400': star <= allRates[index], 'bg-gray-300': star > allRates[index] }"
                        class="mask mask-star-2" disabled />
                </div>
                <p class="text-lg font-semibold">{{ product[1].price }}.00 E£</p>
            </div>
        </div>

        <hr class="w-10/12 mx-auto my-4 border-gray-300">

    </div>

    <div v-if="products == null" class="flex items-center justify-center flex-col">
        <img src="../assets/Empty-removebg-preview.png" alt="">
    </div>


    <div v-if="products != null" class="flex items-center justify-center gap-4 ">
        <button v-if="status == 'Rejected' || status == 'Pending'" @click="approveOrder()"
            class="mainGreenBtn">Approve</button>
        <!-- <button v-if="status == 'Approved' || status == 'Pending'" @click="rejectOrder()"
            class="mainPinkBtn">Reject</button> -->
    </div>

</template>

<script>
import service from '@/mixins/service';
import axios from 'axios';

export default {
    data() {
        return {
            products: null,
            userId: null,
            status: null,

            commentD: null,
            prdRate: null,
            allRates: [],
        }
    },
    methods: {
        async getWeeklyOrder() {
            this.products = await service.methods.get_cart_wishlist_weekly(this.userId, 'weeklyorders')
            if (this.products) {
                this.products = Object.entries(this.products)
                for (let i = 0; i < this.products.length; i++) {
                    this.getProductRate(this.products[i][0])
                    console.log(this.products[i][0])
                }
            }
        },
        async approveOrder() {
            (await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/customer/${this.userId}.json`, { orderStatus: 'Approved' }))
            this.$router.push('/adminaccount/manageUsers')
        },
        async rejectOrder() {
            (await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/customer/${this.userId}.json`, { orderStatus: 'Rejected' }))
            this.$router.push('/adminaccount/manageUsers')
        },
        async orderStatus() {
            this.status = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/customer/${this.userId}/orderStatus.json`)).data
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
        }
    },
    mounted() {
        this.userId = this.$route.params.id
        this.getWeeklyOrder()
        this.orderStatus()

    }
}
</script>

<style scoped></style>