<template>
    <div class="container mx-auto px-8 py-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <!-- Product Image and Details -->
        <div v-if="productD" class="flex w-full  justify-center bg-[#F5F5F5] p-4 rounded-lg">
          <img :src="productD.image_url" alt="Product Image" class="w-80 h-96">
        </div>
        <div v-if="productD" class="flex flex-col space-y-4">
          <h1 class="text-3xl font-bold">{{ productD.english_name }}</h1>
          <div class="flex items-center space-x-2">
            <div class="rating rating-md relative" >
              <button title="Rate Product" @click="showModal = true" class="w-full h-full z-10 absolute top-0 left-0"></button>
              <input v-if="allRates[0] !== undefined" ref="inputs" :checked="allRates[0] === 1" type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400" disabled/>
              <input v-if="allRates[0] === undefined" ref="inputs" :checked="allRates[0] === 1" type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400 opacity-[0.2]" disabled/>
              <input v-if="allRates[0] !== undefined" ref="inputs" :checked="allRates[0] === 2" type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400" disabled/>
              <input v-if="allRates[0] === undefined" ref="inputs" :checked="allRates[0] === 2" type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400 opacity-[0.2]" disabled/>
              <input v-if="allRates[0] !== undefined" ref="inputs" :checked="allRates[0] === 3" type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400" disabled/>
              <input v-if="allRates[0] === undefined" ref="inputs" :checked="allRates[0] === 3" type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400 opacity-[0.2]" disabled/>
              <input v-if="allRates[0] !== undefined" ref="inputs" :checked="allRates[0] === 4" type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400" disabled/>
              <input v-if="allRates[0] === undefined" ref="inputs" :checked="allRates[0] === 4" type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400 opacity-[0.2]" disabled/>
              <input v-if="allRates[0] !== undefined" ref="inputs" :checked="allRates[0] === 5" type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400" disabled/>
              <input v-if="allRates[0] === undefined" ref="inputs" :checked="allRates[0] === 5" type="radio" name="rating-7" class="mask mask-star-2 bg-orange-400 opacity-[0.2]" disabled/>
            </div>
            <p class="text-sm text-gray-500">({{ totalReviews }} reviews) |</p>
            <p v-if="productD.availability > 0" class="text-[#16a34a] text-xs">In Stock</p>
            <p v-if="productD.availability == 0" class="text-red-600 text-xs">Out Of Stock</p>
          </div>
          <div class="after text-lg text-red-500 font-bold">
            {{ productD.price }}
            <span class="text-xs  font-normal"> L.E</span>
          </div>
          <p class="text-lg text-gray-500">{{ productD.description }}</p>
          <hr/>
          <!-- Add to Cart and Wishlist Buttons -->
          <div class="flex items-center relative">
            <label for="quantity" class="font-semibold me-3">Quantity:</label>
            <button :disabled="this.quantity == 1" @click="this.quantity--" class="w-8 h-8 bg-white text-[#166534] border-2 border-solid border-gray-700">-</button>
            <input type="number" v-model="this.quantity" min="1" :max="productD.availability" class="border-y-2 border-solid h-8 border-gray-700 text-center focus:outline-none focus-within:outline-none">
            <span v-if="this.quantity > productD.availability" class="error-msg absolute text-[6px] lg:text-[10px] -bottom-[13px] left-0 text-red-700">Quantity you entered is more than our stock.</span>
            <button :disabled="this.quantity == productD.availability" @click="this.quantity++" class="w-8 h-8 bg-[#166534] text-white border-2 border-solid border-[#166534]">+</button>
          </div>
          <div class="flex items-center space-x-2 ">
            <button :disabled="isButtonDisabled" 
             @click="addToCart(productId, productD)" 
             :class="isButtonDisabled ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-[#166534] cursor-pointer'"
             class="bg-green-600 hover:bg-[#166534] text-white px-4 py-2 text-base rounded w-full">
              <span v-if="!isButtonDisabled">Add to Cart</span>
              <span v-else>Added to Cart</span>
            </button>
            <button title="Add To Wishlist" v-if="productD" class="text-red-500 hover:text-red-600 text-3xl">
              <svg @click="addToWishlist(productId, productD)"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor"
                class="size-9 cursor-pointer hover:fill-[#DB4444] transition-all duration-1000 ms-auto block mx-auto border-2 border-solid border-[#DB4444] rounded">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Customer Reviews Section with Updated Red Indicator -->
      <div class="mt-10">
        <h2 v-if="getReviews" class="text-2xl font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-[8px] before:-left-3 before:block before:w-2 before:h-4 before:rounded-sm pl-2">
          Customer Reviews
        </h2>
        <div class="space-y-4">
          <div v-for="review in getReviews" :key="review" class="border-t pt-4">
            <div class="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-7 stroke-stone-700	me-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <p class="font-semibold">{{ review[1].userId }}</p>
            </div>
            <div class="flex items-center mb-2">
              <div class="rating rating-sm relative" >
                <input :checked="review[1].rating == 1" type="radio" name="rating-5" class="mask mask-star-2 bg-yellow-400 cursor-auto" disabled/>
                <input :checked="review[1].rating == 2" type="radio" name="rating-5" class="mask mask-star-2 bg-yellow-400 cursor-auto" disabled/>
                <input :checked="review[1].rating == 3" type="radio" name="rating-5" class="mask mask-star-2 bg-yellow-400 cursor-auto" disabled/>
                <input :checked="review[1].rating == 4" type="radio" name="rating-5" class="mask mask-star-2 bg-yellow-400 cursor-auto" disabled/>
                <input :checked="review[1].rating == 5" type="radio" name="rating-5" class="mask mask-star-2 bg-yellow-400 cursor-auto" disabled/>
              </div>
            </div>
            <p class="text-sm text-gray-600">{{ review[1].comment }}</p>
          </div>
        </div>
        <div v-if="totalReviews" class="mt-4 flex items-center border-2 border-solid border-gray-800 w-fit rounded-md overflow-hidden">
          <button @click="prevPage" :disabled="currentPage === 1" class="bg-white text-gray-800 px-3 py-1 disabled:opacity-50 border-e-2 border-e-solid border-e-gray-800 hover:bg-gray-800 hover:text-white">Prev</button>
          <button @click="nextPage" :disabled="currentPage * reviewsPerPage >= totalReviews" class="bg-white text-gray-800 px-3 py-1  disabled:opacity-50 hover:bg-gray-800 hover:text-white">Next</button>
        </div>
      </div>
  
      <!-- Related Products Section with Updated Red Indicator -->
      <div class="mt-10">
        <h2 class="text-2xl font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-[8px] before:-left-3 before:block before:w-2 before:h-4 before:rounded-sm pl-2">
          Related Products
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <div v-for="relatedPrd in relatedPrds" :key="relatedPrd" class="text-center p-4 bg-[#F5F5F5] rounded-lg shadow relative">
            <button class="w-full h-full absolute top-0 left-0" @click="getRelatedPrdDetails(`${relatedPrd[0]}`)"></button>
            <div>
              <img :src="relatedPrd[1].image_url" alt="Related Product" class="h-32 mx-auto">
            </div>
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
        <div class="relative bg-[#166534] p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <button @click="showModal = false" class="absolute top-4 right-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 stroke-white	hover:stroke-red-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 class="text-2xl font-bold mb-4 text-center text-white">Rate Product</h2>
          <div class="flex justify-center mb-6">
              <div class="rating rating-lg relative" >
                <input @click="setRating(1)" type="radio" name="rating-8" class="mask mask-star-2 bg-yellow-400"/>
                <input @click="setRating(2)" type="radio" name="rating-8" class="mask mask-star-2 bg-yellow-400"/>
                <input @click="setRating(3)" type="radio" name="rating-8" class="mask mask-star-2 bg-yellow-400"/>
                <input @click="setRating(4)" type="radio" name="rating-8" class="mask mask-star-2 bg-yellow-400"/>
                <input @click="setRating(5)" type="radio" name="rating-8" class="mask mask-star-2 bg-yellow-400"/>
            </div>
          </div>
          <textarea v-model="this.comment" 
                    placeholder="Write your review..." 
                    class="resize-none	w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none transition duration-200 mb-4"
                    rows="4"></textarea>
          <div class="flex justify-center">
            <button @click="submitReview" class="bg-yellow-400 hover:bg-[#db4444] text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import axios from 'axios';
    import service from '@/mixins/service';

    export default {
        name: 'ProductDetail',
        data() {
          return {
              productD: null,
              productId: null,
              relatedPrds: [],
              getReviews: null,
              showModal: false,
              comment: '',
              timestamp: '',
              userId: 'bab69910f7dc80c',
              rating: 0,
              quantity: 1,
              newReview: {},
              currentPage: 1, 
              reviewsPerPage: 2,
              totalReviews: 0,
              commentD: null,
              prdRate: null,
              allRates: [],
              selectedRating: null,
              isButtonDisabled: false,
          };
        },
        methods: {
          setPage(page) {
            this.currentPage = page;
            this.displayReviews();
          },
          prevPage() {
            if (this.currentPage > 1) {
              this.currentPage--;
              this.displayReviews();
            }
          },
          nextPage() {
            const totalPages = Math.ceil(this.totalReviews / this.reviewsPerPage);
            if (this.currentPage < totalPages) {
              this.currentPage++;
              this.displayReviews();
            }
          },
          setRating(star) {
              this.rating = star;
          },
          async submitReview() {
            try {
                if (!this.rating) {
                    alert('Please provide a rating.');
                    return;
                }

                const newReview = {
                    comment: this.comment || '',
                    productId: this.productId,
                    timestamp: new Date().toISOString(),  
                    userId: this.userId, 
                    rating: this.rating
                };

                const response = await axios.post("https://dailymart-5c550-default-rtdb.firebaseio.com/comments.json", newReview);

                const reviewId = response.data.name;
                console.log(reviewId);
                  
                this.comment = '';
                this.rating = 0;
                this.showModal = false;

                window.location.reload();
            } catch (err) {
                console.error('Cannot Fetch Data', err);
            }
          },
          async displayReviews() {
            try {
              const response = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/comments.json')).data;
              const allReviews = Object.entries(response).filter(review => review[1].productId === this.productId);
    
              this.totalReviews = allReviews.length;
              
              const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
              const endIndex = startIndex + this.reviewsPerPage;
              this.getReviews = allReviews.slice(startIndex, endIndex);
              
              console.log(this.getReviews);
            } catch(err) {
              console.log("Cannot Fetch Data", err)
            }
          },
          async getProductDetails(productId) {
              try {
                  this.productD = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/products/${productId}.json`)).data;
                  this.relatedPrds = await service.methods.getAllProducts('', this.productD.catId, true)

                  if (this.relatedPrds.length >= 8) {
                      this.relatedPrds.length = 8;
                  }
                  // console.log(response)
              } catch(err) {
                  console.log(`Cannot Fetch Data`)
              }
          },
          getRelatedPrdDetails(id) {
              window.location.assign(id)
          },
          async getProductRate() {
            try {
              const response = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/comments.json')).data;
              this.commentD = Object.entries(response).filter( item => item[1].productId === this.productId);
              this.prdRate = this.commentD.forEach(comment => {
                this.allRates.push(comment[1].rating)
                this.allRates.sort((b, a) => a - b)
              });
            } catch(err) {
              console.log('Cannot Fetch Data')
            }
          },
          async addToCart(productId, product) {
            let flag = null
            try {
                flag = await service.methods.getSpeificProduct(this.userId, productId, 'cart')
                if (flag) {
                    try {
                        await service.methods.patchQuantity(this.userId, productId, 'cart', '+')
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                else {
                    try {
                        await service.methods.addTo_cart_wishlist_weekly(this.userId, productId, {
                            ...product,
                            quantity: 1
                        }, 'cart')
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            }
            catch (err) {
                console.log(err);
            } finally {
              this.isButtonDisabled = true;
            }
          },
          async addToWishlist(productId, product) {
            try {
                await service.methods.addTo_cart_wishlist_weekly(this.userId, productId, product, 'wishlist')
            }
            catch (err) {
                console.log(err);
            }
          },
        },
        async mounted() {
            this.productId = this.$route.params.id;
            await this.getProductDetails(this.productId);
            await this.displayReviews();
            await this.getProductRate();
        }
    };
  </script>
  
  <style scoped>
  
  </style>