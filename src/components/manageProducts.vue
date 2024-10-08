<template>
    <div class="container mx-auto products pt-6 mb-12 px-20">


        <section class="mb-12 mx-10">
            <div class="mb-11">
                <h1 class="text-[36px] font-bold mb-3">Manage Products</h1>
                <p>In this section you can modify or delete products.</p>
            </div>
            <div class="flex flex-wrap">
                <div class="w-1/2 pe-10">
                    <label class="font-semibold" for="search">Filter</label>
                    <div class="searchInput relative mt-3">
                        <input v-model="searchQueryProducts" type="text" name="search" id="search"
                            class="grow ps-8  py-2 w-full border rounded-md" placeholder="search">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="h-5 w-5 opacity-70 absolute top-1/2 left-2 -translate-y-1/2">
                            <path fill-rule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div class="w-1/2 px-10">
                    <p class="font-semibold mb-3">Want to add a new product?</p>
                    <router-link to="editDelete">
                        <button class="mainGreenBtn">Create a New Product</button>
                    </router-link>
                </div>
            </div>

        </section>

        <div class="w-full overflow-x-auto">
            <table class="table text-center">
                <thead class="border-b">
                    <th>Id</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Sale</th>
                    <th>New</th>
                    <th>Price</th>
                    <th>Boycott</th>
                    <th>Category</th>
                    <th>Availability</th>
                    <th>Submitted By</th>
                    <th>Submitted At</th>
                </thead>

                <tbody v-if="filterdProducts">
                    <tr v-for="product in filterdProducts" :key="product">
                        <td>{{ product[0].slice(0, 10) }}</td>
                        <td class="flex justify-center"><img class="w-14" :src="product[1].image_url"
                                :alt="product[1].english_name"></td>
                        <td>{{ product[1].english_name }}</td>
                        <td :class="product[1].onsale ? 'text-red-500' : ''">{{ product[1].onsale ? product[1].onsale :
                            '----'
                            }}</td>
                        <td :class="product[1].new ? 'text-green-500' : '----'">{{ product[1].new ? 'New' : '' }}</td>
                        <td>{{ product[1].price }} EGP</td>
                        <td>{{ product[1].boycott ? 'Boycott' : '----' }}</td>
                        <td>{{ product[1].catId.split('_')[1].charAt(0).toUpperCase() +
                            product[1].catId.split('_')[1].slice(1) }}</td>
                        <td>{{ product[1].availability ? product[1].availability : '----' }}</td>
                        <td class="italic">{{ product[1].submittedBy }}</td>
                        <td>{{ product[1].submittedAt.split('T')[0] }}</td>
                        <td class="flex gap-3 items-center justify-center -translate-y-1/2  w-20">
                            <router-link :to="`/adminaccount/editDelete/${product[0]}`">
                                <img class="cursor-pointer" src="../assets/editing.png" alt="">
                            </router-link>
                            <img @click="deleteItem(product[0])" class="w-5 cursor-pointer"
                                src="../assets/deleteicon.png" alt="">
                        </td>

                    </tr>
                </tbody>

                <tbody v-else>
                    <tr v-for="product in products" :key="product">
                        <td>{{ product[0].slice(0, 10) }}</td>
                        <td class="flex justify-center"><img class="w-14" :src="product[1].image_url"
                                :alt="product[1].english_name">
                        </td>
                        <td>{{ product[1].english_name }}</td>
                        <td :class="product[1].onsale ? 'text-red-500' : ''">{{ product[1].onsale ? product[1].onsale :
                            '----'
                            }}
                        </td>
                        <td :class="product[1].new ? 'text-green-500' : '----'">{{ product[1].new ? 'New' : '' }}</td>
                        <td>{{ product[1].boycott ? '----' : product[1].price + ' EGP' }}</td>
                        <td>{{ product[1].boycott ? 'Boycott' : '----' }}</td>
                        <td>{{ product[1].catId.split('_')[1].charAt(0).toUpperCase() +
                            product[1].catId.split('_')[1].slice(1) }}
                        </td>
                        <td>{{ product[1].availability ? product[1].availability : '----' }}</td>
                        <td class="italic">{{ product[1].submittedBy }}</td>
                        <td>{{ product[1].submittedAt.split('T')[0] }}</td>
                        <td class="flex gap-3 items-center justify-center -translate-y-1/2 w-20">
                            <router-link :to="`/adminaccount/editDelete/${product[0]}`">
                                <img class=" cursor-pointer" src="../assets/editing.png" alt="">
                            </router-link>
                            <img @click="deleteItem(product[0])" class="w-5 cursor-pointer"
                                src="../assets/deleteicon.png" alt="">
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
import service from '@/mixins/service';

export default {
    name: 'productsPage',
    data() {
        return {
            products: null,
            userId: 'bab69910f7dc80c',
            searchQueryProducts: '',
            filterdProducts: null,
            holder: null
        }
    },
    methods: {
        async getAllProducts() {
            try {
                this.products = await service.methods.getAllProducts(this.searchQueryProducts, '', '', 'admin')
                console.log(this.products);

            }
            catch (err) {
                console.log(err);
            }
        },
        async deleteItem(productId) {
            console.log(productId);

            try {
                await service.methods.deleteProduct(productId)
                this.getAllProducts()
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    mounted() {
        this.getAllProducts()
    }
    ,
    watch: {
        searchQueryProducts: function () {
            this.filterdProducts = this.products.filter(item => item[1].english_name.toLowerCase().includes(this.searchQueryProducts.toLowerCase()))
        }
    }
}
</script>

<style scoped>
.card figure:hover .cart-btn {
    display: block
}

.join .join-item:checked,
.join .join-item:hover,
.join .join-item:checked:hover {
    background-color: #166534;
    color: white;
    border-color: rgb(22 101 52);
}
</style>