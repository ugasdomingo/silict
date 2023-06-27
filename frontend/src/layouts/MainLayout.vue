<template>
    <q-layout view="hHh lpR fff">
        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
                    </q-avatar>
                    Title
                </q-toolbar-title>

                <q-tabs class="desktop-menu">
                    <q-route-tab to="/page1" label="Becas" />
                    <q-route-tab to="/empieza-ahora" label="¿Qué es Silicit?" />
                    <q-route-tab to="/page3" label="Mi Escritorio" />
                </q-tabs>
                <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
            </q-toolbar>
        </q-header>

        <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
            <q-list>
                <q-item-label header> Tu futuro comienza ¡Ahora! </q-item-label>

                <NavbarLink v-for="link in navbarLinks" :key="link.title" v-bind="link" />
            </q-list>
        </q-drawer>

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
import { ref } from 'vue';
import NavbarLink from 'components/layoutComponents/NavbarLinksComponent.vue';
import { navbarLinks } from './navbarLinks';

const rightDrawerOpen = ref(false);

function toggleRightDrawer() {
    rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 760px) {
    .desktop-menu {
        display: none;
    }
}
</style>
