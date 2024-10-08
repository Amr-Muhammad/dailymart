<template>
    <div class="shadow-md rounded-lg p-4">
        <div class="bg-white mb-3 border p-5 rounded-lg">
            <div class="flex justify-between italic">
                <h2 class="text-lg font-bold text-gray-700">Order <span>#{{ orderId.slice(5, 12) }}</span></h2>
                <h2
                    :class="['text-lg font-bold text-gray-700', order.status == 'Processing' ? 'text-blue-500' : order.status == 'Delivered' ? 'text-green-700' : order.status == 'On Delivery' ? 'text-orange-600' : '']">
                    Order {{
                        order.status }}</h2>
            </div>
            <p class="text-gray-500">Customer Name: <span>{{ order.customerName }}</span></p>
            <p class="text-gray-500">Phone Number: <span>{{ order.customerPhoneNumber }}</span></p>
            <p class="text-gray-500 mb-3">Address: <span>{{ order.customerAddress }}</span></p>
            <p v-if="order.pickedBy" class="mb-3 font-semibold">Delivery Person: <span class="text-orange-600">{{
                    order.pickedBy }}</span></p>

            <div class="flex flex-wrap">
                <div v-for="item in items" :key="item" class="p-2 lg:w-3/12 md:w-1/2 w-full">
                    <div class="item-wrapper shadow-lg rounded-xl p-5">
                        <div class=" mb-3">
                            <img class="w-28 h-40 block mx-auto" :src="item[1].image_url" alt="">
                        </div>
                        <p class="font-semibold text-xl">{{ item[1].english_name }}</p>
                        <p class="">{{ item[1].description }}</p>
                        <div class="flex justify-between">
                            <p class="text-green-800 font-semibold">{{ item[1].price }}.00 EGP</p>
                            <p class="text-green-800 font-semibold">x{{ item[1].quantity }}</p>
                        </div>
                        <p class="text-green-800 font-semibold">Total Price: <span>{{ item[1].quantity * item[1].price
                                }}.00 EGP</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import service from '@/mixins/service';

export default {
    data() {
        return {
            userId: '',
            orderId: '',
            order: '',
            items: []
        }
    },
    methods: {
        async getDeliveryOrder() {
            this.order = await service.methods.getSpeificDeliveryOrder(this.userId, this.orderId)
            this.items = Object.entries(this.order.items)
        }
    },
    mounted() {
        this.userId = this.$route.params.userId
        this.orderId = this.$route.params.orderId
        this.getDeliveryOrder()
    }
}
</script>

<style scoped></style>