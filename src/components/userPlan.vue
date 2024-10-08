<template>
    <div>
        <h2 class="ms-10 text-2xl font-semibold ">Your Monthly Plan</h2>
    </div>
    <div v-if="!this.plan && !this.subscriptionStartDate" class="text-center font-bold m-20">
        <span class="text-3xl">You Are Not Subscribed in The Weekly Order Service</span>
        <div class="flex items-center justify-center flex-col mt-8">
            <button @click="this.$router.push('/PlansWrapperComponent')" class="mainGreenBtn">
                Subscribe Now
            </button>
        </div>
    </div>

    <div v-else-if="this.plan" class="my-10 w-1/2 mx-auto">
        <div class="flex flex-wrap gap-10 items-start max-md:mt-10 max-md:max-w-full">
            <article :class="[
            'flex overflow-hidden flex-col flex-1 py-9 px-9 mt-3.5 rounded-[36px] border border-solid transform transition-transform hover:shadow-lg hover:-translate-y-2',
            userPlan.isPro ? 'bg-teal-800 min-h-[462px] min-w-[288px]' : 'bg-green-100 border-zinc-400'
            ]" style="min-height: 450px; width: 250px;">
            <div class="flex flex-col">
                <header class="flex flex-col w-full">
                <span :class="[
                    'gap-2.5 self-start py-2.5 pr-3.5 pl-3.5 text-sm leading-relaxed whitespace-nowrap rounded-3xl',
                    userPlan.isPro ? 'text-yellow-50 bg-green-700' : 'text-white bg-green-700'
                ]">
                    {{ userPlan.title }}
                </span>
                <div class="flex flex-col justify-center mt-5 w-full">
                    <h2 :class="['text-4xl leading-tight', userPlan.isPro ? 'text-white' : 'text-gray-500']">
                    {{ userPlan.price }}
                    <span v-if="plan.isPro" class="text-2xl leading-snug">/month</span>
                    </h2>
                    <p :class="['mt-1.5 text-base leading-relaxed', userPlan.isPro ? 'text-white' : 'text-slate-500']">
                    {{ userPlan.description }}
                    </p>
                </div>
                </header>
                <ul class="flex flex-col justify-center mt-7 w-full">
                <li v-for="feature in userPlan.features" :key="feature" :class="[
                    'flex gap-2.5 items-center w-full text-base leading-relaxed mb-2.5',
                    userPlan.isPro ? 'text-zinc-300' : 'text-slate-500'
                ]">
                    <img :src="userPlan.isPro ? proIconUrl : basicIconUrl" alt=""
                    class="object-contain shrink-0 self-stretch my-auto aspect-square w-[27px]" />
                    <span class="flex-1 shrink self-stretch my-auto basis-0">{{ feature }}</span>
                </li>
                </ul>
            </div>
            <div class="flex justify-center">
                <button disabled v-if="userPlan.isPro" @click="subscribe()" :class="[
                'flex gap-1.5 justify-center justify-self-center items-center px-7 py-5 mt-7  text-base leading-relaxed text-center whitespace-nowrap rounded-lg border border-solid min-h-[50px] w-[202px] max-md:px-5',
                userPlan.isPro ? 'text-yellow-50 bg-red-400' : 'text-white bg-green-700 '
                ]">
                {{ userPlan.buttonText }}
                </button>
                <button v-if="!userPlan.isPro" :class="[
                'flex gap-1.5 justify-center justify-self-center items-center px-7 py-5 mt-7  text-base leading-relaxed text-center whitespace-nowrap rounded-lg border border-solid min-h-[50px] w-[202px] max-md:px-5',
                plan.isPro ? 'text-yellow-50 bg-red-400 ' : 'text-white bg-green-700 '
                ]">
                <router-link to="/signPage">
                    {{ userPlan.buttonText }}
                </router-link>
                </button>
            </div>
            </article>
        </div>

    </div>
    <p v-if="this.plan" class="font-semibold italic mx-10 text-center text-lg border-t-2 border-solid border-stone-400 p-5">
        Your Plan will expire on
        <span class="text-red-600 font-bold">{{ this.subscriptionEndDate }}</span>
        <span class="block ">You have <span class="text-red-600"> {{ days }} </span> days left</span>
    </p>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            plan: '',
            subscriptionStartDate: '',
            userPlan: null,
            subscriptionEndDate: null,
            basicIconUrl: require('../assets/check-mark.png'),
            proIconUrl: require('../assets/check-mark.png'),
            plans: [
                {
                title: 'Standard',
                price: 'Your Order Price',
                description: 'Get started with our free plan.',
                features: ['Fresh Products', 'Email Support', 'No Free Dilivery', 'Boycotting Alternative'],
                buttonText: "You're Subscribed",
                isPro: false,
                },
                {
                title: ' Subscription',
                price: '250 EGP',
                description: 'Unlock all features.',
                features: ['Free Delivery', 'Get Discount', '24/7 Support', 'Premium Customer Service'],
                buttonText: "You're Subscribed",
                isPro: true,
                },
            ],
        }
    },
    computed: {
        ...mapState(['loggedUserId', 'loggedUserData']),
    },
    methods: {
        getLoggedUserData() {
            if (this.loggedUserData) {
                this.plan = this.loggedUserData.planid
                this.subscriptionStartDate = this.loggedUserData.subscriptionStartDate
            }

            if (this.plan === "a1b2c3_subscription") {
                this.userPlan = this.plans[1]
            } else if (this.plan === "d4e5f6_standard") {
                this.userPlan = this.plans[0]
            }

            if (this.subscriptionStartDate) {
                this.subscriptionStartDate = new Date(this.subscriptionStartDate)
                this.subscriptionEndDate = new Date(this.subscriptionStartDate)
                this.subscriptionEndDate.setDate(this.subscriptionEndDate.getDate() + 30)

                let timeDifference = this.subscriptionEndDate - new Date();
                this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                this.subscriptionEndDate = this.subscriptionEndDate.toLocaleString()

            }
            console.log(this.loggedUserData)

        },
    },
    watch: {
        loggedUserData() {
            this.getLoggedUserData()
        }
    },
    mounted() {
        if (this.loggedUserData) {
            this.getLoggedUserData()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>