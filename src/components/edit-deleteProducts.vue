<template>
    <div class="editProduct">
        <div class="flex w-8/12 lg:w-4/12 justify-center mx-auto">
            <form class="w-full">
                <h2 class="text-3xl font-bold mb-6">Add new Product</h2>
                <div class="input-pair mb-6">
                    <label class="font-bold" for="">Product Name</label>
                    <input type="text" placeholder="Title" class="py-2 px-3 border rounded-md w-full" />
                </div>

                <div class="input-pair mb-6">
                    <label class="font-bold" for="">Product Price</label>
                    <input type="number" placeholder="Product Price" class="py-2 px-3 border rounded-md w-full" />
                </div>

                <div class="input-pair mb-6">
                    <label class="font-bold" for="">Quantity</label>
                    <input type="number" placeholder="Quantity" class="py-2 px-3 border rounded-md w-full" />
                </div>


                <select name="category" id="category" class="border py-1 px-2 mb-6 rounded-md">
                    <option value="snacks" disabled selected class="font-bold">Select category</option>
                    <option value="snacks">Snacks</option>
                    <option value="beverages">Beverages</option>
                    <option value="dairy">Dairy Products</option>
                    <option value="veg&fruits">Vegetables & Fruits</option>
                    <option value="frozen">Frozen Goods</option>
                    <option value="oil">Cooking Oil</option>
                    <option value="sauces">Sauces</option>
                    <option value="cleaning">Cleaning Products</option>
                </select>

                <div class="mb-6">
                    <div class="sale flex items-center gap-3 lg:w-1/2 w-full ">
                        <label class="font-bold" for="sale">Onsale?</label>
                        <input v-model="checked" type="checkbox" name="sale" id="sale">
                        <input v-if="checked" type="number" name="sale" id="sale" class="border py-2 px-3 rounded-md"
                            placeholder="Enter sale percentage">
                    </div>
                    <div class="sale flex items-center gap-3 lg:w-1/2 w-full mt-4">
                        <label class="font-bold" for="new">New Item?</label>
                        <input type="checkbox" name="new" id="new">
                    </div>
                </div>

                <div class="input-pair mb-6">
                    <label class="font-bold" for="file">Product Image</label>
                    <input id="file" type="file" class="cursor-pointer block mt-3" />
                </div>
                <button class="mainGreenBtn block mx-auto">Add Product</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            checked: false
        }
    }
}
</script>

<style scoped></style>