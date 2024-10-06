<template>

    <div class="mx-20 flex justify-between">
        <h2 class=" text-2xl font-semibold">Weekly Orders</h2>
        <p v-if="products!=null" class="font-semibold text-lg italic" :class="status == 'Approved' ? 'text-[#166534]' : 'text-red-500'">Order {{
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
                <div class="rating flex justify-center mb-2">
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" disabled />
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" disabled />
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked disabled />
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" disabled />
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" disabled />
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
        <button v-if="status == 'Rejected' ||status == 'Pen ding'" @click="approveOrder()" class="mainGreenBtn">Approve</button>
        <button v-if="status == 'Approved' ||status == 'Pending'" @click="rejectOrder()" class="mainPinkBtn">Reject</button>
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
            status: null
        }
    },
    methods: {
        async getWeeklyOrder() {
            this.products = await service.methods.get_cart_wishlist_weekly(this.userId, 'weeklyorders')
            if (this.products) {
                this.products = Object.entries(this.products)
                console.log(this.products);
                
            }
        },
        async approveOrder() {
            (await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/${this.userId}.json`, { orderStatus: 'Approved' }))
            this.$router.push('/adminaccount/manageUsers')
        },
        async rejectOrder() {
            (await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/${this.userId}.json`, { orderStatus: 'Rejected' }))
            this.$router.push('/adminaccount/manageUsers')
        },
        async orderStatus() {
            this.status = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/${this.userId}/orderStatus.json`)).data
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