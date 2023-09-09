<script setup lang="ts">
//Import tools
import { useUserStore } from '../stores/user-store';

//Activate store
const userStore = useUserStore();

const paths = [
    { name: 'Conócenos', path: '/conocenos' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Planes', path: '/registro' }
];
</script>

<template>
    <nav>
        <ul>
            <li v-for="path in paths" :key="path.name">
                <RouterLink :to="path.path">{{ path.name }}</RouterLink>
            </li>
            <li>
                <RouterLink to="/mi-escritorio" class="action-btn">Mi Escritorio</RouterLink>
            </li>
            <li v-if="userStore.token">
                <RouterLink to="/logout" class="close-btn">Cerrar Sesión</RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
nav {
    ul {
        display: flex;
        gap: 1rem;
        list-style: none;
        font-size: 1.2rem;
        font-weight: 500;
        margin: 0;
        padding: 0;

        li {
            margin-left: 1rem;

            a {
                text-decoration: none;
                margin-left: 0;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                transition: background-color 0.2s ease-in-out;

                &:hover {
                    background-color: #eee;
                }
            }
        }

        .action-btn {
            margin-left: 1rem;
        }

        .close-btn {
            background-color: var(--color-primary);
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            margin-left: 1rem;
        }
    }
}
</style>
```
