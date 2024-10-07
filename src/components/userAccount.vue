<template>

    <div class="container mx-auto py-10 px-5">

        <div class="flex flex-wrap justify-between rounded-2xl">

            <leftSection class="md:w-2/12 py-8 px-4 bg-[#598369] flex-grow">
                <h1 class="font-bold text-center text-white text-xl">Account Management</h1>
                <hr class="my-4 border">
                <ul class="flex gap-7 md:block mb-5 md:mb-0">

                    <router-link to="/useraccount/userprofile" class="block mt-2 px-4 py-1 rounded-full text-white">My
                        Profile</router-link>

                    <router-link to="/useraccount/weeklyorders"
                        class="block mt-2 px-4 py-1 rounded-full text-white">Weekly
                        Orders</router-link>

                    <router-link to="/useraccount/wishlist" class="block mt-2 px-4 py-1 rounded-full text-white">My
                        Wishlist</router-link>

                    <router-link to="/useraccount/myorders" class="block mt-2 px-4 py-1 rounded-full text-white">My
                        Orders</router-link>

                    <!-- <router-link to="/useraccount/manageMyPlan">
                            <li class="mb-[6px] text-gray-400">
                                My Plan
                            </li>
                        </router-link> -->

                </ul>
            </leftSection>

            <rightSection class="md:w-10/12 flex-grow">
                <div class="md:ms-7 bg-white py-14 shadow-x mx-auto">
                    <router-view></router-view>
                </div>
                <!-- <router-view v-slot="{ Component }">
                        <transition enter-active-class="animate__animated animate__fadeInLeft"
                            leave-active-class="animate__animated animate__fadeOutLeft" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view> -->
            </rightSection>

        </div>
        
    </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'userAccount',
    computed: {
        ...mapState(['loggedUserData'])
    }
}
</script>

<style scoped>
.router-link-active {
    background-color: white;
    color: black;
}

.route-enter-from {
    opacity: 0;
    transform: translateX(-100px);
}

.route-enter-active {
    transition: all 0.5s ease-out;
}

.route-leave-to {
    opacity: 0;
    transform: translateX(100px);
}

.route-leave-active {
    transition: all 0.5s ease-out;
}
</style>