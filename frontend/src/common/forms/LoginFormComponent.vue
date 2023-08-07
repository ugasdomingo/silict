<script setup lang="ts">
//Import tools
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '../../stores/user-store';
import { useUtilsStore } from '../../stores/utils-store';

//Activate tools
const $q = useQuasar();
const userStore = useUserStore();
const utilsStore = useUtilsStore();
const router = useRouter();

//Get data
const email = ref('');
const password = ref('');
const loadding = ref(false);

const handleSubmit = async () => {
    try {
        loadding.value = !loadding.value;
        await userStore.access(email.value, password.value);
        router.push('/escritorio');
        email.value = '';
        password.value = '';
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
    <section class="row justify-center q-pb-xl">
        <div class="col-12 col-sm-6 col-md-5">
            <h3 class="text-primary">Nos alegra verte</h3>
            <q-spinner-pie color="primary" size="5em" v-if="loadding" />
            <q-form v-else @submit.prevent="handleSubmit">
                <q-input
                    v-model="email"
                    label="Ingrese email"
                    type="text"
                    :rules="[
                        (val) =>
                            (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
                            'Formato email incorrecto'
                    ]"
                ></q-input>

                <q-input
                    v-model="password"
                    label="Ingrese contraseña"
                    type="password"
                    :rules="[(val) => (val && val.length > 5) || 'Contraseña mínimo 6 carácteres']"
                ></q-input>

                <div>
                    <q-btn label="Iniciar Sesión" color="primary" type="submit"></q-btn>
                </div>
            </q-form>
            <div class="q-mt-xl">
                <p>¿Primera vez?</p>
                <q-btn @click="utilsStore.haveAccount = false" color="primary">
                    Crear una cuenta
                </q-btn>
            </div>
        </div>
    </section>
</template>

<style></style>
