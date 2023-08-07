<script setup lang="ts">
//Import tools
import { ref } from 'vue';

//Activate tools
const images = ref([
    {
        src: 'public/img/estudiante-1.webp',
        alt: 'Estudiante 1'
    },
    {
        src: 'public/img/estudiante-2.webp',
        alt: 'Estudiante 2'
    },
    {
        src: 'public/img/estudiante-3.webp',
        alt: 'Estudiante 3'
    }
]);

const currentImage = ref(0);

function nextImage() {
    currentImage.value = (currentImage.value + 1) % images.value.length;
}

function prevImage() {
    currentImage.value = (currentImage.value - 1 + images.value.length) % images.value.length;
}
</script>

<template>
    <section class="testimonial-container">
        <h2>Lo que dicen nuestros estudiantes</h2>
        <div class="q-pa-md carousel">
            <div class="image" v-for="image in images" :key="image.src">
                <img :src="image.src" :alt="image.alt" class="img" />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.testimonial-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 0;
}
.carousel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 auto;
}

.image {
    width: 30%;
    height: 25%;
}
.img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
}
@media screen and (max-width: 760px) {
    .testimonial-container {
        h2 {
            text-align: center;
        }
    }
    .image {
        width: 100%;
        height: 100%;
    }
}
</style>
