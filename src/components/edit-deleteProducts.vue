<template>
    <div class="editProduct pt-10">
        <div class="flex w-8/12 lg:w-6/12 justify-center mx-auto  p-5 rounded-lg">

            <form class="w-full" @submit.prevent="productId ? editProduct() : addProduct()">

                <h2 v-if="productId" class="text-3xl font-bold mb-6 text-center font-serif">Edit Product</h2>
                <h2 v-if="!productId" class="text-3xl font-bold mb-6 text-center font-serif">Create a New Product</h2>

                <div class="input-pair mb-6">
                    <label class="font-bold" for="">Product Name</label>
                    <input v-model="productDetails.english_name" type="text" placeholder="Title"
                        class="py-2 px-3 border rounded-md w-full" />
                </div>

                <div class="input-pair mb-6">
                    <label class="font-bold" for="">Product Description</label>
                    <textarea v-model="productDetails.description" type="text" placeholder="description"
                        class="py-2 px-3 border rounded-md w-full resize-none" rows="3" />
                </div>

                <div class="input-pair mb-6">
                    <label class="font-bold" for="">Product Price</label>
                    <input v-model="productDetails.price" type="number" placeholder="Product Price"
                        class="py-2 px-3 border rounded-md w-full" />
                </div>

                <div class="input-pair mb-6">
                    <label class="font-bold" for="Availability">Availability</label>
                    <input v-model="productDetails.availability" type="number" placeholder="Quantity" id="availability"
                        class="py-2 px-3 border rounded-md w-full" />
                </div>


                <select v-model="productDetails.catId" name="category" id="category"
                    class="border py-1 px-2 mb-6 rounded-md">
                    <option disabled value="" class="font-bold">Select category</option>
                    <option value="bab69910f7dc80c257a9_snacks">Snacks</option>
                    <option value="bab69910f7dc80c257a9_bevrages">Beverages</option>
                    <option value="bab69910f7dc80c257a9_dairy">Dairy Products</option>
                    <option value="bab69910f7dc80c257a9_fruits">Vegetables & Fruits</option>
                    <option value="bab69910f7dc80c257a9_frozen">Frozen Goods</option>
                    <option value="bab69910f7dc80c257a9_oils">Cooking Oil</option>
                    <option value="bab69910f7dc80c257a9oils_sauces">Sauces</option>
                    <option value="bab69910f7dc80c257a9_cleaning">Cleaning Products</option>
                </select>

                <div class="mb-6">

                    <!-- Sale -->
                    <div class="sale flex items-center gap-3 w-full ">
                        <label class="font-bold" for="sale">Onsale?</label>

                        <div v-if="!productId" class="flex">
                            <input v-model="checked" type="checkbox" name="sale" id="sale" class="me-3">
                            <input v-if="checked" type="number" name="sale" id="sale" v-model="productDetails.onsale"
                                class="border py-1 px-3 rounded-md" placeholder="Enter sale percentage">
                        </div>

                        <div v-if="productId" class="flex">
                            <input v-model="checked" :checked="productDetails.onsale != ''" type="checkbox" name="sale"
                                id="sale" class="me-3">
                            <input v-if="productDetails.onsale || checked" v-model="productDetails.onsale" type="number"
                                name="saleValue" id="saleValue" class="border py-1 px-3 rounded-md"
                                placeholder="Enter sale percentage">
                        </div>
                    </div>

                    <!-- New -->
                    <div class="new flex items-center gap-3 lg:w-1/2 w-full mt-4">
                        <label class="font-bold" for="new">New Item?</label>
                        <input :checked="productDetails.new" v-model="productDetails.new" type="checkbox" name="new"
                            id="new">
                    </div>

                    <!-- Boycott -->
                    <div class="boycott flex items-center gap-3 lg:w-1/2 w-full mt-4">
                        <label class="font-bold" for="new">Boycott?</label>
                        <input :checked="productDetails.boycott" v-model="productDetails.boycott" type="checkbox"
                            name="boycott" id="boycott">
                    </div>
                    <div class="input-pair mt-4">
                        <label class="font-bold" for="">Upload Product Image:</label>
                        <input @change="uploadImage" class="block mt-2" type="file" name="" id="">
                        <!-- <label class="font-bold me-3" for="img_url">Product Image URL</label> -->
                        <!-- <input v-model="productDetails.image_url" id="img_url" type="text"
                            class="border py-1 px-3 rounded-md w-full mt-2" placeholder="https://domain-name.com" /> -->
                    </div>
                </div>

                <button v-if="productId" class="mainGreenBtn block mx-auto">Edit Product</button>
                <button v-if="!productId" class="mainGreenBtn block mx-auto">Add Product</button>
            </form>

        </div>
    </div>
</template>

<script>
import service from '@/mixins/service';

export default {
    name:'editDelete',
    data() {
        return {
            checked: false,
            productId: null,
            product: null,
            productDetails: {
                arabic_name: '',
                availability: null,
                boycott: false,
                catId: '',
                description: '',
                english_name: '',
                favorite: false,
                image_url: '',
                new: false,
                onsale: '',
                price: null,
                submittedAt: new Date(),
                submittedBy: 'Amr Muhammad'
            }
        }
    },
    methods: {
        async getProduct() {
            this.product = await service.methods.getProduct(this.productId)

            this.productDetails = {
                arabic_name: this.product.arabic_name,
                availability: this.product.availability,
                boycott: this.product.boycott,
                catId: this.product.catId,
                description: this.product.description,
                english_name: this.product.english_name,
                favorite: this.product.favorite,
                image_url: this.product.image_url,
                new: this.product.new,
                onsale: this.product.onsale ? this.product.onsale.split('%')[0] : '',
                price: this.product.price,
                submittedAt: this.product.submittedAt,
                submittedBy: this.product.submittedBy
            },
                this.productDetails.onsale != '' ? this.checked = true : '';
        },
        async editProduct() {
            try {
                if (this.productDetails.onsale != '') {
                    this.productDetails.onsale = `${this.productDetails.onsale}%`;
                }
                console.log(await service.methods.editProdcut(this.productId, this.productDetails));
                this.$router.push('/adminaccount/manageproducts')
            }
            catch (err) {
                console.log(err);
            }
        },
        async addProduct() {
            try {
                if (this.productDetails.onsale != '') {
                    this.productDetails.onsale = `${this.productDetails.onsale}%`;
                }



                console.log(await service.methods.addProdcut(this.productDetails));
                this.$router.push('/adminaccount/manageproducts')
            }
            catch (err) {
                console.log(err);
            }
        },

        uploadImage(event) {
            console.log(event);

            let file = event.target.files[0]

            if (file.size > 10_000_000) {
                alert('Your image size is more than 10Mb, please upload another one')
            }

            else if (file.type.split('/')[1] != 'jpeg' && file.type.split('/')[1] != 'jpg') {
                alert('Upload your image in jpeg or jpg format')
            }
            else {
                let reader = new FileReader()

                reader.onload = (e) => {
                    console.log(e);
                    console.log(e.target);
                    this.productDetails.image_url = e.target.result
                }
                reader.readAsDataURL(file)
            }
        },
    },
    mounted() {
        if (this.$route.params.id) {
            this.productId = this.$route.params.id
            this.getProduct()
        }
    }, watch: {
        checked(newVale) {
            if (!newVale) {
                this.productDetails.onsale = ''
            }
        }
    }
}
</script>

<style scoped></style>