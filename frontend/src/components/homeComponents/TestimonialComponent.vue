<script setup lang="ts">
//Import tools
import { ref } from 'vue';

//Activate tools
const autoplay = ref(true);
const slide = ref(1);
</script>

<template>
    <section class="testimonial-container">
        <h4>Lo que dicen nuestros estudiantes</h4>
        <div class="q-pa-md">
            <q-carousel
                animated
                v-model="slide"
                navigation
                infinite
                :autoplay="autoplay"
                arrows
                transition-prev="slide-right"
                transition-next="slide-left"
                @mouseenter="autoplay = false"
                @mouseleave="autoplay = true"
            >
                <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
                <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
                <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
                <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
            </q-carousel>
        </div>
    </section>
</template>
