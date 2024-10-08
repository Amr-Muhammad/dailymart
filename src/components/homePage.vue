<template>
    <div class="relative -mt-[136px]">

        <button ref="scrollBtn"
            class="scroll-btn fixed bottom-[30px] z-[9999] transition-[right] duration-[1.5s] rounded-full ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 border border-black rounded-full p-[3px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>

        </button>

        <section class="hero mb-16 h-screen">

            <div class="hero-sec bg-cover bg-center w-full h-full ">

                <div class="w-full h-full bg-[#0000008c] py-10 text-center flex flex-col justify-center items-center">

                    <h1 class="font-black mb-10 text-6xl lg:text-9xl text-white">DailyMart
                        <span
                            class="block mt-1 md:mt-3 lg:mt-6 leading-none text-white text-[12px] lg:text-[18px] uppercase">
                            Online Grocery & Snacks Marketplace</span>
                    </h1>

                    <p class="w-9/12 lg:w-6/12 mx-auto text-base lg:text-xl font-bold text-slate-100">We're here to help
                        you easily find
                        unboycotted products.
                        Make it simple and convenient to support the brands you believe in.</p>


                    <button @click="$router.push('/CategroyPage')"
                        class="hero-btn btn lg:h-[60px] bg-[#DB4444] border-[#DB4444] px-24 md:px-32 mt-10 transition-all font-bold lg:text-3xl text-white hover:bg-[#084c3a] hover:border-[#084c3a] animate__animated animate__zoomIn">
                        Discover
                    </button>

                </div>

            </div>

        </section>

        <section class="sale mx-auto bg-white p-10 lg:p-16 mb-16 text-center">

            <div class="head">
                <h2>Exclusive Deals Await You</h2>
                <p>Explore our range of exclusive deals on unboycotted products that are chosen to give you the best
                    value and experience.</p>
            </div>

            <div class="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14">

                <div v-for="(prd, index) in sortedPrdsOnSale" :key="prd[0]"
                    class="card bg-base-100 transition-all shadow-md hover:shadow-2xl relative">


                    <div v-if="prd[0]" class="z-10">

                        <!-- <button title="Add To Wishlist" v-if="prd[1]" -->
                        <button title="Add To Wishlist" v-if="role == 'customer'"
                            class="text-red-500 hover:text-red-600 text-3xl absolute right-[25px] top-[25px]">
                            <svg @click="addToWishlist(prd[0], prd[1])" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="size-6 cursor-pointer hover:fill-[#DB4444] transition-all duration-1000 ms-auto block mx-auto hover:scale-[1.1]">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>

                        <!-- <button title="Add to Weekly Order" v-if="prd[1]" -->
                        <button title="Add to Weekly Order" v-if="role == 'customer' && plan"
                            class="bg-white p-1 rounded-full flex items-center justify-center absolute left-[25px] top-[25px]">
                            <svg svg class="hover:scale-[1.1]" @click="addToWeeklyOrder(prd[0], prd[1], $event)"
                                width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
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
                        </button>

                    </div>

                    <figure class="pt-3 relative">
                        <router-link v-if="role === 'customer'" :to="`/productdetail/${prd[0]}`"
                            class="absolute top-0 left-0 w-full h-full"></router-link>
                        <!-- <router-link v-else :to="`/signPage`" class="absolute top-0 left-0 w-full h-full"></router-link> -->
                        <img :src="prd[1].image_url" alt="dailymart" class="w-1/2" />
                    </figure>

                    <div class="card-body items-center text-center py-3">

                        <h2 class="card-title text-lg">{{ prd[1].english_name }}</h2>

                        <p class="text-base text-stone-600 ">{{ prd[1].description }}</p>

                        <div class="rating rating-md relative">

                            <input v-for="star in 5" :key="star" type="radio" name="rating-{{ index }}"
                                :class="{ 'bg-orange-400': star <= allRates[index], 'bg-gray-300': star > allRates[index] }"
                                class="mask mask-star-2" disabled />

                        </div>

                        <div class="price relative mb-3">

                            <div class="after text-2xl font-bold">

                                {{ prd[1].onsale.split('%')[0].length ==
                                    2 ? prd[1].price - (prd[1].onsale.split('%')[0] * prd[1].price / 100) :
                                    prd[1].price
                                }}

                                <span class="text-xs font-normal">L.E</span>

                            </div>

                            <div
                                class="before text-md absolute top-2 -left-10 before:content-[''] before:absolute before:bg-[#DB4444] before:block before:w-0.5 before:h-7 before:rotate-90 before:left-4 before:top-0">

                                {{ prd[1].price }}

                                <span class="text-xs font-normal">L.E</span>

                            </div>

                        </div>

                    </div>

                    <div v-if="prd[1]" :class="{ 'border-t-2 z-5 border-t-[#2525257c]': role == 'customer' }"
                        class="cart-btn z-10 group w-full font-bold text-center flex gap-3 justify-center transition-all duration-300">

                        <button v-if="role == 'customer'" @click="addToCart(prd[0], prd[1])"
                            :disabled="clickedProducts[prd[0]]"
                            class="flex items-center justify-center gap-2 w-full p-2">
                            <template v-if="clickedProducts[prd[0]]">
                                <span>Adding to cart ...</span>
                                <span class="loading loading-spinner w-[30px]"></span>
                            </template>
                            <template v-else>
                                Add To Cart
                                <svg class="stroke-current text-black group-hover:text-white" width="30px" height="30px"
                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    transform="matrix(-1, 0, 0, 1, 0, 0)">
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

                </div>

            </div>

            <!-- Skeleton -->
            <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14 p-2"
                v-if="sortedPrdsOnSale == null">
                <div v-for="item in 4" :key="item" class=" p-2">
                    <div class="skeleton h-32 w-full"></div>
                </div>
            </section>

            <button v-if="role == 'customer'" @click="$router.push('/offersPage')"
                class="btn px-24 md:px-30 lg:text-xl transition-all font-bold text-white border-0 bg-[#DB4444] hover:bg-[#0A1E1E] hover:border-[#0A1E1E] animate__animated animate__pulse animate__infinite	infinite">
                Find more
            </button>

        </section>

        <section class="recommended bg-slate-50 py-16 text-center">

            <div class="head">
                <h2 class="text-2xl">Recommend for You</h2>
                <p>We’ve selected them based on quality and value to enhance your experience.</p>
            </div>

            <Carousel :itemsToShow="5.5" :wrapAround="true" :transition="1500" :autoplay="1000" :snap-align="'center'"
                :pause-autoplay-on-hover="true" :breakpoints="prdsBreakpoints" class="prds ">

                <Slide v-for="prd in recommendPrd" :key="prd[0]" class="md:mx-0 sm:mb-3 lg:mb-0 h-[400px]">

                    <div
                        class="flex justify-between items-center flex-col rounded-lg shadow-md  overflow-hidden w-52 h-52 text-center relative">

                        <router-link v-if="role === 'customer'" :to="`/productdetail/${prd[0]}`"
                            class="absolute w-full h-full"></router-link>
                        <!-- <router-link v-else :to="`/signPage`" class="absolute w-full h-full"></router-link> -->


                        <button title="Add To Wishlist" v-if="role === 'customer'"
                            class="text-red-500 hover:text-red-600 text-3xl z-10 absolute top-[15px] right-[15px]">
                            <svg @click="addToWishlist(prd[0], prd[1])" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="size-5 cursor-pointer hover:fill-[#DB4444] transition-all duration-1000 ms-auto block">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>

                        <img :src="prd[1].image_url" class="w-1/2 h-[160px] my-auto">

                        <span
                            class="prd-action bg-[#0a1e1e] p-1 text-sm md:text-lg w-full shadow-md text-white font-semibold">
                            {{ prd[1].english_name.length > 8 ? prd[1].english_name.slice(0, 11) + '...' :
                                prd[1].english_name
                            }}
                        </span>

                    </div>

                </Slide>

                <template #addons>
                    <Navigation />
                </template>

            </Carousel>

        </section>

        <section class="to-charts">

            <div
                class="hero min-h-screen relative before before:absolute before:bg-[#0a0a0acc] before:blur-sm before:w-full before:h-full before:top-0 before:left-0">

                <div class="hero-content text-neutral-content text-center">

                    <div class="">
                        <p class="mb-10 text-white md:text-4xl">
                            Help in the fight for Palestinian freedom and dignity by making conscious choices that
                            support
                            justice and equality.
                        </p>
                        <button @click="$router.push('/ImpactHeading')"
                            class="btn bg-[#DAFFDA] hover:bg-[#DB4444] text-stone-800 hover:text-white btn-primary px-20 border-0 transition-all md:text-lg font-semibold">
                            See Your Impact </button>
                    </div>

                </div>

            </div>

        </section>

        <section class="boycotted bg-slate-50 py-16 mb-16 text-center">

            <div class="head">
                <h2>Boycotted Products</h2>
                <p>Products we don't sell due to their boycott status. We prioritize offering alternatives that align
                    with our
                    values and commitment.</p>
            </div>

            <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="1500" :autoplay="1000" :snap-align="'center'"
                :pause-autoplay-on-hover="true" :breakpoints="breakpoints" class="boycotted-prds">

                <Slide v-for="item in items" :key="item">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="sm:size-30 lg:size-28 absolute z-10 stroke-red-600">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>

                    <img :src="item.src" :alt="item.alt" class="rounded-full w-32 mx-5" />

                </Slide>

                <template #addons>
                    <Navigation />
                </template>

            </Carousel>

            <button @click="$router.push('/BoycottWrapper')"
                class="btn px-10 mt-10 transition-all font-bold text-white border-0 bg-[#DB4444] hover:bg-[#0A1E1E] hover:border-[#0A1E1E]">
                See more </button>

        </section>

        <section class="new-arrivals mx-auto bg-white p-10 lg:p-16 mb-16">

            <div class="head">
                <h2>New Arrivals</h2>
                <p>Discover the latest additions to our Products.</p>
            </div>

            <div v-if="newPrds && newPrds.length" class="new-prds grid sm:grid-cols-1 lg:grid-cols-3 gap-5">

                <div v-for="(prd, index) in newPrds" :key="prd[0]" class="relative">

                    <div
                        class="card card-side face front relative bg-[#daffda47] transition-all shadow-md hover:shadow-2xl flex flex-col md:flex-row">

                        <div
                            class="badge text-xs badge-secondary rounded-md bg-green-800 text-white py-1 absolute top-[15px] left-[15px]">
                            NEW
                        </div>

                        <figure class="w-full h-1/2 md:h-full md:w-1/2 bg-white">
                            <img :src="prd[1].image_url" alt="New Product" class="w-[30%] lg:w-9/12" />
                        </figure>

                        <div class="card-body  w-full md:w-1/2 p-3 justify-center">

                            <h2 class="card-title text-sm mx-auto">
                                {{ prd[1].english_name.length > 8 ? prd[1].english_name.slice(0, 11) + '...' :
                                    prd[1].english_name }}
                            </h2>

                            <div class="rating rating-sm relative mx-auto">

                                <input v-for="star in 5" :key="star" type="radio" :name="'rating-' + index"
                                    :class="{ 'bg-orange-400': star <= newPrdsRates[index], 'bg-gray-300': star > newPrdsRates[index] }"
                                    class="mask mask-star-2 " disabled />

                            </div>

                            <div class="price relative flex flex-col text-center items-center gap-3">

                                <div class="relative">
                                    <div v-if="prd[1].onsale" class="after text-xl font-bold">

                                        {{ prd[1].onsale.split('%').length ==
                                            2 ? prd[1].price - (prd[1].onsale.split('%')[0] * prd[1].price /
                                                100) :
                                            prd[1].price
                                        }}

                                        <span class="text-xs font-normal">L.E</span>

                                    </div>

                                    <div :class="{
                                        'before absolute md:relative bottom-0 left-[30px] md:left-0 w-[100px] text-xs md:text-sm before:absolute before:bg-[#DB4444] before:block before:w-0.5 before:h-8 before:rotate-90 before:left-[3rem] before:top-[-7px] md:before:top-[-5px]': prd[1].onsale
                                    }" class="text-lg font-bold">

                                        {{ prd[1].price }}

                                        <span class="text-xs font-normal">L.E</span>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div class="card card-side face back bg-[#daffda47] transition-all shadow-md hover:shadow-2xl">

                        <div class="card-actions flex flex-col items-center justify-center mx-auto">

                            <button v-if="role == 'customer'"
                                :disabled="buttonDisabledState[prd[0]] || prd[1].availability <= 0"
                                @click="addToCart(prd[0], prd[1])" :class="{
                                    'bg-gray-500 hover:bg-gray-500 cursor-not-allowed': buttonDisabledState[prd[0]] || prd[1].availability <= 0,
                                    'bg-[#166534] hover:bg-[#0A1E1E] cursor-pointer': !buttonDisabledState[prd[0]] && prd[1].availability > 0
                                }" class="text-white px-4 py-2 text-base rounded w-full">

                                <span v-if="prd[1].availability > 1 && !buttonDisabledState[prd[0]]">Add to Cart</span>

                                <span v-else-if="prd[1].availability > 0 && buttonDisabledState[prd[0]]"
                                    class="text-white">Added to Cart</span>

                                <span v-else class="text-white">Out of Stock</span>

                            </button>

                            <button v-if="role == 'customer'" @click="$router.push(`/productdetail/${prd[0]}`)"
                                class="btn bg-[#DB4444] hover:bg-[#0A1E1E] w-[200px] cursor-pointer text-base text-white border-0 rounded px-4 ">
                                See more
                            </button>
                            <button v-else @click="$router.push(`/CategroyPage`)"
                                class="btn bg-[#DB4444] hover:bg-[#0A1E1E] w-[200px] cursor-pointer text-base text-white border-0 rounded px-4 ">
                                See more
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <section class="grid sm:grid-cols-1 lg:grid-cols-3 gap-5 p-2" v-if="newPrds == null">
                <div v-for="item in 3" :key="item" class=" p-2">
                    <div class="skeleton h-32 w-full"></div>
                </div>
            </section>

        </section>

    </div>
</template>

<script>

import { onMounted, defineComponent } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import axios from 'axios';
import service from '@/mixins/service';
import 'animate.css';
import Swal from 'sweetalert2';
import { mapState } from 'vuex';

export default defineComponent({
    name: 'HomePage',
    components: { Carousel, Slide, Navigation },

    setup() {
        let handler = null;

        onMounted(() => {
            setInterval(() => {
                const productBox = document.querySelectorAll('[class*="--prev"], [class*="--active"], [class*="--next"]');

                if (handler) {
                    productBox.forEach((prd) => {
                        prd.removeEventListener("click", handler);
                    })
                }

                handler = function (event) {
                    const prd = event.currentTarget;
                    prd.classList.toggle("flip");
                    if (prd.classList.contains("flip")) {
                        setTimeout(() => {
                            prd.classList.remove("flip");
                        }, 4000);
                    }
                };

                productBox.forEach((prd) => {
                    prd.addEventListener("click", handler);
                });
            }, 1000);
        });

        return {}
    },

    data() {
        return {
            sortedPrdsOnSale: [],
            commentD: null,
            prdRate: null,
            allRates: [],
            newPrdsRates: [],
            recommendPrd: null,
            newPrds: null,
            isButtonDisabled: false,
            buttonDisabledState: {},
            prdsBreakpoints: {
                0: {
                    itemsToShow: 1.95,
                },
                700: {
                    itemsToShow: 2.95,
                },
                1100: {
                    itemsToShow: 4.95,
                },
            },
            items: [
                { id: 1, src: require('../assets/boycotted (1).jpg') },
                { id: 2, src: require('../assets/boycotted (1).png') },
                { id: 3, src: require('../assets/boycotted (2).jpg') },
                { id: 4, src: require('../assets/boycotted (2).png') },
                { id: 5, src: require('../assets/boycotted (5).png') },
                { id: 6, src: require('../assets/boycotted (4).png') },
            ],
            breakpoints: {
                0: {
                    itemsToShow: 1.95,
                },
                700: {
                    itemsToShow: 3.95,
                },
                1100: {
                    itemsToShow: 4.95,
                },
            },
            clickedProducts: {},
            role: localStorage.getItem('role'),
            plan: ''
        }
    },

    methods: {
        async getPrdsOnSale() {
            try {
                const response = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/products.json`)).data;
                this.prdsOnSale = Object.entries(response).filter(item => item[1].onsale && item[1].boycott == false);
                const sortedPrdsOnSale = this.prdsOnSale.sort((a, b) => {

                    const onsaleA = parseFloat(a[1].onsale.replace('%', ''));
                    const onsaleB = parseFloat(b[1].onsale.replace('%', ''));

                    return onsaleB - onsaleA;
                })
                this.sortedPrdsOnSale = [...sortedPrdsOnSale];
                this.sortedPrdsOnSale.length = 4;

                for (let i = 0; i < this.sortedPrdsOnSale.length; i++) {
                    this.getProductRate(this.sortedPrdsOnSale[i][0])
                }
                // console.log(this.sortedPrdsOnSale);
                //   console.log(this.prdsOnSale)
            } catch (err) {
                console.log(`Cannot Fetch Data`)
            }
        },

        async getProductRate(productId) {
            try {
                const response = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/comments.json')).data;

                this.commentD = Object.entries(response).filter(item => item[1].productId === productId);

                if (this.commentD.length > 0) {
                    const totalRatings = this.commentD.reduce((sum, item) => {
                        return sum + parseFloat(item[1].rating);
                    }, 0);

                    const averageRating = totalRatings / this.commentD.length;

                    this.prdRate = averageRating;
                } else {
                    this.prdRate = 0;
                }

                this.allRates.push(Math.round(this.prdRate));

                // console.log(this.allRates)
                // console.log(this.prdRate)

            } catch (err) {
                console.log('Error:', err);
                this.prdRate = 0;
                this.allRates.push(this.prdRate);
                // console.log(this.prdRate)
            }
        },

        async getRecommendPrds() {
            try {

                const response = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/products.json`)).data;
                this.recommendPrd = Object.entries(response).filter(item => item[1].favorite == true && item[1].boycott == false);

                // console.log(this.recommendPrd)

            } catch (err) {
                console.log(`Cannot Fetch Data`, err)
            }
        },

        async getNewPrds() {
            try {

                const response = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/products.json`)).data;
                this.newPrds = Object.entries(response).filter(item => item[1].new == true && item[1].boycott == false);

                this.newPrds.length = 3;

                for (let i = 0; i < this.newPrds.length; i++) {
                    await this.getProductRate(this.newPrds[i][0])
                    // console.log(this.newPrds[i][0])
                }

                this.newPrdsRates = this.allRates.slice(4, 7);
                // console.log(this.newPrds)
                // console.log(this.newPrds)

            } catch (err) {
                console.log(`Cannot Fetch Data`, err)
            }
        },

        async addToCart(productId, product) {
            this.clickedProducts[productId] = true
            console.log('d5l');

            let flag = null
            try {
                flag = await service.methods.getSpeificProduct(this.loggedUserId, productId, 'cart')
                console.log(flag);

                if (flag) {
                    try {
                        await service.methods.patchQuantity(this.loggedUserId, productId, 'cart', '+')
                    }
                    catch (err) {
                        console.log(err);
                    }

                }
                else {
                    console.log('msh mwgod');

                    try {
                        console.log(await service.methods.addTo_cart_wishlist_weekly(this.loggedUserId, productId, {
                            ...product,
                            quantity: 1
                        }, 'cart'));

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
                    html: `
                                <div class="flex items-center gap-2">
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
                                        </div>
                        `
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
        },

        async addToWishlist(productId, product) {
            try {
                await service.methods.addTo_cart_wishlist_weekly(this.loggedUserId, productId, product, 'wishlist')
            }
            catch (err) {
                console.log(err);
            } finally {
                Swal.fire({
                    html: `
                                <div class="flex items-center gap-2">
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
                                      </div>
                `
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
                    }
                });
            }
        },

        async addToWeeklyOrder(productId, product, event) {
            event.target.style.cursor = 'wait'
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
            }
            catch (err) {
                console.log(err);
            }
            finally {
                Swal.fire({
                    html: `
                                <div class="flex items-center gap-2">
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
                                        </div>
                `
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
                    }
                });
                event.target.style.cursor = 'pointer'
            }
        }

    },

    async mounted() {
        try {
            await this.getPrdsOnSale();
            await this.getRecommendPrds();
            await this.getNewPrds();

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
            if (this.loggedUserData) {
                this.plan = this.loggedUserData.planid
                console.log(this.loggedUserData);
                console.log(this.plan);


            }
        } catch (err) {
            console.log('Error loading products')
        }

    },
    computed: {
        ...mapState(['loggedUserId', 'loggedUserData'])
    }

})

</script>

<style scoped>
.scroll-btn {
    right: 30px;
}

.hero-sec {
    background-image: url('../assets/heroHomePg.jpg')
}

.sale .card:hover .cart-btn {
    color: white !important;
    background-color: #252525;
}

.sale .card:hover .stroke-current {
    color: white !important;
}

.sale .card:hover .whiteSvg {
    fill: white;
}

.to-charts .hero {
    background-image: url('../assets/boycottinghomepage.jpg')
}

.new-prds>div {
    height: 200px;
    transition: transform .5s;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;
    flex: 1 0 200px;
    margin: 0 10px 20px;
}

.new-prds>div:hover {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

.new-prds>div .face {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    backface-visibility: hidden;
}

.new-prds>div div.back {
    transform: rotateY(180deg);
}

.recommended .carousel__track {
    height: 400px;
}

/* Carousel */

.carousel__slide {
    padding: 20px;
}

.carousel__slide--sliding {
    transition: 0.5s;
}

.carousel__slide {
    opacity: 0.5;
    transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--prev {
    opacity: 1;
    cursor: pointer;
    transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
    cursor: pointer;
    opacity: 1;
    transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
    cursor: pointer;
    opacity: 1;
    transform: rotateY(0) scale(1);
}
</style>