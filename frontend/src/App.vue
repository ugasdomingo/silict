<script setup lang="ts">
//Import tools
import { RouterView } from 'vue-router';

//Import components
import HeaderComponent from './layout/HeaderComponent.vue';
import FooterComponent from './layout/FooterComponent.vue';
</script>

<template>
    <HeaderComponent />
    <RouterView />
    <FooterComponent />
</template>

<style scoped lang="scss"></style>
