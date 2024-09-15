import axios from "axios";

export default {
    data() {
        return {
            products: null,
            categories: null,
            cart: null,
            wishlist: null
        }
    },
    methods: {
        async getAllProducts(searchQuery, categoryId) {
            this.products = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/products.json')).data
            if (categoryId) {
                this.products = Object.entries(this.products).filter(item => item[1].catId == categoryId && !item[1].boycott)
            }
            else {
                this.products = Object.entries(this.products).filter(item => !item[1].boycott)
            }

            if (searchQuery) {
                this.products = this.products.filter(item => item[1].english_name.toLowerCase().includes(searchQuery.toLowerCase()))
            }
            return this.products
        },
        async getCategories() {
            this.categories = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/category.json`)).data
            return Object.entries(this.categories)
        },
        async get_cart_wishlist(userId, cart_wishlist) {
            return (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/${cart_wishlist}/${userId}.json`)).data
        },
        async addTo_cart_wishlist(userId, productId, product, cart_wishlist) {
            return (await (axios.put(`https://dailymart-5c550-default-rtdb.firebaseio.com/${cart_wishlist}/${userId}/${productId}.json`, product))).data
        },
        async deleteItem_cart_wishlist(userId, productId, cart_wishlist) {
            return (await axios.delete(`https://dailymart-5c550-default-rtdb.firebaseio.com/${cart_wishlist}/${userId}/${productId}.json`))
        },
        async clear_Cart_Wishlist(userId, cart_wishlist) {
            return (await axios.delete(`https://dailymart-5c550-default-rtdb.firebaseio.com/${cart_wishlist}/${userId}/.json`))
        },
        async getSpeificProduct(userId, productId, cart_wishlist) {
            return (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/${cart_wishlist}/${userId}/${productId}/.json`)).data
        },
        async patchCartQuantity(userId, productId, cart_wishlist) {
            let quantity = (await axios.get(`https://dailymart-5c550-default-rtdb.firebaseio.com/${cart_wishlist}/${userId}/${productId}/quantity.json`)).data
            return (await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/${cart_wishlist}/${userId}/${productId}/.json`, { quantity: quantity + 1 })).data
        }

    },
}