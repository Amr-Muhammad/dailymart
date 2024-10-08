<template>
  <div class="container mx-auto px-8 py-10">

    <!-- Product Image and Details -->

    <div class="card grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

      <div v-if="productD" class="flex w-full justify-center bg-[#F5F5F5] p-4 rounded-lg relative">

        <button title="Add To Wishlist" v-if="productD"
          class="text-red-500 hover:text-red-600 text-3xl absolute right-[25px] top-[25px]">
          <svg @click="addToWishlist(productId, productD)" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6 cursor-pointer hover:fill-[#DB4444] transition-all duration-1000 ms-auto block mx-auto hover:scale-[1.1]">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>

        <button title="Add to Weekly Order" v-if="productD && productD.availability > 0 && subscribed"
          class="bg-white p-1 rounded-full flex items-center justify-center absolute left-[25px] top-[25px]">
          <svg svg class="hover:scale-[1.1]" @click="addToWeeklyOrder(productId, productD, $event)" width="20px"
            height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
            </g>
            <g id="SVGRepo_iconCarrier">
              <g opacity="0.5">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H21C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM2.25 10C2.25 9.58579 2.58579 9.25 3 9.25H21C21.4142 9.25 21.75 9.58579 21.75 10C21.75 10.4142 21.4142 10.75 21 10.75H3C2.58579 10.75 2.25 10.4142 2.25 10ZM2.25 14C2.25 13.5858 2.58579 13.25 3 13.25H10C10.4142 13.25 10.75 13.5858 10.75 14C10.75 14.4142 10.4142 14.75 10 14.75H3C2.58579 14.75 2.25 14.4142 2.25 14ZM2.25 18C2.25 17.5858 2.58579 17.25 3 17.25H10C10.4142 17.25 10.75 17.5858 10.75 18C10.75 18.4142 10.4142 18.75 10 18.75H3C2.58579 18.75 2.25 18.4142 2.25 18Z"
                  fill="#000000"></path>
              </g>
              <path
                d="M14 15.0361C14 16.2709 15.4849 17.5789 16.5203 18.3408C16.9546 18.6603 17.1717 18.8201 17.5 18.8201C17.8283 18.8201 18.0454 18.6603 18.4797 18.3408C19.5151 17.5789 21 16.2709 21 15.0361C21 13.0282 19.0749 12.2786 17.5 13.8296C15.9251 12.2786 14 13.0282 14 15.0361Z"
                fill="#000000"></path>
            </g>
          </svg>
        </button>

        <img :src="productD.image_url" alt="Product Image" class="w-80 h-96">

      </div>

      <div v-if="productD" class="flex flex-col ">

        <h1 class="text-3xl font-bold">{{ productD.english_name }}</h1>

        <div class="flex space-x-0 md:space-x-2 my-4 flex-col md:flex-row items-start md:items-center">

          <div class="rating rating-md relative my-1">
            <button title="Rate Product" @click="showModal = true"
              class="w-full h-full z-10 absolute top-0 left-0"></button>
            <input v-for="star in 5" :key="star" ref="inputs" :checked="Math.round(allRates) === star" type="radio"
              :name="'rating-7'" class="mask mask-star-2 bg-orange-400" :class="{ 'opacity-[0.2]': allRates === 0 }"
              disabled />
          </div>

          <p class="text-base text-gray-500 my-1">({{ totalReviews }} reviews)</p>
          <p v-if="productD.availability > 0" class="text-[#16a34a] text-base my-1"> | In Stock</p>
          <p v-if="productD.availability == 0" class="text-red-600 text-base my-1"> | Out Of Stock</p>

        </div>

        <div class="flex items-center gap-3 my-4">
          <div v-if="this.prdOnSale" class="after text-xl font-bold">

            {{ productD.onsale.split('%').length ==
              2 ? productD.price - (productD.onsale.split('%')[0] * productD.price /
                100) :
              productD.price
            }}

            <span class="text-xs font-normal">L.E</span>

          </div>

          <div :class="{
            'before text-md relative before:absolute before:bg-[#DB4444] before:block before:w-0.5 before:h-7 before:rotate-90 before:left-4 before:top-0': this.prdOnSale
          }" class="text-xl font-bold">

            {{ productD.price }}

            <span class="text-xs font-normal">L.E</span>

          </div>
        </div>

        <p class="text-xl text-gray-600 my-4">{{ productD.description }}</p>
        <hr />
        <!-- Add to Cart and Wishlist Buttons -->
        <div class="flex items-center relative my-4">
          <label for="quantity" class="font-semibold me-3">Quantity:</label>

          <button :disabled="this.quantity == 1 || productD.availability <= 0" @click="this.quantity--"
            class="w-8 h-8 bg-white text-[#166534] border-2 border-solid border-gray-700">-</button>

          <input :disabled="productD.availability <= 0" type="number" v-model="this.quantity"
            :min="productD.availability === 0 ? 0 : 1" :max="productD.availability"
            class="border-y-2 border-solid h-8 border-gray-700 text-center focus:outline-none focus-within:outline-none">

          <span v-if="this.quantity > productD.availability"
            class="error-msg absolute text-[6px] lg:text-[10px] -bottom-[13px] left-0 text-red-700">Quantity you entered
            is more than our stock.</span>

          <button :disabled="this.quantity == productD.availability || productD.availability <= 0"
            @click="this.quantity++"
            class="w-8 h-8 bg-[#166534] text-white border-2 border-solid border-[#166534]">+</button>
        </div>

        <!-- <div class="flex items-center space-x-2 my-4">

          <button :disabled="isButtonDisabled || productD.availability <= 0"
            @click="addToCart(productId, productD)" 
            :class="{
              'bg-gray-500 hover:bg-gray-500 cursor-not-allowed': isButtonDisabled || productD.availability <= 0,
              'bg-green-600 hover:bg-[#166534] cursor-pointer': !isButtonDisabled && productD.availability > 0
            }"
            class="text-white px-4 py-2 text-base rounded w-full">

            <span v-if="productD.availability > 1 && !isButtonDisabled">Add to Cart</span>

            <span v-else-if="productD.availability > 0 && isButtonDisabled" class="text-white">Added to Cart</span>

            <span v-else class="text-white">Out of Stock</span>

          </button>

        </div> -->

        <div
          class="cart-btn group border border-[#2525257c] w-full font-bold text-center flex gap-3 justify-center transition-all duration-300">
          <button @click="addToCart(productId, productD)"
            :disabled="clickedProducts[productId] || productD.availability <= 0"
            class="flex items-center justify-center gap-2 w-full p-2">

            <template v-if="clickedProducts[productId]">
              <span>Adding to cart ...</span>
              <span class="loading loading-spinner w-[30px]"></span>
            </template>
            <template v-else-if="productD.availability > 0">
              Add To Cart
              <svg class="stroke-current text-black group-hover:text-white" width="30px" height="30px"
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                transform="matrix(-1, 0, 0, 1, 0, 0)">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="" stroke-width="1">
                </g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                    stroke="currentColor" stroke-width="0.84"></path>
                  <path
                    d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                    stroke="currentColor" stroke-width="0.84"></path>
                  <path
                    d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                    stroke="currentColor" stroke-width="0.84" stroke-linecap="round">
                  </path>
                </g>
              </svg>
            </template>
            <template v-else>
              Out Of Stock
            </template>
          </button>
        </div>
      </div>

    </div>

    <!-- Customer Reviews Section with Updated Red Indicator -->

    <div class="mt-10">

      <h2 v-if="getReviews && getReviews.length > 0"

    class="text-2xl font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-[8px] before:-left-3 before:block before:w-2 before:h-4 before:rounded-sm pl-2">
    Customer Reviews
</h2>



      <div class="space-y-4">

        <div v-for="(review, index) in getReviews" :key="review[0]" class="border-t pt-4">

          <div class="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
              stroke="currentColor" class="size-7 stroke-stone-700	me-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <p class="font-semibold text-lg">{{ review[1].customerName }}</p>
          </div>

          <div class="flex items-center mb-2">
            <div class="rating rating-sm relative">
              <input v-for="star in 5" :key="star" :name="'rating-' + index" :value="star"
                :checked="review[1].rating === star" type="radio" class="mask mask-star-2 bg-yellow-400 cursor-auto"
                disabled />
            </div>
          </div>

          <p class="text-lg text-gray-600">{{ review[1].comment }}</p>

        </div>

      </div>

      <div v-if="totalReviews"
        class="mt-4 flex items-center border-2 border-solid border-gray-800 w-fit rounded-md overflow-hidden">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="bg-white text-gray-800 px-3 py-1 disabled:opacity-50 border-e-2 border-e-solid border-e-gray-800 hover:bg-gray-800 hover:text-white">Prev</button>
        <button @click="nextPage" :disabled="currentPage * reviewsPerPage >= totalReviews"
          class="bg-white text-gray-800 px-3 py-1  disabled:opacity-50 hover:bg-gray-800 hover:text-white">Next</button>
      </div>

    </div>

    <!-- Related Products Section with Updated Red Indicator -->

    <div class="mt-10">

      <h2
        class="text-2xl font-bold relative before:content-[''] before:absolute before:bg-[#DB4444] before:top-[8px] before:-left-3 before:block before:w-2 before:h-4 before:rounded-sm pl-2">
        Related Products
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">

        <div v-for="relatedPrd in relatedPrds" :key="relatedPrd[0]"
          class="text-center p-4 bg-[#F5F5F5] rounded-lg shadow relative">

          <button class="w-full h-full absolute top-0 left-0"
            @click="getRelatedPrdDetails(`${relatedPrd[0]}`)"></button>
          <div>
            <img :src="relatedPrd[1].image_url" alt="Related Product" class="h-32 mx-auto">
          </div>
          <p class="mt-2 font-semibold">{{ relatedPrd[1].english_name }}</p>

        </div>

      </div>

    </div>

    <!-- Rating Modal -->

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">

      <div class="relative bg-[#166534] p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <button @click="showModal = false" class="absolute top-4 right-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6 stroke-white	hover:stroke-red-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 class="text-2xl font-bold mb-4 text-center text-white">Rate Product</h2>

        <div class="flex justify-center mb-6">
          <div class="rating rating-lg relative">
            <input v-for="star in 5" :key="star" :value="star" type="radio" :name="'rating-8'"
              class="mask mask-star-2 bg-yellow-400" :checked="star <= selectedRating" @click="setRating(star)"
              :class="{ 'opacity-[1]': star <= selectedRating, 'opacity-[0.2]': star > selectedRating }" />
          </div>
        </div>

        <textarea v-model="this.comment" placeholder="Write your review..."
          class="resize-none	w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none transition duration-200 mb-4"
          rows="4"></textarea>

        <div class="flex justify-center">
          <button @click="submitReview"
            class="bg-yellow-400 hover:bg-[#db4444] text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200">
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
import Swal from 'sweetalert2';
import { mapState } from 'vuex';

export default {
  name: 'ProductDetail',

  data() {
    return {
      productD: null,
      productId: null,
      relatedPrds: [],
      allReviews: null,
      getReviews: null,
      showModal: false,
      prdOnSale: null,
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
      clickedProducts: {},
      subscribed: null,
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

    setRating(star, rating) {
      this.rating = star;
      this.selectedRating = rating;
    },

    async submitReview() {
      try {
        if (!this.rating) {
          alert('Please provide a rating.');
          return;
        }

        let newReview = {
          comment: this.comment || '',
          productId: this.productId,
          timestamp: new Date().toISOString(),
          userId: this.loggedUserId,
          rating: this.rating,
          customerName: this.loggedUserData.firstName + ' ' + this.loggedUserData.lastName
        };

        const response = await axios.post("https://dailymart-5c550-default-rtdb.firebaseio.com/comments.json", newReview);

        const reviewId = response.data.name;
        console.log(newReview);
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
        console.log(allReviews);

        const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
        const endIndex = startIndex + this.reviewsPerPage;
        this.getReviews = allReviews.slice(startIndex, endIndex);

        console.log(this.getReviews);
      } catch (err) {
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
        this.relatedPrds = this.relatedPrds.filter(([key,]) => key != productId)

        if (this.productD.onsale) {
          this.prdOnSale = this.productD.onsale;
        }
        // console.log(this.prdOnSale)
      } catch (err) {
        console.log(`Cannot Fetch Data`)
      }
    },

    getRelatedPrdDetails(id) {
      window.location.assign(id)
    },

    async getProductRate() {
  try {
    const response = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/comments.json')).data;

    this.commentD = Object.entries(response).filter(item => item[1].productId === this.productId);

    if (this.commentD.length > 0) {
      const totalRatings = this.commentD.reduce((sum, comment) => {
        return sum + parseFloat(comment[1].rating);
      }, 0);

      const averageRating = totalRatings / this.commentD.length;

      this.allRates = Math.round(averageRating);

      // تحديث المنتج في قاعدة البيانات
      await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/products/${this.productId}.json`, {
        rating: this.allRates // تحديث حقل التقييم
      });
    } else {
      this.allRates = 0;

      // تعيين 0 إذا لم يكن هناك تقييمات
      await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/products/${this.productId}.json`, {
        rating: 0 // تعيين القيمة 0
      });
    }

  } catch (err) {
    console.log('Cannot Fetch Data');
    this.allRates = 0;
  }
},


    async addToCart(productId, product) {
      this.clickedProducts[productId] = true

      let flag = null
      try {
        flag = await service.methods.getSpeificProduct(this.loggedUserId, productId, 'cart')
        if (flag) {
          try {
            await service.methods.patchQuantity(this.loggedUserId, productId, 'cart', '+')
          }
          catch (err) {
            console.log(err);
          }

        }
        else {
          try {
            await service.methods.addTo_cart_wishlist_weekly(this.loggedUserId, productId, {
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
      }
      finally {
        Swal.fire({
          html: `
                              <div class="flex items-center gap-2">
                              <svg class="text-green-800" fill="#ffffff"  width="25px" height="25px" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#166534">
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                              <title></title>
                                  <path
                                      d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z">
                                  </path>
                                  </g>
                                  </svg>
                                  <p>Product successfully added to your shopping cart.</p>
                                    </div>
                      `
          ,
          position: "top",
          // icon: "success",
          // title: "Product successfully added to your shopping cart",
          showConfirmButton: false,
          background: '#166534',
          timer: 1500,
          width: 'auto', // Keeps the width flexible
          padding: '0.5rem', // Slight padding for a slim look
          color: '#fff', // White text color
          showClass: {
            popup: `
                                      animate__animated
                                      animate__fadeInDown
                                      animate__faster
          `
          },
          hideClass: {
            popup: `
                                  animate__animated
                                  animate__fadeOutUp
                                  animate__faster
          `
          },
          willOpen: () => {
            document.body.style.pointerEvents = 'none'; // Disable clicks
          },
          willClose: () => {
            document.body.style.pointerEvents = 'auto'; // Re-enable clicks
          }
        });
        this.clickedProducts[productId] = false
        delete this.clickedProducts[productId]
      }
    },

    async addToWishlist(productId, product) {
      try {
        await service.methods.addTo_cart_wishlist_weekly(this.loggedUserId, productId, product, 'wishlist')
      }
      catch (err) {
        console.log(err);
      } finally {
        Swal.fire({
          html: `
                              <div class="flex items-center gap-2">
                              <svg class="text-green-800" fill="#ffffff"  width="25px" height="25px" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#166534">
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                              <title></title>
                                  <path
                                      d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z">
                                  </path>
                                  </g>
                                  </svg>
                                  <p>Product successfully added to your Wishlist.</p>
                                    </div>
              `
          ,
          position: "top",
          // icon: "success",
          // title: "Product successfully added to your shopping cart",
          showConfirmButton: false,
          background: '#166534',
          timer: 1500,
          width: 'auto', // Keeps the width flexible
          padding: '0.5rem', // Slight padding for a slim look
          color: '#fff', // White text color
          showClass: {
            popup: `
                              animate__animated
                              animate__fadeInDown
                              animate__faster
  `
          },
          hideClass: {
            popup: `
                          animate__animated
                          animate__fadeOutUp
                          animate__faster
  `
          }
        });
      }
    },

    async addToWeeklyOrder(productId, product, event) {
      event.target.style.cursor = 'wait'
      let flag = null
      try {
        flag = await service.methods.getSpeificProduct(this.loggedUserId, productId, 'weeklyorders')
        if (flag) {
          try {
            await service.methods.patchQuantity(this.loggedUserId, productId, 'weeklyorders', '+')
          }
          catch (err) {
            console.log(err);
          }
        }
        else {
          try {
            await service.methods.addTo_cart_wishlist_weekly(this.loggedUserId, productId, {
              ...product,
              addedAt: new Date(),
              quantity: 1
            }, 'weeklyorders')
          }
          catch (err) {
            console.log(err);
          }
        }
      }
      catch (err) {
        console.log(err);
      }
      finally {
        Swal.fire({
          html: `
                              <div class="flex items-center gap-2">
                              <svg class="text-green-800" fill="#ffffff"  width="25px" height="25px" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#166534">
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                              <title></title>
                                  <path
                                      d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z">
                                  </path>
                                  </g>
                                  </svg>
                                  <p>Product successfully added to your Weekly Order List.</p>
                                    </div>
              `
          ,
          position: "top",
          // icon: "success",
          // title: "Product successfully added to your shopping cart",
          showConfirmButton: false,
          background: '#166534',
          timer: 1500,
          width: 'auto', // Keeps the width flexible
          padding: '0.5rem', // Slight padding for a slim look
          color: '#fff', // White text color
          showClass: {
            popup: `
                              animate__animated
                              animate__fadeInDown
                              animate__faster
  `
          },
          hideClass: {
            popup: `
                          animate__animated
                          animate__fadeOutUp
                          animate__faster
  `
          }
        });
        event.target.style.cursor = 'pointer'
      }
    },
    async isUserSubscribed() {
        this.subscribed = this.loggedUserData.planid
    }

  },

  watch: {
    'productD.availability'(newVal) {
      if (newVal === 0) {
        this.quantity = 0;
      }
    }
  },

  async mounted() {
    this.isUserSubscribed()
    this.productId = this.$route.params.id;
    await this.getProductDetails(this.productId);
    await this.displayReviews();
    await this.getProductRate();
    if (this.productD.availability === 0) {
      this.quantity = 0;
    }
  },
  computed: {
    ...mapState(['loggedUserData', 'loggedUserId'])
  }
};
</script>

<style scoped>
.card:hover .cart-btn {
  color: white !important;
  background-color: #252525;
}

.card:hover .stroke-current {
  color: white !important;
}

.card:hover .whiteSvg {
  fill: white;
}
</style>