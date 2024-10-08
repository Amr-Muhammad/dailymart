<template>

  <section v-if="loggedUserData && loggedUserData.role === 'admin'">
    <h1 class="text-3xl font-bold text-red-600 text-center mt-12">You don't have access to this page</h1>
  </section>

  <section v-else>
    <div class="p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-12 text-center italic">Manage Users</h1>
      <div class="w-full overflow-x-auto">
        <table id="table" class="text-center w-full bg-white border">
          <thead class="bg-slate-50 border">
            <tr>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed</th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Weekly Order</th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user[0]" class="border">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ user[1].firstName + ' ' + user[1].lastName }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ user[1].email }}</td>
              <td class="px-6 py-4 text-sm text-gray-500"
                :class="user[1].planid == 'a1b2c3_subscription' ? 'text-green-500' : ''">
                {{ user[1].planid ? 'Yes' : 'No' }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                <button v-if="user[1].planid" @click="viewUserProducts(user[0])"
                  class="border text-black px-4 py-2 rounded hover:bg-violet-900 hover:text-white transition-all duration-300">View</button>
                <p v-if="!user[1].planid">------</p>
              </td>
              <td class="px-6 py-4 text-sm"
                :class="user[1].orderStatus == 'Approved' ? 'text-green-700 font-semibold' : 'text-red-500 font-semibold'">
                <span v-if="user[1].orderStatus">{{ user[1].orderStatus }}</span>
                <span v-if="!user[1].orderStatus">-----</span>
              </td>
              <td class="px-6 py-4 text-sm font-medium flex flex-col space-y-2">
                <p class="px-6 py-4 text-sm text-gray-500">------</p>
              </td>
              <td class="py-4 text-sm text-gray-500">
                <svg @click="deleteItem(user[0])" class="block mx-auto cursor-pointer" fill="#DB4444" width="25px"
                  height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#DB4444">
                  <path
                    d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z">
                  </path>
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      users: null,
    };
  },
  computed: {
    ...mapState(['loggedUserData']),
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/users/customer.json');
        this.users = Object.entries(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);

      }
    },
    viewUserProducts(userId) {
      this.$router.push(`./adminweeklyorder/${userId}`);
    },
    async deleteItem(userId) {
      await axios.delete(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/customer/${userId}.json`);
      this.fetchUsers();
    },

  },

  async approveOrder(userId) {
    (await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/customer/${userId}.json`, { orderStatus: 'Approved' }))
    location.reload()
  },

  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.overflow-x-auto {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>