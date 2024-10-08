<template>
    <div>
        <input class="border px-2 py-1" placeholder="kjashdkahskkasd" v-model="currentPassword" type="text" name="" id="">
        <button class="mainGreenBtn" @click="checkPassword()">Check</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'manageMyPlane',
    data() {
        return {
            currentPassword: ''
        }
    },
    methods: {
        checkPassword() {
            console.log(this.loggedUserData);
            
            if (this.loggedUserData.password == this.currentPassword) {
                console.log('tmam');
            }
            else {
                console.log('msh tmam');

            }
        }
    },
    computed: {
        ...mapState(['loggedUserData'])
    }
}
</script>

<style scoped></style>