<template>
  <div class="flex items-center gap-4">
    <!-- ID Section -->
    <div class="leading-loose whitespace-nowrap">{{ id }}</div>

    <!-- User Info Section -->
    <div class="leading-loose">{{ userName }}</div>
    <div class="leading-loose">{{ email }}</div>
    
    <!-- Delete Button -->
    <button @click="deleteItem" class="text-base font-medium text-red-600 hover:text-red-800">
      Delete
    </button>
  </div>
</template>

<script>
export default {
  name: 'AdminListItem',
  props: {
    id: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    highlighted: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    deleteItem() {
      this.$emit('delete-item', this.id); 
    },
  },
};
</script>
