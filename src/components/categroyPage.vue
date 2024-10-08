<template>

    <div class="container mx-auto">

        <button ref="scrollBtn"
            class="scroll-btn fixed bottom-[30px] z-[9999] transition-[right] duration-[1.5s] rounded-full ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 border border-black rounded-full p-[3px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>

        </button>

        <!-- Categories -->
        <div class="categories pt-10 mb-12 text-center">

            <!-- Categories Search -->
            <section class="products-head mb-12 mx-10">

                <h2
                    class="text-xs sm:w-1/5 md:w-2/5 mb-4 text-start text-stone-500 font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-0 md:before:top-0 before:-left-3 md:before:-left-6 before:block before:w-2 md:before:w-3 before:h-4 md:before:h-5 before:rounded-sm">
                    Our categories</h2>

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center">

                    <p class="text-lg md:text-2xl font-bold text-stone-900 w-fit">Explore Our categories</p>

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

            <!-- Categories -->
            <section v-if="categories" class="flex flex-wrap">

                <div v-for="category in categories" :key="category.name"
                    class="p-2 lg:w-3/12 md:w-4/12 sm:w-1/2 w-full">
                    <div
                        class="text-center p-4 bg-[#FBFBFB] rounded-lg shadow hover:bg-black hover:bg-opacity-10 transition duration-300">
                        <router-link :to="`/productsPage/${category[0]}`">
                            <img :src="category[1].image_url" alt="category image"
                                class="mx-auto mb-4 w-40 object-contain">
                            <p class="font-semibold">{{ category[1].name }}</p>
                        </router-link>
                    </div>
                </div>

            </section>

            <!-- Skeleton -->
            <section class="p-2 flex flex-wrap" v-if="categories == null">
                <div v-for="item in 8" :key="item" class="flex w-3/12 flex-col gap-4 p-2">
                    <div class="skeleton h-32 w-full"></div>
                </div>
            </section>

        </div>

        <!-- Products -->
        <div class="products pt-10 mb-12 text-center">

            <!-- Products Search -->
            <section class="products-head mb-12 mx-10">

                <h2
                    class="text-xs sm:w-1/5 md:w-2/5 mb-4 text-start text-stone-500 font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-0 md:before:top-0 before:-left-3 md:before:-left-6 before:block before:w-2 md:before:w-3 before:h-4 md:before:h-5 before:rounded-sm">
                    Our Products</h2>

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center">

                    <p class="text-lg md:text-2xl font-bold text-stone-900 w-fit">Explore Our Products</p>

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

            <!-- Products -->
            <section>

                <div v-if="paginatedProducts.length > 0" class="flex flex-wrap">
                    <div v-for="(product, index) in paginatedProducts" :key="index"
                        class="bg-base-100 rounded-sm cursor-pointer mb-8 w-full lg:w-1/5 md:w-4/12 sm:w-6/12 gap-3 p-3">
                        <div
                            class="card border rounded-md hover:scale-[1.01] transition-all hover:shadow-lg duration-300">


                            <figure class="bg-stone-50 p-5 relative ">

                                <div class="w-full flex justify-center relative">
                                    <img :src="product[1].image_url" alt="" class="w-1/2 h-[180px]" />

                                    <div class="sideNav z-10" v-if="role == 'customer'">

                                        <div title="Add to Wishlist"
                                            class="bg-white p-1 rounded-full flex items-center justify-center">
                                            <svg @click="addToWishlist(product[0], product[1], $event)"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor"
                                                class="size-4 cursor-pointer hover:fill-[#DB4444] ms-auto hover:text-[#DB4444] block mx-auto">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                        </div>

                                        <div title="Add to Weekly Order"
                                            v-if="subscribed && product[1].availability != 0"
                                            class="bg-white p-1 rounded-full flex items-center justify-center">
                                            <svg svg class="hover:scale-[1.1]"
                                                @click="addToWeeklyOrder(product[0], product[1], $event)" width="20px"
                                                height="20px" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                </g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <g opacity="0.5">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                            d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H21C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM2.25 10C2.25 9.58579 2.58579 9.25 3 9.25H21C21.4142 9.25 21.75 9.58579 21.75 10C21.75 10.4142 21.4142 10.75 21 10.75H3C2.58579 10.75 2.25 10.4142 2.25 10ZM2.25 14C2.25 13.5858 2.58579 13.25 3 13.25H10C10.4142 13.25 10.75 13.5858 10.75 14C10.75 14.4142 10.4142 14.75 10 14.75H3C2.58579 14.75 2.25 14.4142 2.25 14ZM2.25 18C2.25 17.5858 2.58579 17.25 3 17.25H10C10.4142 17.25 10.75 17.5858 10.75 18C10.75 18.4142 10.4142 18.75 10 18.75H3C2.58579 18.75 2.25 18.4142 2.25 18Z"
                                                            fill="#000000"></path>
                                                    </g>
                                                    <path
                                                        d="M14 15.0361C14 16.2709 15.4849 17.5789 16.5203 18.3408C16.9546 18.6603 17.1717 18.8201 17.5 18.8201C17.8283 18.8201 18.0454 18.6603 18.4797 18.3408C19.5151 17.5789 21 16.2709 21 15.0361C21 13.0282 19.0749 12.2786 17.5 13.8296C15.9251 12.2786 14 13.0282 14 15.0361Z"
                                                        fill="#000000"></path>
                                                </g>
                                            </svg>
                                        </div>

                                    </div>

                                </div>

                                <div class="badges absolute top-3 px-3 w-full flex gap-1 justify-between">
                                    <div v-if="product[1].new"
                                        class="badge text-xs badge-secondary rounded-md bg-green-800 text-white py-1">
                                        NEW
                                    </div>
                                    <div v-if="product[1].availability == 0"
                                        class="badge text-xs badge-secondary rounded-md bg-green-800 text-white py-1">
                                        Not
                                        Available In Stock
                                    </div>
                                    <div v-if="product[1].onsale && product[1].availability > 0"
                                        class="badge text-xs badge-secondary rounded-md bg-[#DB4444] text-white py-1">
                                        {{
                                            product[1].onsale }}</div>
                                    <div class="ms-auto flex-col justify-between h-full items-center gap-2">

                                    </div>
                                </div>

                                <router-link v-if="role === 'customer'" :to="`/productdetail/${product[0]}`"
                                    class="absolute top-0 left-0 w-full h-full"></router-link>
                                <!-- <router-link v-else :to="`/signPage`"
                                    class="absolute top-0 left-0 w-full h-full"></router-link> -->

                            </figure>

                            <div class="card-body p-5">

                                <h2 :title="product[1].english_name"
                                    class="card-title text-start text-[18px] font-semibold">{{
                                        product[1].english_name.length > 10 ?
                                            product[1].english_name.slice(0, 10).split().join('') + '...' :
                                            product[1].english_name
                                    }}</h2>

                                <h2 :title="product[1].description" class="card-title text-start text-base">{{
                                    product[1].description.length > 20 ?
                                        product[1].description.slice(0, 20).split().join('') + '...' :
                                        product[1].description
                                }}</h2>

                                <div class="price flex gap-3">
                                    <div class="after text-lg text-red-500 font-bold">
                                        {{ product[1].onsale.split('%').length ==
                                            2 ? product[1].price - (product[1].onsale.split('%')[0] * product[1].price /
                                                100) :
                                            product[1].price
                                        }}<span class="text-xs  font-normal"> L.E</span>
                                    </div>
                                    <div v-if="product[1].onsale && product[1].availability > 0"
                                        class="before text-lg text-stone-400 relative before:content-[''] before:absolute before:bg-[#a8a29e] before:block before:w-0.5 before:h-7 before:rotate-90 before:left-4 before:top-0">
                                        {{ product[1].price }}<span class="text-xs font-normal"> L.E</span>
                                    </div>
                                </div>

                                <div class="rating rating-sm">
                                    <template v-if="product[1].rating > 0">
                                        <input v-for="item in 5" :key="item" type="radio" :name="`rating-${index}`"
                                            :checked="item <= product[1].rating"
                                            class="mask mask-star-2 bg-amber-400 me-1" disabled />
                                    </template>
                                    <template v-else>
                                        <input v-for="item in 5" :key="item" type="radio" :name="`rating-${index}`"
                                            class="mask mask-star-2 bg-gray-300 me-1" disabled />
                                    </template>

                                </div>
                            </div>

                            <div v-if="product[1].availability != 0"
                                class="cart-btn group border z-10 w-full font-bold text-center flex gap-3 justify-center transition-all duration-300">
                                <button v-if="role == 'customer'" @click="addToCart(product[0], product[1])"
                                    :disabled="clickedProducts[product[0]]"
                                    class="flex items-center justify-center gap-2 w-full p-2">
                                    <template v-if="clickedProducts[product[0]]">
                                        <span>Adding to cart ...</span>
                                        <span class="loading loading-spinner w-[30px]"></span>
                                    </template>
                                    <template v-else>
                                        Add To Cart
                                        <svg class="stroke-current text-black group-hover:text-white" width="30px"
                                            height="30px" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
                                                stroke="" stroke-width="1"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                                                    stroke="currentColor" stroke-width="0.84"></path>
                                                <path
                                                    d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                                                    stroke="currentColor" stroke-width="0.84"></path>
                                                <path
                                                    d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                                                    stroke="currentColor" stroke-width="0.84" stroke-linecap="round">
                                                </path>
                                            </g>
                                        </svg>
                                    </template>
                                </button>
                            </div>

                            <div v-if="product[1].availability == 0"
                                class="cart-btn group border w-full font-bold text-center flex gap-3 justify-center transition-all duration-300">
                                <button
                                    class="bg-red-700 text-white opacity-[0.7] w-full p-2 flex items-center justify-center gap-2">
                                    <svg width="27px" height="27px" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg" fill="#ffffff" class="whiteSvg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                        </g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm0 1a9.252 9.252 0 0 1 6.203 2.39L5.59 18.703A9.284 9.284 0 0 1 12.5 3.2zm0 18.6a9.252 9.252 0 0 1-6.203-2.39L19.41 6.297A9.284 9.284 0 0 1 12.5 21.8z">
                                            </path>
                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                        </g>
                                    </svg>
                                    <span class="">Comming Soon..!</span>
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                <div v-else>
                    <div v-if="filterdProducts" class="flex flex-wrap">
                        <div v-for="(product, index) in filterdProducts" :key="index"
                            class="bg-base-100 rounded-sm cursor-pointer mb-8 w-full lg:w-1/5 md:w-4/12 sm:w-6/12 gap-3 p-3">

                            <div
                                class="card border rounded-md hover:scale-[1.01] transition-all hover:shadow-lg duration-300">

                                {{ product[0] }}
                                <router-link :to="`/productdetail/${product[0]}`">


                                    <figure class="bg-stone-50 p-5 relative ">

                                        <div class="w-full flex justify-center relative">
                                            <img :src="product[1].image_url" alt="" class="w-1/2 h-[180px]" />

                                            <div class="sideNav z-10" v-if="role == 'customer'">

                                                <div title="Add to Wishlist"
                                                    class="bg-white p-1 rounded-full flex items-center justify-center">
                                                    <svg @click="addToWishlist(product[0], product[1], $event)"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="size-4 cursor-pointer hover:fill-[#DB4444] ms-auto hover:text-[#DB4444] block mx-auto">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                    </svg>
                                                </div>

                                                <div title="Add to Weekly Order"
                                                    v-if="subscribed && product[1].availability != 0"
                                                    class="bg-white p-1 rounded-full flex items-center justify-center">
                                                    <svg svg class="hover:scale-[1.1]"
                                                        @click="addToWeeklyOrder(product[0], product[1], $event)"
                                                        width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                        </g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            <g opacity="0.5">
                                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                                    d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H21C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM2.25 10C2.25 9.58579 2.58579 9.25 3 9.25H21C21.4142 9.25 21.75 9.58579 21.75 10C21.75 10.4142 21.4142 10.75 21 10.75H3C2.58579 10.75 2.25 10.4142 2.25 10ZM2.25 14C2.25 13.5858 2.58579 13.25 3 13.25H10C10.4142 13.25 10.75 13.5858 10.75 14C10.75 14.4142 10.4142 14.75 10 14.75H3C2.58579 14.75 2.25 14.4142 2.25 14ZM2.25 18C2.25 17.5858 2.58579 17.25 3 17.25H10C10.4142 17.25 10.75 17.5858 10.75 18C10.75 18.4142 10.4142 18.75 10 18.75H3C2.58579 18.75 2.25 18.4142 2.25 18Z"
                                                                    fill="#000000"></path>
                                                            </g>
                                                            <path
                                                                d="M14 15.0361C14 16.2709 15.4849 17.5789 16.5203 18.3408C16.9546 18.6603 17.1717 18.8201 17.5 18.8201C17.8283 18.8201 18.0454 18.6603 18.4797 18.3408C19.5151 17.5789 21 16.2709 21 15.0361C21 13.0282 19.0749 12.2786 17.5 13.8296C15.9251 12.2786 14 13.0282 14 15.0361Z"
                                                                fill="#000000"></path>
                                                        </g>
                                                    </svg>
                                                </div>

                                            </div>

                                        </div>

                                        <div class="badges absolute top-3 px-3 w-full flex gap-1 justify-between">
                                            <div v-if="product[1].new"
                                                class="badge text-xs badge-secondary rounded-md bg-green-800 text-white py-1">
                                                NEW
                                            </div>
                                            <div v-if="product[1].availability == 0"
                                                class="badge text-xs badge-secondary rounded-md bg-green-800 text-white py-1">
                                                Not
                                                Available In Stock
                                            </div>
                                            <div v-if="product[1].onsale && product[1].availability > 0"
                                                class="badge text-xs badge-secondary rounded-md bg-[#DB4444] text-white py-1">
                                                {{
                                                    product[1].onsale }}</div>
                                            <div class="ms-auto flex-col justify-between h-full items-center gap-2">

                                            </div>
                                        </div>

                                        <router-link v-if="role === 'customer'" :to="`/productdetail/${product[0]}`"
                                            class="absolute top-0 left-0 w-full h-full"></router-link>
                                        <router-link v-else :to="`/signPage`"
                                            class="absolute top-0 left-0 w-full h-full"></router-link>

                                    </figure>

                                    <div class="card-body p-5">

                                        <h2 :title="product[1].english_name"
                                            class="card-title text-start text-[18px] font-semibold">
                                            {{ product[1].english_name.length > 15 ?
                                                product[1].english_name.slice(0, 15).split().join('') + '...' :
                                                product[1].english_name
                                            }}
                                        </h2>

                                        <h2 :title="product[1].description" class="card-title text-start text-sm">
                                            {{ product[1].description.length > 25 ?
                                                product[1].description.slice(0, 25).split().join('') + '...' :
                                                product[1].description
                                            }}
                                        </h2>

                                        <div class="price flex gap-3">
                                            <div class="after text-lg text-red-500 font-bold">
                                                {{ product[1].onsale.split('%').length == 2 ?
                                                    product[1].price - (product[1].onsale.split('%')[0] * product[1].price /
                                                        100) :
                                                    product[1].price
                                                }}<span class="text-xs font-normal"> L.E</span>
                                            </div>
                                            <div v-if="product[1].onsale && product[1].availability > 0"
                                                class="before text-lg text-stone-400 relative before:content-[''] before:absolute before:bg-[#a8a29e] before:block before:w-0.5 before:h-7 before:rotate-90 before:left-4 before:top-0">
                                                {{ product[1].price }}<span class="text-xs font-normal"> L.E</span>
                                            </div>
                                        </div>

                                        <!-- عرض متوسط التقييم أو رسالة "لا يوجد تقييم بعد" -->
                                        <div class="rating rating-sm">
                                            <template v-if="product[1].rating > 0">
                                                <input v-for="item in 5" :key="item" type="radio"
                                                    :name="`rating-${index}`" :checked="item <= product[1].rating"
                                                    class="mask mask-star-2 bg-amber-400 me-1" disabled />
                                            </template>
                                            <template v-else>
                                                <input v-for="item in 5" :key="item" type="radio"
                                                    :name="`rating-${index}`" class="mask mask-star-2 bg-gray-300 me-1"
                                                    disabled />
                                            </template>

                                        </div>
                                    </div>



                                </router-link>


                                <div v-if="product[1].availability != 0"
                                    class="cart-btn group border z-10 w-full font-bold text-center flex gap-3 justify-center transition-all duration-300">
                                    <button v-if="role == 'customer'" @click="addToCart(product[0], product[1])"
                                        :disabled="clickedProducts[product[0]]"
                                        class="flex items-center justify-center gap-2 w-full p-2">
                                        <template v-if="clickedProducts[product[0]]">
                                            <span>Adding to cart ...</span>
                                            <span class="loading loading-spinner w-[30px]"></span>
                                        </template>
                                        <template v-else>
                                            Add To Cart
                                            <svg class="stroke-current text-black group-hover:text-white" width="30px"
                                                height="30px" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                transform="matrix(-1, 0, 0, 1, 0, 0)">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke="" stroke-width="1"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path
                                                        d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                                                        stroke="currentColor" stroke-width="0.84"></path>
                                                    <path
                                                        d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                                                        stroke="currentColor" stroke-width="0.84"></path>
                                                    <path
                                                        d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                                                        stroke="currentColor" stroke-width="0.84"
                                                        stroke-linecap="round">
                                                    </path>
                                                </g>
                                            </svg>
                                        </template>
                                    </button>
                                </div>

                                <div v-if="product[1].availability == 0"
                                    class="cart-btn group border w-full font-bold text-center flex gap-3 justify-center transition-all duration-300">
                                    <button
                                        class="bg-red-700 text-white opacity-[0.7] w-full p-2 flex items-center justify-center gap-2">
                                        <svg width="27px" height="27px" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg" fill="#ffffff" class="whiteSvg">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                stroke-linejoin="round">
                                            </g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm0 1a9.252 9.252 0 0 1 6.203 2.39L5.59 18.703A9.284 9.284 0 0 1 12.5 3.2zm0 18.6a9.252 9.252 0 0 1-6.203-2.39L19.41 6.297A9.284 9.284 0 0 1 12.5 21.8z">
                                                </path>
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                            </g>
                                        </svg>
                                        <span class="">Comming Soon..!</span>
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <!-- Skeleton -->
                <div v-if="products == null" class="flex flex-wrap">
                    <div v-for="item in 8" :key="item"
                        class="flex w-full lg:w-3/12 md:w-4/12 sm:w-6/12 flex-col gap-4 p-2">
                        <div class="skeleton h-32 w-full"></div>
                        <div class="skeleton h-4 w-28"></div>
                        <div class="skeleton h-4 w-full"></div>
                        <div class="skeleton h-4 w-full"></div>
                    </div>
                </div>

            </section>

            <!-- Pagination -->

            <div class="join">
                <button class="join-item btn" @click="previousPage" :disabled="currentPage === 1">«</button>

                <button class="join-item btn" :disabled="true">
                    Page {{ currentPage }} of {{ totalPages }}
                </button>

                <button class="join-item btn" @click="nextPage" :disabled="currentPage === totalPages">»</button>
            </div>

        </div>

    </div>

</template>

<script>
import service from '@/mixins/service';
import Swal from 'sweetalert2';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            categories: null,
            products: [],
            searchQueryProducts: '',
            searchQueryCategories: '',
            user: null,
            subscribed: null,
            clickedProducts: {},

            filterdProducts: [],
            currentPage: 1,
            itemsPerPage: 10,


            role: localStorage.getItem('role'),
            plan: ''

        }
    },
    computed: {
        ...mapState(['loggedUserId', 'loggedUserData']),
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage; // البداية
            const end = start + this.itemsPerPage; // النهاية
            return this.products.slice(start, end); // تقطيع المصفوفة
        },
        totalPages() {
            return Math.ceil(this.products.length / this.itemsPerPage);
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
                // this.products = await service.methods.getAllProducts(this.searchQueryProducts, '', true)
                this.products = await service.methods.getAllProducts('', '', true)
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        async addToCart(productId, product) {
            this.clickedProducts[productId] = true

            let flag = null
            try {
                flag = await service.methods.getSpeificProduct(this.loggedUserId, productId, 'cart')
                if (flag) {
                    try {
                        await service.methods.patchQuantity(this.loggedUserId, productId, 'cart', '+')
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                else {
                    try {
                        await service.methods.addTo_cart_wishlist_weekly(this.loggedUserId, productId, {
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
            finally {
                Swal.fire({
                    html: `<div class="flex items-center gap-2">
                                <svg class="text-green-800" fill="#ffffff"  width="25px" height="25px" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#166534">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                <title></title>
                                    <path
                                        d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z">
                                    </path>
                                    </g>
                                    </svg>
                                    <p>Product successfully added to your shopping cart.</p>
                                      </div>`
                    ,
                    position: "top",
                    // icon: "success",
                    // title: "Product successfully added to your shopping cart",
                    showConfirmButton: false,
                    background: '#166534',
                    timer: 1500,
                    width: 'auto', // Keeps the width flexible
                    padding: '0.5rem', // Slight padding for a slim look
                    color: '#fff', // White text color
                    showClass: {
                        popup: `
                                animate__animated
                                animate__fadeInDown
                                animate__faster
    `
                    },
                    hideClass: {
                        popup: `
                            animate__animated
                            animate__fadeOutUp
                            animate__faster
    `
                    },
                    willOpen: () => {
                        document.body.style.pointerEvents = 'none'; // Disable clicks
                    },
                    willClose: () => {
                        document.body.style.pointerEvents = 'auto'; // Re-enable clicks
                    }
                });
                this.clickedProducts[productId] = false
                delete this.clickedProducts[productId]
            }
        }
        ,
        async addToWishlist(productId, product) {
            try {
                await service.methods.addTo_cart_wishlist_weekly(this.loggedUserId, productId, product, 'wishlist')
            }
            catch (err) {
                console.log(err);
            }
            finally {
                Swal.fire({
                    html: `<div class="flex items-center gap-2">
                                <svg class="text-green-800" fill="#ffffff"  width="25px" height="25px" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#166534">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                <title></title>
                                    <path
                                        d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z">
                                    </path>
                                    </g>
                                    </svg>
                                    <p>Product successfully added to your Wishlist.</p>
                                      </div>`
                    ,
                    position: "top",
                    showConfirmButton: false,
                    background: '#166534',
                    timer: 1500,
                    width: 'auto', // Keeps the width flexible
                    padding: '0.5rem', // Slight padding for a slim look
                    color: '#fff', // White text color
                    showClass: {
                        popup: `
                                animate__animated
                                animate__fadeInDown
                                animate__faster
    `
                    },
                    hideClass: {
                        popup: `
                            animate__animated
                            animate__fadeOutUp
                            animate__faster
    `
                    }
                });
            }
        }
        ,
        async addToWeeklyOrder(productId, product) {
            let flag = null
            try {
                flag = await service.methods.getSpeificProduct(this.loggedUserId, productId, 'weeklyorders')
                if (flag) {
                    try {
                        await service.methods.patchQuantity(this.loggedUserId, productId, 'weeklyorders', '+')
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                else {
                    try {
                        await service.methods.addTo_cart_wishlist_weekly(this.loggedUserId, productId, {
                            ...product,
                            addedAt: new Date(),
                            quantity: 1
                        }, 'weeklyorders')
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                service.methods.updateWeeklyOrderStatus(this.loggedUserId, { orderStatus: 'Pending' })
            }
            catch (err) {
                console.log(err);
            }
            finally {
                Swal.fire({
                    html: `<div class="flex items-center gap-2">
                                <svg class="text-green-800" fill="#ffffff"  width="25px" height="25px" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#166534">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                <title></title>
                                    <path
                                        d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z">
                                    </path>
                                    </g>
                                    </svg>
                                    <p>Product successfully added to your Weekly Order List.</p>
                                      </div>`
                    ,
                    position: "top",
                    showConfirmButton: false,
                    background: '#166534',
                    timer: 1500,
                    width: 'auto', // Keeps the width flexible
                    padding: '0.5rem', // Slight padding for a slim look
                    color: '#fff', // White text color
                    showClass: {
                        popup: `
                                animate__animated
                                animate__fadeInDown
                                animate__faster
    `
                    },
                    hideClass: {
                        popup: `
                            animate__animated
                            animate__fadeOutUp
                            animate__faster
    `
                    }
                });
            }
        }
        ,
        async isUserSubscribed() {
            this.subscribed = this.loggedUserData.planid
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        }

    }
    ,
    async mounted() {
        this.isUserSubscribed()
        this.getCategories()
        this.getAllProducts()
        const scrollBtn = this.$refs.scrollBtn;
        if (scrollBtn) {
            window.onscroll = () => {
                if (window.scrollY >= 1500) {
                    scrollBtn.style.right = "30px";
                } else {
                    scrollBtn.style.right = "-100px";
                }
            };

            scrollBtn.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            });
        }
    }
    ,
    watch: {
        searchQueryProducts: function () {
            this.filterdProducts = this.products.filter(item => item[1].english_name.toLowerCase().includes(this.searchQueryProducts.toLocaleLowerCase()))
            console.log(this.filterdProducts);
            this.currentPage = 0;
        },
        searchQueryCategories: function () {
            this.getCategories()
        },
    }
}
</script>

<style scoped>
.scroll-btn {
    right: 30px;
}

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
    color: white !important;
    background-color: #252525;
}

.card:hover .stroke-current {
    color: white !important;
}

.card:hover .whiteSvg {
    fill: white;
}

.card:hover .sideNav {
    left: 93%;
}

.sideNav {
    padding: 0px 3px 0px;
    transition: all 0.3s;
    position: absolute;
    left: 107%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 5px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
}

.join {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.join-item {
    padding: 10px 15px;
    margin: 0 5px;
    border: none;
    background-color: #0e7037;
    /* يمكنك تغيير اللون حسب رغبتك */
    color: white;
    cursor: pointer;
    border-radius: 15px;
    transition: background-color 0.3s;
}

.join-item:hover:not(:disabled) {
    background-color: #073008;
    /* ظل عند التحويم */
}

.btn-active {
    background-color: #137717;
    /* لون الزر النشط */
}
</style>