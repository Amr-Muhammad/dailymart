<template>
  <!-- Quantity Update Notification -->
  <div v-if="quantityUpdated"
    class="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg animate__animated animate__fadeIn">
    Quantity Updated Successfully!
  </div>

  <!-- Shopping Cart Section -->
  <div class="pt-1">
    <div
      class="mx-auto animate__animated animate__backInDown bg-white m-14 p-6 rounded-lg shadow-lg lg:w-7/12 md:w-10/12 w-11/12">

      <!-- Cart Title -->
      <div class="flex items-center gap-1">
        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M2.08416 2.7512C2.22155 2.36044 2.6497 2.15503 3.04047 2.29242L3.34187 2.39838C3.95839 2.61511 4.48203 2.79919 4.89411 3.00139C5.33474 3.21759 5.71259 3.48393 5.99677 3.89979C6.27875 4.31243 6.39517 4.76515 6.4489 5.26153C6.47295 5.48373 6.48564 5.72967 6.49233 6H17.1305C18.8155 6 20.3323 6 20.7762 6.57708C21.2202 7.15417 21.0466 8.02369 20.6995 9.76275L20.1997 12.1875C19.8846 13.7164 19.727 14.4808 19.1753 14.9304C18.6236 15.38 17.8431 15.38 16.2821 15.38H10.9792C8.19028 15.38 6.79583 15.38 5.92943 14.4662C5.06302 13.5523 4.99979 12.5816 4.99979 9.64L4.99979 7.03832C4.99979 6.29837 4.99877 5.80316 4.95761 5.42295C4.91828 5.0596 4.84858 4.87818 4.75832 4.74609C4.67026 4.61723 4.53659 4.4968 4.23336 4.34802C3.91052 4.18961 3.47177 4.03406 2.80416 3.79934L2.54295 3.7075C2.15218 3.57012 1.94678 3.14197 2.08416 2.7512Z"
              fill="#166534"></path>
            <path
              d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
              fill="#166534"></path>
            <path
              d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
              fill="#166534"></path>
          </g>
        </svg>
        <div class="divider divider-horizontal m-0"></div>
        <h2 class="text-3xl font-semibold mb-1 flex items-center">Your Shopping Cart</h2>
      </div>

      <!-- Cart Content -->
      <div v-if="cart != null" class="text-right">
        <button class="text-red-600 underline hover:text-red-800" @click="clearCart()">Remove all</button>
      </div>
      <!-- Cart Items -->
      <div class="bg-[#F0F2E8] p-4" v-if="cart != null">
        <div v-for="(item, index) in cart" :key="index"
          class="flex blocked-item items-center justify-between border-b border-white py-4 mb-4">

          <!-- Item Details -->
          <div class="flex items-center space-x-4">
            <img :src="item[1].image_url" alt="Product Image" class="w-24 mb-10 h-24 object-cover rounded" />
            <div class="flex flex-col">
              <h3 class="text-lg font-semibold">{{ item[1].english_name }}</h3>
              <p class="text-sm text-green-600">In Stock • Availability: {{ item[1].availability }}</p>
              <p v-if="item[1].onsale"
                class="before text-lg text-stone-400 relative before:content-[''] before:absolute before:bg-[#a8a29e] before:block before:w-0.5 before:h-7 before:rotate-90 before:left-4 before:top-0">
                {{ item[1].price }} EGP
              </p>
              <p class="text-md text-emerald-600">
                Each: {{ item[1].onsale ? (item[1].price - (item[1].price * item[1].onsale.split('%')[0] /
                  100)).toFixed(2) : item[1].price }} EGP
              </p>
            </div>
          </div>

          <!-- Quantity Selection -->
          <!-- Quantity Selection -->
          <div class="flex flex-col items-center">
            <div v-if="!customQty[index]">
              <select v-model="selectedQty[index]" class="border border-gray-300 rounded p-1"
                @change="handleQtyChange(index, item[0])">
                <option v-for="qty in 10" :key="qty" :value="qty">{{ qty }}</option>
                <option :value="11">10+</option>
              </select>
            </div>
            <div class="flex flex-col items-center" v-else>
              <input v-model.number="tempCustomQtyValue[index]" type="number" min="10" placeholder="10"
                class="border border-gray-300 rounded p-1 w-16" />
              <button @click="updateCustomQty(index, item[0])"
                class="ml-2 mt-4 text-sm bg-emerald-950 hover:bg-emerald-800 text-white rounded px-2">Update</button>
              <button @click="backToSelect(index)"
                class="ml-2 text-sm bg-red-500 hover:bg-red-700 text-white rounded px-2">Clear</button>
            </div>
          </div>


          <!-- Item Price and Actions -->
          <div class="text-right">
            <div class="text-lg font-bold">{{ calculateItemPrice(index) }} EGP</div>
            <button @click="deleteItem(item[0])"
              class="mt-2 pt-1 md:text-md text-sm flex text-white p-1 rounded-lg bg-red-700 hover:bg-red-800">
              <p class="px-5 py-1">DELETE ITEM</p>
            </button>
          </div>
        </div>

        <!-- Total Price -->
        <div class="text-right mt-6">
          <p class="text-xl font-bold">Total: {{ calculateTotalPrice() }}.00 EGP</p>
        </div>

        <!-- Checkout Button -->
        <button @click="checkoutPopup = true" class="mainGreenBtn mt-3 block mx-auto">CHECKOUT</button>
      </div>

      <!-- Empty Cart State -->
      <div v-if="cart == null" class="flex items-center justify-center flex-col">
        <img src="../assets/Empty-removebg-preview.png" alt="Empty Cart" />
        <router-link to="/CategroyPage">
          <button class="mainGreenBtn">Back Shopping?</button>
        </router-link>
      </div>
    </div>
  </div>

  <!-- Address -->
  <div v-if="checkoutPopup"
    class="popupContainer fixed bottom-0 h-screen left-0 right-0 z-50 bg-gray-500 top-0 bg-opacity-90 flex items-center">
    <div class="popup p-10 pb-5 shadow w-5/12 mx-auto transform  bg-[#FBFBFB] rounded-lg">


      <h1 class="text-center text-3xl font-semibold mb-10">Verify your shipping address</h1>

      <!-- If user has previous address show it in select option -->
      <div v-if="(loggedUserData.address.location || loggedUserData.deliveryAddresses) && !addNewAddressFlag"
        class="mb-5">

        <div class="select-add-wrapper flex justify-between">
          <div class="select_option">

            <select v-model="selectValue" class="select select-success w-full max-w-xs">
              <option disabled selected>Select your shipping address</option>

              <template v-if="loggedUserData.address.location">
                <option :value="loggedUserData.address.location">{{ loggedUserData.address.location }}</option>
              </template>

              <template v-if="loggedUserData.deliveryAddresses">
                <option v-for="address in loggedUserData.deliveryAddresses " :key="address" :value="address">{{
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

          <!-- Toggle back select address -->
          <button v-if="(loggedUserData.address.location || loggedUserData.deliveryAddresses) && addNewAddressFlag"
            class="mainPinkBtn" @click="addNewAddressFlag = false">Use Previous Address</button>
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

        <!-- Checkout -->
        <button v-if="!addressFlag" @click="handleCheckout(false)" class="mainGreenBtn block mx-auto mt-5">Proceed To
          Checkout</button>
      </div>


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

      tempCustomQtyValue: [],
      isPriceUpdated: [],
      quantityUpdated: false,

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
    calculateItemPrice(index) {
      const item = this.cart[index][1];
      const price = item.price;
      const selectedQuantity = this.selectedQty[index];

      let finalPrice = price;

      // Check if the item is on sale and calculate the discounted price
      if (item.onsale && item.onsale.split('%').length === 2) {
        finalPrice = price - (parseFloat(item.onsale.split('%')[0]) * price / 100);
      }

      if (selectedQuantity === 11 && !this.isPriceUpdated[index]) {
        return 0;
      }

      if (selectedQuantity === 11 && this.isPriceUpdated[index]) {
        const confirmedCustomQty = this.customQtyValue[index] || 0;
        return finalPrice * confirmedCustomQty;
      }

      return finalPrice * selectedQuantity;
    },

    calculateTotalPrice() {
      return this.cart.reduce((total, item, index) => {
        const itemData = item[1];
        const price = Number(itemData.price) || 0;
        let quantity = Number(this.selectedQty[index]) || 0;

        let finalPrice = price;

        // Check if the item is on sale and calculate the discounted price
        if (itemData.onsale && itemData.onsale.split('%').length === 2) {
          finalPrice = price - (parseFloat(itemData.onsale.split('%')[0]) * price / 100);
        }

        if (quantity === 11 && !this.isPriceUpdated[index]) {
          return total;
        }

        if (quantity === 11) {
          quantity = Number(this.customQtyValue[index]) || 0;
        }

        return total + (finalPrice * quantity);
      }, 0);
    },


    handleQtyChange(index, productId) {
      const availability = this.cart[index][1].availability;
      if (this.selectedQty[index] === 11) {
        this.customQty[index] = true;
      } else if (this.selectedQty[index] > availability) {
        this.selectedQty[index] = availability;
        this.updateQty(index, productId, availability);
      } else {
        this.customQty[index] = false;
        this.updateQty(index, productId, this.selectedQty[index]);
      }
    },

    async updateQty(index, productId, quantity) {
      try {
        await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/cart/${this.loggedUserId}/${productId}/.json`, {
          quantity: quantity,
        });
        console.log('Quantity updated successfully');
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    },

    async updateCustomQty(index, productId) {
      let customQuantity = this.tempCustomQtyValue[index];
      const availability = this.cart[index][1].availability;

      // Ensure customQuantity is at least 10
      if (customQuantity < 10) {
        customQuantity = 10; // Set it to 10 if it's less than 10
      }

      if (customQuantity > availability) {
        this.customQtyValue[index] = availability;
        this.tempCustomQtyValue[index] = availability;
      } else {
        this.customQtyValue[index] = customQuantity;
        this.tempCustomQtyValue[index] = customQuantity;
      }

      this.isPriceUpdated[index] = true;
      this.selectedQty[index] = 11;

      try {
        await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/cart/${this.loggedUserId}/${productId}/.json`, {
          quantity: this.customQtyValue[index],
        });
        console.log('Custom quantity updated successfully');

        // Show the "Quantity Updated" message
        this.quantityUpdated = true;

        // Hide the pop-up after 3 seconds
        setTimeout(() => {
          this.quantityUpdated = false;
        }, 3000);
      } catch (error) {
        console.error('Error updating custom quantity:', error);
      }
    },


    backToSelect(index) {
      this.customQty[index] = false;
      this.selectedQty[index] = 1;
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

    async handleCheckout(prevAddress) {
      try {
        if (prevAddress) {
          this.address.location = this.selectValue

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

        const cart = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/cart/${this.loggedUserId}.json`)).data

        let cartArray = []
        for (let i = 0; i < Object.entries(cart).length; i++) {
          cartArray.push(Object.entries(cart)[i][1])
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

        // const sessionResponse = await axios.post('http://localhost:3001/create-checkout-session', { cartArray, userName: user.name, userEmail: user.email, userId: this.loggedUserId, subscribed: this.loggedUserData.planid, customerPhoneNumber: this.loggedUserData.phone, location: this.address.location, deliveryCharge: this.deliveryCharge, weeklyOrder: 'cart' });
        const sessionResponse = await axios.post('https://delight-mart-server.vercel.app/create-checkout-session', { cartArray, userName: user.name, userEmail: user.email, userId: this.loggedUserId, subscribed: this.loggedUserData.planid, customerPhoneNumber: this.loggedUserData.phone, location: this.address.location, deliveryCharge: this.deliveryCharge, weeklyOrder: 'cart' });

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
        return 85
      } else if (distance <= 25) {
        return 100
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