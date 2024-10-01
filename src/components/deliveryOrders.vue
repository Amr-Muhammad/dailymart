<template>
    <div class="min-h-screen bg-gray-100 p-5">
        <!-- Header -->
        <div class="bg-white shadow-lg p-6 mb-5 rounded-md flex justify-between items-center">
            <h1 class="text-2xl font-bold">Delivery Dashboard</h1>
            <span class="text-lg font-medium text-gray-600">Pending Deliveries: 8</span>
        </div>

        <!-- Orders Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Order Card -->
            <div class="bg-white shadow-md rounded-lg p-4">
                <div class="mb-3">
                    <h2 class="text-lg font-bold text-gray-700">Order #12345</h2>
                    <p class="text-gray-500">Customer: John Doe</p>
                    <p class="text-gray-500">Address: 123 Elm St, City</p>
                    <p class="text-gray-500">Total Items: 5</p>
                </div>
                <div class="flex justify-between items-center">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">View
                        Details</button>
                    <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Pick
                        to Deliver</button>
                </div>
            </div>

            <!-- Another Order Card (Duplicate for multiple orders) -->
            <div class="bg-white shadow-md rounded-lg p-4">
                <div class="mb-3">
                    <h2 class="text-lg font-bold text-gray-700">Order #12346</h2>
                    <p class="text-gray-500">Customer: Jane Smith</p>
                    <p class="text-gray-500">Address: 789 Pine St, City</p>
                    <p class="text-gray-500">Total Items: 3</p>
                </div>
                <div class="flex justify-between items-center">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">View
                        Details</button>
                    <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Pick
                        to Deliver</button>
                </div>
            </div>

            <!-- Repeat Order Cards as needed -->
        </div>

    </div>
</template>

<script>
import service from '@/mixins/service';

export default {
    data() {
        return {

        }
    },
    methods: {
        getAllOrders() {
            service.methods
        }
    }
}
</script>

<style scoped></style>