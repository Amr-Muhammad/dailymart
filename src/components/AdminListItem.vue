<template>
  <div :class="['flex flex-wrap gap-5 justify-between py-5 pr-20 pl-7 mt-8 w-full rounded-xl border border-solid bg-white bg-opacity-10 shadow-[0px_20px_30px_rgba(167,209,233,0.45)] max-md:px-5 max-md:max-w-full', { 'border-green-700': highlighted, 'border-zinc-100': !highlighted }]">
    <div class="flex gap-3 self-start mt-1.5 leading-loose whitespace-nowrap">
      <input
        type="checkbox"
        v-model="isChecked"
        class="flex shrink-0 self-start rounded-sm border border-solid border-zinc-500 h-[17px] w-[17px]"
      />
      <div>{{ id }}</div>
    </div>
    <div class="flex flex-wrap gap-10 max-md:max-w-full">
      <div class="leading-loose">{{ userName }}</div>
      <div class="leading-loose">{{ email }}</div>
      <button @click="deleteItem" class="text-base font-medium text-red-600 hover:text-red-800">Delete</button>
    </div>
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
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    deleteItem() {
      this.$emit('delete-item', this.id); 
    },
  },
};
</script>
