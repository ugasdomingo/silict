<script setup lang="ts">
import { servicesDemo } from '../static/servicesDemo';
import ServicesCardComponent from '../common/ServicesCardComponent.vue';
</script>

<template>
    <main class="hero-container">
        <div class="services-card-container">
            <ServicesCardComponent :services="servicesDemo" />
        </div>
        <div class="welcome-text">
            <h2>Construye lo que quieras</h2>
            <p>
                Te ayudamos a profesionalizarte en tecnología o cualquier carrera de la industria
                digital.
            </p>
            <RouterLink to="/registro" class="hero-button"> Comenzar con 0,00$ </RouterLink>
        </div>
    </main>
</template>

<style scoped lang="scss">
.hero-container {
    display: flex;
    justify-content: space-between;
    max-height: 80vh;
    padding: 0 4rem;
    box-sizing: border-box;

    .services-card-container {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        max-width: 75%;
        margin: 0;
        box-sizing: border-box;
    }

    .welcome-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 25%;
        max-height: 100vh;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: var(--color-white);

        h2 {
            margin: 0;
            padding: 0;
        }

        .hero-button {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            background-color: var(--color-accent);
            font-size: 1.25rem;
            font-weight: 600;
            text-decoration: none;
            text-align: center;

            &:hover {
                background-color: var(--color-white);
            }
        }
    }

    @media screen and (max-width: 768px) {
        .services-card {
            width: 250px;
            height: 250px;
        }
    }
}
</style>
