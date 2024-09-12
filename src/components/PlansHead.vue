<template class="m-0  w-full">
  <main class="p-0 relative bottom-32 flex m-0">
    <div class="hero">
      <div class="hero-overlay  bg-opacity-60"></div>
      <div class="hero-content justify-self-end max-w-96  text-neutral-content text-start">
        <div class=" p-8 rounded-lg bg-opacity-50 bg-black/55 ">
          <h1 class="mb-5 text-white text-3xl font-bold">Discover Fresh Groceries Online</h1>
          <p class="text-white mb-6">
            Your daily essentials delivered
          </p>
          <div class=" flex justify-between">
          <button class="btn hover1 mr-2 text-white btncustomGreen">Start Shopping</button>
          <button class="btn hover2 text-white border-white">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'PlansHead'
}
</script>

<style scoped>
main {
  margin: 0;
  padding: 0;
  overflow: hidden; 
}

.hero {
  background-image: url('@/assets/Leonardo_Phoenix_Create_a_vibrant_and_inviting_hero_section_im_1.jpg');
  background-size: cover; 
  background-position: center; 
  width: 100%;
  height: 100vh; 
  position: relative; 
}


.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

}
.btncustomGreen{
  background-color: #064E3B;
  border:none;
}
.backgroundGary{
  background-color: #000000;

}
.hover1:hover{
  background-color: transparent;
  border: 2px solid #fff;
}
.hover2:hover{
  background-color: #064E3B;
  border:none;
}

.hero-content {
  position: relative;
  z-index: 2; 
}
</style>
