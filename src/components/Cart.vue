<template>
  <div class="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold mb-4 flex items-center">
      <i class="fas fa-shopping-cart  mr-2"></i>
      <!-- <img class="w-14 h-14 p-2" src="../assets/add-to-basket.png"/> -->
      <p class="mt-2">My Cart</p>
    </h2>

    <div v-if="cart != null">
      <div v-for="(item, index) in cart" :key="index"
        class="flex items-center justify-between border-b border-gray-200 py-4">
        <div class="flex items-center space-x-4">
          <img :src="item.image_url" alt="Product Image" class="w-20 h-20 object-cover rounded">
          <div>
            <h3 class="text-lg font-semibold">{{ item.english_name }}</h3>
            <p class="text-sm text-green-600">In Stock • Availability: {{ item.amount }}</p>
            <div class="flex items-center space-x-2 mt-2">
              <label for="quantity" class="text-sm">Qty:</label>
              <select v-model="item.amount" class="border border-gray-300 rounded p-1">
                <option v-for="qty in 10" :key="qty" :value="qty">{{ qty }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text-right">
          <!-- <p class="text-lg font-bold">{{ formatCurrency(item.price) }}</p> -->
          <p class="text-lg font-bold">{{ item.price }}.00 EGP</p>
          <button @click="removeItem()"
            class="mt-2 pt-1 md:text-md  text-sm flex text-white p-1 rounded-lg bg-red-700 hover:bg-red-800">
            <i class="fas fa-trash-alt">
              <!-- <img class="md:w-6 w-8 md:h-6 h-6 pr-1" src="../assets/delete.png" alt=""> -->
            </i> DELETE ITEM
          </button>
        </div>
      </div>
    </div>

    <div class="text-right mt-6">
      <button class="text-red-600 underline hover:text-red-800" @click="clearCart()">Remove all</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CartProducts',
  data() {
    return {
      cart: null,
      userId: 'bab69910f7dc80c'
    }
  },
  methods: {
    // formatCurrency(value) {
    //   return `EGP ${value.toFixed(2)}`;
    // }
    // ,
    async removeItem(productId) {
      let res = (await axios.delete(`https://dailymart-5c550-default-rtdb.firebaseio.com/cart/${this.userId}/${productId}.json`))
      console.log(res);
      this.getCart()
    },
    async clearCart() {
      let res = (await axios.delete(`https://dailymart-5c550-default-rtdb.firebaseio.com/cart/${this.userId}/.json`))
      console.log(res);
      this.getCart()
    },
    async getCart() {
      this.cart = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/cart/${this.userId}.json`)).data
      console.log(Object.values(this.cart));
    }
  },

  mounted() {
    this.getCart()
  }
};
</script>