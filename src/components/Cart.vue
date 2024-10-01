<template>
  <div class="mx-auto p-6 rounded-lg shadow-lg w-6/12">

    <h2 class="text-3xl font-bold mb-4 flex items-center">
      <i class="fas fa-shopping-cart  mr-2"></i>
      <!-- <img class="w-14 h-14 p-2" src="../assets/add-to-basket.png"/> -->
      <p class="mt-2">My Cart</p>
    </h2>

    <div v-if="cart != null" class="text-right mt-6">
      <button class="text-red-600 underline hover:text-red-800" @click="clearCart()">Remove all</button>
    </div>

    <div v-if="cart != null">
      <div v-for="(item, index) in cart" :key="index"
        class="flex items-center justify-between border-b border-gray-200 py-4">
        <div class="flex items-center space-x-4">
          <img :src="item[1].image_url" alt="Product Image" class="w-20 h-20 object-cover rounded">
          <div>
            <h3 class="text-lg font-semibold">{{ item[1].english_name }}</h3>
            <p class="text-sm text-green-600">In Stock • Availability: {{ item[1].availability }}</p>
            <div class="flex items-center space-x-2 mt-2">
              <label for="quantity" class="text-sm">Qty:</label>
              <select v-model="item[1].availability" class="border border-gray-300 rounded p-1">
                <!-- la elah ella allah!!! -->
                <option v-for="qty in 10" :key="qty" :value="qty">{{ qty }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text-right">
          <!-- <p class="text-lg font-bold">{{ formatCurrency(item.price) }}</p> -->
          <p class="text-lg font-bold">{{ item[1].price }}.00 EGP</p>
          <button @click="deleteItem(item[0])"
            class="mt-2 pt-1 md:text-md  text-sm flex text-white p-1 rounded-lg bg-red-700 hover:bg-red-800">
            <i class="fas fa-trash-alt px-5 py-1">
              <!-- <img class="md:w-6 w-8 md:h-6 h-6 pr-1" src="../assets/delete.png" alt=""> -->
              DELETE ITEM
            </i>
          </button>
        </div>
      </div>

      <button @click="handleCheckout()" class="mainGreenBtn mt-3">Checkout</button>

    </div>

    <div v-if="cart == null" class="flex items-center justify-center flex-col">
      <img src="../assets/Empty-removebg-preview.png" alt="">
      <router-link to="/CategroyPage">
        <button class="mainGreenBtn">Back Shopping?</button>
      </router-link>
    </div>

  </div>
</template>

<script>
import service from '@/mixins/service';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'CartProducts',

  data() {
    return {
      cart: null,
    }
  },
  computed: {
    ...mapState(['loggedUserId', 'loggedUserData'])
  },

  methods: {
    // formatCurrency(value) {
    //   return `EGP ${value.toFixed(2)}`;
    // }
    // ,
    async getCart() {
      this.cart = await service.methods.get_cart_wishlist_weekly(this.loggedUserId, 'cart')
      if (this.cart) {
        this.cart = Object.entries(this.cart)
      }
    },
    async deleteItem(productId) {
      await service.methods.deleteItem_cart_wishlist_weekly(this.loggedUserId, productId, 'cart')
      this.getCart()
    },
    async clearCart() {
      await service.methods.clear_cart_wishlist_weekly(this.loggedUserId, 'cart')
      this.getCart()
    },
    async handleCheckout() {
      try {

        // const userResponse = await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/customer/${this.loggedUserId}.json`);

        const cart = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/cart/${this.loggedUserId}.json`)).data

        let cartArray = []
        for (let i = 0; i < Object.entries(cart).length; i++) {
          cartArray.push(Object.entries(cart)[i][1])
        }
        // console.log(userResponse);

        const user = {
          // name: userResponse.data.firstName + ' ' + userResponse.data.lastName,
          // email: userResponse.data.email
          name: this.loggedUserData.firstName + ' ' + this.loggedUserData.lastName,
          email: this.loggedUserData.email
        };
        console.log(user);
        console.log(cartArray);

        const sessionResponse = await axios.post('https://delight-mart-server.vercel.app/create-checkout-session', { cartArray, userName: user.name, userEmail: user.email, userId: this.loggedUserId, subscribed: this.loggedUserData.planid });
        // const sessionResponse = await axios.post('http://localhost:3001/create-checkout-session', { cartArray, userName: user.name, userEmail: user.email, userId: this.loggedUserId, subscribed: this.loggedUserData.planid });
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
  },

  async mounted() {
    this.getCart()
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
  }
};
</script>