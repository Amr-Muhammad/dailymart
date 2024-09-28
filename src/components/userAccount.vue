<template>

    <div class="container mx-auto">
        <div v-if="loggedUserData" class="flex justify-between">

            <div class="breadcrumbs text-sm">
                <ul>
                    <li class=" text-gray-400"><router-link to="/homePage">Home</router-link></li>
                    <li>My Account</li>
                </ul>
            </div>

            <div>
                <p>
                    Welcome
                    <span class="primaryPink font-semibold">{{ loggedUserData.firstName + ' ' + loggedUserData.lastName
                        }}</span>
                </p>
            </div>

        </div>

        <div class="flex mt-16 flex-wrap justify-center">

            <leftSection class="md:w-2/12 bg-white">
                <div>
                    <h1 class="font-bold">Manage My Account</h1>
                    <ul class="ms-10 mt-4 flex gap-7 md:block mb-5 md:mb-0">
                        <li class="mb-[6px] text-gray-400">
                            <router-link to="/useraccount/userprofile">My Profile</router-link>
                        </li>
                        <li class="mb-[6px] text-gray-400">
                            <router-link to="/useraccount/weeklyorders">Weekly Orders</router-link>
                        </li>
                        <li class="mb-[6px] text-gray-400">
                            <router-link to="/useraccount/wishlist">My Wishlist</router-link>
                        </li>
                        <li class="mb-[6px] text-gray-400">
                            <router-link to="/useraccount/manageMyPlan">My Plan</router-link>
                        </li>
                        <li class="mb-[6px] text-gray-400">
                            <router-link to="/useraccount/myorders">My Orders</router-link>
                        </li>
                    </ul>
                </div>
            </leftSection>

            <rightSection class="md:w-10/12 shadow-2xl py-14 mx-auto">
                <router-view></router-view>
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