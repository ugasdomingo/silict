<template>
    <q-layout view="hHh lpR fff" class="layout-container">
        <NavBarComponent class="normal-menu" />
        <q-icon name="menu" class="hamburguer-menu" size="2rem">
            <q-popup-proxy transition-show="flip-up" transition-hide="flip-down" :breakpoint="50">
                <NavBarComponent />
            </q-popup-proxy>
        </q-icon>
        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer class="row bg-secondary text-white">
            <q-toolbar>
                <q-toolbar-title class="row items-center">
                    <div>Silicit</div>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script setup lang="ts">
//Import tools
import { useUserStore } from 'src/stores/user-store';

//Import Components
import NavBarComponent from 'src/components/layoutComponents/NavbarComponent.vue';

//Activate tools
const userStore = useUserStore();
</script>

<style scoped lang="scss">
.layout-container {
    position: relative;
}

.hamburguer-menu {
    display: none;
}
@media screen and (max-width: 760px) {
    .normal-menu {
        display: none;
    }
    .hamburguer-menu {
        display: inline-block;
        position: absolute;
        color: white;
        top: 2rem;
        right: 1rem;
        z-index: 100;
    }
}
</style>
