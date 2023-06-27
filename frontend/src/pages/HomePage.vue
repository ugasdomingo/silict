<template>
    <q-page class="home-page">
        <HeroComponent />
        <BenefitsComponent />
        <PlatziComponent />
        <TestimonialComponent />
        <UdemyComponent />
        <FaqComponent />
    </q-page>
</template>

<script setup lang="ts">
//Import Components
import HeroComponent from 'src/components/homeComponents/HeroComponent.vue';
import BenefitsComponent from 'src/components/homeComponents/BenefitsComponent.vue';
import PlatziComponent from 'src/components/homeComponents/PlatziComponent.vue';
import TestimonialComponent from 'src/components/homeComponents/TestimonialComponent.vue';
import UdemyComponent from 'src/components/homeComponents/UdemyComponent.vue';
import FaqComponent from 'src/components/homeComponents/FaqComponent.vue';
</script>

<style scoped lang="scss">
.home-page {
    box-sizing: border-box;
}
</style>
