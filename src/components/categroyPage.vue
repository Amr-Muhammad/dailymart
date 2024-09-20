<template>

    <div class="container mx-auto">
        <div class="categories pt-10 mb-12 text-center">

            <section class="products-head mb-12 mx-10">

                <h2
                    class="text-xs sm:w-1/5 md:w-2/5 mb-4 text-start text-stone-500 font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-0 md:before:top-0 before:-left-3 md:before:-left-6 before:block before:w-2 md:before:w-3 before:h-4 md:before:h-5 before:rounded-sm">
                    Our categories</h2>

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center">

                    <p class="text-lg md:text-2xl font-bold text-stone-900 w-fit">Explore Our categories</p>

                    <!-- <div class="search-input relative md:w-1/5">

                <input type="text" placeholder="Search for Category"
                    class="input focus:outline-none h-8 input-bordered border-red-400 focus:border-red-400 w-full max-w-64" />

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                    stroke="currentColor" class="size-5 absolute top-1.5 right-14">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

            </div> -->

                    <div class="search-input relative lg:w-1/5 flex items-center justify-end md:mt-0 mt-5">

                        <input v-model="searchQueryCategories" type="text" placeholder="Search"
                            class="input rounded-md focus:outline-none h-8 input-bordered border-[#166534] border-2 focus:border-[#166534] w-full max-w-64" />

                        <div
                            class="absolute right-0 h-8 flex items-center w-10 rounded-r-md justify-center border-2 border-[#166534] bg-[#166534]">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="size-5 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>

                        </div>

                    </div>

                </div>
            </section>

            <section class="flex flex-wrap">
                <div v-for="category in this.categories" :key="category.name"
                    class="p-2 lg:w-3/12 md:w-4/12 sm:w-1/2 w-full">
                    <div
                        class="text-center p-4 bg-[#FBFBFB] rounded-lg shadow hover:bg-red-100 transition duration-300">
                        <router-link :to="`/productsPage/${category[0]}`"> <img :src="category[1].image_url"
                                alt="category image" class="mx-auto mb-4 w-40 object-contain">
                            <p class="font-semibold">{{ category[1].name }}</p>
                        </router-link>
                    </div>
                </div>
            </section>

        </div>

        <div class="products pt-10 mb-12 text-center">

            <section class="products-head mb-12 mx-10">

                <h2
                    class="text-xs sm:w-1/5 md:w-2/5 mb-4 text-start text-stone-500 font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-0 md:before:top-0 before:-left-3 md:before:-left-6 before:block before:w-2 md:before:w-3 before:h-4 md:before:h-5 before:rounded-sm">
                    Our Products</h2>

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center">

                    <p class="text-lg md:text-2xl font-bold text-stone-900 w-fit">Explore Our categories</p>

                    <!-- <div class="search-input relative md:w-1/5">

                <input type="text" placeholder="Search for Products"
                    class="input focus:outline-none h-8 input-bordered border-red-400 focus:border-red-400 w-full max-w-64" />

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                    stroke="currentColor" class="size-5 absolute top-1.5 right-14">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

            </div> -->

                    <div class="search-input relative lg:w-1/5 flex items-center justify-end md:mt-0 mt-5">

                        <input v-model="searchQueryProducts" type="text" placeholder="Search"
                            class="input rounded-md focus:outline-none h-8 input-bordered border-[#166534] border-2 focus:border-[#166534] w-full max-w-64" />

                        <div
                            class="absolute right-0 h-8 flex items-center w-10 rounded-r-md justify-center border-2 border-[#166534] bg-[#166534]">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="size-5 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>

                        </div>

                    </div>

                </div>
            </section>

            <section class="flex flex-wrap">
                <div v-for="(product, index) in products" :key="index"
                    class="card bg-base-100 rounded-sm cursor-pointer mb-8 w-full lg:w-1/5 md:w-4/12 sm:w-6/12 gap-3 p-3">

                    <div class="border rounded-md hover:scale-[1.01] transition-all hover:shadow-lg duration-300">

                        <figure class="bg-stone-50 p-5 relative ">
                            <router-link class="w-full h-full absolute"
                                :to="`/productdetail/${product[0]}`"></router-link>
                            <img :src="product[1].image_url" alt="" class="w-1/2 h-[180px]" />
                            <div class="badges absolute top-3 px-3 w-full flex justify-between">
                                <div v-if="product[1].new"
                                    class="badge text-xs badge-secondary rounded-md bg-green-800 text-white py-1">NEW
                                </div>
                                <div v-if="product[1].onsale"
                                    class="badge text-xs badge-secondary rounded-md bg-[#DB4444] text-white py-1">{{
                                        product[1].onsale }}</div>
                                <div class="ms-auto">
                                    <svg @click="addToWishlist(product[0], product[1])"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="size-5 cursor-pointer hover:fill-[#DB4444] transition-all duration-1000 ms-auto text-[#DB4444] block mx-auto">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                    <svg v-if="subscribed" class="hover:scale-[1.1]"
                                        @click="addToWeeklyOrder(product[0], product[1])" width="25px" height="25px"
                                        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                        </g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M11 6L21 6.00072M11 12L21 12.0007M11 18L21 18.0007M3 11.9444L4.53846 13.5L8 10M3 5.94444L4.53846 7.5L8 4M4.5 18H4.51M5 18C5 18.2761 4.77614 18.5 4.5 18.5C4.22386 18.5 4 18.2761 4 18C4 17.7239 4.22386 17.5 4.5 17.5C4.77614 17.5 5 17.7239 5 18Z"
                                                stroke="#000000" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <!-- <div @click="addToCart(product[0], product[1])"
                                class="cart-btn hidden absolute bottom-0 bg-slate-800 text-white w-full p-2 font-bold text-center">
                                Add To Cart</div> -->
                        </figure>

                        <div class="card-body p-5">
                            <h2 class="card-title text-start text-[18px] font-semibold">{{
                                product[1].english_name.length > 15 ?
                                    product[1].english_name.slice(0, 15).split().join('') + '...' : product[1].english_name
                            }}</h2>
                            <h2 class="card-title text-start text-sm">{{
                                product[1].description.length > 25 ?
                                    product[1].description.slice(0, 25).split().join('') + '...' : product[1].description
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

                        <div
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
            searchQueryProducts: '',
            searchQueryCategories: '',
            userId: 'bab69910f7dc80c',
            user: null,
            subscribed: null
        }
    },
    methods: {
        async getCategories() {
            try {
                this.categories = await service.methods.getCategories()
                this.categories = this.categories.filter(cat => cat[1].name.toLowerCase().includes(this.searchQueryCategories))
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        async getAllProducts() {
            try {
                this.products = await service.methods.getAllProducts(this.searchQueryProducts, '', true)
                // this.products = Object.entries(this.products)
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        async addToCart(productId, product) {
            let flag = null
            try {
                flag = await service.methods.getSpeificProduct(this.userId, productId, 'cart')
                if (flag) {
                    try {
                        await service.methods.patchQuantity(this.userId, productId, 'cart', '+')
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                else {
                    try {
                        await service.methods.addTo_cart_wishlist_weekly(this.userId, productId, {
                            ...product,
                            quantity: 1
                        }, 'cart')
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        async addToWishlist(productId, product) {
            try {
                await service.methods.addTo_cart_wishlist_weekly(this.userId, productId, product, 'wishlist')
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        async addToWeeklyOrder(productId, product) {
            let flag = null
            try {
                flag = await service.methods.getSpeificProduct(this.userId, productId, 'weeklyorders')
                if (flag) {
                    try {
                        await service.methods.patchQuantity(this.userId, productId, 'weeklyorders', '+')
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                else {
                    try {
                        await service.methods.addTo_cart_wishlist_weekly(this.userId, productId, {
                            ...product,
                            addedAt: new Date(),
                            quantity: 1
                        }, 'weeklyorders')
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        async isUserSubscribed() {
            this.user = await service.methods.getLoggedUser(this.userId)
            this.subscribed = this.user.planid
        }
    },
    async mounted() {
        this.isUserSubscribed()
        this.getCategories()
        this.getAllProducts()
        // service.methods.getNextFriday()
    },
    watch: {
        searchQueryProducts: function () {
            this.getAllProducts()
        },
        searchQueryCategories: function () {
            this.getCategories()
        },
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

.card:hover .cart-btn {
    color: white;
    background-color: #252525;
}

.card:hover .stroke-current {
    color: white;
}
</style>