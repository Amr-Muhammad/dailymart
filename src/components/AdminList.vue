<template>
    <section class="flex container flex-col text-xs rounded-none text-zinc-500">
      <AdminHeader />
  
      <main class="mt-20 w-full max-md:mt-10 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col">
          <AdminSidebar />
          <div class="flex px-16 pt-16 pb-36 bg-white rounded-xl border-2 border-solid border-zinc-100 shadow-[0px_20px_30px_rgba(167,209,233,0.45)] max-md:px-5 max-md:pb-24 max-md:max-w-full flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
            <header class="flex flex-wrap gap-5 justify-between self-center w-full font-bold leading-loose max-w-[814px] max-md:max-w-full">
              <div class="flex gap-3 whitespace-nowrap">
                <div class="flex shrink-0 self-start rounded-sm border border-solid border-zinc-500 h-[17px] w-[17px]"></div>
                <div>ID</div>
              </div>
              <div class="flex gap-10 self-start max-md:max-w-full">
                <div>User Name</div>
                <div>Email</div>
                <div>Action</div>
              </div>
            </header>
  
            <!-- Iterate through the list of users and pass the data to AdminListItem -->
            <AdminListItem
              v-for="user in users"
              :key="user.id"
              :id="user.id"
              :userName="user.userName"
              :email="user.email"
              :highlighted="user.highlighted"
              @delete-item="handleDelete"
            />
  
            <button
              class="gap-2.5 hover:bg-emerald-950 self-center px-12 py-4 mt-16 mb-0 ml-3.5 max-w-full text-base font-medium bg-green-700 rounded min-h-[56px] text-neutral-50 w-[271px] max-md:px-5 max-md:mt-10 max-md:mb-2.5"
            >
              Add Admin
            </button>
          </div>
        </div>
      </main>
    </section>
  </template>
  
  <script>
  import AdminListItem from './AdminListItem.vue';
  import AdminSidebar from './AdminSidebar.vue';
  import AdminHeader from './AdminHeader.vue';
  
  export default {
    name: 'AdminList',
    components: {
      AdminListItem,
      AdminSidebar,
      AdminHeader,
    },
    data() {
      return {
        users: [
          { id: '#45FH78A', userName: 'John Doe', email: 'me@gmail.com', highlighted: false },
          { id: '#61RT8PP', userName: 'Jane Doe', email: 'jane@gmail.com', highlighted: false },
          { id: '#90KL52S', userName: 'Mark Smith', email: 'mark@gmail.com', highlighted: true },
          // Add more users as needed
        ],
      };
    },
    methods: {
      handleDelete(id) {
        // Filter out the user that matches the deleted id
        this.users = this.users.filter(user => user.id !== id);
      },
    },
  };
  </script>
  