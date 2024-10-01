<template>

  <div class="bg-[#F0F2E8]">

    <navBar></navBar>
    <div :class="$route.name != 'SignPage' ? 'mt-[136px] mx-auto' : ''">
      <router-view></router-view>
    </div>
    <footerCom></footerCom>

  </div>
</template>

<script>
import navBar from './components/navBar.vue'
import footerCom from './components/footerCom.vue'
// import service from './mixins/service';
// import axios from 'axios';

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

    // if (localStorage.getItem('userId')) {
    //   this.userId = localStorage.getItem('userId')
    //   let userData = await service.methods.getLoggedUser(this.userId)
    //   if (!userData.profilePicture) {
    //     if (userData.gender == 'male') {
    //       userData.profilePicture = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/userAvatar/maleImage.json')).data
    //     }
    //     else {
    //       userData.profilePicture = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/userAvatar/femaleImage.json')).data
    //     }
    //     await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/customer/${this.loggedUserId}.json`, { profilePicture: userData.profilePicture })
    //   }
    //   await this.$store.dispatch('setUserData', [this.userId, userData])
    //   this.$store.state.isDataLoading = false
    // }
    // else {
    //   this.$store.state.isDataLoading = false
    // }

  }

}
</script>

<style></style>
