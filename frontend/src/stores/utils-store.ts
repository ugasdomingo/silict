//Import tools
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUtilsStore = defineStore('utils', () => {
    const haveAccount = ref(true);

    return { haveAccount };
});
