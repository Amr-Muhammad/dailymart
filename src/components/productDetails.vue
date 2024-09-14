<template>
  <div class="container mx-auto px-8 py-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex justify-center bg-[#F5F5F5] p-4 rounded-lg">
        <img :src="product.image" alt="Product Image" class="w-64 h-64 object-cover">
      </div>
      <div class="flex flex-col space-y-4">
        <h1 class="text-3xl font-bold">{{ product.name }}</h1>
        <p class="text-lg text-gray-500">{{ product.description }}</p>
        <div class="flex items-center space-x-4">
          <span class="text-2xl font-semibold text-green-600">{{ product.price }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <label for="quantity" class="font-semibold">Quantity:</label>
          <input type="number" v-model="quantity" min="1" class="w-16 border border-gray-300 rounded">
        </div>
        <button @click="addToCart" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
    <div class="mt-10">
      <h2 class="text-2xl font-bold">Customer Reviews</h2>
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
    <div class="mt-10">
      <h2 class="text-2xl font-bold">Related Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id"
          class="text-center p-4 bg-[#F5F5F5] rounded-lg shadow">
          <img :src="relatedProduct.src" alt="Related Product" class="w-32 h-32 mx-auto">
          <p class="mt-2 font-semibold">{{ relatedProduct.name }}</p>
          <p class="text-green-600">{{ relatedProduct.price }}</p>
        </div>
      </div>
    </div>
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
export default {
  data() {
    return {
      product: {
        name: 'Big Chips',
        description: 'A tasty snack for any occasion.',
        price: 50,
        image: require('../assets/prd2.png')
      },
      quantity: 1,
      reviews: [
        { id: 1, name: 'ahmed', comment: 'Great product!', rating: 5, image: 'https://via.placeholder.com/50' },
        { id: 2, name: 'amr', comment: 'Tasty and fresh.', rating: 4, image: 'https://via.placeholder.com/50' },
      ],
      relatedProducts: [
        { src: require('../assets/prd1.png'), id: 1, name: 'Ponky Chips', price: 50 },
        { src: require('../assets/prd3.png'), id: 3, name: 'McvitieS Digestive Biscuits', price: 60 },
        { src: require('../assets/prd4.png'), id: 4, name: 'Abu Auf Snacks', price: 150 },
        { src: require('../assets/prd5.png'), id: 5, name: 'Lambada', price: 40 },
        { src: require('../assets/prd6.png'), id: 6, name: 'Big Chips', price: 50 },
        { src: require('../assets/prd7.png'), id: 7, name: 'McvitieS Digestive Biscuits', price: 50 },
        { src: require('../assets/prd1.png'), id: 8, name: 'Ponky Chips', price: 30 },
        { src: require('../assets/prd7.png'), id: 9, name: 'McvitieS Digestive Biscuits', price: 50 },
      ],
      showModal: false,
      newReview: { comment: '' },
      rating: 0,
    };
  },
  methods: {
    setRating(star) {
      this.rating = star;
    },
    submitReview() {
      if (this.newReview.comment && this.rating) {
        const newReview = {
          id: this.reviews.length + 1,
          name: 'Anonymous',
          comment: this.newReview.comment,
          rating: this.rating,
          image: 'https://via.placeholder.com/50'
        };
        this.reviews.push(newReview);
        this.newReview.comment = '';
        this.rating = 0;
        this.showModal = false;
      } else {
        alert('Please provide a review and rating.');
      }
    },
    addToCart() {
      alert(`${this.product.name} added to cart!`);
    }
  }
};
</script>

<style scoped></style>