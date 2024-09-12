<template>
    <nav class="flex ml-5 flex-col w-[16%] max-md:ml-0 max-md:w-full">
      <div class="flex flex-col text-base text-black max-md:mt-10">
        <h2 class="self-start font-medium">Manage My Account</h2>
        <ul class="flex flex-col self-end mt-6">
          <li class="opacity-50">My Profile</li>
          <li class="mt-2 opacity-50">Edit / Add Products</li>
          <li class="mt-2 opacity-50">Edit / Add Categories</li>
          <li class="mt-2 text-red-500">Add Admin</li>
        </ul>
      </div>
    </nav>
  </template>
  <script>
  export default{
    name:'AdminSidebar'
  }
</script>