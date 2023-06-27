<script setup lang="ts"></script>

<template>
    <section class="column flex-center hero-container">
        <q-img src="public/img/bg-hexa1.jpg" class="img-hero-big" />
        <h2 class="text-center text-white">¿Necesitas apoyo para estudiar online?</h2>
        <q-btn
            to="comienza-ahora"
            class="hero-btn"
            label="¡Estudia donde quieras!"
            icon-right="mdi-cursor-default-click-outline"
        />
    </section>
</template>

<style scoped lang="scss">
.hero-container {
    width: 100%;
    min-height: 75vh;
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
.hero-btn {
    color: white;
    border: 1px solid white;
}
</style>
