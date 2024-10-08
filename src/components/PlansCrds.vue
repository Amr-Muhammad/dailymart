<template>
  <section
    class="flex overflow-hidden flex-col justify-center items-center px-20 py-32 bg-zinc-50 max-md:px-5 max-md:py-24">
    <div class="flex flex-col w-full max-w-[1070px] max-md:max-w-full">
      <header class="flex flex-col justify-center self-center max-w-full min-w-[304px] w-[532px]">
        <h1 class="text-6xl leading-tight text-gray-500 max-md:max-w-full max-md:text-4xl">
          Affordable Plans
        </h1>
        <p class="mt-4 text-2xl leading-snug text-slate-500 max-md:max-w-full">
          Choose the best plan for your needs.
        </p>
      </header>
      <div class="flex flex-wrap gap-10 items-start mt-16 max-md:mt-10 max-md:max-w-full">
        <article v-for="(plan, index) in plans" :key="index" :class="[
          'flex overflow-hidden flex-col flex-1 py-9 px-9 mt-3.5 rounded-[36px] border border-solid transform transition-transform hover:shadow-lg hover:-translate-y-2',
          plan.isPro ? 'bg-teal-800 min-h-[462px] min-w-[288px]' : 'bg-green-100 border-zinc-400'
        ]" style="min-height: 450px; width: 250px;">
          <div class="flex flex-col">
            <header class="flex flex-col w-full">
              <span :class="[
                'gap-2.5 self-start py-2.5 pr-3.5 pl-3.5 text-sm leading-relaxed whitespace-nowrap rounded-3xl',
                plan.isPro ? 'text-yellow-50 bg-green-700' : 'text-white bg-green-700'
              ]">
                {{ plan.title }}
              </span>
              <div class="flex flex-col justify-center mt-5 w-full">
                <h2 :class="['text-4xl leading-tight', plan.isPro ? 'text-white' : 'text-gray-500']">
                  {{ plan.price }}
                  <span v-if="plan.isPro" class="text-2xl leading-snug">/month</span>
                </h2>
                <p :class="['mt-1.5 text-base leading-relaxed', plan.isPro ? 'text-white' : 'text-slate-500']">
                  {{ plan.description }}
                </p>
              </div>
            </header>
            <ul class="flex flex-col justify-center mt-7 w-full">
              <li v-for="feature in plan.features" :key="feature" :class="[
                'flex gap-2.5 items-center w-full text-base leading-relaxed mb-2.5',
                plan.isPro ? 'text-zinc-300' : 'text-slate-500'
              ]">
                <img :src="plan.isPro ? proIconUrl : basicIconUrl" alt=""
                  class="object-contain shrink-0 self-stretch my-auto aspect-square w-[27px]" />
                <span class="flex-1 shrink self-stretch my-auto basis-0">{{ feature }}</span>
              </li>
            </ul>
          </div>
          <div class="flex justify-center">
            <button v-if="plan.isPro && role == 'customer'" @click="subscribe()" :class="[
              'flex gap-1.5 justify-center justify-self-center items-center px-7 py-5 mt-7  text-base leading-relaxed text-center whitespace-nowrap rounded-lg border border-solid min-h-[50px] w-[202px] max-md:px-5',
              plan.isPro ? 'text-yellow-50 bg-red-400 hover:bg-green-700' : 'text-white bg-green-700 hover:bg-red-400 '
            ]">
              {{ plan.buttonText }}
            </button>
            <button v-if="!plan.isPro" :class="[
              'flex gap-1.5 justify-center justify-self-center items-center px-7 py-5 mt-7  text-base leading-relaxed text-center whitespace-nowrap rounded-lg border border-solid min-h-[50px] w-[202px] max-md:px-5',
              plan.isPro ? 'text-yellow-50 bg-red-400 hover:bg-green-700' : 'text-white bg-green-700 hover:bg-red-400 '
            ]">
              <router-link v-if="role == 'customer'" to="/homePage">
                {{ plan.buttonText }}
              </router-link>
              <router-link v-else to="/signPage">
                {{ plan.buttonText }}
              </router-link>
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
// import { mapState } from 'vuex';

export default {
  name: 'PlansCrds',
  data() {
    return {
      basicIconUrl: require('../assets/check-mark.png'),
      proIconUrl: require('../assets/check-mark.png'),
      role:localStorage.getItem('role'),
      plans: [
        {
          title: 'Standard',
          price: 'Your Order Price',
          description: 'Get started with our free plan.',
          features: ['Fresh Products', 'Email Support', 'No Free Dilivery', 'Boycotting Alternative'],
          buttonText: 'Start Free Trial',
          isPro: false,
        },
        {
          title: ' Subscription',
          price: '250 EGP',
          description: 'Unlock all features.',
          features: ['Free Delivery', 'Get Discount', '24/7 Support', 'Premium Customer Service'],
          buttonText: ' Subscribe',
          buttonTextSubscrived: "Your're subscribed",
          isPro: true,
        },
      ],
    };
  },
  methods: {
    subscribe() {
      location.assign('https://buy.stripe.com/test_8wM9E6eqSd0hh0YfZ2')
    }
  },
  // computed:[
  //   ...mapState('loggedUserData','loggedUserId')
  // ]
};
</script>
