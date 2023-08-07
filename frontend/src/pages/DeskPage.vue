<template>
    <q-page class="admin-desk" v-if="userStore.userRole == 'Admin'">
        <AdminDeskComponents />
    </q-page>
    <q-page v-else>
        <h4>Page Public</h4>
    </q-page>
</template>

<script setup lang="ts">
//Import tools
import { useUserStore } from 'src/stores/user-store';

//Import Components
import AdminDeskComponents from 'src/components/deskComponents/AdminDeskComponents.vue';

//Activate tools
const userStore = useUserStore();
</script>

<style scoped lang="scss">
.admin-desk {
    background-color: $dark;
}
</style>
