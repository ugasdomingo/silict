<script setup lang="ts">
//Import Tools
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
const name = ref('');
const email = ref('');
const password = ref('');
const repassword = ref('');
const loadding = ref(false);
const politiquesAccepted = ref(false);

const handleSubmit = async () => {
    try {
        loadding.value = !loadding.value;
        await userStore.register(
            name.value,
            email.value,
            password.value,
            politiquesAccepted.value,
            'User'
        );
        router.push('/escritorio');
        name.value = '';
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
    <section class="row text-white justify-center">
        <div class="col-12">
            <h3 class="text-center">Crear una cuenta gratuita</h3>
            <q-form @submit.prevent="handleSubmit">
                <q-input
                    v-model="name"
                    label="Ingresa tu Nombre Completo"
                    dark
                    type="text"
                    lazy-rules
                    :rules="[(val) => !!val || 'Este campo es requerido']"
                />

                <q-input
                    v-model="email"
                    label="Ingrese email"
                    dark
                    type="text"
                    :rules="[
                        (val) =>
                            (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
                            'Formato email incorrecto'
                    ]"
                />

                <q-input
                    v-model="password"
                    label="Ingrese contraseña"
                    dark
                    type="password"
                    :rules="[(val) => (val && val.length > 5) || 'Contraseña mínimo 6 carácteres']"
                ></q-input>

                <q-input
                    v-model="repassword"
                    label="Repita contraseña"
                    dark
                    type="password"
                    :rules="[(val) => (val && val === password) || 'No coinciden las contraseñas']"
                ></q-input>

                <q-checkbox
                    v-model="politiquesAccepted"
                    label="Acepto las politicas de privacidad"
                    dark
                />
                <q-btn
                    label="Ver Politicas de Privacidad"
                    to="politica-privacidad"
                    style="font-size: 8px; margin-left: 8px"
                />

                <div>
                    <div v-if="politiquesAccepted == true">
                        <q-btn label="Registrarme" color="primary" type="submit" />
                        <q-spinner-pie color="primary" size="2em" v-if="loadding" />
                    </div>
                    <q-btn v-else label="Registrarme" disable />
                </div>
            </q-form>
            <div class="q-mt-xl">
                <p>¿Ya tienes una cuenta?</p>
                <q-btn
                    @click="utilsStore.haveAccount = true"
                    to="/login"
                    color="primary"
                    label="Iniciar Sesión"
                />
            </div>
        </div>
    </section>
</template>

<style></style>
