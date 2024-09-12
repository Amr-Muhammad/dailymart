<template>
    <div class="flex container flex-col rounded-none">
      <AdminHeader/>
      <main class="mt-20 w-full max-md:mt-10 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col">
          <AdminSidebar />
          <div class="flex flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
            <AdminForm />
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import AdminHeader from './AdminHeader.vue';
  import AdminSidebar from './AdminSidebar.vue';
  import AdminForm from './AdminForm.vue';

  
    export default {
        name:'AdminMangement',
    components: {
        AdminHeader,
        AdminSidebar,
        AdminForm
    }
    }
    </script>