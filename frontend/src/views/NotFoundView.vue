<template>
    <div>
        <h1>404</h1>
        <p>La página que buscas no existe.</p>
        <RouterLink to="/">Volver al inicio</RouterLink>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped lang="scss">
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    gap: 1rem;
    color: var(--color-white);

    h1 {
        font-size: 3rem;
        font-weight: 700;
    }

    p {
        font-size: 1.5rem;
        font-weight: 500;
    }

    a {
        text-decoration: none;
        margin-left: 0;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        transition: background-color 0.2s ease-in-out;
        background-color: green;

        &:hover {
            background-color: #eee;
        }
    }
}
</style>
