<template>

    <div l>

        <div class="flex flex-wrap">
            <div v-for="(item) in products" :key="item" class="xl:w-1/5 lg:w-3/12 md:w-4/12 sm:w-6/12 w-full p-3">
                <div class="p-2 border-2 rounded-md text-center">
                    <img class="w-full h-48" :src="item.image_url" alt="">
                    <h2 class="font-semibold">{{ item.english_name }}</h2>

                    <button class="mainGreenBtn block mx-auto mt-3">Add to cart +</button>
                </div>
            </div>
        </div>


        <!-- Responsive with fit -->

        <!-- <div class="flex flex-wrap">
            <div v-for="(item) in products" :key="item.id" class="w-3/12 p-3">
                <div class="p-2 border-2 flex flex-col justify-between h-full">
                    <img class="w-full h-48 object-cover" :src="item.image_url" alt="">
                    <h2 class="font-semibold mt-2">{{ item.english_name }}</h2>

                    <button class="mainGreenBtn block mx-auto mt-3">Add to cart +</button>
                </div>
            </div>
        </div> -->

        <div class="pt-11">
            <button class="mainGreenBtn" @click="handleCheckout">Checkout</button>
        </div>
        
    </div>
    <router-view></router-view>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            stripe: null,
            user: null,
            products: [],
            cart: null
        };
    },

    async mounted() {
        if (!window.Stripe) {
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.onload = () => {
                this.stripe = window.Stripe('pk_test_51PtX5uLbeudqBLeNmUwmj2P6zWbDPnbu4xUktC6XRsyZ4To6giHWQG083GNF0jfu90KCGgygSmcGSi1dzPjUhDql00oJveYLCq');
                console.log(this.stripe);

            }
            document.head.appendChild(script);
        } else {
            this.stripe = window.Stripe('pk_test_51PtX5uLbeudqBLeNmUwmj2P6zWbDPnbu4xUktC6XRsyZ4To6giHWQG083GNF0jfu90KCGgygSmcGSi1dzPjUhDql00oJveYLCq');
        }
        this.products = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/products.json')).data
    },

    methods: {
        async handleCheckout() {
            try {

                const userResponse = await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/users/c5ec0a8b494a30e.json');

                const cart = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/cart/c5ec0a8b494a30e.json')).data

                let cartArray = []
                for (let i = 0; i < Object.entries(cart).length; i++) {
                    cartArray.push(Object.entries(cart)[i][1])
                }

                const user = {
                    name: userResponse.data.name,
                    email: userResponse.data.email
                };
                console.log(user);
                const sessionResponse = await axios.post('https://delight-mart-server.vercel.app/create-checkout-session', { cartArray, userName: user.name, userEmail: user.email });
                const sessionId = sessionResponse.data.id;

                const { error } = await this.stripe.redirectToCheckout({
                    sessionId: sessionId
                });

                if (error) {
                    console.error('Error redirecting to checkout:', error);
                }
            } catch (error) {
                console.error('Error during checkout process:', error);
            }
        }
    }
};
</script>

<style scoped></style>