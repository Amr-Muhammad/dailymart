<template>
    <div class="container mx-auto">
        <BoycottBanner />
        <RollerCoasterCarousel />
        <BoycottProducts />
    </div>

</template>

<script>
import BoycottBanner from './Boycotting.vue'
import BoycottProducts from './BoycottingProducts.vue'
import RollerCoasterCarousel from './BoycottingCaroselLogo.vue'

export default {
    name: 'BoycottWrapper',
    components: {
        BoycottBanner,
        BoycottProducts,
        RollerCoasterCarousel,
    }
}
</script>
<style></style>