<script setup lang="ts">
//Import Tools
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useProviderStore } from '../../stores/provider-store';

//Activate tools
const $q = useQuasar();
const providerStore = useProviderStore();

//Data
const providerName = ref('');
const creationDate = ref();
const brief = ref('');
const website = ref('');
const logo = ref();

//Loading
const loading = ref(false);

//Logics Funtions
const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    logo.value = file;
};

const handleSubmit = async () => {
    try {
        loading.value = true;

        //set formdata
        let formData = new FormData();

        formData.append('providerName', providerName.value);
        formData.append('creationDate', creationDate.value);
        formData.append('brief', brief.value);
        formData.append('website', website.value);
        formData.append('logo', logo.value);

        //send to backend
        await providerStore.createProvider(formData);

        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Proveedor creado correctamente'
        });

        //reset form
        providerName.value = '';
        creationDate.value = '';
        brief.value = '';
        website.value = '';

        loading.value = false;
    } catch (error: any) {
        console.log('error', error);
        if (error.error) {
            alertDialogBackend(error.error);
        } else if (error.errors[0].msg) {
            alertDialogBackend(error.errors[0].msg);
        } else {
            alertDialogBackend();
        }
    }
};

const alertDialogBackend = (message = 'Error en el servidor') => {
    $q.dialog({
        title: 'Error',
        message
    });
};
</script>

<template>
    <q-form @submit="handleSubmit">
        <q-card>
            <q-card-section>
                <q-input
                    v-model="providerName"
                    label="Nombre del proveedor"
                    lazy-rules
                    :rules="[(val) => !!val || 'Este campo es requerido']"
                />
                <q-input
                    v-model="creationDate"
                    label="Fecha de creación"
                    type="date"
                    lazy-rules
                    :rules="[(val) => !!val || 'Este campo es requerido']"
                />
                <q-input
                    v-model="brief"
                    label="Descripción"
                    lazy-rules
                    :rules="[(val) => !!val || 'Este campo es requerido']"
                />
                <q-input
                    v-model="website"
                    label="Sitio web"
                    lazy-rules
                    :rules="[(val) => !!val || 'Este campo es requerido']"
                />
                <input @change="handleImageUpload" type="file" placeholder="Logo" />
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
