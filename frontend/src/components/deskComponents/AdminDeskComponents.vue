<script setup lang="ts">
//Import tools
import { ref } from 'vue';

//Import components
import ProviderFormComponent from '../../common/forms/ProviderFormComponent.vue';
import ServicesFormComponent from '../../common/forms/ServicesFormComponent.vue';

// Activate tools
const upProvider = ref(false);
const upService = ref(false);
const upCourse = ref(false);
</script>

<template>
    <main class="desk-admin-container">
        <h1 class="text-white">Silicit Admin Desk</h1>

        <!-- // Botones para activar los formularios -->
        <q-toggle v-model="upProvider" label="Subir Proveedor" class="q-my-xl text-white" />
        <q-toggle v-model="upCourse" label="Subir Curso" class="q-my-xl text-white" />
        <q-toggle v-model="upService" label="Subir Servicio" class="q-my-xl text-white" />

        <!-- // Sección de formularios -->
        <section v-if="upProvider" class="provider-form">
            <h5>Agregar un proveedor</h5>

            <ProviderFormComponent />
        </section>

        <section v-if="upService" class="service-form">
            <h5>Agregar un Servicio</h5>

            <ServicesFormComponent />
        </section>

        <section v-if="upCourse" class="service-form">
            <h5>Agregar un Curso</h5>

            <ServicesFormComponent />
        </section>
    </main>
</template>

<style scoped lang="scss">
.provider-form {
    padding: 1rem;
    background-color: aquamarine;
}
.service-form {
    padding: 1rem;
    background-color: violet;
}
</style>
