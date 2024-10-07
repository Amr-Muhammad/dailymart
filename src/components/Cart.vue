<template>
  <div class="mx-auto p-6 rounded-lg shadow-lg w-6/12">

    <h2 class="text-3xl font-bold mb-4 flex items-center">
      <i class="fas fa-shopping-cart mr-2"></i>
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
              <div v-if="!customQty[index]">
                <select v-model="selectedQty[index]" class="border border-gray-300 rounded p-1"
                  @change="checkQty(index, item[0])">
                  <option v-for="qty in 10" :key="qty" :value="qty">{{ qty }}</option>
                  <option :value="11">10+</option>
                </select>
              </div>
              <div v-else>
                <input v-model.number="customQtyValue[index]" type="number" min="11"
                  class="border border-gray-300 rounded p-1 w-16" @blur="updateCustomQty(index, item[0])" />
              </div>
            </div>
          </div>
        </div>

        <div class="text-right">
          <p class="text-lg font-bold">
            {{ item[1].onsale.split('%').length ==
              2 ? item[1].price - (item[1].onsale.split('%')[0] * item[1].price /
                100) :
              item[1].price
            }} EGP</p>
          <button @click="deleteItem(item[0])"
            class="mt-2 pt-1 md:text-md text-sm flex text-white p-1 rounded-lg bg-red-700 hover:bg-red-800">
            <i class="fas fa-trash-alt px-5 py-1">DELETE ITEM</i>
          </button>
        </div>

      </div>

      <button @click="checkoutPopup = true" class="mainGreenBtn mt-3">Checkout</button>
    </div>

    <div v-if="cart == null" class="flex items-center justify-center flex-col">
      <img src="../assets/Empty-removebg-preview.png" alt="Empty Cart">
      <router-link to="/CategroyPage">
        <button class="mainGreenBtn">Back Shopping?</button>
      </router-link>
    </div>

  </div>

  <div v-if="checkoutPopup" class="fixed bottom-0 h-screen left-0 right-0 z-50 bg-gray-500 top-0 bg-opacity-90">
    <div class="p-10 shadow w-1/2 mx-auto translate-y-1/2 bg-white rounded-lg">

      <h1 class="text-center text-3xl font-semibold mb-10">Verify your shipping address</h1>

      <div v-if="addressFlag">

        <label class="ms-2 font-semibold">Address</label>

        <div class="flex flex-wrap mt-2">

          <input v-model="address.location" class="w-8/12 border px-5 py-2 rounded-md" placeholder="Address" type="text"
            name="" id="">

          <div class="w-1/12"></div>

          <button @click="validateAdress()" class="w-3/12 mainGreenBtn">Validate</button>
        </div>
      </div>


      <span v-if="addressErrMessage" class="error-msg  text-[6px] text-sm text-red-700">{{
        addressErrMessage }}</span>

      <div v-if="addressFlag" class="btn_container flex justify-center text-white mt-5">
        <button @click="getUserLocation()" type="button"
          class="flex items-center px-8 py-2 bg-[#8a916d] rounded-md hover:bg-white hover:text-black transition-all duration-200 hover:outline hover:outline-1 text-sm justify-center">
          <span>
            <svg fill="#fff" width="25px" height="25px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
      </div>


      <div v-if="!addressFlag" class="flex items-center gap-2 justify-center">
        <svg class="text-green-500" fill="text-green-500" width="25px" height="25px" viewBox="0 0 200 200"
          data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"
          stroke="#166534">
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
      <button v-if="!addressFlag" @click="handleCheckout()" class="mainGreenBtn block mx-auto mt-5">Proceed To
        Checkout</button>


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

      selectedQty: [],
      customQty: [],
      customQtyValue: [],

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
      deliveryCharge: 0
    }
  },
  computed: {
    ...mapState(['loggedUserId', 'loggedUserData'])
  },

  methods: {
    async getCart() {

      try {
        this.cart = await service.methods.get_cart_wishlist_weekly(this.loggedUserId, 'cart')
        if (this.cart) {
          this.cart = Object.entries(this.cart);
          this.selectedQty = this.cart.map(() => 1);
          this.customQtyValue = this.cart.map(() => 0);
          this.customQty = this.cart.map(() => false);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    },

    checkQty(index, productId) {
      if (this.selectedQty[index] === 11) {
        this.customQty[index] = true;
      } else {
        this.customQty[index] = false;
        this.updateQty(index, productId, this.selectedQty[index]);
      }
    },

    async updateQty(index, productId, quantity) {
      try {
        // Update the quantity in the Firebase database
        await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/cart/${this.loggedUserId}/${productId}/.json`, {
          quantity: quantity
        });

        // Fetch the updated product information from the Firebase database
        const productResponse = await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/products/${productId}.json`);
        const product = productResponse.data;

        // Update the availability in the cart data by subtracting the selected quantity
        this.cart[index][1].availability = product.availability - quantity;

        console.log('Quantity and availability updated successfully');
      } catch (error) {
        console.error('Error updating quantity and availability:', error);
      }
    },

    async updateCustomQty(index, productId) {
      const customQuantity = this.customQtyValue[index];
      if (customQuantity >= 11) {
        try {
          await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/cart/${this.loggedUserId}/${productId}/.json`, {
            quantity: customQuantity
          });

          const productResponse = await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/products/${productId}.json`);
          const product = productResponse.data;

          this.cart[index][1].availability = product.availability - customQuantity;

          console.log('Custom quantity and availability updated successfully');
        } catch (error) {
          console.error('Error updating custom quantity and availability:', error);
        }
      }
    },
    async deleteItem(productId) {

      try {
        await service.methods.deleteItem_cart_wishlist_weekly(this.loggedUserId, productId, 'cart')
        this.getCart()
      } catch (error) {
        console.error('Error deleting item:', error);
      }

    },

    async clearCart() {

      try {
        await service.methods.clear_cart_wishlist_weekly(this.loggedUserId, 'cart')
        this.getCart()
      } catch (error) {
        console.error('Error clearing cart:', error);
      }

    },

    async handleCheckout() {
      try {


        const cart = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/cart/${this.loggedUserId}.json`)).data
        let cartArray = []
        for (let i = 0; i < Object.entries(cart).length; i++) {
          cartArray.push(Object.entries(cart)[i][1]);
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

        const sessionResponse = await axios.post('http://localhost:3001/create-checkout-session', { cartArray, userName: user.name, userEmail: user.email, userId: this.loggedUserId, subscribed: this.loggedUserData.planid, customerPhoneNumber: this.loggedUserData.phone, location: this.address.location, deliveryCharge: this.deliveryCharge });
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
          err => {
            console.log(err);
          }
        )
      }
      else {
        alert("This browser doesn't support live location")
      }
    },

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
        return 50;
      } else if (distance <= 10) {
        return 75;
      } else if (distance <= 15) {
        return 100;
      } else if (distance <= 20) {
        return 125
      } else if (distance <= 25) {
        return 150
      }
      // else {
      //   // return 15 + (distance - 15) * 0.5; // Extra charge per km after 15 km
      // }
    }
  },

  mounted() {
    this.getCart()

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