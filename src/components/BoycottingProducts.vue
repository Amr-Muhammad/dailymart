<template>
  <div class="flex container flex-col items-start">
    <header class="flex flex-col px-8 pt-32 pb-12 text-6xl font-black leading-tight text-emerald-900 bg-white min-h-[226px] max-md:px-5 max-md:pt-24 max-md:max-w-full max-md:text-4xl">
      <div class="flex flex-col items-center px-20 w-full max-w-[1480px] max-md:px-5 max-md:max-w-full max-md:text-4xl">
        <h1 class="max-w-full w-[560px] max-md:max-w-full max-md:text-4xl">Discover Products</h1>
      </div>
    </header>
    <main class="flex flex-col items-center  pb-7 ml-5 w-full bg-zinc-50 shadow-[0px_4px_4px_rgba(0,0,0,0)] max-md:mt-10 max-md:max-w-full">
      <div class="cards-container m-10">
        <div class="flex flex-wrap gap-4 justify-between">
          <div
            v-for="(card, index) in cards"
            :key="index"
            class="relative card bg-base-100 w-full md:w-[23%] shadow-xl group"
          >
            <div class="card-body">
              <h2 class="card-title">{{ card.title }}</h2>
              <p>{{ card.description }}</p>
            </div>
            <figure>
              <img :src="card.image" :alt="card.title" class="w-full h-auto" />
            </figure>
            <!-- Overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
              <button class="px-4 py-2 bg-white text-black rounded-md">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'BoycottProducts',
  data() {
    return {
      cards: Array.from({ length: 20 }, () => ({
        title: 'Boycotting Pepsi!',
        description: 'Stand with the Palestinians in their struggle for freedom',
        image:
          'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
      })),
    };
  },
};
</script>

<style>
.card {
  position: relative;
  overflow: hidden;
}

.card img {
  transition: transform 0.3s ease;
}

.card:hover img {
  transform: scale(1.05);
}
</style>
