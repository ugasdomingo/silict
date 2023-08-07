<template>
    <q-page class="home-page">
        <HeroComponent />
        <AboutComponent />
        <ShowProvidersComponent />
        <AffilationPlansComponent />
        <PlatziComponent />
        <TestimonialComponent />
        <FaqComponent />
    </q-page>
</template>

<script setup lang="ts">
//Import Components
import HeroComponent from 'src/components/homeComponents/HeroComponent.vue';
import AboutComponent from 'src/components/homeComponents/AboutComponent.vue';
import ShowProvidersComponent from 'src/components/homeComponents/ShowProvidersComponent.vue';
import AffilationPlansComponent from 'src/components/homeComponents/AffilationPlansComponent.vue';
import PlatziComponent from 'src/components/homeComponents/PlatziComponent.vue';
import FaqComponent from 'src/components/homeComponents/FaqComponent.vue';
import TestimonialComponent from 'src/components/homeComponents/TestimonialComponent.vue';
</script>

<style scoped lang="scss">
.home-page {
    box-sizing: border-box;
}
</style>
