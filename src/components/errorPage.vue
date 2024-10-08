<template>
    <div>
        <div  class="text-center relative pt-10">
            <h1 class="text-6xl font-bold mb-6">404 Not Found</h1>
            <p class="text-lg mb-6">Oops! Something went wrong.</p>
            <button @click="this.$router.push('/homePage')" class="btn btn-wide bg-[#DB4444] hover:bg-[#166534] border-0 text-white text-lg">Back to Home Page</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ErrorPage'
}
</script>

<style scoped>
</style>