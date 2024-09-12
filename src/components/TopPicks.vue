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
            <a :href="card.buttonLink" class="inline-block mt-4 text-green-600 hover:text-green-800 font-medium">
              {{ card.buttonText }}
            </a>
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
            imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/1dd05f09bbcd62ecac3d5923f4e163c6831b72371aa765cc25228a89fd1f4e8e?placeholderIfAbsent=true&apiKey=d64a437ab8f64a9ca8fc16914b2d583b",
            subtitle: 'Freshness Guaranteed',
            title: 'Shop Fresh Groceries Today',
            description: 'Find everything you need',
            buttonText: 'Shop Now',
            buttonLink: '#'
          },
          {
            imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/21454893ca22b1c717d00e09cdcc98a85ebe31fb1ddd3bacf49c70dfe7e38bc9?placeholderIfAbsent=true&apiKey=d64a437ab8f64a9ca8fc16914b2d583b",
            subtitle: 'Quality You Trust',
            title: 'Best Deals on Groceries',
            description: 'Save more every day',
            buttonText: 'Explore Deals',
            buttonLink: '#'
          },
          {
            imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/925a48bb536dd65ca29bdd0a25082b8dfbbf2ac0891258f68acb6802b8f03492?placeholderIfAbsent=true&apiKey=d64a437ab8f64a9ca8fc16914b2d583b",
            subtitle: 'Convenience Delivered',
            title: 'Groceries at Your Doorstep',
            description: 'Fast and reliable delivery',
            buttonText: 'Order Now',
            buttonLink: '#'
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
  
