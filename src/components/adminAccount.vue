<template>

    <div>
        <div class="container mx-auto py-10 px-5">

            <div class="flex flex-wrap justify-center">

                <leftSection class="lg:w-2/12 py-8 px-4 bg-[#598369] flex-grow mb-5 lg:mb-0">
                    <h1 class="font-bold text-center text-white text-xl">Manage My Account</h1>
                    <hr class="my-4 border">
                    <ul class="flex gap-7 lg:block items-center">
                        <router-link class="block mt-2 px-4 py-1 rounded-full text-white"
                            to="/adminaccount/AdminChartsDashboard">
                            Dashboard
                        </router-link>
                        <router-link class="block mt-2 px-4 py-1 rounded-full text-white"
                            to="/adminaccount/manageusers">Manage Users</router-link>
                        <router-link class="block mt-2 px-4 py-1 rounded-full text-white"
                            to="/adminaccount/manageadmins">Manage Admins</router-link>
                        <router-link class="block mt-2 px-4 py-1 rounded-full text-white"
                            to="/adminaccount/manageproducts">Manage Products</router-link>
                        <router-link class="block mt-2 px-4 py-1 rounded-full text-white"
                            to="/adminaccount/editDelete">Creat a New Product</router-link>
                    </ul>

                </leftSection>

                <rightSection class="lg:w-10/12 w-full shadow-2xl flex-grow">
                    <div class="lg:ms-7 bg-white py-14 shadow-x">
                        <router-view></router-view>
                    </div>
                </rightSection>

            </div>
        </div>

    </div>


</template>

<script>
export default {
    name: 'AdminAccount'
}
</script>

<style scoped>
.router-link-active {
    background-color: white;
    color: black;
}

.overflow-x-auto {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
</style>