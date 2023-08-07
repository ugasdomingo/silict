<template>
    <LoginFormComponent v-if="utilsStore.haveAccount == true" />
    <RegisterFormComponent v-else />
</template>

<script setup lang="ts">
//Import tools
import { useUtilsStore } from '../stores/utils-store';

//Import Components
import RegisterFormComponent from '../common/forms/RegisterFormComponent.vue';
import LoginFormComponent from '../common/forms/LoginFormComponent.vue';

//Activate tools
const utilsStore = useUtilsStore();
</script>
