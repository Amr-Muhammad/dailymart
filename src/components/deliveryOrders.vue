<template>
    <div class="min-h-screen bg-gray-100 p-5">
        <!-- Header -->
        <div class="bg-white shadow-lg p-6 mb-5 rounded-md flex justify-between items-center">
            <h1 class="text-2xl font-bold">Delivery Dashboard</h1>
            <span class="text-lg font-medium text-gray-600">Pending Deliveries: {{ noOfOrders }}</span>
        </div>

        <div v-for="[userId, userOrders] in allOrders" :key="userId" class="flex flex-wrap p-2">
            <template v-for="[orderId, orderValue] in Object.entries(userOrders)" :key="orderId">
                <div v-if="orderValue.status != 'Delivered'" class="w-full md:w-6/12 lg:w-4/12 xl:w-3/12 p-2">
                    <div class="bg-white shadow-md rounded-lg w-full p-4 relative">

                        <div class="mb-3">
                            <h2 class="text-lg font-bold text-gray-700">Order <span>#{{ orderId.slice(1, 7)
                                    }}</span>
                            </h2>
                            <p class="text-gray-500 font-semibold">Customer Name: {{
                                orderValue.customerName.length > 10 ? orderValue.customerName.slice(0, 10) +'...':orderValue.customerName
                                }}</p>
                            <p v-if="orderValue.customerAddress" class="text-gray-500 font-semibold">Address: {{
                                orderValue.customerAddress.length > 10 ? orderValue.customerAddress.slice(0, 25) + '...'
                                    :
                                orderValue.customerAddress }}</p>
                            <p class="text-gray-500 font-semibold">Total Items: {{ orderValue.items ?
                                Object.values(orderValue.items).length : '' }}</p>

                        </div>

                        <div class="xl:flex flex-wrap justify-between items-center">
                            <router-link :to='`/deliveryOrderDetails/${userId}/${orderId}`'>
                                <button
                                    class="bg-black xl:mb-0 mb-3 w-full text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">View
                                    Details</button>
                            </router-link>

                            <div v-if="orderValue.status != 'Delivered'">
                                <button v-if="orderValue.status == 'Processing'" @click="onDelivery(userId, orderId)"
                                    class="bg-[#166534] w-full text-white px-4 py-2 rounded-md hover:bg-[#166534b2] transition">
                                    Pick to Deliver
                                </button>

                                <button
                                    v-if="orderValue.status == 'On Delivery' && orderValue.beingDelivered == loggedUserId"
                                    class="bg-orange-600 w-full text-white px-4 py-2 rounded-md hover:bg-orange-800 transition"
                                    @click="markAsDelivered(userId, orderId)">Set as
                                    delivered?</button>

                                <template
                                    v-if="orderValue.status == 'On Delivery' && orderValue.beingDelivered != loggedUserId">
                                    <button
                                        class="bg-orange-600 w-full text-white px-4 py-2 rounded-md hover:bg-orange-800 transition">
                                        Being Delivered
                                    </button>

                                </template>
                            </div>
                        </div>

                        <div v-if="orderValue.beingDelivered != loggedUserId && loggedUserData.status == 'busy'"
                            class="flyer absolute bg-black bg-opacity-50 w-full h-full top-0 left-0"></div>
                    </div>
                </div>

            </template>

        </div>


        <div v-for="item in key" :key="item">
            {{ item }}
        </div>

    </div>
</template>

<script>
import service from '@/mixins/service';
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            allOrders: null,
            noOfOrders: null,
            notDeliveredProducts: [],
            key: '',
            value: ''
        }
    },
    computed: {
        ...mapState(['loggedUserId', 'loggedUserData'])
    },
    methods: {
        async getAllOrders() {
            this.allOrders = await service.methods.getDeliveryOrders();
            this.allOrders = Object.entries(this.allOrders)

            this.allOrders.forEach(([, userOrders]) => Object.entries(userOrders).forEach(([orderId, order]) => order.status != 'Delivered' ? this.notDeliveredProducts.push({ [orderId]: order }) : ''))
            this.noOfOrders = this.notDeliveredProducts.length
        },
        async onDelivery(userId, orderId) {
            try {

                // Order status becomes on delivery , picked by who? , beingDelivered: deliveryId
                await service.methods.updateOrderStatus(userId, orderId, 'On Delivery', this.loggedUserData.firstName + ' ' + this.loggedUserData.lastName, this.loggedUserId);
                // Delivery becomes Busy
                (await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/delivery/${this.loggedUserId}.json`, { status: 'busy' })).data
            }
            catch (err) {
                console.log(err);
            }
            finally {
                Swal.fire({
                    icon: 'success',
                    title: 'Delivery Assigned!',
                    text: 'You have successfully picked the delivery. Please proceed to deliver it to the customer.',
                    confirmButtonText: 'OK',
                    timerProgressBar: true,
                    timer: 3000
                }).then(() => location.reload())
            }
        },
        async markAsDelivered(userId, orderId) {
            try {
                // Order status becomes Delivered , picked by who? , beingDelivered: deliveryId
                // Delivery becomes Free

                console.log(await service.methods.updateOrderStatus(userId, orderId, 'Delivered', this.loggedUserData.firstName + ' ' + this.loggedUserData.lastName, this.loggedUserId));
                (await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/delivery/${this.loggedUserId}.json`, { status: 'free' })).data;
            }
            catch (err) {
                console.log(err);
            }
            finally {
                Swal.fire({
                    icon: 'success',
                    title: 'Great Job!',
                    text: 'You have successfully delivered the package.',
                    confirmButtonText: 'OK',
                    timerProgressBar: true,
                    timer: 3000
                }).then(() => location.reload())
            }
        }
    },
    mounted() {
        this.getAllOrders()
    }
}
</script>

<style scoped></style>