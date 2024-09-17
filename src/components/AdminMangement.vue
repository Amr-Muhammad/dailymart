<template>
  <div class="flex container flex-col rounded-none ">
    <main class="mt-20 w-full max-md:mt-10 max-md:max-w-full">
      <div class="flex gap-5 max-md:flex-col mx-auto">
        <div class="flex flex-col w-full max-md:ml-0 max-md:w-full">
          <AdminForm />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AdminForm from './AdminForm.vue';
export default {
  name: 'AdminMangement',
  components: {
    AdminForm
  }
}
</script>