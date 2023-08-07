<script setup lang="ts">
//Import Tools
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { useCourseStore } from 'src/stores/course-store';
import { useProviderStore } from 'src/stores/provider-store';
import { tagsList } from 'src/static/tagsList';
import { categoryList } from 'src/static/categoryList';

//Activate Tools
const $q = useQuasar();
const courseStore = useCourseStore();
const providerStore = useProviderStore();

//Get providers
onMounted(() => {
    providerStore.getAllProvidersId();
});

//Data
const initialDate = ref('');
const finalDate = ref('');
const title = ref('');
const category = ref('');
const tags = ref([]);
const img = ref();
const description = ref('');
const url = ref('');
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
        formData.append('category', category.value);
        formData.append('tags', tags.value);
        formData.append('img', img.value);
        formData.append('description', description.value);
        formData.append('url', url.value);
        formData.append('price', price.value);
        formData.append('pid', pid.value.value);

        //send to backend
        await courseStore.createCourse(formData);

        //reset form
        initialDate.value = '';
        finalDate.value = '';
        title.value = '';
        category.value = '';
        tags.value = [];
        img.value = '';
        description.value = '';
        url.value = '';
        price.value = '';
        pid.value = '';

        //show success message
        $q.notify({
            color: 'positive',
            position: 'top',
            message: 'Curso creado correctamente'
        });
    } catch (error) {
        //show error message
        $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Error al crear el curso'
        });
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
                <q-input v-model="url" label="URL del video" class="q-mb-md" />
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
