<template>
    <div class="container mx-auto products pt-10 mb-12 text-center">


        <section class="products-head mb-12 mx-10">

            <h2
                class="text-xs sm:w-1/5 md:w-2/5 mb-4 text-start text-stone-500 font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-0 md:before:top-0 before:-left-3 md:before:-left-6 before:block before:w-2 md:before:w-3 before:h-4 md:before:h-5 before:rounded-sm">
                Our Products</h2>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center">

                <p class="text-lg md:text-2xl font-bold text-stone-900 w-fit">Explore Our categories</p>
                <div class="search-input relative">
                    <input type="text" placeholder="Search"
                        class="input focus:outline-none h-8 input-bordered border-red-400 focus:border-red-400 w-full max-w-64" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                        stroke="currentColor" class="size-5 absolute top-1.5 right-3.5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </div>
            <router-link to="editDelete">
                <button class="mainGreenBtn block me-auto mt-5">Add new product +</button>
            </router-link>
        </section>

        <section class="flex flex-wrap">
            <div v-for="(product, index) in products" :key="index"
                class="card bg-base-100 rounded-sm cursor-pointer mb-8 w-full lg:w-1/5 md:w-4/12 sm:w-6/12 gap-3 p-3">

                <div class="border rounded-md hover:scale-[1.01] transition-all hover:shadow-lg duration-300">

                    <figure class="bg-stone-50 p-5 relative ">
                        <img :src="product[1].image_url" alt="" class="w-1/2 h-[180px]" />
                        <div class="badges absolute top-3 px-3 w-full flex justify-between">
                            <div v-if="product[1].new"
                                class="badge text-xs badge-secondary rounded-md bg-green-800 text-white py-1">NEW
                            </div>
                            <div v-if="product[1].onsale"
                                class="badge text-xs badge-secondary rounded-md bg-[#DB4444] text-white py-1">{{
                                    product[1].onsale }}</div>
                        </div>
                        <!-- <div @click="addToCart(product[0], product[1])"
                    class="cart-btn hidden absolute bottom-0 bg-slate-800 text-white w-full p-2 font-bold text-center">
                    Add To Cart</div> -->
                    </figure>

                    <div class="card-body p-5">
                        <h2 v-if="product[1].english_name" class="card-title text-start text-[18px] font-semibold">{{
                            product[1].english_name.length > 15 ?
                                product[1].english_name.slice(0, 15).split().join('') + '...' : product[1].english_name
                        }}</h2>
                        <h2 v-if="product[1].description" class="card-title text-start text-sm">{{
                            product[1].description.length > 25 ?
                                product[1].description.slice(0, 25).split().join('') + '...' : product[1].description
                        }}</h2>
                        <div class="price flex gap-3">
                            <div v-if="product[1].onsale" class="after text-lg text-red-500 font-bold">
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
                            <input v-for="item in 5" :key="item" type="radio" :name="`rating-${index}`" :checked="false"
                                class="mask mask-star-2 bg-amber-400 me-1" />
                        </div>
                        <div class="flex mt-3 justify-center">

                            <router-link :to="`editDelete/${product[0]}`">
                                <button class="mainGreenBtn px-8 me-3 flex-grow">
                                    Edit
                                </button>
                            </router-link>
                            <button @click="deleteItem(product[0])" class="mainPinkBtn px-8">Delete</button>
                        </div>
                    </div>

                    <!-- <div
                            class="cart-btn group border w-full p-2 font-bold text-center flex gap-3 justify-center transition-all duration-300">
                            <button @click="addToCart(product[0], product[1])" class="hover:text-white">
                                Add To Cart
                            </button>
                            <svg class="stroke-current text-black group-hover:text-white" width="30px" height="30px"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                transform="matrix(-1, 0, 0, 1, 0, 0)">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke=""
                                    stroke-width="1"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                                        stroke="currentColor" stroke-width="0.84"></path>
                                    <path
                                        d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                                        stroke="currentColor" stroke-width="0.84"></path>
                                    <path
                                        d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                                        stroke="currentColor" stroke-width="0.84" stroke-linecap="round"></path>
                                </g>
                            </svg>
                        </div> -->

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
</template>

<script>
import service from '@/mixins/service';

export default {
    name: 'productsPage',
    data() {
        return {
            products: null,
            userId: 'bab69910f7dc80c',
        }
    },
    methods: {
        async getAllProducts() {
            try {
                this.products = await service.methods.getAllProducts()
                this.products = Object.entries(this.products)
            }
            catch (err) {
                console.log(err);
            }
        },
        async deleteItem(productId) {
            console.log(productId);

            try {
                await service.methods.deleteProduct(productId)
                this.getAllProducts()
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    mounted() {
        this.getAllProducts()
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