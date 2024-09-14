<template>
    <div style="padding: 0 50px;">

        <div class="products pt-10 mb-12 text-center">

            <section class="products-head mb-12 mx-10">
                <h2
                    class="text-xs sm:w-1/5 md:w-2/5 mb-4 text-start text-stone-500 font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-0 md:before:top-0 before:-left-3 md:before:-left-6 before:block before:w-2 md:before:w-3 before:h-4 md:before:h-5 before:rounded-sm">
                    Our categories</h2>
                <div class="flex  flex-col gap-3 md:flex-row justify-between items-start md:items-center ">
                    <p class="text-lg md:text-2xl font-bold text-stone-900 w-fit">Explore Our categories</p>
                    <div class="search-input relative">
                        <input type="text" placeholder="Search for category"
                            class="input focus:outline-none h-8 input-bordered border-red-400 focus:border-red-400 w-full max-w-64" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" class="size-5 absolute top-1.5 right-3.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>
            </section>

            <section class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div v-for="category in this.categories" :key="category.name"
                    class="text-center p-4 bg-red-50 rounded-lg shadow hover:bg-red-100 transition duration-300">
                    <router-link :to="`/productsPage/${category[0]}`"> <img :src="category[1].image_url"
                            alt="category image" class="mx-auto mb-4 w-20 h-20 object-contain">
                        <p class="font-semibold">{{ category[1].name }}</p>
                    </router-link>

                </div>
            </section>

        </div>

        <div class="products pt-10 mb-12 text-center">
            <section class="products-head mb-12 mx-10">
                <h2
                    class="text-xs sm:w-1/5 md:w-2/5 mb-4 text-start text-stone-500 font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-0 md:before:top-0 before:-left-3 md:before:-left-6 before:block before:w-2 md:before:w-3 before:h-4 md:before:h-5 before:rounded-sm">
                    Our Products</h2>
                <div class="flex  flex-col gap-3 md:flex-row justify-between items-start md:items-center ">
                    <p class="text-lg md:text-2xl font-bold text-stone-900 w-fit">Explore Our Products</p>
                    <div class="search-input relative placeholder:text-xs">
                        <input v-model="searchQuery" type="text" placeholder="Search for product"
                            class="input focus:outline-none h-8 input-bordered border-red-400 focus:border-red-400 w-full max-w-64" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" class="size-5 absolute top-1.5 right-3.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>
            </section>

            <section class="flex flex-wrap">
                <div v-for="(product, index) in products" :key="index"
                    class="card bg-base-100 rounded-sm cursor-pointer mb-8 w-full lg:w-1/5 md:w-4/12 sm:w-6/12 gap-3 p-3">

                    <div class="border rounded-md">
                        <figure class="bg-stone-50 p-5 relative ">
                            <img :src="product[1].image_url" alt="" class="w-1/2 h-52" />
                            <div class="badges absolute top-3 px-3 w-full flex justify-between">
                                <div v-if="product[1].new"
                                    class="badge text-xs badge-secondary rounded-md bg-green-800 text-white py-1">NEW
                                </div>
                                <div v-if="product[1].onsale"
                                    class="badge text-xs badge-secondary rounded-md bg-red-600 text-white py-1">{{
                                        product[1].onsale }}</div>
                                <svg @click="addToWishlist(product[0], product[1])" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    class="size-5 cursor-pointer hover:fill-red-600 hover:stroke-red-600 ms-auto">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </div>
                            <div @click="addToCart(product[0], product[1])"
                                class="cart-btn hidden absolute bottom-0 bg-slate-800 text-white w-full p-2 font-bold text-center">
                                Add To Cart</div>
                        </figure>

                        <div class="card-body p-5">
                            <h2 class="card-title text-start">{{
                                product[1].english_name.length > 15 ?
                                    product[1].english_name.slice(0, 15).split().join('') + '...' : product[1].english_name
                            }}</h2>
                            <div class="price flex gap-3">
                                <div class="after text-lg text-red-500 font-bold">
                                    {{ product[1].onsale.split('%')[0].length ==
                                        2 ? product[1].price - (product[1].onsale.split('%')[0] * product[1].price / 100) :
                                        product[1].price
                                    }}<span class="text-xs  font-normal"> L.E</span>
                                </div>
                                <div v-if="product[1].onsale"
                                    class="before text-lg text-stone-400 relative before:content-[''] before:absolute before:bg-[#a8a29e] before:block before:w-0.5 before:h-7 before:rotate-90 before:left-4 before:top-0">
                                    {{ product[1].price }}<span class="text-xs font-normal"> L.E</span>
                                </div>
                            </div>
                            <div class="rating rating-sm ">
                                <input v-for="item in 5" :key="item" type="radio" :name="`rating-${index}`"
                                    :checked="false" class="mask mask-star-2 bg-amber-400 me-1" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section class="join mt-10 rounded-none">
                <input class="join-item  pagination-btns" type="radio" name="options" aria-label="«" />
                <input class="join-item pagination-btns" type="radio" name="options" aria-label="1" checked="checked" />
                <input class="join-item  pagination-btns" type="radio" name="options" aria-label="2" />
                <input class="join-item  pagination-btns" type="radio" name="options" aria-label="3" />
                <input class="join-item  pagination-btns" type="radio" name="options" aria-label="4" />
                <input class="join-item  pagination-btns" type="radio" name="options" aria-label="»" />
            </section>
        </div>

    </div>
</template>

<script>
import service from '@/mixins/service';

export default {
    data() {
        return {
            categories: null,
            products: null,
            searchQuery: '',
            userId: 'bab69910f7dc80c',
        }
    },
    methods: {
        async getCategories() {
            this.categories = await service.methods.getCategories()
        },
        async getAllProducts() {
            this.products = await service.methods.getAllProducts(this.searchQuery)
        },
        async addToCart(productId, product) {
            console.log(await service.methods.addTo_cart_wishlist(this.userId, productId, product, 'cart'));
        },
        async addToWishlist(productId, product) {
            console.log(await service.methods.addTo_cart_wishlist(this.userId, productId, product, 'wishlist'));
        },
    },
    mounted() {
        this.getCategories()
        this.getAllProducts()
    },
    watch: {
        searchQuery: function () {
            this.getAllProducts()
        }
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

img{
    background-color: transparent !important;
    backdrop-filter :grayscale(100%);
}
</style>