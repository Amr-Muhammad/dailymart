<template>
    <div class="otp-page">
        <div class="container">
            <h2 class="title">Enter the OTP sent to your email</h2>
            <p class="description">We’ve sent a One Time Password (OTP) to your email {{ emailReset }}. Please enter it
                below.</p>
            <input v-model="otpValue" type="text" placeholder="Enter OTP" class="otp-input" />
            <!-- <button @click="verifyOtp" class="submit-btn">Verify OTP</button> -->
            <button @click="getUserOtp()" class="submit-btn">Verify OTP</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: 'OtpPage',
    data() {
        return {
            otpValue: '',
            sentOtp: '',
        };
    },
    computed: {
        ...mapState(['forgotPasswordEmail']),
        emailReset() {
            return this.$route.params.emailReset; // Get the email from route params
        }
    },
    mounted() {
        if (!this.forgotPasswordEmail) {
            this.$router.push('/signPage')
        }
    },
    methods: {
        verifyOtp() {
            const otpInput = this.otpValue.trim();

            if (!otpInput) {
                alert('Please enter the OTP.');
                return;
            }

            if (otpInput === this.sentOtp) {
                alert('OTP verified successfully. You can now reset your password.');
                this.$router.push({ name: 'ResetPassword', params: { emailReset: this.emailReset } });
            } else {
                alert('Invalid OTP. Please try again.');
            }
        },

        async getUserOtp() {
            let allOTPRequests = (await (axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/OTPs.json`))).data
            let userOTPRequest = Object.entries(allOTPRequests).find(([, objValue]) => objValue.email == this.forgotPasswordEmail)

            if (userOTPRequest[1].otp == this.otpValue) {
                await this.$store.dispatch('setUserOTP', this.otpValue)
                await axios.delete(`https://dailymart-5c550-default-rtdb.firebaseio.com/OTPs/${userOTPRequest[0]}.json`)
                this.$router.push('/reset-password')
            }
        }
    },
};
</script>


<style scoped>
.otp-page {
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 100vh; */
    padding: 100px;
    background-color: #f9f9f9;
}

.container {
    background-color: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
}

.title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;
}

.description {
    font-size: 14px;
    color: #777;
    margin-bottom: 24px;
}

.otp-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 24px;
    transition: border-color 0.2s;
}

.otp-input:focus {
    border-color: #333;
    outline: none;
}

.submit-btn {
    padding: 12px 20px;
    background-color: #ff5722;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background-color: #e64a19;
}
</style>
