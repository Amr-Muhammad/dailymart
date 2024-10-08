<template>
  <div class="flex p-10 justify-center">
    <div class=" max-w-auto w-[500px] p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">Contact Us</h2>
      <form @submit.prevent="sendEmail" class="space-y-4">
        <div class="form-group">
          <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
          <input type="text" v-model="from_name" id="name" placeholder="Enter your name" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
        </div>

        <div class="form-group">
          <label for="email" class="block text-sm font-medium text-gray-700">Your Email</label>
          <input type="email" v-model="email" id="email" placeholder="Enter your email" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
        </div>

        <div class="form-group">
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="tel" v-model="phone_num" id="phone_num" placeholder="Enter your phone number"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
        </div>

        <div class="form-group">
          <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
          <input type="text" v-model="message_sub" id="message_sub" placeholder="Subject of your message" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
        </div>

        <div class="form-group">
          <label for="message" class="block text-sm font-medium text-gray-700">Your Message</label>
          <textarea v-model="message" id="message" placeholder="Enter your message" required rows="4"
            class="mt-1 resize-none block w-full max-w-lg px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
        </div>

        <button type="submit"
          class="w-full py-2 px-4 bg-green-500 text-black font-semibold rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Send Message
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      from_name: '',
      email: '',
      phone_num: '',
      message_sub: '',
      message: '',
    };
  },
  mounted() {
    emailjs.init('9UIn0EifA2Rsqne-9');
  },
  methods: {
    sendEmail() {
      const templateParams = {
        from_name: this.from_name,
        to_name: 'Recipient Name',
        email: this.email,
        phone_num: this.phone_num,
        message_sub: this.message_sub,
        message: this.message,
      };

      emailjs.send('service_g4avpxe', 'template_9uovei9', templateParams)
        .then(response => {
          console.log('SUCCESS!', response.status, response.text);
          this.from_name = '';
          this.email = '';
          this.phone_num = '';
          this.message_sub = '';
          this.message = '';
        }, error => {
          console.log('FAILED...', error);
        }).then(() => {
          Swal.fire({
            title: 'Message Sent!',
            text: 'Thank you for contacting us. We have received your message and will get back to you within 24 hours.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
            customClass: {
              popup: 'bg-white text-gray-800 p-5 rounded-lg',
            },
            background: '#f1f1f1', 
            showCloseButton: true, 
            timer: 5000 
          });
        });
    },

  },
};
</script>
