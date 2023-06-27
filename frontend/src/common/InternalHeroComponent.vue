<script setup lang="ts">
defineProps({
    title: String,
    img: String
});
</script>

<template>
    <section class="column flex-center internal-hero">
        <q-img :src="img" class="img-hero-big" />
        <h5 class="text-center text-white">{{ title }}</h5>
    </section>
</template>

<style scoped lang="scss">
.internal-hero {
    width: 100%;
    min-height: 20vh;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0 20% 0;
}
.img-hero-big {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: 0 0 20% 0;
}
</style>
