<template>
  <form @submit.prevent="addAdmin" class="flex flex-col grow items-center px-20 pt-16 pb-40 w-full text-sm bg-white rounded-xl border-2 border-solid border-zinc-100 shadow-[0px_20px_30px_rgba(167,209,233,0.45)] text-zinc-500 max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
    <div class="flex flex-col max-w-full w-[365px]">
      <label for="adminUsername" class="self-start tracking-wide leading-none">
        Admin Username
      </label>
      <input
        id="adminUsername"
        v-model="username"
        type="text"
        class="px-9 py-7 mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 max-md:px-5"
        placeholder="Username"
      />
      
      <label for="adminEmail" class="self-start mt-7 tracking-wide leading-none max-md:ml-0.5">
        Admin Email
      </label>
      <input
        id="adminEmail"
        v-model="email"
        type="email"
        class="px-9 py-7 mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 max-md:px-5"
        placeholder="Email"
      />
      
      <label for="adminPassword" class="self-start mt-7 tracking-wide leading-none">
        Admin Password
      </label>
      <input
        id="adminPassword"
        v-model="password"
        type="password"
        class="px-9 py-7 mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 max-md:px-5"
        placeholder="Password"
      />
      
      <button
        type="submit"
        class="gap-2.5 self-center hover:bg-emerald-950 px-12 py-4 mt-16 ml-3 max-w-full text-base font-medium bg-green-700 rounded min-h-[56px] text-neutral-50 w-[271px] max-md:px-5 max-md:mt-10"
      >
        Add Admin
      </button>
      
      <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'AdminForm',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async addAdmin() {
      try {
        if (!this.username || !this.email || !this.password) {
          this.errorMessage = 'All fields are required. Please fill out the username, email, and password.';
          return;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(this.password)) {
          this.errorMessage = 'Password must be at least 8 characters long and include letters, numbers, and special characters.';
          return;
        }
        const response = await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/admins.json');
        const existingAdmins = response.data || {};
        const emails = Object.values(existingAdmins).map(admin => admin.email);
        if (emails.includes(this.email)) {
          this.errorMessage = 'This email is already in use. Please use a different email.';
          return;
        }
        const newAdminId = uuidv4();
        const adminData = {
          id: newAdminId,
          username: this.username,
          email: this.email,
          password: this.password,
        };
        await axios.post('https://dailymart-5c550-default-rtdb.firebaseio.com/admins.json', adminData);
        this.username = '';
        this.email = '';
        this.password = '';
        this.errorMessage = '';
        console.log('Admin added successfully');
      } catch (error) {
        console.error('Error adding admin:', error);
      }
    },
  },
};
</script>
