<template>
    <div class="container mx-auto products pt-10 mb-12 text-center">


        <section class="products-head mb-12 mx-10">

            <h2
                class="text-xs sm:w-1/5 md:w-2/5 mb-4 text-start text-stone-500 font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-0 md:before:top-0 before:-left-3 md:before:-left-6 before:block before:w-2 md:before:w-3 before:h-4 md:before:h-5 before:rounded-sm">
                Our Products</h2>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center">

                <p class="text-lg md:text-2xl font-bold text-stone-900 w-fit">Explore Our Products</p>
                <div class="search-input relative">
                    <input v-model="searchQueryProducts" type="text" placeholder="Search"
                        class="input focus:outline-none h-8 input-bordered border-red-400 focus:border-red-400 w-full max-w-64" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                        stroke="currentColor" class="size-5 absolute top-1.5 right-3.5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </div>
            <router-link to="editDelete">
                <button class="mainGreenBtn block me-auto mt-5 w-">Add new product +</button>
            </router-link>
        </section>

        <!-- <section class="flex flex-wrap">
            <div v-for="(product, index) in products" :key="index"
                class="card bg-base-100 rounded-sm cursor-pointer mb-8 w-full lg:w-1/5 md:w-4/12 sm:w-6/12 gap-3 p-3">

                <div class="border rounded-md hover:scale-[1.01] transition-all hover:shadow-lg duration-300">

                    <figure class="bg-stone-50 p-5 relative ">
                        <img :src="product[1].image_url" alt="" class="w-1/2 h-[180px]" />
                        <div class="badges absolute top-3 px-3 w-full flex gap-1">
                            <div v-if="product[1].new"
                                class="badge text-xs badge-secondary rounded-md bg-green-800 text-white py-1">NEW
                            </div>
                            <div v-if="product[1].onsale"
                                class="badge text-xs badge-secondary rounded-md bg-[#DB4444] text-white py-1">{{
                                    product[1].onsale }}</div>
                        </div>
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
                                {{ product[1].onsale.split('%').length ==
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
                </div>

            </div>
        </section> -->


        <table class="table text-center">
            <thead>
                <th>Id</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Sale</th>
                <th>New</th>
                <th>Boycott</th>
                <th>Category</th>
                <th>Availability</th>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product">
                    <td>{{ product[0] }}</td>
                    <td class="flex justify-center"><img class="w-14" :src="product[1].image_url"
                            :alt="product[1].english_name"></td>
                    <td>{{ product[1].english_name }}</td>
                    <td :class="product[1].onsale ? 'text-red-500' : ''">{{ product[1].onsale ? product[1].onsale : '----'
                        }}</td>
                    <td :class="product[1].new ? 'text-green-500' : '----'">{{ product[1].new ? 'New' : '' }}</td>
                    <td>{{ product[1].boycott ? 'Boycott' : '----' }}</td>
                    <td>{{ product[1].catId.split('_')[1].charAt(0).toUpperCase() +
                        product[1].catId.split('_')[1].slice(1) }}</td>
                    <td>{{ product[1].availability ? product[1].availability : '----' }}</td>
                    <td class="flex gap-3 items-center justify-center -translate-y-1/2">
                        <router-link :to="`/editDelete/${product[0]}`">
                            <img class="w-5 cursor-pointer" src="../assets/editing.png" alt="">
                        </router-link>
                        <img @click="deleteItem(product[0])" class="w-5 cursor-pointer" src="../assets/deleteicon.png"
                            alt="">
                    </td>
                </tr>
            </tbody>
        </table>

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
            searchQueryProducts: '',
        }
    },
    methods: {
        async getAllProducts() {
            try {
                this.products = await service.methods.getAllProducts(this.searchQueryProducts, '', '', 'admin')
                console.log(this.products);
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
    ,
    watch: {
        searchQueryProducts: function () {
            this.getAllProducts()
        }
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