<template>
    <div class="otp-page">
        <div class="container">
            <h2 class="title">Enter the OTP sent to your email</h2>
            <p class="description">We’ve sent a One Time Password (OTP) to your email {{ emailReset }}. Please enter it below.</p>
            <input v-model="otpValue" type="text" placeholder="Enter OTP" class="otp-input" />
            <button @click="verifyOtp" class="submit-btn">Verify OTP</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OtpPage',
    data() {
        return {
            otpValue: '',
            sentOtp: '', 
        };
    },
    computed: {
        emailReset() {
            return this.$route.params.emailReset; // Get the email from route params
        }
    },
    mounted() {
        const otpSent = this.$route.params.otp;
        console.log('Received OTP:', otpSent); 
        
        if (!otpSent) {
            console.error('No OTP sent in route parameters.');
            return;
        }

        this.sentOtp = otpSent; 
        console.log('OTP Value:', otpSent);
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
    },
};
</script>


<style scoped>
.otp-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
