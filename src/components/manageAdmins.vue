<template>
  <!-- Show this section if the logged-in user has the role 'master' or 'super' -->
  <section v-if="loggedUserData.role === 'master' || loggedUserData.role === 'super'">
    <h1 class="text-3xl font-bold text-gray-800 mb-12 text-center italic">Manage Admins</h1>
    <div class="w-full overflow-x-auto">
      <table id="table" class="text-center w-full bg-white border">
        <thead class="bg-slate-50 border">
          <tr>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.firebaseKey" class="border">
            <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ user.firebaseKey }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ user.username }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ user.email }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">
              <!-- Show role dropdown with options based on current user role -->
              <select 
                v-if="canChangeRole()" 
                v-model="user.role" 
                @change="updateRole(user)"
                :disabled="loggedUserData.role === 'super'"
              >
                <option value="admin">Admin</option>
                <option value="super">Super</option>
                <option value="master">Master</option>
              </select>
              <!-- Display the current role as text if the dropdown is disabled -->
              <span v-else>{{ user.role }}</span>
            </td>
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
        Add New Admin
      </router-link>
    </div>
  </section>

  <!-- Show this section if the logged-in user has the role 'admin' or any other non-master/super role -->
  <section v-else>
    <h1 class="text-3xl font-bold text-red-600 text-center mt-12">You don't have access to this page</h1>
  </section>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

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
          role: data[key].role || 'admin', // Default role if not set
        }));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async updateRole(user) {
      try {
        await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/admin/${user.firebaseKey}.json`, {
          role: user.role,
        });
      } catch (error) {
        console.error('Error updating role:', error);
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
    canChangeRole() {
      return this.loggedUserData.role === 'master';
    }
  },
  computed: {
    ...mapState(['loggedUserData']), // Get loggedUserData from Vuex store
  }
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
