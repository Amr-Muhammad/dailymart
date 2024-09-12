<template>
    <section class="py-16 mt-10 ">
      <div class="max-w-7xl mx-auto px-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article
            v-for="(step, index) in steps"
            :key="index"
            class="flex flex-col flex-1 shrink basis-0 max-w-[400px] min-w-[240px]"
          >
            <div
              class="   rounded-[48px]"
            >
              <p class="GreenBckground text-emerald-100 text-center max-w-10 max-h-10">
                {{ step.number }}
              </p>
            </div>
            <h3 class="mt-2 text-emerald-900">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-emerald-600">
              {{ step.description }}
            </p>
          </article>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        steps: [
          { number: "1", title: "Browse Products", description: "Explore our wide range of fresh groceries." },
          { number: "2", title: "Add to Cart", description: "Select your items and add them to your cart." },
          { number: "3", title: "Fast Delivery", description: "Get your groceries delivered to your door." },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
 .GreenBckground{
    background-color: #064E3B;
    width: 30px; 
    height: 30px;
    border-radius: 50%;

 }
  </style>
  