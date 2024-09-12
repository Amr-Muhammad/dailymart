<template>
    <div style="padding: 0 50px;">

        <div class="products pt-10 mb-12 text-center">
            <div class="products-head mb-12 mx-10">
                <h2
                    class="text-xs sm:w-1/5 md:w-2/5 mb-4 text-start text-stone-500 font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-0 md:before:top-0 before:-left-3 md:before:-left-6 before:block before:w-2 md:before:w-3 before:h-4 md:before:h-5 before:rounded-sm">
                    Our categories</h2>
                <div class="flex  flex-col gap-3 md:flex-row justify-between items-start md:items-center ">
                    <p class="text-lg md:text-2xl font-bold text-stone-900 w-fit">Explore Our categories</p>
                    <div class="search-input relative">
                        <input type="text" placeholder="search"
                            class="input focus:outline-none h-8 input-bordered border-red-400 focus:border-red-400 w-full max-w-64" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" class="size-5 absolute top-1.5 right-3.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- <section class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-3 md:mx-5 md:gap-5"> -->
            <!-- <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div v-for="category in categories" :key="category.name"
                    class="text-center p-4 bg-red-50 rounded-lg shadow hover:bg-red-100 transition duration-300">
                    <router-link to="/productsPage"> <img :src="category.image" alt="category image"
                            class="mx-auto mb-4 w-20 h-20 object-contain">
                        <p class="font-semibold">{{ category.name }}</p>
                    </router-link>

                </div>
            </div> -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div v-for="category in this.categoooories" :key="category.name"
                    class="text-center p-4 bg-red-50 rounded-lg shadow hover:bg-red-100 transition duration-300">
                    <router-link :to="`/productsPage/${category[0]}`"> <img :src="category[1].image_url"
                            alt="category image" class="mx-auto mb-4 w-20 h-20 object-contain">
                        <p class="font-semibold">{{ category[1].name }}</p>
                    </router-link>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            categories: [
                { name: 'Snacks', image: 'https://m.media-amazon.com/images/I/712z1pDR4eL._AC_UF894,1000_QL80_.jpg' },
                { name: 'Beverages', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlTxowoYFTjecJhYaN35eMT05ImRVScI3t2Q&s' },
                { name: 'Vegetables&Fruits', image: 'https://m.media-amazon.com/images/I/71djtMGwW7L.jpg' },
                { name: 'Frozen Goods', image: 'https://m.media-amazon.com/images/I/71Pmo+GWqdL._AC_UF894,1000_QL80_.jpg' },
                { name: 'Dairy', image: 'https://m.media-amazon.com/images/I/61PVgmrPUWL._SY385_.jpg' },
                { name: 'Cleaning', image: 'https://m.media-amazon.com/images/I/710Q6rwCZyL.__AC_SX300_SY300_QL70_ML2_.jpg' },
                { name: 'Condiments & Sauces', image: 'https://t3.ftcdn.net/jpg/01/66/45/02/360_F_166450222_q738gQ0Du5fHjqhCs7PWi1yRjuWheQwL.jpg' },
                { name: 'Cooking Oil & Ghee', image: 'https://t3.ftcdn.net/jpg/01/30/63/52/360_F_130635244_bAKTab1uMo23hSYKjBYDCp9OowbVdQF5.jpg' },
            ],
            categoooories: null
        }
    },
    methods: {
        async getCategories() {
            this.categoooories = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/category.json`)).data
            this.categoooories = Object.entries(this.categoooories)
        }
    },
    mounted() {
        this.getCategories()
    }
};
</script>

<style scoped>
.card figure:hover .cart-btn {
    display: block
}

.join .join-item:checked,
.join .join-item:hover,
.join .join-item:checked:hover {
    background-color: #166534;
    color: white;
    border-color: rgb(22 101 52);
}
</style>