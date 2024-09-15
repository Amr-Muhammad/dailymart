<template>
  <section class="flex container mx-auto flex-col text-xs rounded-none text-zinc-500">
    <main class="mt-20 w-full max-md:mt-10 max-md:max-w-full">
      <div class="flex gap-5 max-md:flex-col">
        <div
          class="flex px-16 pt-16 pb-36 bg-white rounded-xl border-2 border-solid border-zinc-100 shadow-[0px_20px_30px_rgba(167,209,233,0.45)] max-md:px-5 max-md:pb-24 max-md:max-w-full flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
          <header
            class="flex flex-wrap gap-5 justify-between self-center w-full font-bold leading-loose max-w-[814px] max-md:max-w-full">
            <div class="flex gap-3 whitespace-nowrap">
              <div class="flex shrink-0 self-start rounded-sm border border-solid border-zinc-500 h-[17px] w-[17px]">
              </div>
              <div>ID</div>
            </div>
            <div class="flex gap-24 self-start max-md:max-w-full">
              <div>User Name</div>
              <div>Email</div>
              <div>Action</div>
            </div>
          </header>
          <AdminListItem v-for="user in users" :key="user.firebaseKey" :id="user.firebaseKey" :userName="user.username"
            :email="user.email" :highlighted="user.highlighted" @delete-item="handleDelete" />
          <router-link to="./AdminMangement"
            class="gap-2.5 text-center hover:bg-emerald-950 self-center px-12 py-4 mt-16 mb-0 ml-3.5 max-w-full text-base font-medium bg-green-700 rounded min-h-[56px] text-neutral-50 w-[271px] max-md:px-5 max-md:mt-10 max-md:mb-2.5">
            Back To Add Admin
          </router-link>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import axios from 'axios';
import AdminListItem from './AdminListItem.vue';

export default {
  name: 'AdminList',
  components: {
    AdminListItem,
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/admins.json');
        const data = response.data;
        this.users = Object.keys(data).map(key => ({
          firebaseKey: key,
          ...data[key],
        }));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async handleDelete(firebaseKey) {
      try {
        console.log('Attempting to delete user with Firebase key:', firebaseKey);
        await axios.delete(`https://dailymart-5c550-default-rtdb.firebaseio.com/admins/${firebaseKey}.json`);
        this.users = this.users.filter(user => user.firebaseKey !== firebaseKey);
        console.log('Successfully deleted user with Firebase key:', firebaseKey);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
};
</script>
