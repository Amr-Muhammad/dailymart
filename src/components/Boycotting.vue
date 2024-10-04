<template>
  <section class="flex gap-10 justify-center items-start  px-5 pb-14 bg-white max-md:px-5">
    <div class="flex flex-wrap flex-1 shrink gap-12 justify-center items-center w-full basis-0 max-w-[1033px] min-w-[240px] max-md:max-w-full">
      <figure class="flex overflow-hidden pt-10 md:gap-2 justify-center self-stretch my-auto rounded-3xl min-h-[606px] min-w-[241px] w-[600px] max-md:max-w-full animate__animated animate__fadeIn">
        <img loading="lazy" src="../assets/Image Container.png" alt="Visual representation of boycott campaign" class="object-contain flex-1 shrink w-full rounded-3xl aspect-[0.96] basis-0 min-w-[240px] max-md:max-w-full" />
      </figure>
      <div class="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 max-w-[620px] min-w-[241px]">
        <header class="flex flex-col justify-center w-full">
          <h1 class="text-6xl font-black tracking-tighter text-emerald-900 leading-[67px] max-md:text-4xl max-md:leading-10 animate__animated animate__zoomIn">
            Boycott For Better Life For Palestinians
          </h1>
          <p class="mt-3.5 text-xl leading-snug text-emerald-600 animate__animated animate__fadeIn animate__delay-1s">
            Your one-stop online grocery store.
          </p>
        </header>
        <router-link to="/CategroyPage" class="flex gap-1 hover:bg-emerald-950 hover:text-white justify-center items-center px-5 py-2.5 mt-9 text-base text-center text-emerald-50 bg-lime-600 rounded-lg max-w-[310px] min-h-[49px] w-[310px] max-md:px-5 animate__animated animate__pulse animate__infinite">
          <span class="gap-2 self-stretch p-1 my-auto">Shop Now</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BoycottBanner'
}
</script>

<style scoped>

</style>
