<template>

    <div>

        <div class="container mx-auto">
            <div class="flex justify-between">

                <div class="breadcrumbs text-sm">
                    <ul>
                        <li class=" text-gray-400"><router-link to="/homePage">Home</router-link></li>
                        <li>My Account</li>
                    </ul>
                </div>

                <div>
                    <p>
                        Welcome
                        <span class="primaryPink font-semibold">Amr!</span>
                    </p>
                </div>

            </div>

            <div class="flex mt-16 flex-wrap justify-center">
                <leftSection class="md:w-2/12">
                    <div>
                        <h1 class="font-bold">Manage My Account</h1>
                        <ul class="ms-10 mt-4 flex gap-7 md:block mb-5 md:mb-0">
                            <li class="mb-[6px] text-gray-400">
                                <router-link to="/adminaccount/manageusers">Manage Users</router-link>
                            </li>
                            <li class="mb-[6px] text-gray-400">
                                <router-link to="/adminaccount/manageadmins">Manage Admins</router-link>
                            </li>
                            <li class="mb-[6px] text-gray-400">
                                <router-link to="/adminaccount/manageproducts">Manage Products</router-link>
                            </li>
                            <li class="mb-[6px] text-gray-400">
                                <router-link to="/adminaccount/editDelete">Creat a New Product</router-link>
                            </li>
                            <!-- <li class="mb-[6px] text-gray-400">
                                <router-link to="/adminaccount/manageusers">My Orders</router-link>
                            </li> -->
                        </ul>
                    </div>
                </leftSection>

                <rightSection class="md:w-10/12 shadow-2xl py-14">
                    <router-view></router-view>
                </rightSection>
            </div>
        </div>

    </div>


</template>

<script>
export default {

}
</script>

<style scoped></style>