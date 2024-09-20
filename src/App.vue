<template>
  <navBar></navBar>
  <div class=" mt-40 mb-20 mx-auto">
    <router-view></router-view>
  </div>
  <footerCom></footerCom>

</template>

<script>
import navBar from './components/navBar.vue'
import footerCom from './components/footerCom.vue'

export default {
  name: 'App',
  components: {
    navBar,
    footerCom,
  }
}
</script>

<style></style>
