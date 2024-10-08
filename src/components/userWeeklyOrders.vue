<template>

    <div class="mx-10 flex flex-wrap justify-between">
        <h2 class=" text-2xl font-semibold">Weekly Orders</h2>
        <!-- <div v-if="loggedUserData.orderStatus == 'Approved'" class="flex gap-5 items-center">
            <div class="font-semibold italic text-lg">Your order is expected to be delivered by Friday,
                <span class="ms-3 text-[#166534]">{{ nextFriday }}</span>
            </div>
            <div>
                <span class="countdown font-mono text-2xl">
                    <span :style="`--value:${days}`"></span>
                </span>
                days
            </div>
            <div>
                <span class="countdown font-mono text-2xl">
                    <span :style="`--value:${hours}`"></span>
                </span>
                hours
            </div>
            <div>
                <span class="countdown font-mono text-2xl">
                    <span :style="`--value:${minutes}`"></span>
                </span>
                min
            </div>
            <div>
                <span class="countdown font-mono text-2xl">
                    <span :style="`--value:${seconds}`"></span>
                </span>
                sec
            </div>
        </div> -->


        <!-- <div class="grid auto-cols-max grid-flow-col gap-5 text-center">
            <div v-if="loggedUserData.orderStatus == 'Approved'" class="flex gap-5 items-center">
                <div class="font-semibold italic text-lg">Your order is expected to be delivered by Friday,
                    <span class="ms-3 text-[#166534]">{{ nextFriday }}</span>
                </div>
                <div class="flex flex-col">
                    <span class="countdown font-mono text-2xl">
                        <span :style="`--value:${days}`"></span>
                    </span>
                    Days
                </div>
                <div class="flex flex-col">
                    <span class="countdown font-mono text-2xl">
                        <span :style="`--value:${hours}`"></span>
                    </span>
                    Hours
                </div>
                <div class="flex flex-col">
                    <span class="countdown font-mono text-2xl">
                        <span :style="`--value:${minutes}`"></span>
                    </span>
                    Min
                </div>
                <div class="flex flex-col">
                    <span class="countdown font-mono text-2xl">
                        <span :style="`--value:${seconds}`"></span>
                    </span>
                    Sec
                </div>
            </div>
        </div> -->


        <div class="flex gap-5">
            <div v-if="loggedUserData.orderStatus == 'Approved'" class="flex gap-5 items-center">
                <div class="font-semibold italic text-lg">Your order is expected to be delivered by Friday,
                    <span class="ms-3 text-[#166534]">{{ nextFriday }}</span>
                </div>
                <div>
                    <span class="countdown font-mono text-2xl">
                        <span :style="`--value:${days}`"></span>
                    </span>
                    days
                </div>
                <div>
                    <span class="countdown font-mono text-2xl">
                        <span :style="`--value:${hours}`"></span>
                    </span>
                    hours
                </div>
                <div>
                    <span class="countdown font-mono text-2xl">
                        <span :style="`--value:${minutes}`"></span>
                    </span>
                    min
                </div>
                <div>
                    <span class="countdown font-mono text-2xl">
                        <span :style="`--value:${seconds}`"></span>
                    </span>
                    sec
                </div>
            </div>
        </div>


        <p v-if="loggedUserData.orderStatus == 'Pending'"
            class="text-lg font-bold text-orange-600 me-10 bg-orange-100 py-1 rounded-lg px-3">Order {{
                loggedUserData.orderStatus }}</p>
    </div>

    <div v-if="products != null" class="items-wrapper w-full px-4 mt-10">

        <div v-for="(product, index) in products" :key="product"
            class="flex flex-wrap items-center justify-between my-7 mx-16 p-3 rounded-lg shadow-md bg-white">

            <div class="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
                <img class="w-6/12 max-w-xs" :src="product[1].image_url" alt="Big Chips">
            </div>

            <div class="w-full md:w-2/4 flex flex-col md:items-start text-center md:text-left mb-4 md:mb-0">
                <div class="text-lg font-semibold mb-2">{{ product[1].english_name }}</div>
                <div class="rating flex justify-center mb-2">
                    <input v-for="star in 5" :key="star" type="radio" :name="'rating-' + index"
                        :class="{ 'bg-orange-400': star <= allRates[index], 'bg-gray-300': star > allRates[index] }"
                        class="mask mask-star-2" disabled />
                </div>
                <p class="text-lg font-semibold">{{ product[1].onsale.split('%').length ==
                    2 ? product[1].price - (product[1].onsale.split('%')[0] * product[1].price /
                        100) :
                    product[1].price
                    }} EGP</p>
            </div>

            <div v-if="!loggedUserData.orderStatus" class="w-full md:w-1/4 flex flex-col items-center md:items-end">
                <div class="flex items-center mb-2">
                    <button @click="patchQuantity(product[0], '-')"
                        class="secondaryBtn px-3 py-1 border border-gray-400 rounded-lg text-gray-600">-</button>
                    <span class="mx-3">{{ product[1].quantity }}</span>
                    <button @click="patchQuantity(product[0], '+')"
                        class="mainGreenBtn px-3 py-1 bg-green-500 text-white rounded-lg">+</button>
                </div>
                <button @click="deleteItem(product[0], '+')"
                    class="flex items-center justify-center px-3 py-1 rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 10.585L14.293 8.293L15.707 9.707L13.414 12L15.707 14.293L14.293 15.707L12 13.414L9.707 15.707L8.293 14.293L10.585 12L8.293 9.707L9.707 8.293L12 10.585ZM12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4Z"
                            fill="#000" />
                    </svg>
                </button>
            </div>

        </div>

        <hr class="w-10/12 mx-auto my-4 border-gray-300">

    </div>

    <div v-if="products == null" class="flex items-center justify-center flex-col">
        <img src="../assets/Empty-removebg-preview.png" alt="">
        <button class="mainGreenBtn">
            <router-link to="/CategroyPage">Back Shopping?</router-link>
        </button>
    </div>


    <!-- <div v-if="products != null"> -->
    <div v-if="!loggedUserData.orderStatus && products">
        <button @click="openPopup()" class="mainGreenBtn block mx-auto">CHECKOUT</button>
    </div>

    <!-- <div v-if="loggedUserData.orderStatus" class="flex flex-wrap justify-between mx-20 mt-5">
        <p class="font-semibold italic">
            Your order is expected to be delivered by Friday,
            <span class="text-blue-600 font-bold">{{ nextFriday }}</span>,
            <span class="text-green-600 font-bold">{{ days }} days</span>,
            <span class="text-orange-600 font-bold">{{ hours }} hours</span>,
            <span class="text-red-600 font-bold">{{ minutes }} minutes</span>,
            <span class="text-purple-600 font-bold">{{ seconds }} seconds</span>
        </p>
    </div> -->

    <!-- <div v-if="loggedUserData.orderStatus" class="flex gap-5 items-center mx-20 mt-5">
        <div class="font-semibold italic text-lg">Your order is expected to be delivered by Friday,
            <span class="ms-3 text-[#166534]">{{ nextFriday }}</span>
        </div>
        <div>
            <span class="countdown font-mono text-2xl">
                <span :style="`--value:${days}`"></span>
            </span>
            days
        </div>
        <div>
            <span class="countdown font-mono text-2xl">
                <span :style="`--value:${hours}`"></span>
            </span>
            hours
        </div>
        <div>
            <span class="countdown font-mono text-2xl">
                <span :style="`--value:${minutes}`"></span>
            </span>
            min
        </div>
        <div>
            <span class="countdown font-mono text-2xl">
                <span :style="`--value:${seconds}`"></span>
            </span>
            sec
        </div>
    </div> -->



    <!-- Address -->
    <div id="test" ref="popupContainer" v-if="checkoutPopup"
        class="fixed bottom-0 h-screen left-0 right-0 z-50 bg-gray-500 top-0 bg-opacity-90 flex items-center">
        <div class="p-10 pb-5 shadow w-5/12 mx-auto transform  bg-[#FBFBFB] rounded-lg">


            <h1 class="text-center text-3xl font-semibold mb-10">Verify your shipping address</h1>

            <!-- If user has previous address show it in select option -->
            <div v-if="(loggedUserData.address.location || loggedUserData.deliveryAddresses) && !addNewAddressFlag"
                class="mb-5">

                <div class="select-add-wrapper flex justify-between">
                    <div class="select_option">

                        <select v-model="selectValue" class="select select-success w-full max-w-xs">
                            <option disabled selected>Select your shipping address</option>

                            <template v-if="loggedUserData.address.location">
                                <option :value="loggedUserData.address.location">{{ loggedUserData.address.location }}
                                </option>
                            </template>

                            <template v-if="loggedUserData.deliveryAddresses">
                                <option v-for="address in loggedUserData.deliveryAddresses " :key="address"
                                    :value="address">{{
                                        address
                                    }}
                                </option>
                            </template>
                        </select>
                    </div>

                    <div @click="addNewAddressFlag = true">
                        <button class="mainGreenBtn">Add New Address +</button>
                    </div>
                </div>

                <div>
                    <button v-if="!selectValue.includes('Select')" @click="handleCheckout(true)"
                        class="mainGreenBtn block mx-auto mt-8">Proceed To
                        Checkout</button>
                </div>
            </div>

            <!-- Add New Address -->
            <div v-if="addNewAddressFlag || (!loggedUserData.address.location && !loggedUserData.deliveryAddresses)">
                <div v-if="addressFlag">

                    <label class="ms-2 font-semibold">What is your shipping address?</label>

                    <div class="flex flex-wrap mt-2">

                        <input v-model="address.location" class="w-8/12 border px-5 py-2 rounded-md"
                            placeholder="Enter your shipping address" type="text" name="" id="">

                        <div class="w-1/12"></div>

                        <button @click="validateAdress()" class="w-3/12 mainGreenBtn">Validate</button>
                    </div>
                </div>

                <span v-if="addressErrMessage" class="error-msg  text-[6px] text-sm text-red-700">{{
                    addressErrMessage }}</span>


                <div v-if="addressFlag" class="btn_container flex justify-center text-white mt-5 flex-col gap-3">
                    <!-- Get Live user Location -->
                    <button @click="getUserLocation()" type="button"
                        class="flex items-center px-8 py-2 bg-[#DB4444] rounded-md hover:bg-white hover:text-black transition-all duration-200 hover:outline hover:outline-1 text-sm justify-center">
                        <span>
                            <svg fill="#fff" width="25px" height="25px" viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M49,18.92A23.74,23.74,0,0,0,25.27,42.77c0,16.48,17,31.59,22.23,35.59a2.45,2.45,0,0,0,3.12,0c5.24-4.12,22.1-19.11,22.1-35.59A23.74,23.74,0,0,0,49,18.92Zm0,33.71a10,10,0,1,1,10-10A10,10,0,0,1,49,52.63Z">
                                    </path>
                                </g>
                            </svg>
                        </span>
                        <span>Share My Location Instead</span>
                    </button>

                    <!-- Toggle back select address -->
                    <button
                        v-if="(loggedUserData.address.location || loggedUserData.deliveryAddresses) && addNewAddressFlag"
                        class="mainPinkBtn" @click="addNewAddressFlag = false">Use Previous Address</button>
                </div>

                <div v-if="!addressFlag" class="flex items-center gap-2 justify-center">
                    <svg class="text-green-500" fill="text-green-500" width="25px" height="25px" viewBox="0 0 200 200"
                        data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                        transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#166534">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                        </g>
                        <g id="SVGRepo_iconCarrier">
                            <title></title>
                            <path
                                d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z">
                            </path>
                        </g>
                    </svg>
                    <p class="font-semibold">Your address has been saved</p>
                </div>

                <!-- Checkout -->
                <button v-if="!addressFlag" @click="handleCheckout(false)"
                    class="mainGreenBtn block mx-auto mt-5">Proceed To
                    Checkout</button>
            </div>


        </div>

    </div>


</template>

<script>
import service from '@/mixins/service';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            products: null,
            days: null,
            hours: null,
            minutes: null,
            seconds: null,
            nextFriday: null,
            user: null,
            subscribed: null,
            commentD: null,
            prdRate: null,
            allRates: [],


            address: {
                latitude: '',
                longitude: '',
                location: ''
            },
            apiKey: '3199d0b4fb7e4184b017cfade26c7298',
            addressErrMessage: null,
            addressFlag: true,

            checkoutPopup: false,
            addressSuccess: false,
            storeLat: 30.039328,
            storeLong: 30.978202,
            distance: null,
            deliveryCharge: 0,
            addNewAddressFlag: false,
            selectValue: 'Select your shipping address',
        }
    },
    computed: {
        ...mapState(['loggedUserId', 'loggedUserData'])
    },
    methods: {
        async getWeeklyOrder() {
            this.products = await service.methods.get_cart_wishlist_weekly(this.loggedUserId, 'weeklyorders')
            if (this.products) {
                this.products = Object.entries(this.products)

                for (let i = 0; i < this.products.length; i++) {
                    this.getProductRate(this.products[i][0])
                    console.log(this.products[i][0])
                }
            }
        }
        ,
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
        }
        ,
        async deleteItem(productId) {
            try {
                await service.methods.deleteItem_cart_wishlist_weekly(this.loggedUserId, productId, 'weeklyorders')
                this.getWeeklyOrder()
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        async patchQuantity(productId, sign) {
            await service.methods.patchQuantity(this.loggedUserId, productId, 'weeklyorders', sign)
            this.getWeeklyOrder()
        }
        ,
        getTimeRemainingUntilFriday() {
            let now = new Date();
            let nextFriday = service.methods.getNextFriday()
            let timeDifference = nextFriday - now; // Time difference in milliseconds

            this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            this.minutes = Math.floor((timeDifference / 1000 / 60) % 60);
            this.seconds = Math.floor((timeDifference / 1000) % 60);

            let day = String(nextFriday.getDate()).padStart(2, '0'); // Get day and pad with 0 if needed
            let month = String(nextFriday.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so +1)
            let year = nextFriday.getFullYear(); // Get full year

            this.nextFriday = `${day}-${month}-${year}`;
        },

        async getLoggedUser() {
            this.user = await service.methods.getLoggedUser(this.loggedUserId)
        },

        async successfulSubscribe() {
            let subscriptionStartDate = new Date()
            let subscriptionEndDate = new Date(subscriptionStartDate)
            subscriptionEndDate.setDate(subscriptionStartDate.getDate() + 30)
            this.subscribed = this.$route.params.id
            if (this.subscribed && this.subscribed.includes('plink')) {
                await this.getLoggedUser()
                let subscribeData = {
                    planid: 'a1b2c3_subscription',
                    subscriptionStartDate: subscriptionStartDate,
                    subscriptionEndDate: subscriptionEndDate
                }
                await service.methods.planSubscribe(this.loggedUserId, subscribeData)
                location.replace('/useraccount/weeklyorders')
            }
        },

        openPopup() {
            this.checkoutPopup = true
            console.log(this.$refs.popupContainer);
            console.log(document.getElementById('test'));


        },

        async handleCheckout(prevAddress) {
            try {
                if (prevAddress) {

                    let res = (await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(this.selectValue)}&key=3199d0b4fb7e4184b017cfade26c7298`)).data
                    console.log(res);

                    if (res.results[0]) {
                        this.address.latitude = res.results[0].geometry.lat
                        this.address.longitude = res.results[0].geometry.lng
                        this.address.location = this.selectValue

                        this.distance = this.haversineDistance(this.storeLat, this.storeLong, this.address.latitude, this.address.longitude)
                        if (this.distance > 25) {
                            this.addressErrMessage = "Sorry! We're not serving this location yet"
                        }
                        else {
                            this.deliveryCharge = this.calculateDeliveryCharge(this.distance)
                        }

                    } else {
                        this.addressErrMessage = 'Enter a valid address'
                        console.log(this.addressErrMessage);
                        return;
                    }

                }

                const weeklyorders = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/weeklyorders/${this.loggedUserId}.json`)).data

                let cartArray = []
                for (let i = 0; i < Object.entries(weeklyorders).length; i++) {
                    cartArray.push(Object.entries(weeklyorders)[i][1])
                }

                const user = {
                    name: this.loggedUserData.firstName + ' ' + this.loggedUserData.lastName,
                    email: this.loggedUserData.email
                };


                //hyrg3ly hena array fih qyam el availability elly fi el back end fi webhook el success h loop 3lehom b patch request- ab3d el array da m3 el post request
                // let productsAvailability = []
                // cartArray.forEach(item => productsAvailability.push(item.availability - item.quantity))

                console.log(cartArray);
                console.log(user.name);
                console.log(user.email);
                console.log(this.loggedUserId);
                console.log(this.loggedUserData.planid);
                console.log(this.loggedUserData.phone);
                console.log(this.address.location);
                console.log(this.deliveryCharge);

                const sessionResponse = await axios.post('http://localhost:3001/create-checkout-session', { cartArray, userName: user.name, userEmail: user.email, userId: this.loggedUserId, subscribed: this.loggedUserData.planid, customerPhoneNumber: this.loggedUserData.phone, location: this.address.location, deliveryCharge: this.deliveryCharge, weeklyOrder: 'weekly' });
                // const sessionResponse = await axios.post('https://delight-mart-server.vercel.app/create-checkout-session', { cartArray, userName: user.name, userEmail: user.email, userId: this.loggedUserId, subscribed: this.loggedUserData.planid, customerPhoneNumber: this.loggedUserData.phone, location: this.address.location, deliveryCharge: this.deliveryCharge });

                const sessionId = sessionResponse.data.id;
                const { error } = await this.stripe.redirectToCheckout({ sessionId: sessionId });


                if (error) {
                    console.error('Error redirecting to checkout:', error);
                }
            } catch (error) {
                console.error('Error during checkout process:', error);
            }

        },

        // Customer share location
        getUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async postion => {
                        this.address.latitude = postion.coords.latitude
                        this.address.longitude = postion.coords.longitude


                        let res = (await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.address.latitude},${this.address.longitude}&key=${this.apiKey}`)).data
                        if (res.results) {
                            res.results.forEach(place => this.address.location = place.formatted)
                        }

                        this.distance = this.haversineDistance(this.storeLat, this.storeLong, this.address.latitude, this.address.longitude)
                        if (this.distance > 25) {
                            this.addressErrMessage = "Sorry! We're not serving this location yet"
                        } else {
                            this.deliveryCharge = this.calculateDeliveryCharge(this.distance)
                            console.log(this.address);
                            this.addressErrMessage = null
                            this.addressFlag = false
                        }
                    },
                    () => {
                        alert('Enable accessing your location')
                    }
                )
            }
            else {
                alert("This browser doesn't support live location")
            }
        },

        // Validate el customer entered address
        async validateAdress() {
            let res = (await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(this.address.location)}&key=3199d0b4fb7e4184b017cfade26c7298`)).data
            console.log(res);

            if (res.results[0]) {
                this.address.latitude = res.results[0].geometry.lat
                this.address.longitude = res.results[0].geometry.lng

                this.distance = this.haversineDistance(this.storeLat, this.storeLong, this.address.latitude, this.address.longitude)
                if (this.distance > 25) {
                    this.addressErrMessage = "Sorry! We're not serving this location yet"
                }
                else {
                    this.deliveryCharge = this.calculateDeliveryCharge(this.distance)
                    console.log(this.address);
                    this.addressFlag = false
                    this.addressErrMessage = null
                }

            } else {
                this.addressErrMessage = 'Enter a valid address'
                console.log(this.addressErrMessage);
                return;
            }
        },

        haversineDistance(lat1, lon1, lat2, lon2) {
            const R = 6371;
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = (R * c) + 3; // Distance in kilometers
            return distance;
        },

        calculateDeliveryCharge(distance) {
            if (distance <= 5) {
                return 30;
            } else if (distance <= 10) {
                return 50;
            } else if (distance <= 15) {
                return 70;
            } else if (distance <= 20) {
                return 90
            } else if (distance <= 25) {
                return 100
            }
            // else {
            //   // return 15 + (distance - 15) * 0.5; // Extra charge per km after 15 km
            // }

        }
    },
    async mounted() {

        if (!this.loggedUserData.planid) {
            this.$router.push('/PlansWrapperComponent')
        }

        this.successfulSubscribe()
        this.getWeeklyOrder()
        setInterval(() => {
            this.getTimeRemainingUntilFriday()
        }, 1000);

        if (!window.Stripe) {
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.onload = () => {
                this.stripe = window.Stripe('pk_test_51PtX5uLbeudqBLeNmUwmj2P6zWbDPnbu4xUktC6XRsyZ4To6giHWQG083GNF0jfu90KCGgygSmcGSi1dzPjUhDql00oJveYLCq');
            }
            document.head.appendChild(script);
        } else {
            this.stripe = window.Stripe('pk_test_51PtX5uLbeudqBLeNmUwmj2P6zWbDPnbu4xUktC6XRsyZ4To6giHWQG083GNF0jfu90KCGgygSmcGSi1dzPjUhDql00oJveYLCq');
        }
    }
}
</script>

<style scoped></style>