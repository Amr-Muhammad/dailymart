<template>
  <navBar></navBar>
  <div class="mt-[136px] mx-auto">
    <router-view></router-view>
  </div>
  <footerCom></footerCom>

</template>

<script>
import navBar from './components/navBar.vue'
import footerCom from './components/footerCom.vue'
import service from './mixins/service';

export default {
  name: 'App',
  components: {
    navBar,
    footerCom,
  },
  data() {
    return {
      userId: ''
    }
  },
  async created() {

    if (localStorage.getItem('userId'))

      this.userId = localStorage.getItem('userId')
    let userData = await service.methods.getLoggedUser(this.userId)
    await this.$store.dispatch('setUserData', [this.userId, userData])
  }
}
</script>

<style></style>
