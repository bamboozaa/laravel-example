<script setup>
    import axios from 'axios';
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';


    const form = reactive({
        name: "",
        description: "",
        image: "",
        type: "",
        quantity: "",
        price: "",
    })

    const router = useRouter()

    let errors = ref([])

    const getImage = () => {
        let image = "/uploads/no-image.png"
        if (form.image) {
            if (form.image.indexOf("base64") != -1) {
                image = form.image
            } else {
                image = "/uploads/" + form.image
            }
        }
        return image
    }

    const handleFileChange = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = (file) => {
            form.image = reader.result
        }
        reader.readAsDataURL(file)
    }

    const handleSave = () => {
        axios.post('/api/products', form )
            .then(response => {
                router.push('/')
                toast.fire({
                    icon: 'success',
                    title: 'Product created successfully'
                })
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    errors.value = error.response.data.errors
                }

            })
    }
</script>

<template>
    <section>
        <div class="titlebar">
            <h1>Create Product</h1>
            <button @click="handleSave">Save</button>
        </div>
        <div class="card">
            <div>
                <label for="name">Name</label>
                <input type="text" v-model="form.name">
                <small style="color: red" v-if="errors.name">{{ errors.name }}<></small>
                <label for="description">Description (optional)</label>
                <textarea id="" cols="10" rows="5" v-model="form.description"></textarea>
                <small style="color: red" v-if="errors.description">{{ errors.description }}<></small>
                <label for="file">Add Image</label>
                <img :src="getImage()" alt="" class="img-product">
                <input type="file" @change="handleFileChange">
            </div>
            <div>
                <label for="type">Category</label>
                <input type="text" v-model="form.type">
                <hr>
                <label for="quantity">Inventory</label>
                <input type="text" class="input" v-model="form.quantity">
                <hr>
                <label for="price">Price</label>
                <input type="text" class="input" v-model="form.price">
            </div>
        </div>
        <div class="titlebar">
            <h1></h1>
            <button @click="handleSave">Save</button>
        </div>
    </section>
</template>
