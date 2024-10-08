<template>
    <div class="reset-password-page">
        <div class="container">
            <h2 class="title">Reset Your Password</h2>
            <input v-model="newPassword" type="password" placeholder="New Password" class="password-input" />
            <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="password-input" />
            <button @click="updatePasswordInDatabase" class="submit-btn">Reset Password</button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ResetPassword',
    data() {
        return {
            newPassword: '',
            confirmPassword: '',
            errorMessage: '',
        };
    },
    methods: {
        async updatePasswordInDatabase() {
    const userId = "USER_ID"; 
    const url = `https://dailymart-5c550-default-rtdb.firebaseio.com/users/customer/${userId}.json`;

    try {
        const response = await axios.patch(url, {
            password: this.newPassword, 
        });
        if (response.status === 200) {
            alert('Password has been reset successfully.');
            this.$router.push({ name: 'SignPage' }); 
        }
    } catch (error) {
        console.error("Error updating password:", error);
        this.errorMessage = "Failed to update password. Please try again.";
    }
}

    }
}
</script>

<style scoped>
.reset-password-page {
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

.password-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 24px;
    transition: border-color 0.2s;
}

.password-input:focus {
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

.error {
    color: red;
    margin-top: 16px;
}
</style>
