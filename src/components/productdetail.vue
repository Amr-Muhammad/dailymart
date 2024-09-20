<template>
  <div class="container mx-auto px-8 py-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Product Image and Details -->
      <div v-if="productD" class="flex w-full  justify-center bg-[#F5F5F5] p-4 rounded-lg">
        <img :src="productD.image_url" alt="Product Image" class="w-80 h-96">
        <!-- <img :src="product.image" alt="Product Image" class="w-64 h-64 object-cover"> -->
      </div>
      <div v-if="productD" class="flex flex-col space-y-4">
        <h1 class="text-3xl font-bold">{{ productD.english_name }}</h1>
        <!-- Display rating and number of reviews -->
        <div class="flex items-center space-x-2">
          <p class="text-lg font-semibold text-yellow-400">
            ★ {{ averageRating.toFixed(1) }} / 5
          </p>
          <p class="text-sm text-gray-500">({{ reviewsCount }} reviews)</p>
        </div>
        <p class="text-lg text-gray-500">{{ productD.description }}</p>
        <div class="after text-lg text-red-500 font-bold">
          {{ productD.price }}
          <span class="text-xs  font-normal"> L.E</span>
        </div>
        <div class="flex items-center space-x-4">
          <label for="quantity" class="font-semibold">Quantity:</label>
          <input type="number" v-model="productD.availability" min="1" :max="productD.availability"
            class="w-16 border border-gray-300 rounded">
        </div>
        <!-- Add to Cart and Wishlist Buttons -->
        <div class="flex items-center space-x-2">
          <button @click="addToCart" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm rounded">
            Add to Cart
          </button>
          <button @click="addToWishlist" class="text-red-500 hover:text-red-600 text-3xl">
            <span class="inline-block">&#9829;</span> <!-- Unicode Heart -->
          </button>
        </div>
      </div>
    </div>

    <!-- Customer Reviews Section with Updated Red Indicator -->
    <div class="mt-10">
      <h2
        class="text-2xl font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-[8px] before:-left-3 before:block before:w-2 before:h-4 before:rounded-sm pl-2">
        Customer Reviews ({{ reviewsCount }})
      </h2>
      <div class="space-y-4">
        <div v-for="review in reviews" :key="review.id" class="border-t pt-4">
          <div class="flex items-center mb-2">
            <img :src="review.image" alt="User Image" class="w-10 h-10 rounded-full mr-3">
            <p class="font-semibold">{{ review.name }}</p>
          </div>
          <div class="flex items-center mb-2">
            <span class="text-yellow-400">
              <span v-for="star in review.rating" :key="star">★</span>
            </span>
          </div>
          <p class="text-sm text-gray-600">{{ review.comment }}</p>
        </div>
      </div>
      <div class="mt-4">
        <button @click="showModal = true"
          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
          Rate Product
        </button>
      </div>
    </div>

    <!-- Related Products Section with Updated Red Indicator -->
    <div class="mt-10">
      <h2
        class="text-2xl font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-[8px] before:-left-3 before:block before:w-2 before:h-4 before:rounded-sm pl-2">
        Related Products
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        <div v-for="relatedPrd in relatedPrds" :key="relatedPrd"
          class="text-center p-4 bg-[#F5F5F5] rounded-lg shadow relative">
          <button class="w-full h-full absolute top-0 left-0"
            @click="getRelatedPrdDetails(`${relatedPrd[0]}`)"></button>
          <img :src="relatedPrd[1].image_url" alt="Related Product" class="w-32 h-32 mx-auto">
          <p class="mt-2 font-semibold">{{ relatedPrd[1].english_name }}</p>
          <div class="after text-lg text-red-500 font-bold">
            {{ relatedPrd[1].price }}
            <span class="text-xs  font-normal"> L.E</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Rating Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div class="relative bg-green-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <button @click="showModal = false" class="absolute top-4 right-4 text-white hover:text-red-500">
          ✖
        </button>
        <h2 class="text-2xl font-bold mb-4 text-center text-white">Rate our product</h2>
        <div class="flex justify-center mb-6">
          <span v-for="star in 5" :key="star" @click="setRating(star)"
            class="text-4xl cursor-pointer transition-colors duration-200"
            :class="star <= rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
        </div>
        <textarea v-model="newReview.comment" placeholder="Write your review..."
          class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-200 mb-4"
          rows="4"></textarea>
        <div class="flex justify-center">
          <button @click="submitReview"
            class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/mixins/service';
import axios from 'axios';
export default {
  name: 'ProductDetail',
  data() {
    return {
      productD: null,
      productId: null,
      relatedPrds: [],
      reviews: [
        { id: 1, name: 'ahmed', comment: 'Great product!', rating: 5, image: 'https://via.placeholder.com/50' },
        { id: 2, name: 'amr', comment: 'Tasty and fresh.', rating: 4, image: 'https://via.placeholder.com/50' },
      ],
      showModal: false,
      newReview: { comment: '' },
      rating: 0,
    };
  },
  computed: {
    reviewsCount() {
      return this.reviews.length;
    },
    averageRating() {
      if (this.reviews.length === 0) return 0;
      const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      return totalRating / this.reviews.length;
    }
  },
  methods: {
    setRating(star) {
      this.rating = star;
    },
    submitReview() {
      const comment = this.newReview.comment || '';
      if (this.rating) {
        const newReview = {
          id: this.reviews.length + 1,
          name: 'Anonymous',
          comment: comment,
          rating: this.rating,
          image: 'https://via.placeholder.com/50'
        };
        this.reviews.push(newReview);
        this.newReview.comment = '';
        this.rating = 0;
        this.showModal = false;
      } else {
        alert('Please provide a rating.');
      }
    },
    //   addToCart() {
    //     alert(${this.product.name} added to cart!);
    //   },
    //   addToWishlist() {
    //     alert(${this.product.name} added to wishlist!);
    //   },
    async getProductDetails(productId) {
      try {
        this.productD = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/products/${productId}.json`)).data;
        this.relatedPrds = await service.methods.getAllProducts('', this.productD.catId, true)
        if (this.relatedPrds.length >= 8) {
          this.relatedPrds.length = 8;
        }
      } catch (err) {
        console.log(`Cannot Fetch Data`)
      }
    },
    getRelatedPrdDetails(id) {
      window.location.assign(id)
    },
    async addTocart() {
      try {
        await service.methods.addTo_cart_wishlist_weekly(this.productId, this.productD, 'cart')
      }
      catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    this.productId = this.$route.params.id;
    await this.getProductDetails(this.productId);
  }
};
</script>

<style scoped></style>