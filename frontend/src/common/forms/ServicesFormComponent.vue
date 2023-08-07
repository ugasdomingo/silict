<script setup lang="ts">
//Import Tools
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { useServiceStore } from 'src/stores/service-store';
import { useProviderStore } from 'src/stores/provider-store';
import { tagsList } from 'src/static/tagsList';
import { categoryList } from 'src/static/categoryList';

//Activate tools
const $q = useQuasar();
const serviceStore = useServiceStore();
const providerStore = useProviderStore();

//Get providers
onMounted(() => {
    providerStore.getAllProvidersId();
});

//Data
const title = ref('');
const initialDate = ref();
const finalDate = ref();
const category = ref('');
const tags = ref([]);
const img = ref();
const description = ref('');
const urlVideo = ref('');
const price = ref('');
const pid = ref();

//Loading
const loading = ref(false);

//Logics Funtions
const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    img.value = file;
};

const handleSubmit = async () => {
    try {
        loading.value = true;

        //set formdata
        let formData = new FormData();

        formData.append('initialDate', initialDate.value);
        formData.append('finalDate', finalDate.value);
        formData.append('title', title.value);
        formData.append('category', category.value.value);
        formData.append('tags', tags.value);
        formData.append('img', img.value);
        formData.append('description', description.value);
        formData.append('urlVideo', urlVideo.value);
        formData.append('price', parseInt(price.value));
        formData.append('pid', pid.value.value);

        //send to backend
        await serviceStore.createService(formData);

        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Servicio creado correctamente'
        });

        //reset form
        initialDate.value = '';
        finalDate.value = '';
        title.value = '';
        category.value = '';
        tags.value = [];
        img.value = '';
        description.value = '';
        urlVideo.value = '';
        price.value = '';
        pid.value = '';
    } catch (error: any) {
        console.log('error', error);
        if (error.error) {
            $q.notify({
                color: 'red-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: error.error
            });
        }
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <h6>Servicios</h6>
    <q-form @submit="handleSubmit">
        <q-card>
            <q-card-section>
                <q-input v-model="title" label="Título" class="q-mb-md" />
                <q-input
                    v-model="initialDate"
                    label="Fecha de inicio"
                    type="date"
                    class="q-mb-md"
                />
                <q-input
                    v-model="finalDate"
                    label="Fecha de finalización"
                    type="date"
                    class="q-mb-md"
                />
                <q-select
                    v-model="category"
                    :options="categoryList"
                    label="Categoría"
                    class="q-mb-md"
                />
                <q-checkbox
                    v-for="tag in tagsList"
                    :key="tag.value"
                    size="xs"
                    v-model="tags"
                    :val="tag.value"
                    :label="tag.label"
                />
                <input @change="handleImageUpload" type="file" placeholder="Portada" />
                <q-input
                    v-model="description"
                    label="Descripción"
                    type="textarea"
                    class="q-mb-md"
                />
                <q-input v-model="urlVideo" label="URL del video" class="q-mb-md" />
                <q-input v-model="price" label="Precio" class="q-mb-md" />

                <q-select
                    v-model="pid"
                    :options="providerStore.allProvidersId"
                    label="Providers"
                    class="q-mb-md"
                />
            </q-card-section>
            <q-card-actions align="right">
                <q-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                    :disable="loading"
                    label="Crear"
                />
            </q-card-actions>
        </q-card>
    </q-form>
</template>
