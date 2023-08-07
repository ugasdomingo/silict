<script lang="ts" setup>
import { type IService } from '../../interfaces/IServices';

defineProps({
    services: Array as () => IService[],
    title: String,
    card: String
});
</script>

<template>
    <div class="formations-container">
        <h3 class="titles q-ma-xs text-white">{{ title }}</h3>
        <div class="cards-container">
            <div v-for="item in services" :key="item?.id" :class="card">
                <img
                    class="portadas-home2"
                    :src="
                        'https://res.cloudinary.com/minteados/image/upload/v1680304667/' +
                        item?.img.public_id
                    "
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.formations-container {
    display: flex;
    flex-direction: column;
}
.cards-container {
    width: 100%;
    display: flex;
    gap: 1rem;
}
.my-card {
    margin: 8px;
}
.my-little-card {
    width: 150px;
    height: 150px;
    border-radius: 1rem;
}
.portadas-home2 {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    object-fit: cover;
}

@media screen and (max-width: 760px) {
    .formations-container h3 {
        font-size: 1.5rem;
        line-height: 1.5rem;
        margin-bottom: 0.5rem;
    }
    .cards-container {
        overflow-x: scroll;
        overflow-y: hidden;
        width: 100%;
        gap: 0.5rem;
    }
    .my-little-card {
        width: 100px;
        height: 100px;
    }
}
</style>
