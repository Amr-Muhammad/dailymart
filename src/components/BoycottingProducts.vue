<template>
  <div class="flex flex-col items-start">
    <!-- Header Section -->
    <header
      class="flex flex-col md:px-8 pt-24 pb-12 text-6xl font-black leading-tight text-emerald-900  min-h-[226px] max-md:px-5 max-md:pt-24 max-md:max-w-full max-md:text-4xl">
      <div class="flex flex-col items-center px-20 w-full max-w-[1480px] max-md:px-5 max-md:max-w-full max-md:text-4xl">
        <h1 class="max-w-full  md:w-[560px] max-md:max-w-full max-md:text-4xl">Discover Products</h1>
        <div class="relative flex justify-center mt-4 w-full max-w-md">
          <img class="w-14 pr-6 h-10" src="../assets/search (1).png" alt="">
          <input v-model="searchQuery" type="text" placeholder="Search products..."
            class="w-full text-lg md:text-2xl  pl-10 border rounded-md" />
        </div>
      </div>
    </header>
    <!-- Main Content Section -->
    <!-- <main
      class="flex flex-col items-center pb-7 w-full bg-zinc-50 shadow-[0px_4px_4px_rgba(0,0,0,0)] max-md:mt-10 max-md:max-w-full px-5"> -->
    <main
      class="flex flex-col items-center pb-7 w-full max-md:mt-10 max-md:max-w-full px-5">
      <div class="cards-container m-10 w-full" ref="productSection">
        <div class="card-grid">
          <div v-for="(card, id) in paginatedCards" :key="id" class="relative card bg-base-100 shadow-xl group">
            <div class="card-body">
              <h2 class="card-title">{{ card.english_name }}</h2>
            </div>
            <figure>
              <img :src="card.image_url" :alt="card.english_name" class="w-full h-32 object-contain" />
            </figure>
            <div
              class="absolute w-full inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
              <button @click="goToproductsPage(card.catId)" class="px-4 py-2 bg-white text-black rounded-md">local
                products</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination Controls -->
      <div class="pagination flex space-x-2">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          Previous
        </button>
        <span class="px-4 py-2">{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BoycottProducts',
  data() {
    return {
      cards: [],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 25,
    };
  },
  computed: {

    filteredCards() {
      const query = this.searchQuery.toLowerCase();
      return this.cards.filter(card => card.english_name.toLowerCase().includes(query));
    },
    // Paginat
    paginatedCards() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCards.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredCards.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/.json');
        const products = response.data.products;
        this.cards = Object.values(products).filter(product => product.boycott === true);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    goToproductsPage(catId) {
      this.$router.push(`/productsPage/${catId}`);
    },
    scrollToTop() {
  const productSection = this.$refs.productSection;
  if (productSection) {
    window.scrollTo({
      top: productSection.offsetTop - 250, 
            behavior: 'smooth',
    });
  }
},

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.scrollToTop();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.scrollToTop();
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 200px;
  overflow: hidden;
}

.card figure {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  flex-grow: 1;
}

.card img {
  max-width: 100%;
  max-height: 150px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.card:hover img {
  transform: scale(1.05);
}

@media (min-width: 640px) {
  .card-grid {
    grid-template-columns: repeat(auto-fill, minmax(calc(50% - 0.5rem), 1fr));
  }
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(auto-fill, minmax(calc(33.333% - 0.67rem), 1fr));
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(auto-fill, minmax(calc(25% - 0.75rem), 1fr));
  }
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>