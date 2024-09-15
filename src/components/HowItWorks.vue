<template>
  <section class="py-16 mt-10">
    <div class="max-w-7xl mx-auto px-8">
      <h2
        ref="sectionTitle"
        class="text-3xl font-bold text-gray-800 mb-8 animate__animated"
        :class="{ 'animate__fadeIn': isVisible.sectionTitle }"
      >
        How It Works
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article
          v-for="(step, index) in steps"
          :key="index"
          class="flex flex-col flex-1 shrink basis-0 max-w-[400px] min-w-[240px] animate__animated"
          :class="{ 'animate__fadeIn': isVisible[`step-${index}`] }"
          :ref="el => setStepRef(el, index)"
        >
          <div
            class="rounded-[48px] animate__animated"
            :class="{ 'animate__bounceIn': isVisible[`step-${index}`] }"
          >
            <p class="GreenBckground text-emerald-100 text-center max-w-10 max-h-10">
              {{ step.number }}
            </p>
          </div>
          <h3 class="mt-2 text-emerald-900">
            {{ step.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-emerald-600">
            {{ step.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

export default {
  setup() {
    const sectionTitle = ref(null);
    const stepsRefs = ref([]);
    const isVisible = reactive({
      sectionTitle: false,
    });

    const steps = [
      { number: "1", title: "Browse Products", description: "Explore our wide range of fresh groceries." },
      { number: "2", title: "Add to Cart", description: "Select your items and add them to your cart." },
      { number: "3", title: "Fast Delivery", description: "Get your groceries delivered to your door." },
    ];

    const setStepRef = (el, index) => {
      if (el) {
        stepsRefs.value[index] = el;
      }
    };

    const setupIntersectionObserver = () => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, 
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === sectionTitle.value) {
              isVisible.sectionTitle = true;
            } else {
              stepsRefs.value.forEach((step, index) => {
                if (entry.target === step) {
                  isVisible[`step-${index}`] = true;
                }
              });
            }
            observer.unobserve(entry.target);
          }
        });
      }, options);

      if (sectionTitle.value) {
        observer.observe(sectionTitle.value);
      }
      stepsRefs.value.forEach(step => observer.observe(step));
    };

    onMounted(() => {
      setupIntersectionObserver();
    });

    return {
      sectionTitle,
      steps,
      stepsRefs,
      isVisible,
      setStepRef,
    };
  },
};
</script>

<style scoped>
.GreenBckground {
  background-color: #064E3B;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff; 
  font-weight: bold; 
}
</style>
