<template>
    <section class="services-page-container">
        <h1>¿Qué quieres aprender hoy?</h1>
        <div class="services-card-container">
            <ServicesCardComponent :services="servicesDemo" :size="200" />
        </div>
    </section>
</template>

<script setup lang="ts">
import ServicesCardComponent from '../common/ServicesCardComponent.vue';
import { servicesDemo } from '../static/servicesDemo';
</script>

<style scoped lang="scss">
.services-page-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding: 0 4rem;
    box-sizing: border-box;
    color: var(--color-white);

    h1 {
        margin: 0;
        padding: 0;
        font-size: 3rem;
        text-align: center;
    }
}
.services-card-container {
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    flex-wrap: wrap;
    max-width: 100%;
    margin: 0;
    box-sizing: border-box;
}
</style>
