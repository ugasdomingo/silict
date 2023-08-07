<script setup lang="ts">
//Import tools
import { onMounted } from 'vue';
import { useProviderStore } from 'src/stores/provider-store';

//Import Components
import ProviderGalleryComponent from 'src/common/galleries/ProviderGalleryComponent.vue';

//Activate tools
const providerStore = useProviderStore();

onMounted(() => {
    providerStore.getAllProviders();
});
</script>

<template>
    <section class="providers-home-section">
        <h2 class="text-center q-mt-none">Proveedores de Formación</h2>
        <ProviderGalleryComponent
            :title="'Proveedores de Formación:'"
            :providers="providerStore.allProviders"
        />
    </section>
</template>

<style lang="scss" scoped>
.providers-home-section {
    width: 100%;
    padding: 4rem 2rem;
}
</style>
