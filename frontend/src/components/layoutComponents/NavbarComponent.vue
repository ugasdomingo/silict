<template>
    <nav class="navbar-container">
        <RouterLink to="/" class="nav-btn">Inicio</RouterLink>
        <RouterLink to="/becas-ayudas" class="nav-btn">Becas</RouterLink>
        <RouterLink to="/about-us" class="nav-btn">Nosotros</RouterLink>
        <RouterLink to="/escritorio" v-if="userStore.token" class="last-btn">
            Mi Escritorio
        </RouterLink>
        <RouterLink to="/login" v-else class="last-btn">Iniciar Sesión</RouterLink>
    </nav>
</template>

<script setup lang="ts">
//Import tools
import { useUserStore } from 'src/stores/user-store';

//Activate tools
const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.navbar-container {
    position: absolute;
    top: 2rem;
    right: 1rem;
    z-index: 100;
}
.nav-btn {
    color: white;
    text-decoration: none;
    margin: 0.5rem;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
}
.nav-btn:hover {
    background-color: $accent;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
}
.last-btn {
    color: white;
    text-decoration: none;
    margin: 0.5rem;
    font-size: 1rem;
    background-color: $accent;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
}

@media screen and (max-width: 760px) {
    .navbar-container {
        position: relative;
        top: 0;
        right: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        background-color: $primary;
        border-radius: 0 0 10rem 0;
    }
    .last-btn {
        background-color: $secondary;
    }
}
</style>
