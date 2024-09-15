<template>
  <section
    class="flex cursor-fancy overflow-hidden flex-col justify-center items-center px-8 py-60 bg-white max-md:px-5 max-md:py-24"
  >
    <header class="flex flex-col w-full max-w-[1200px] max-md:max-w-full">
      <h1 class="text-6xl leading-tight text-emerald-900 max-md:max-w-full max-md:text-4xl">
        FAQs
      </h1>
      <p class="mt-6 text-2xl leading-snug text-emerald-600 max-md:max-w-full">
        Find answers to common questions.
      </p>
    </header>
    <div
      class="flex flex-wrap gap-14 items-start mt-24 w-full text-emerald-900 max-w-[1200px] max-md:mt-10 max-md:max-w-full"
    >
      <article
        v-for="(faq, index) in faqs"
        :key="index"
        class="flex flex-col  cursor-fancy  flex-1 shrink basis-0 min-w-[320px] faq-item"
      >
        <div
          class="flex justify-between items-center cursor-pointer"
          @click="toggleFAQ(index)"
        >
          <h2 class="text-lg">{{ faq.question }}</h2>
          <svg
            :class="{
              'rotate-180': activeFAQ === index,
              'rotate-0': activeFAQ !== index,
            }"
            class="transform transition-transform duration-300 w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <p v-if="activeFAQ === index" class="mt-4 text-sm leading-relaxed">
          {{ faq.answer }}
        </p>
      </article>
    </div>
    <footer
      class="flex flex-col mt-24 w-full max-w-[1200px] max-md:mt-10 max-md:max-w-full"
    >
      <div class="flex  flex-col w-full max-md:max-w-full">
        <h2 class="text-4xl leading-tight text-emerald-900 max-md:max-w-full">
          Need more help?
        </h2>
        <p class="mt-4 text-lg text-emerald-600 max-md:max-w-full">
          Contact our support team for assistance.
        </p>
      </div>
      <router-link
        to="/EmailGetHelp"
        class="flex gap-1 hover:bg-emerald-950 hover:text-white justify-center items-center self-start px-4 py-2 mt-6 text-sm font-medium leading-6 text-emerald-900 bg-white rounded border border-emerald-600 border-solid"
        tabindex="0"
      >
        <span class="gap-2 self-stretch px-1 my-auto">Get Help</span>
      </router-link>
    </footer>
  </section>
</template>
<script>
export default {
  name: "FAQSection",
  data() {
    return {
      activeFAQ: null,
      faqs: [
        { question: "How do I order?", answer: "Simply browse our products, add to cart, and checkout." },
        { question: "What are the delivery times?", answer: "We offer same-day and next-day delivery options." },
        { question: "Can I return items?", answer: "Yes, returns are accepted within 7 days of delivery." },
        { question: "Is there a delivery fee?", answer: "Delivery fees vary based on your location and order size." },
        { question: "How do I track my order?", answer: "You can track your order through our website or app." },
        { question: "What payment methods are accepted?", answer: "We accept all major credit cards and online payments." },
      ],
    };
  },
  methods: {
    toggleFAQ(index) {
      this.activeFAQ = this.activeFAQ === index ? null : index;
    },
  },
};
</script>
