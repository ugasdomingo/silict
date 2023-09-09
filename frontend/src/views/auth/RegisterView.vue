<template>
    <section class="register-container">
        <h2>Registrarse</h2>
        <form @submit.prevent="register">
            <div class="form-group">
                <input type="text" id="name" v-model="name" placeholder="Nombre Completo" />
                <input type="email" id="email" v-model="email" placeholder="Correo Electrónico" />
                <input type="password" id="password" v-model="password" placeholder="Contraseña" />
                <button type="submit">Registrarse</button>
            </div>
            <div class="access">
                <p>¿Ya tienes una cuenta?</p>
                <RouterLink to="/acceder">Iniciar Sesión</RouterLink>
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
//Import tools
import { useUserStore } from '../../stores/user-store';
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

//Activate tools
const userStore = useUserStore();
const router = useRouter();

//Get plan at path
const plan = router.currentRoute.value.params.plan as string;

//Get data
const name = ref('');
const email = ref('');
const password = ref('');

//Methods
const register = async () => {
    try {
        await userStore.register(name.value, email.value, password.value, plan);

        //Redirect
        router.push('/mi-escritorio');
    } catch (error) {
        console.log(error);
    }
};
</script>

<style scoped lang="scss">
.register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
    color: var(--color-white);

    h2 {
        font-size: 2rem;
        font-weight: 500;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            input {
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                border: 1px solid #ccc;
                font-size: 1rem;
                font-weight: 500;
            }
        }

        button {
            background-color: green;
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            color: #fff;
            font-size: 1rem;
            font-weight: 500;
            border: none;
            transition: background-color 0.2s ease-in-out;

            &:hover {
                background-color: #0a0;
            }
        }
    }

    .access {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        p {
            font-size: 1rem;
            font-weight: 500;
            opacity: 0.5;
        }
    }
}
</style>
