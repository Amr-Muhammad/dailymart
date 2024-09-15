<template>
    <div class="flex container flex-col rounded-none">
      <main class="mt-20 w-full max-md:mt-10 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col">
          <div class="flex flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
            <AdminForm />
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import AdminForm from './AdminForm.vue';
    export default {
        name:'AdminMangement',
    components: {
        AdminForm
    }
    }
    </script>