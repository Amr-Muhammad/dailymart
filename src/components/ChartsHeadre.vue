<template>
  <header class="flexmobile overflow-hidden gap-5 container md:flex justify-between items-center max-md:mt-10 mx-auto">
    <div class="md:flex w-full flexmobile  relative left-20 flex-col">
      <h1 class="md:text-4xl font-bold green-color animate__animated animate__backInUp me-3">
        The Impact of Boycotting Israeli Products in The World
      </h1>
      <p class="mt-3.5 text-xl leading-snug text-emerald-600 ">
        Your one-stop online grocery store.
      </p>
      <router-link to="/BoycottWrapper"
        class="flex flexmobile hover:bg-emerald-950 gap-1 justify-center items-center px-5 py-2.5 mt-9 text-base text-center text-emerald-50 bg-lime-600 rounded-lg max-w-[310px] min-h-[49px] w-[310px] max-md:px-5 animate__animated animate__tada"
        role="button">
        <span class="gap-2 p-1">Names Of Boycotting Products ?</span>
      </router-link>
    </div>
    <div class="rounded-xl w-1/2 max-w-xl max-md:mt-4 animate__animated animate__heartBeat">
      <img class="rounded-xl  " src="../assets/watermelon.png" alt="">
    </div>
  </header>

  <ChartsGraphs />

  <div class="flex flexmobile mt-9 pt-20 text-center flex-col justify-center items-center mx-auto">
    <p
      class="md:text-5xl flexmobile max-w-[800px] sm:text-2xl text-center pt-24 mt-11 font-bold green-color animate__animated animate__fadeInUp animate__delay-3s">
      Remember you have to be careful how you're using your money
    </p>
    <div class="mt-10 flex justify-center animate__animated animate__zoomInUp">
      <img class="w-56 h-56" src="../assets/download__2.png" alt="">
    </div>
  </div>
</template>

<script>
import ChartsGraphs from './ChartsGraphs.vue';
export default {
  name: 'ImpactHeading',
  components: {
    ChartsGraphs
  }
}
</script>
<style>
.green-color {
  color: #064E3B;
}

@media (max-width:640px) {
  .flexmobile {
    display: block;
    padding: 10px !important;
    margin: 0 !important;
    max-width: 100%;
    margin-top: 10px !important;
    left: 0;
  }

  .flexmobile img {
    max-width: 300px;
  }
}
</style>
