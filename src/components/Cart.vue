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
          <!-- SVG code for cart icon -->
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
        <div v-for="(item, index) in cart" :key="index" class="flex blocked-item items-center justify-between border-b border-white py-4 mb-4">
          
          <!-- Item Details -->
          <div class="flex items-center space-x-4">
            <img :src="item[1].image_url" alt="Product Image" class="w-24 mb-10 h-24 object-cover rounded" />
            <div class="flex flex-col">
              <h3 class="text-lg font-semibold">{{ item[1].english_name }}</h3>
              <p class="text-sm text-green-600">In Stock • Availability: {{ item[1].availability }}</p>
<p v-if="item[1].onsale" class="before text-lg text-stone-400 relative before:content-[''] before:absolute before:bg-[#a8a29e] before:block before:w-0.5 before:h-7 before:rotate-90 before:left-4 before:top-0">
    {{ item[1].price }} EGP
  </p>
  <p class="text-md text-emerald-600">
    Each: {{ item[1].onsale ? (item[1].price - (item[1].price * item[1].onsale.split('%')[0] / 100)).toFixed(2) : item[1].price }} EGP
  </p>            </div>
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
    <input v-model.number="tempCustomQtyValue[index]" type="number" min="10" placeholder="10" class="border border-gray-300 rounded p-1 w-16" />
    <button @click="updateCustomQty(index, item[0])" class="ml-2 mt-4 text-sm bg-emerald-950 hover:bg-emerald-800 text-white rounded px-2">Update</button>
    <button @click="backToSelect(index)" class="ml-2 text-sm bg-red-500 hover:bg-red-700 text-white rounded px-2">Clear</button>
  </div>
</div>


          <!-- Item Price and Actions -->
           <div class="text-right">
          <div class="text-lg font-bold">{{ calculateItemPrice(index) }} EGP</div>
          <button @click="deleteItem(item[0])" class="mt-2 pt-1 md:text-md text-sm flex text-white p-1 rounded-lg bg-red-700 hover:bg-red-800">
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

  <!-- Address Verification -->
  <div v-if="checkoutPopup" class="popupContainer fixed bottom-0 h-screen left-0 right-0 z-50 bg-gray-500 top-0 bg-opacity-90 flex items-center">
    <div class="popup p-10 pb-5 shadow w-5/12 mx-auto transform  bg-[#FBFBFB] rounded-lg">
      <!-- Address Form Logic Here -->
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
        // console.log(userResponse);


        const user = {
          // name: userResponse.data.firstName + ' ' + userResponse.data.lastName,
          // email: userResponse.data.email
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