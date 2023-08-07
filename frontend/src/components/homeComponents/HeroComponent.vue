<script setup lang="ts">
//Import tools
import { onMounted } from 'vue';
import { useServiceStore } from 'src/stores/service-store';

//Import Components
import ServiceGalleryComponent from 'src/common/galleries/ServiceGalleryComponent.vue';

//Activate tools
const serviceStore = useServiceStore();

//OnMounted
onMounted(() => {
    serviceStore.getAllServicesByCategory(0, 'oportunidades');
    serviceStore.getAllServicesByCategoryAndTags(0, 'cursos', 'gratis');
});
</script>

<template>
    <main class="row col-12 q-px-md justify-between hero-container">
        <q-img
            src="https://res.cloudinary.com/minteados/image/upload/v1691428237/silicit/fondo-1_yc3o0o.jpg"
            class="img-hero-big"
        />
        <section class="column col-6 justify-center text-white hero-text">
            <h1 class="q-my-none neon text-white">Aprende, Trabaja y Emprende</h1>
            <p>
                Bienvenidos a Silicit, la plataforma para lograr lo que quieras en la industria
                digital. Sin importar tu edad, nivel educativo o poder adquisitivo.
            </p>
        </section>
        <section class="column col-5 justify-evenly">
            <ServiceGalleryComponent
                :title="'Oportunidades Destacadas:'"
                :services="serviceStore.allServiceByCategory"
                :card="'my-little-card'"
            />

            <ServiceGalleryComponent
                :title="'Formaciones Gratuitas Destacadas:'"
                :services="serviceStore.allServiceByCategoryAndTags"
                :card="'my-little-card'"
            />
        </section>
    </main>
</template>

<style scoped lang="scss">
.hero-container {
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 0 10rem 0;
    background-color: rgba(0, 0, 0, 0.295);
}
.hero-container h1 {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 1rem;
}
.hero-container p {
    opacity: 0.7;
    font-size: 20px;
    margin: 0 0 0.5rem;
}
.hero-logo {
    max-width: 80px;
    margin: 0.5rem 0;
    object-fit: cover;
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

@media screen and (max-width: 760px) {
    .hero-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-top: 4rem;
    }
    .hero-text {
        width: auto;
    }
    .hero-container h1 {
        font-size: 2rem;
        line-height: 2.2rem;
    }
}
</style>
