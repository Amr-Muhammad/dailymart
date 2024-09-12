<template >
    <PlansHead/>
    <TopPicksForYou/>
    <HowItWorks/>
    <PlansCrds/>
    <FAQSection/>
</template>

<script>
import PlansHead from './PlansHead.vue';
import TopPicksForYou from './TopPicks.vue'
import HowItWorks from './HowItWorks.vue'
import PlansCrds from './PlansCrds.vue'
import FAQSection from './FaqPlans.vue'

export default {
    name: 'PlansWrapperComponent',
    components: {
       PlansHead,
       TopPicksForYou,
       HowItWorks,
       PlansCrds,
       FAQSection
    }
    }
</script>