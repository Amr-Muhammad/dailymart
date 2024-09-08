<template>
    <div>
        <div class="products pt-10 mb-12 text-center">
            <div class="products-head mb-12 mx-10">
                <h2 class="text-xs sm:w-1/5 md:w-2/5 mb-4 text-start text-stone-500 font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-0 md:before:top-0 before:-left-3 md:before:-left-6 before:block before:w-2 md:before:w-3 before:h-4 md:before:h-5 before:rounded-sm">Our Products</h2>
                <div class="flex  flex-col gap-3 md:flex-row justify-between items-start md:items-center ">
                    <p class="text-lg md:text-2xl font-bold text-stone-900 w-fit">Explore Our Products</p>
                    <div class="search-input relative">
                        <input type="text" placeholder="search" class="input focus:outline-none h-8 input-bordered border-red-400 focus:border-red-400 w-full max-w-64" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-5 absolute top-1.5 right-3.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <section class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-3 md:mx-5 md:gap-5">
                <div v-for="product in products" :key="product" class="card bg-base-100 shadow-xl rounded-sm cursor-pointer mb-8">
                    <figure class="bg-stone-50 p-5 relative ">
                        <img :src="product.src" alt="" class="w-1/2"/>
                        <div class="badges absolute top-3 px-3 w-full flex justify-between">
                            <div v-if="product.new" class="badge text-xs badge-secondary rounded-md bg-green-800 text-white py-1">NEW</div>
                            <div v-if="product.sale" class="badge text-xs badge-secondary rounded-md bg-red-600 text-white py-1">{{ product.sale }}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 cursor-pointer hover:fill-red-600 hover:stroke-red-600 ms-auto">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </div>
                        <div class="cart-btn hidden absolute bottom-0 bg-slate-800 text-white w-full p-2 font-bold text-center">Add To Cart</div>
                    </figure>
                    <div class="card-body p-5">
                        <h2 class="card-title text-start">{{ product.title }}</h2>
                        <div class="price flex gap-3">
                            <div class="after text-lg text-red-500 font-bold">
                                {{ product.afterSale }}<span class="text-xs  font-normal">L.E</span>
                            </div>
                            <div class="before text-lg text-stone-400 relative before:content-[''] before:absolute before:bg-[#a8a29e] before:block before:w-0.5 before:h-7 before:rotate-90 before:left-4 before:top-0">
                                {{ product.price }}<span class="text-xs font-normal">L.E</span>
                            </div>
                        </div>
                        <div class="rating rating-sm ">
                            <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400 me-1" />
                            <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400 me-1" />
                            <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400 me-1" checked="checked" />
                            <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400 me-1" />
                            <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400" />
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
export default {
    name: 'productsPage',
    data () {
        return {
            products : [
                {src: require('../assets/prd1.png'), title: 'Ponky Chips', price: 50, afterSale: 39, comments: 85, new: true},
                {src: require('../assets/prd2.png'), title: 'Big Chips', price: 50, afterSale: 39, comments: 85, sale: "-10%"},
                {src: require('../assets/prd3.png'), title: 'McvitieS Digestive Biscuits', price: 50, afterSale: 39, comments: 85},
                {src: require('../assets/prd4.png'), title: 'Abu Auf Snacks', price: 50, afterSale: 39, comments: 85, new: true},
                {src: require('../assets/prd5.png'), title: 'Lambada', price: 50, afterSale: 39, comments: 85},
                {src: require('../assets/prd6.png'), title: 'Big Chips', price: 50, afterSale: 39, comments: 85, sale: "-25%"},
                {src: require('../assets/prd7.png'), title: 'McvitieS Digestive Biscuits', price: 50, afterSale: 39, comments: 85, sale: "-15%"},
                {src: require('../assets/prd1.png'), title: 'Ponky Chips', price: 50, afterSale: 39, comments: 85, new: true},
            ]
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