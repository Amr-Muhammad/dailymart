<template>
  <div class="mx-auto animate__animated animate__backInDown bg-white m-14 p-6 rounded-lg shadow-lg w- md:w-8/12">
    <h2 class="text-3xl font-bold mb-4 flex items-center">
      <i class="fas fa-shopping-cart mr-2"></i>
      <p class="mt-2">My Cart</p>
    </h2>
    <div v-if="cart != null" class="text-right mt-6">
      <button class="text-red-600 hover:text-red-800" @click="clearCart()">Remove all</button>
    </div>
    <div class="bg-[#F0F2E8] p-4" v-if="cart != null">
      <div v-for="(item, index) in cart" :key="index"
        class="flex blocked-item items-center justify-between border-b border-white py-4 mb-4">
        <div class="flex items-center space-x-4">
          <img :src="item[1].image_url" alt="Product Image" class="w-24 mb-10 h-24 object-cover rounded"
            style="object-fit: contain;">
          <div class="flex flex-col">
            <h3 class="text-lg font-semibold">{{ item[1].english_name }}</h3>
            <p class="text-sm text-green-600">In Stock • Availability: {{ item[1].availability }}</p>
            <p class="text-md pt-6 text-emerald-600">Each : {{ item[1].price }} EGP</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div v-if="!customQty[index]">
            <select v-model="selectedQty[index]" class="border border-gray-300 rounded p-1"
              @change="handleQtyChange(index, item[0])">
              <option v-for="qty in 10" :key="qty" :value="qty">{{ qty }}</option>
              <option :value="11">10+</option>
            </select>
          </div>
          <div v-else>
            <input v-model.number="tempCustomQtyValue[index]" type="number" min="11" placeholder="11"
              class="border  border-gray-300 rounded p-1 w-16" />
            <button @click="updateCustomQty(index, item[0])"
              class="ml-2 text-sm bg-emerald-950 hover:bg-emerald-800 text-white rounded px-2">Update</button>
          </div>
        </div>
        <div class="text-right">
          <div class="text-lg font-bold">{{ calculateItemPrice(index) }}.00 EGP</div>
          <button @click="deleteItem(item[0])"
            class="mt-2 pt-1 md:text-md text-sm flex text-white p-1 rounded-lg bg-red-700 hover:bg-red-800">
            <p class="px-5 py-1">DELETE ITEM</p>
          </button>
        </div>
      </div>
      <div class="text-right mt-6">
        <p class="text-lg font-bold">Total: {{ calculateTotalPrice() }}.00 EGP</p>
      </div>
      <div class="flex justify-center">
        <button @click="handleCheckout()" class="mainGreenBtn mt-3">Checkout</button>
      </div>
    </div>
    <div v-if="cart == null" class="flex items-center justify-center flex-col">
      <img src="../assets/Empty-removebg-preview.png" alt="Empty Cart">
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
      userId: 'bab69910f7dc80c',
      selectedQty: [],
      customQty: [],
      customQtyValue: [],
      tempCustomQtyValue: [],
      isPriceUpdated: []
    };
  },

  computed: {
    ...mapState(['loggedUserId', 'loggedUserData']),
  },

  methods: {
    async getCart() {
      try {
        this.cart = await service.methods.get_cart_wishlist_weekly(this.loggedUserId, 'cart');
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
      const price = this.cart[index][1].price;
      const selectedQuantity = this.selectedQty[index];
      if (selectedQuantity === 11 && !this.isPriceUpdated[index]) {
        return 0;
      }
      if (selectedQuantity === 11 && this.isPriceUpdated[index]) {
        const confirmedCustomQty = this.customQtyValue[index] || 0;
        return price * confirmedCustomQty;
      }

      return price * selectedQuantity;
    },

    calculateTotalPrice() {
      return this.cart.reduce((total, item, index) => {
        const price = Number(item[1].price) || 0;
        let quantity = Number(this.selectedQty[index]) || 0;
        if (quantity === 11) {
          quantity = Number(this.tempCustomQtyValue[index]) || 0;
        }
        return total + (price * quantity);
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
        console.log('Quantity updated successfully without changing availability');
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    },

    async updateCustomQty(index, productId) {
      let customQuantity = this.tempCustomQtyValue[index];
      const availability = this.cart[index][1].availability;
      if (customQuantity < 11) {
        customQuantity = 0;
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
      } catch (error) {
        console.error('Error updating custom quantity:', error);
      }
    },



    async deleteItem(productId) {
      try {
        await service.methods.deleteItem_cart_wishlist_weekly(this.loggedUserId, productId, 'cart');
        this.getCart();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    },

    async clearCart() {
      try {
        await service.methods.clear_cart_wishlist_weekly(this.loggedUserId, 'cart');
        this.getCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    },

    async handleCheckout() {
      try {
        const cart = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/cart/${this.loggedUserId}.json`)).data;

        let cartArray = [];
        for (let i = 0; i < Object.entries(cart).length; i++) {
          cartArray.push(Object.entries(cart)[i][1]);
        }

        const user = {
          name: this.loggedUserData.firstName + ' ' + this.loggedUserData.lastName,
          email: this.loggedUserData.email,
          address: this.loggedUserData.address,
        };

        await axios.post('https://dailymart-5c550-default-rtdb.firebaseio.com/orders.json', {
          user: user,
          items: cartArray,
        });
        await service.methods.clear_cart_wishlist_weekly(this.loggedUserId, 'cart');
      } catch (error) {
        console.error('Error during checkout:', error);
      }
    },
  },

  mounted() {
    this.getCart();
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
<style>
@media (max-width:640px) {
  .blocked-item {
    display: block !important;
  }
}
</style>