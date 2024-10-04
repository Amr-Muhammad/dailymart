<template>
  <section class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-12 text-center italic">Manage Admins</h1>
    <div class="w-full overflow-x-auto">
      <table id="table" class="text-center w-full bg-white border">
        <thead class="bg-slate-50 border">
          <tr>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.firebaseKey" class="border">
            <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ user.firebaseKey }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ user.username }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ user.email }}</td>
            <td class="px-6 py-4 text-sm text-gray-500 flex justify-center">
              <button @click="handleDelete(user.firebaseKey)" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center mt-8">
      <router-link to="./AdminMangement" class="gap-2.5 text-white text-center hover:bg-emerald-950 px-6 py-3 text-base font-medium bg-green-700 rounded w-full sm:w-auto">
        Back To Add Admin
      </router-link>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminList',
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
        const response = await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/users/admin.json');
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
        await axios.delete(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/admin/${firebaseKey}.json`);
        this.users = this.users.filter(user => user.firebaseKey !== firebaseKey);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  .overflow-x-auto {
    overflow-x: auto; 
    -webkit-overflow-scrolling: touch; 
  }
  table {
    min-width: 400px; 
  }

  th, td {
    min-width: 80px; 
  }
}
</style>
