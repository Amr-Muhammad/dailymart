<template>
    <div>

        <div class="products pt-10 mb-12 text-center">
            <div class="products-head mb-12 mx-10">
                <h2
                    class="text-xs sm:w-1/5 md:w-2/5 mb-4 text-start text-stone-500 font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-0 md:before:top-0 before:-left-3 md:before:-left-6 before:block before:w-2 md:before:w-3 before:h-4 md:before:h-5 before:rounded-sm">
                    Our Products</h2>
                <div class="flex  flex-col gap-3 md:flex-row justify-between items-start md:items-center ">
                    <p class="text-lg md:text-2xl font-bold text-stone-900 w-fit">Explore Our Products</p>
                    <div class="search-input relative">
                        <input @input="searchForProduct()" type="text" placeholder="search"
                            class="input focus:outline-none h-8 input-bordered border-red-400 focus:border-red-400 w-full max-w-64" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" class="size-5 absolute top-1.5 right-3.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>
            </div>

            <section class="flex flex-wrap">
                <!-- <div v-for="(product, index) in products" :key="index"
                    class="card bg-base-100 rounded-sm cursor-pointer mb-8 w-full lg:w-1/5 md:w-4/12 sm:w-6/12 gap-3 p-3">

                    <div class="border rounded-md">
                        <figure class="bg-stone-50 p-5 relative ">
                            <img :src="product.src" alt="" class="w-1/2" />
                            <div class="badges absolute top-3 px-3 w-full flex justify-between">
                                <div v-if="product.new"
                                    class="badge text-xs badge-secondary rounded-md bg-green-800 text-white py-1">NEW
                                </div>
                                <div v-if="product.sale"
                                    class="badge text-xs badge-secondary rounded-md bg-red-600 text-white py-1">{{
                                        product.sale }}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor"
                                    class="size-5 cursor-pointer hover:fill-red-600 hover:stroke-red-600 ms-auto">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </div>
                            <div
                                class="cart-btn hidden absolute bottom-0 bg-slate-800 text-white w-full p-2 font-bold text-center">
                                Add To Cart</div>
                        </figure>

                        <div class="card-body p-5">
                            <h2 class="card-title text-start">{{
                                product.title.length > 15 ?
                                    product.title.slice(0, 15).split().join('') + '...' : product.title }}</h2>
                            <div class="price flex gap-3">
                                <div class="after text-lg text-red-500 font-bold">
                                    {{ product.afterSale }}<span class="text-xs  font-normal">L.E</span>
                                </div>
                                <div
                                    class="before text-lg text-stone-400 relative before:content-[''] before:absolute before:bg-[#a8a29e] before:block before:w-0.5 before:h-7 before:rotate-90 before:left-4 before:top-0">
                                    {{ product.price }}<span class="text-xs font-normal">L.E</span>
                                </div>
                            </div>
                            <div class="rating rating-sm ">
                                <input v-for="item in 5" :key="item" type="radio" :name="`rating-${index}`"
                                    :checked="false" class="mask mask-star-2 bg-amber-400 me-1" />
                            </div>
                        </div>
                    </div>

                </div> -->
                <!-- Maaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaai -->
                <div v-for="(product, index) in products" :key="index"
                    class="card bg-base-100 rounded-sm cursor-pointer mb-8 w-full lg:w-1/5 md:w-4/12 sm:w-6/12 gap-3 p-3">

                    <div class="border rounded-md">
                        <figure class="bg-stone-50 p-5 relative ">
                            <img :src="product[1].image_url" alt="" class="w-1/2" />
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
import axios from 'axios';

export default {
    name: 'productsPage',
    data() {
        return {
            value: 5,
            userId: 'bab69910f7dc80c',
            products: null,
            product: null,
            categoryId: null,
            lastVisibleProduct: null
        }
    }
    ,
    methods: {
        async getProducts() {
            this.products = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/products.json')).data
            this.products = Object.entries(this.products).filter(item => item[1].catId == this.categoryId && !item[1].boycott)
            console.log(this.products);

        },
        // async fetchFirstPage() {
        //     const url = `https://dailymart-5c550-default-rtdb.firebaseio.com/products.json?orderBy="$key"&limitToFirst=20`;
        //     const res = (await axios.get(url)).data;
        //     this.products = Object.values(res); // Convert the fetched object into an array of products
        //     this.lastVisibleProduct = Object.keys(res)[Object.keys(res).length - 1]; // Get the last product key for pagination
        //     console.log(this.products);
        //     console.log(this.lastVisibleProduct);
        // },
        // async fetchNextPage() {
        //     const res = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/products.json?orderBy="$key"&limitToFirst=20&startAt="${this.lastVisibleProduct}"`)).data;
        //     delete res[Object.keys(res)[0]]
        //     this.products = res


        // },
        async addToCart(productId, product) {
            let res = (await (axios.put(`https://dailymart-5c550-default-rtdb.firebaseio.com/cart/${this.userId}/${productId}.json`, product))).data
            console.log(res);
        },
        async addToWishlist(productId, product) {
            let res = (await (axios.put(`https://dailymart-5c550-default-rtdb.firebaseio.com/wishlist/${this.userId}/${productId}.json`, product))).data
            console.log(res);
        },
        async searchForProduct(){
            this.products = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/products.json')).data

        }
    },
    mounted() {
        this.categoryId = this.$route.params.id
        this.getProducts()
        // this.fetchFirstPage()
    }
}
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