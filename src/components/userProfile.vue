<template> 

  <div>
      <h2 class="ms-10 text-2xl font-semibold">Edit Your Profile</h2>
  </div>

  <div v-if="loggedUserData != null" class=" flex justify-center flex-col items-center mt-10 mb-14">
      <!-- <img class="w-28 rounded-full border border-black"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="">  -->
      <img class="object-fill w-28 h-28 rounded-full border-[3px] border-[#1F822E]"
          :src="loggedUserData.profilePicture" alt="">
      <span v-if="!loggedUserData.profilePicture.includes('image/png')" @click="deleteProfilePicture()"
          class="text-red-500 font-semibold text-xs mt-4 cursor-pointer hover:underline">Delete
          Profile Picture</span>

      <input @change="uploadImage" type="file"
          class="file-input file-input-sm w-full max-w-xs focus:outline-none my-4" />
      <p class="text-gray-400"> <span class="text-red-500">*</span> Your image should not exceed 10Mb</p>
  </div>

  <div v-else class="w-3/12 mx-auto mb-14">
      <div class="flex bgblue flex-col gap-4">
          <div class="flex items-center gap-4 justify-center">
              <div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              <div class="flex flex-col gap-4">
                  <div class="skeleton h-4 w-20"></div>
                  <div class="skeleton h-4 w-28"></div>
              </div>
          </div>
          <div class="skeleton h-32 w-full"></div>
      </div>
  </div>

  <div v-if="loggedUserData != null">
      <div class="flex md:flex-nowrap flex-wrap lg:gap-24 gap-5 w-10/12 mx-auto justify-center mb-6">

          <label class="input input-bordered focus:outline-none flex items-center gap-2 md:w-6/12 w-full bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="h-4 w-4 opacity-70">
                  <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input v-model="firstName" type="text" class="grow" placeholder="First Name" />

          </label>

          <label class="input input-bordered focus:outline-none flex items-center gap-2 md:w-6/12 w-full bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="h-4 w-4 opacity-70">
                  <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input v-model="lastName" type="text" class="grow" placeholder="Last Name" />
          </label>

      </div>

      <div class="flex md:flex-nowrap flex-wrap lg:gap-24 gap-5 w-10/12 mx-auto justify-center mb-6">

          <label class="input input-bordered flex items-center gap-2 md:w-6/12 w-full bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="h-4 w-4 opacity-70">
                  <path
                      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path
                      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input v-model="email" type="text" class="grow" placeholder="Email" />
          </label>
          <label v-if="address.location!=null" class="input input-bordered flex items-center gap-2 md:w-6/12 w-full bg-gray-100">
              <svg fill="#4C4C4C" width="25px" height="25px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                      <path
                          d="M49,18.92A23.74,23.74,0,0,0,25.27,42.77c0,16.48,17,31.59,22.23,35.59a2.45,2.45,0,0,0,3.12,0c5.24-4.12,22.1-19.11,22.1-35.59A23.74,23.74,0,0,0,49,18.92Zm0,33.71a10,10,0,1,1,10-10A10,10,0,0,1,49,52.63Z">
                      </path>
                  </g>
              </svg>
              <input v-model="address.location" type="text" class="grow"
                  placeholder="Address" />

          </label>

      </div>


      <div class="w-10/12 mx-auto">
          <label class="font-semibold">Password Changes</label>

          <label class="input input-bordered flex items-center gap-2 bg-gray-100 mb-6 my-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="h-4 w-4 opacity-70">
                  <path fill-rule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clip-rule="evenodd" />
              </svg>
              <input v-model="currentPassword" type="password" class="grow" value="" placeholder="Current Password" />
          </label>

          <label class="input input-bordered flex focus:border-none items-center gap-2 bg-gray-100 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="h-4 w-4 opacity-70">
                  <path fill-rule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clip-rule="evenodd" />
              </svg>
              <input v-model="newPassword" type="password" class="grow" value="" placeholder="New Password" />
          </label>

          <label class="input input-bordered flex items-center gap-2 bg-gray-100 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="h-4 w-4 opacity-70">
                  <path fill-rule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clip-rule="evenodd" />
              </svg>
              <input v-model="confirmPassword" type="password" class="grow" value="" placeholder="Confirm New Password" />
          </label>

      </div>

      <div class="w-10/12 mx-auto flex justify-end gap-4">
          <button @click="saveChanges" class="mainPinkBtn bg-[#598369]">Save Changes</button>

          <!-- <button class="secondaryBtn border">Cancel</button> -->
      </div>

  </div>

</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
data() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
  };
},

computed: {
  ...mapState(['loggedUserId', 'loggedUserData']),
},

methods: {
  // تحميل صورة البروفايل
  uploadImage(event) {
    let file = event.target.files[0];
    if (file.size > 10_000_000) {
      alert('Your image size is more than 10Mb, please upload another one');
    } else if (file.type.split('/')[1] !== 'jpeg' && file.type.split('/')[1] !== 'jpg') {
      alert('Upload your image in jpeg or jpg format');
    } else {
      let reader = new FileReader();
      reader.onload = async (e) => {
        await axios.patch(
          `https://dailymart-5c550-default-rtdb.firebaseio.com/users/customer/${this.loggedUserId}.json`,
          { profilePicture: e.target.result }
        );
        this.loggedUserData.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },

  // حذف صورة البروفايل
  async deleteProfilePicture() {
    await axios.delete(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/customer/${this.loggedUserId}/profilePicture.json`);
    if (this.loggedUserData.gender === 'male') {
      this.loggedUserData.profilePicture = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/userAvatar/maleImage.json')).data;
    } else {
      this.loggedUserData.profilePicture = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/userAvatar/femaleImage.json')).data;
    }
    await this.$store.dispatch('setUserData', [this.loggedUserId, this.loggedUserData]);
  },
  getLoggedUserData() {
    if (this.loggedUserData) {
      this.firstName = this.loggedUserData.firstName;
      this.lastName = this.loggedUserData.lastName;
      this.email = this.loggedUserData.email;
      this.phone = this.loggedUserData.phone || '';
      this.address = this.loggedUserData.address || '';
    }
  },

  async validateInputs() {
  const emailPattern = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/g;
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const currentPassword = this.currentPassword;
  const newPassword = this.newPassword;
  const email = this.email;

  // تحقق إذا كان المستخدم قد أدخل كلمة المرور الحالية
  if (currentPassword.trim() === '') {
      alert('Current password is required to change any information.');
      return false;
  }

  // تحقق من صحة كلمة المرور الحالية
  if (currentPassword !== this.loggedUserData.password) {
      alert('Current password is incorrect.');
      return false;
  }

  // تحقق من صحة البريد الإلكتروني
  if (!emailPattern.test(email)) {
      alert('Invalid email');
      return false;
  }

  // تحقق من تطابق كلمة المرور الجديدة مع التأكيد
  if (newPassword && newPassword !== this.confirmPassword) {
      alert('New password must match the confirmation password');
      return false;
  }

  // تحقق من قوة كلمة المرور الجديدة إذا تم إدخالها
  if (newPassword && !passwordPattern.test(newPassword)) {
      alert('New password must be at least 8 characters long and include at least one letter, one number, and one special character.');
      return false;
  }

  return true; // إذا كانت جميع المدخلات صالحة
}
,
async saveChanges() {
  const isValid = await this.validateInputs();
  if (!isValid) return;

  try {
      const updateData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          address: this.address,
      };

      // إضافة كلمة المرور الجديدة إذا كانت موجودة
      if (this.newPassword) {
          updateData.password = this.newPassword;
      }

      // إرسال الطلب إلى API
      await axios.patch(
          `https://dailymart-5c550-default-rtdb.firebaseio.com/users/customer/${this.loggedUserId}.json`,
          updateData
      );

      // تحديث بيانات المستخدم في حالة نجاح العملية
      Object.assign(this.loggedUserData, updateData);

      // عرض رسالة تأكيد
      alert('Changes saved successfully!');

      // عرض بيانات المستخدم المحدثة في وحدة التحكم بعد التحديث
      console.log('Updated User Data:', this.loggedUserData);

      // إعادة تعيين المدخلات (اختياري)
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';

  } catch (error) {
      console.error('Error updating user data:', error);
      // عرض رسالة خطأ للمستخدم
      alert('An error occurred while saving changes. Please try again.');
  }
}


},


watch: {
  loggedUserData() {
    this.getLoggedUserData();
  }
},

mounted() {
  if (this.loggedUserData) {
    this.getLoggedUserData();
  }
}}


</script>

<style>
/* Add your CSS styling here */
</style>