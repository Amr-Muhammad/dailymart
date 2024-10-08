<template>
    <div class="container mx-auto my-8 px-4">

        <!-- Tabs for Order Status -->
        <div v-if="filteredOrders" class="flex justify-between items-center border-b mb-4 overflow-x-auto">
            <button v-for="tab in tabs" :key="tab" @click="selectedTab = tab" :class="[
                'px-4 py-2 text-lg',
                selectedTab === tab ? 'border-b-2 border-black font-semibold' : 'text-gray-500'
            ]">
                {{ tab }}
            </button>
        </div>

        <!-- Orders List -->
        <div v-if="filteredOrders" class="flex flex-wrap">
            <div v-for="order in filteredOrders" :key="order" class="p-2 mb-4 w-full lg:w-1/2">

                <div class="p-2 border rounded-2xl">

                    <div class="scroll-wrapper overflow-y-auto h-[475px] p-2">

                        <ul class="timeline">
                            <li class="w-1/3">
                                <hr class="bg-success">
                                <div class="timeline-start timeline-box">Processing</div>
                                <div class="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        class="h-5 w-5 text-success">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <hr
                                    :class="[order[1].status == 'Delivered' || order[1].status == 'On Delivery' ? 'bg-success' : '']" />
                            </li>

                            <li class="w-1/3">
                                <hr
                                    :class="[order[1].status == 'Delivered' || order[1].status == 'On Delivery' ? 'bg-success' : '']" />
                                <div class="timeline-start timeline-box">On Delivery</div>
                                <div class="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        :class="['h-5 w-5', order[1].status == 'Delivered' || order[1].status == 'On Delivery' ? 'text-success' : '']">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <hr :class="[order[1].status == 'Delivered' ? 'bg-success' : '']" />
                            </li>

                            <li class="w-1/3">
                                <hr :class="[order[1].status == 'Delivered' ? 'bg-success' : '']" />
                                <div class="timeline-start timeline-box">Delivered</div>
                                <div class="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        :class="['h-5 w-5', order[1].status == 'Delivered' ? 'text-success' : '']">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <hr :class="[order[1].status == 'Delivered' ? 'bg-success' : '']" />
                            </li>

                        </ul>

                        <!-- Order Header -->
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <p class="text-gray-500">Order ID</p>
                                <p class="font-bold my-1">#{{ order[0].slice(1, 7) }}</p>
                                <p v-if="order[1].pickedBy" class="mb-3 font-semibold">Delivery Person: <span
                                        class="text-orange-600">{{ order[1].pickedBy }}</span></p>
                                <div class="rounded-full border text-center py-1 flex items-center px-3 gap-2">
                                    <img src="../assets/delivery-service.png" class="w-5" alt="">
                                    <p class="text-sm text-gray-400">{{
                                        order[1].customerAddress }}</p>
                                </div>

                            </div>

                            <span :class="[
                                'px-4 py-1 text-sm rounded-full mt-2 md:mt-0',
                                order[1].status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                                    order[1].status === 'On Delivery' ? 'bg-orange-200 text-orange-600' :
                                        order[1].status === 'Delivered' ? 'bg-green-100 text-green-600' : ''
                            ]">
                                {{ order[1].status }}
                            </span>
                        </div>

                        <!-- Products in Order -->
                        <div class="flex flex-wrap mt-4">
                            <div v-for="product in order[1].items" :key="product.name" class="md:w-6/12 w-full p-2">
                                <div class="p-3 border rounded-lg">
                                    <img :src="product.image_url" :alt="product.english_name"
                                        class="w-1/2 h-[120px] rounded-lg block mx-auto" />
                                    <p class="text-sm mt-2">{{ product.english_name }}</p>
                                    <p class="text-sm text-gray-500">{{ product.price }} EGP x{{ product.quantity
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Total Price and Details Button -->
                    <div
                        class="flex justify-between items-center mt-4 flex-col md:flex-row border-t-2 border-black py-3">
                        <p class="text-lg font-semibold">Total Cost: {{ order[1].total }} EGP</p>
                        <!-- <button class="mt-2 md:mt-0 px-4 py-2 bg-black text-white rounded-lg">Details</button> -->
                    </div>
                </div>

            </div>
        </div>

        <div v-else>
            <h1 class="text-center text-3xl font-bold">You don't have any orders</h1>
            <img class="w-1/2 block mx-auto" src="../assets/noOrders.jpg" alt="">
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            selectedTab: "All Orders",
            tabs: ["All Orders", "Pending", "Delivered"],
            orders: {}
        };
    },
    computed: {
        ...mapState(['loggedUserId', 'loggedUserData']),
        filteredOrders() {
            if (this.selectedTab == 'All Orders') {
                return this.orders
            }
            else if (this.selectedTab == 'Pending') {
                return this.orders.filter((order) => order[1].status === 'On Delivery');
            }
            else if (this.selectedTab == 'Delivered') {
                return this.orders.filter((order) => order[1].status === 'Delivered');
            }
            else {
                return {}
            }
        },
    },
    mounted() {
        this.getOrders()
    },
    methods: {
        async getOrders() {
            this.orders = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/orders/${this.loggedUserId}.json`)).data
            if (this.orders != null) {
                this.orders = Object.entries(this.orders)
                console.log(this.orders);
            }
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>