<template>
  <form
    class="flex flex-col grow items-center px-20 pt-16 pb-40 w-full text-sm bg-white rounded-xl border-2 border-solid border-zinc-100 shadow-[0px_20px_30px_rgba(167,209,233,0.45)] text-zinc-500 max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
    <div class="flex flex-col max-w-full w-[365px]">
      <label for="adminUsername" class="self-start tracking-wide leading-none">
        Admin Username
      </label>
      <input id="adminUsername" type="text"
        class="px-9 py-7 mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 max-md:px-5"
        placeholder="Username" />

      <label for="adminEmail" class="self-start mt-7 tracking-wide leading-none max-md:ml-0.5">
        Admin Email
      </label>
      <input id="adminEmail" type="email"
        class="px-9 py-7 mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 max-md:px-5"
        placeholder="Email" />

      <label for="adminPassword" class="self-start mt-7 tracking-wide leading-none">
        Admin Password
      </label>
      <input id="adminPassword" type="password"
        class="px-9 py-7 mt-4 w-full tracking-wide leading-none whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-100 max-md:px-5"
        placeholder="Password" />

      <button type="submit"
        class="gap-2.5 self-center hover:bg-emerald-950 px-12 py-4 mt-16 ml-3 max-w-full text-base font-medium bg-green-700 rounded min-h-[56px] text-neutral-50 w-[271px] max-md:px-5 max-md:mt-10">
        Add Admin
      </button>
    </div>
  </form>
</template>
<script>
export default {
  name: 'AdminForm'
}
</script>