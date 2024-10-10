<template>
  <h2 class="text-3xl font-bold text-gray-800 mb-12 text-center italic">Add New Admin</h2>
  <form @submit.prevent="addAdmin"
    class="flex flex-col grow items-center px-20 pt-16 pb-40 w-full text-sm border-zinc-100  text-zinc-500 max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
    <!-- <div class="flex flex-col max-w-full w-[365px]">
      <label for="adminUsername" class="self-start tracking-wide leading-none">
        Admin Username
      </label>
      <input id="adminUsername" v-model="username" type="text"
        class="px-9 py-7 mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 max-md:px-5"
        placeholder="Username" />

      <label for="adminEmail" class="self-start mt-7 tracking-wide leading-none max-md:ml-0.5">
        Admin Email
      </label>
      <input id="adminEmail" v-model="email" type="email"
        class="px-9 py-7 mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 max-md:px-5"
        placeholder="Email" />

      <label for="adminPassword" class="self-start mt-7 tracking-wide leading-none">
        Admin Password
      </label>
      <input id="adminPassword" v-model="password" type="password"
        class="px-9 py-7 mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 max-md:px-5"
        placeholder="Password" />

      <div class="flex gap-6 mt-8 items-center justify-center">
        <div class="flex items-center gap-3">
          <label for="male">Male</label>
          <input v-model="gender" type="radio" name="gender" id="male" value="male">
        </div>
        <div class="flex items-center gap-3">
          <label for="female">Female</label>
          <input v-model="gender" type="radio" name="gender" id="female" value="female">
        </div>
      </div>

      <button type="submit"
        class="gap-2.5 self-center hover:bg-emerald-950 px-12 py-4 mt-16 ml-3 max-w-full text-base font-medium bg-green-700 rounded min-h-[56px] text-neutral-50 w-[271px] max-md:px-5 max-md:mt-10">
        Add Admin
      </button>

      <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
    </div> -->
    <div class="grid grid-cols-1 lg:grid-cols-2 max-w-full w-full gap-x-[20px] gap-y-[30px]">
      <div>
        <label for="adminUsername" class="text-base self-start tracking-wide leading-none ps-5">
          Admin First Name
        </label>
        <input id="adminUsername" v-model="firstName" type="text"
          class="px-9 py-7 text-base mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 focus:outline-none focus-within:outline-none max-md:px-5"
          placeholder="First Name" />
      </div>

      <div>
        <label for="adminUsername" class="text-base self-start tracking-wide leading-none ps-5">
              Admin Last Name
            </label>
            <input id="adminUsername" v-model="lastName" type="text"
              class="px-9 py-7 text-base mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 focus:outline-none focus-within:outline-none max-md:px-5"
              placeholder="Last Name" />
      </div>

      <div>
        <label for="adminEmail" class="text-base self-start mt-7 tracking-wide leading-none max-md:ml-0.5 ps-5">
        Admin Email
        </label>
        <input id="adminEmail" v-model="email" type="email"
          class="px-9 py-7 text-base mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 focus:outline-none focus-within:outline-none max-md:px-5"
          placeholder="Email Address" />
      </div>

      <div>
        <label for="adminPassword" class="text-base self-start mt-7 tracking-wide leading-none ps-5">
        Admin Password
        </label>
        <input id="adminPassword" v-model="password" type="password"
          class="px-9 py-7 text-base mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 focus:outline-none focus-within:outline-none max-md:px-5"
          placeholder="Password" />
      </div>

      <div class="flex gap-6 mt-8 items-center justify-center">
        <div class="flex items-center gap-3">
          <input v-model="gender" type="radio" name="gender" id="male" value="male">
          <label class="text-base" for="male">Male</label>
        </div>
        <div class="flex items-center gap-3">
          <input v-model="gender" type="radio" name="gender" id="female" value="female">
          <label class="text-base" for="female">Female</label>
        </div>
      </div>

      <div class="flex gap-6 mt-8 items-center justify-center">
        <div class="flex items-center gap-3">
          <input v-model="adminRole" type="radio" name="admin-role" id="admin" value="admin">
          <label class="text-base" for="admin">Admin</label>
        </div>
        <div class="flex items-center gap-3">
          <input v-model="adminRole" type="radio" name="admin-role" id="delivery" value="delivery">
          <label class="text-base" for="delivery">Delivery</label>
        </div>
      </div>

    </div>
    <button type="submit"
      class="gap-2.5 self-center hover:bg-emerald-950 px-12 py-4 mt-16 ml-3 max-w-full text-base font-medium bg-green-700 rounded min-h-[56px] text-neutral-50 w-[271px] max-md:px-5 max-md:mt-10">
      Add Admin
    </button>

    <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
  </form>
</template>

<script>
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'AdminForm',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
      gender: 'male',
      profilePicture: '',
      adminRole:'admin'
    };
  },
  methods: {
    async addAdmin() {
      try {
        console.log(this.firstName);
        console.log(this.lastName);
        console.log(this.email);
        console.log(this.password);
        
        if (!this.firstName || !this.lastName || !this.email || !this.password) {
          this.errorMessage = 'All fields are required. Please fill out the username, email, and password.';
          return;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(this.password)) {
          this.errorMessage = 'Password must be at least 8 characters long and include letters, numbers, and special characters.';
          return;
        }
        const response = await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/users/admin.json');
        const existingAdmins = response.data || {};
        const emails = Object.values(existingAdmins).map(admin => admin.email);
        if (emails.includes(this.email)) {
          this.errorMessage = 'This email is already in use. Please use a different email.';
          return;
        }
        // const newAdminId = uuidv4();

        if (this.gender == 'male') {
          this.profilePicture = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/userAvatar/maleImage.json')).data
        }
        else if (this.gender == 'female') {
          this.profilePicture = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/userAvatar/femaleImage.json')).data
        }

        const adminData = {
          // id: newAdminId,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          role: this.adminRole,
          gender: this.gender,
          profilePicture: this.profilePicture
        };
        await axios.post(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/${this.adminRole}.json`, adminData);
        this.username = '';
        this.email = '';
        this.password = '';
        this.errorMessage = '';
        if(this.adminRole =='admin'){
          console.log('Admin added successfully');
        }else{
          console.log('Delivery added successfully');
        }
      }
      catch (error) {
        console.error('Error adding admin:', error);
      }
    },
  },
};
</script>
