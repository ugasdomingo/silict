<template>
    <section class="login-container">
        <h2>Inicia Sesión</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <input type="email" id="email" v-model="email" placeholder="Correo Electrónico" />
                <input type="password" id="password" v-model="password" placeholder="Contraseña" />
            </div>
            <button type="submit">Iniciar Sesión</button>
            <div class="registrarse">
                <p>¿No tienes una cuenta?</p>
                <RouterLink to="/registro/user">Registrarse gratis</RouterLink>
                <RouterLink to="/registro/" class="action-btn">Afiliarme ahora</RouterLink>
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

//Get data
const email = ref('');
const password = ref('');

//Methods
const login = async () => {
    try {
        await userStore.access(email.value, password.value);

        //Redirect
        router.push('/mi-escritorio');
    } catch (error) {
        console.log(error);
    }
};
</script>

<style scoped lang="scss">
.login-container {
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
            gap: 1rem;

            input {
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                border: 1px solid #ccc;
                font-size: 1.2rem;
                font-weight: 500;
            }
        }

        button {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            border: none;
            background-color: green;
            color: white;
            font-size: 1.2rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;

            &:hover {
                background-color: #0a0;
            }
        }
    }
}

.registrarse {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 2rem;

    p {
        margin: 0;
        opacity: 0.5;
    }

    .action-btn {
        margin-top: 1rem;
        &:hover {
            background-color: var(--color-white);
            color: var(--color-primary);
        }
    }
}
</style>
