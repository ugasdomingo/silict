<script setup lang="ts">
//Import tools
import { RouterLink } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';

//Import components
import NavbarComponent from './NavbarComponent.vue';

//Variables
const backgroundWhite = ref(false);

//Functions
const changeBackground = () => {
    if (window.scrollY > 10) {
        backgroundWhite.value = true;
    } else {
        backgroundWhite.value = false;
    }
};

//Hooks
onMounted(() => {
    window.addEventListener('scroll', changeBackground);
});

onUnmounted(() => {
    window.removeEventListener('scroll', changeBackground);
});
</script>

<template>
    <header :class="{ 'background-white': backgroundWhite }">
        <RouterLink to="/">
            <h2 class="logo">Silicit</h2>
        </RouterLink>
        <NavbarComponent />
    </header>
</template>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4rem 0.5rem;
    background-color: transparent;
    z-index: 1;
    max-height: 10vh;
    box-sizing: border-box;
    overflow: hidden;
}
.logo {
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2rem #646cffaa);
}
.background-white {
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 1em var(--color-primary);
    color: var(--color-primary);
}
</style>
