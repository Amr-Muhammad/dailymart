<template>
    <section class="garyBg w-full ">
    <div class="max-w-7xl  mx-auto  p-8">
      <h2 class="text-4xl font-bold text-gray-800 mt-20 mb-4">Top Picks for You</h2>
      <p class="text-lg text-green-600 mb-8">Handpicked daily essentials</p>
  
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="bg-white rounded-lg shadow-lg  overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <img :src="card.imageSrc" alt="Card Image" class="w-full h-48 object-cover">
          <div class="p-6">
            <p class="text-sm font-semibold text-green-600">{{ card.subtitle }}</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-2">{{ card.title }}</h3>
            <p class="text-gray-600 mt-2">{{ card.description }}</p>
            <router-link :to="card.buttonLink" class="inline-block mt-4 text-green-600 hover:text-green-800 font-medium">
              {{ card.buttonText }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    </section>
  </template>
  
  <script>

  export default {
    name: 'TopPicksForYou',
    data() {
      return {
        cards: [
          {
            imageSrc: require('../assets/Imagelummi.png'),
            subtitle: 'Freshness Guaranteed',
            title: 'Shop Fresh Groceries Today',
            description: 'Find everything you need',
            buttonText: 'Shop Now',
            buttonLink: '/CategroyPage'
          },
          {
            imageSrc: require('../assets/Imagelummi (1).png'),
            subtitle: 'Quality You Trust',
            title: 'Best Deals on Groceries',
            description: 'Save more every day',
            buttonText: 'Explore Deals',
            buttonLink: '/offersPage'
          },
          {
            imageSrc:require('../assets/Imageummi (2).png'),
            subtitle: 'Convenience Delivered',
            title: 'Groceries at Your Doorstep',
            description: 'Fast and reliable delivery',
            buttonText: 'Order Now',
            buttonLink: '/cart'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .garyBg{
    background-color: #FBFBFB;
  }
  </style>
  
