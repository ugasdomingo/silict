<script lang="ts" setup>
//Import Interfaces
import { type IProvider } from '../../interfaces/IProvider';

defineProps({
    providers: Array as () => IProvider[],
    title: String
});
</script>

<template>
    <div class="row justify-around cards-container">
        <RouterLink :to="'proveedores/' + item?.id" v-for="item in providers" :key="item?.id">
            <img
                class="portadas-home2"
                :src="
                    'https://res.cloudinary.com/minteados/image/upload/v1680304667/' +
                    item?.logo.public_id
                "
            />
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
.cards-container {
    width: 100%;
}

.portadas-home2 {
    width: 150px;
    height: 150px;
    border-radius: 16px;
    object-fit: cover;
}
.btn-blogs {
    background-color: $primary;
    color: white;
}
</style>
