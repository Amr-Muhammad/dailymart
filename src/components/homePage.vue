<template>
    <div class="relative ">

        <section class="hero-sec mb-16 bg-cover h-screen">
            <div class=" text-white bg-[#00000080] w-full h-full  p-8 flex flex-col justify-center items-center">
                <h1 class="font-black mb-5 md:text-3xl">Find what you're looking for ?</h1>
                <p class="w-full lg:w-6/12 text-xs md:text-lg text-center">We're here to help you easily find
                    unboycotted products.
                    Make it simple and convenient to support the brands you believe in.</p>
                <button
                    class="hero-btn btn w-fit bg-[#DB4444] border-[#DB4444] px-16 mt-10 transition-all font-bold md:text-xl text-white hover:bg-[#0A1E1E] hover:border-[#0A1E1E]">Discover</button>
            </div>
        </section>

        <section class="sale-sec bg-white p-5 mb-16 text-center">

            <div class="head">
                <h2>Exclusive Deals Await You</h2>
                <p>Explore our range of exclusive deals on unboycotted products that are chosen to give you the best
                    value and experience.</p>
            </div>

            <div class="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                <div v-for="prd in salePrds" :key="prd"
                    class="card bg-base-100 transition-all shadow-md hover:shadow-2xl">
                    <figure class="p-0">
                        <img :src="prd.src" alt="dailymart" class="max-w-full" />
                    </figure>
                    <div class="card-body items-center text-center py-3">
                        <h2 class="card-title text-md">{{ prd.title }}</h2>
                        <p class="text-xs text-stone-500 ">{{ prd.desc }}</p>
                        <div class="rating rating-md">
                            <input type="radio" name="rating-7" class="mask mask-star-2 bg-amber-400 me-1" />
                            <input type="radio" name="rating-7" class="mask mask-star-2 bg-amber-400 me-1" />
                            <input type="radio" name="rating-7" class="mask mask-star-2 bg-amber-400 me-1"
                                checked="checked" />
                            <input type="radio" name="rating-7" class="mask mask-star-2 bg-amber-400 me-1" />
                            <input type="radio" name="rating-7" class="mask mask-star-2 bg-amber-400" />
                        </div>
                        <div class="price relative mb-3">
                            <div class="after text-2xl font-bold">
                                {{ prd.price }}<span class="text-xs font-normal">L.E</span>
                            </div>
                            <div
                                class="before text-md absolute top-2 -left-10 before:content-[''] before:absolute before:bg-[#DB4444] before:block before:w-0.5 before:h-7 before:rotate-90 before:left-4 before:top-0">
                                {{ prd.afterSale }}<span class="text-xs font-normal">L.E</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="gotoOffers()"
                class="btn px-10 transition-all font-bold text-white border-0 bg-[#DB4444] hover:bg-[#0A1E1E] hover:border-[#0A1E1E]">Find
                more</button>
        </section>

        <section class="featured bg-slate-50 px-5 py-16 text-center">

            <div class="head">
                <h2>Recommend for You</h2>
                <p>We’ve selected them based on quality and value to enhance your experience.</p>
            </div>

            <Carousel :itemsToShow="5.5" :wrapAround="true" :transition="1000" :snap-align="'center'"
                :pause-autoplay-on-hover="true" :breakpoints="prdsBreakpoints" class="prds">

                <Slide v-for="prd in prds" :key="prd.id" class="flex flex-col sm:mx-auto md:mx-0 sm:mb-3 lg:mb-0">

                    <div
                        class="face image absolute flex justify-center items-center rounded-lg shadow-md  overflow-hidden w-full h-full text-center">
                        <img :src="prd.src" class="max-w-[150px]">
                        <span
                            class="prd-action absolute bg-[#0a1e1e] bottom-0 left-0 p-1 text-lg w-full shadow-md text-white font-semibold">Click</span>
                    </div>

                    <div class="face info bg-[#DAFFDA] rounded-lg shadow-md w-full h-full text-center">
                        <div class="card-body items-center text-center py-3 px-2 bg-white m-3 rounded-lg shadow-sm">
                            <p class="text-xs text-stone-500 ">{{ prd.title }}</p>
                            <div class="rating rating-sm">
                                <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400 me-1" />
                                <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400 me-1" />
                                <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400 me-1"
                                    checked="checked" />
                                <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400 me-1" />
                                <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400" />
                            </div>
                            <div class="price relative mb-3">
                                <div class="after text-2xl font-bold">
                                    {{ prd.price }}<span class="text-xs font-normal">L.E</span>
                                </div>
                            </div>
                            <div class="card-actions justify-end">
                                <button
                                    class="btn border-0 text-white transition-all bg-[#DB4444] hover:bg-[#0A1E1E] hover:border-[#0A1E1E]">See
                                    more</button>
                            </div>
                        </div>
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
                    <div class="max-w-lg">
                        <p class="mb-5 text-white md:text-lg">
                            Help in the fight for Palestinian freedom and dignity by making conscious choices that
                            support
                            justice and equality.
                        </p>
                        <button
                            class="btn bg-[#DAFFDA] hover:bg-[#DB4444] hover:text-white btn-primary px-20 border-0 transition-all md:text-lg font-semibold">See
                            Your Impact</button>
                    </div>
                </div>
            </div>

        </section>

        <section class="boycotted bg-slate-50 px-5 py-16 mb-16 text-center">

            <div class="head">
                <h2>Boycotted Products</h2>
                <p>Products we don't sell due to their boycott status. We prioritize offering alternatives that align
                    with our
                    values and commitment.</p>
            </div>

            <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="1500" :autoplay="true" :snap-align="'center'"
                :pause-autoplay-on-hover="true" :breakpoints="breakpoints" class="boycotted-prds">
                <Slide v-for="item in items" :key="item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-55 absolute z-10 stroke-red-600">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <img :src="item.src" :alt="item.alt" class="rounded-full w-60 mx-5 blur-[3px]" />
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>

            <button
                class="btn px-10 mt-10 transition-all font-bold text-white border-0 bg-[#DB4444] hover:bg-[#0A1E1E] hover:border-[#0A1E1E]">See
                more</button>

        </section>

        <section class="top-rated bg-white p-5 mb-16">

            <div class="head">
                <h2>Top Rated Products</h2>
                <p>Discover the Best-Reviewed Products.</p>
            </div>

            <div class="rated-cards grid sm:grid-cols-1 lg:grid-cols-3 gap-5">
                <div v-for="prd in ratedPrds" :key="prd"
                    class="card card-side bg-base-100 transition-all shadow-md hover:shadow-2xl">
                    <figure class="w-1/2">
                        <img :src="prd.src" alt="top rated" />
                    </figure>
                    <div class="card-body bg-[#daffda47] w-1/2 p-3 justify-center">
                        <h2 class="card-title text-sm mx-auto">{{ prd.title }}</h2>
                        <div class="rating rating-sm mx-auto">
                            <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400 me-1" />
                            <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400 me-1" />
                            <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400 me-1"
                                checked="checked" />
                            <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400 me-1" />
                            <input type="radio" name="rating-6" class="mask mask-star-2 bg-amber-400" />
                        </div>
                        <div class="card-actions justify-end mx-auto">
                            <button class="btn bg-[#DB4444] hover:bg-[#0A1E1E] border-0 text-white duration-[500]">BUY
                                NOW</button>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    </div>
</template>
<script>
import { onMounted, defineComponent } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
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


        // onMounted(() => {
        //     setInterval(() => {
        //         const productBox = document.querySelectorAll('[class*="--prev"], [class*="--active"], [class*="--next"]')
        //         productBox.forEach((prd) => {
        //             prd.addEventListener("click", () => {
        //                 prd.classList.toggle("flip");
        //                 // if (prd.classList.contains("flip")) {
        //                 //     setTimeout(() => {
        //                 //         prd.classList.remove("flip");
        //                 //     }, 4000)
        //                 // }    
        //             })
        //         });
        //     }, 1000);
        // })
        return {
        }
    },
    data() {
        return {
            salePrds: [
                { src: require('../assets/sale-img1.png'), title: 'Corona Chocolate', desc: '4 Dark Chocolate', price: 120, afterSale: 99 },
                { src: require('../assets/sale-img4.png'), title: 'Abu Auf Puffs', desc: '5 packets with cheese flavor', price: 100, afterSale: 79 },
                { src: require('../assets/sale-img3.png'), title: 'Juhyna Juice', desc: '5 bottles with orange flavor', price: 80, afterSale: 59 },
                { src: require('../assets/sale-img2.png'), title: 'Tiger Chips', desc: '5 packets with cheese flavor', price: 60, afterSale: 49 },
            ],
            prds: [
                { id: 1, src: require('../assets/featured (1).png'), price: 49, title: 'Oxi Dish Wash' },
                { id: 3, src: require('../assets/featured (2).png'), price: 19, title: 'Domty Sandwich' },
                { id: 4, src: require('../assets/featured (3).png'), price: 39, title: 'Spiro Spathis' },
                { id: 5, src: require('../assets/featured (4).png'), price: 29, title: 'BigChips' },
                { id: 6, src: require('../assets/featured (5).png'), price: 99, title: 'Avuva Body Splash' },
            ],
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
            ratedPrds: [
                { src: require('../assets/rated1.png'), title: 'Juhyna Mix' },
                { src: require('../assets/rated2.png'), title: 'Big Cola' },
                { src: require('../assets/rated3.png'), title: 'Hayat Egypt' },
            ]
        }
    },
    methods: {
        gotoOffers() {
            this.$router.push('/offers');
        }
    }
})
</script>

<style scoped>
.hero-sec {
    background-image: url('../assets/heroimg.png')
}

.to-charts .hero {
    background-image: url('../assets/boycottinghomepage.jpg')
}

.featured section .carousel__track {
    height: 100% !important;
}

.featured ol li {
    transition: transform .5s;
    transform-style: preserve-3d;
    position: relative;
    /* max-width: 400px; */
    /* flex: 1 0 200px; */
    /* width: 25% !important; */
    /* margin: 0 10px; */
}

.featured ol li.flip {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

.featured ol li .face {
    backface-visibility: hidden;
}

.featured ol li .info {
    transform: rotateY(180deg);
}


/* Carousel */
.carousel__slide {
    padding: 20px;
}

/* .carousel__viewport {
    perspective: 2000px;
} */

/* .carousel__track {
    transform-style: preserve-3d;
} */

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