<script setup>
import axios from "axios";
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

let products = ref([])
let links = ref([])

onMounted(async () => {
    getProducts()
})

const newProduct = () => {
    router.push('/products/create')
}

const ourImage = (img) => {
    return "/uploads/"+img
}

const getProducts = async () => {
    let response = await axios.get('/api/products')
    .then((response) => {
        products.value = response.data.products.data
        links.value = response.data.products.links
    })
}

const changePage = (link) => {
    if (!link.url || link.active) {
        return
    }

    axios.get(link.url)
        .then((response) => {
            products.value = response.data.products.data
            links.value = response.data.products.links
        })
}
</script>

<template>
    <section>
        <div class="titilbar">
            <h1>Products</h1>
            <button @click="newProduct">Add product</button>
        </div>
        <div class="table">
            <div class="table-filter">
                <div>
                    <ul class="table-filter-list">
                        <li>
                            <p class="table-filter-link link-active">All</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="table-search">
                <div>
                    <button class="search-select">Search Product</button>
                    <span class="search-select-arrow"><i class="fas fa-caret-down"></i></span>
                </div>
                <div class="relative">
                    <input type="text" name="search" placeholder="Search product..." value="{{ request('search') }}" class="search-input">
                </div>
            </div>
            <div class="table-product-head">
                <p>Image</p>
                <p>Name</p>
                <p>Category</p>
                <p>Inventory</p>
                <p>Actions</p>
            </div>
            <div class="table-product-body" v-for="product in products" :key="product.id">
                <img :src="ourImage(product.image)" alt="">
                <p>{{ product.name }}</p>
                <p>{{ product.type }}</p>
                <p>{{ product.quantity }}</p>
                <div>
                    <button class="btn btn-success"><i class="fas fa-pencil-alt"></i></button>
                </div>
            </div>
            <div class="table-paginate">
                <div class="pagination">
                    <a href="#" class="btn" v-for="(link, index) in links" :key="index" :class="{ active: link.active, disabled: !link.url }" @click="changePage(link.url)">{{ link.label }}</a>
                </div>
            </div>
        </div>
    </section>
</template>
