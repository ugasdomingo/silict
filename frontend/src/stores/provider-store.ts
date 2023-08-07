//Import tools
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useUserStore } from './user-store';

//Activate tools
const userStore = useUserStore();

export const useProviderStore = defineStore('provider', () => {
    const allProviders = ref();
    const allProvidersId = ref();
    const oneProvider = ref();

    const getAllProviders = async () => {
        try {
            const res = await api({
                url: '/provider/all',
                method: 'GET'
            });

            allProviders.value = res.data;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const getAllProvidersId = async () => {
        try {
            await getAllProviders();

            allProvidersId.value = allProviders.value.map((provider: any) => {
                return { label: provider.providerName, value: provider._id };
            });
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const getProviderById = async (providerId: string) => {
        try {
            const res = await api({
                url: '/provider/' + providerId,
                method: 'GET'
            });

            oneProvider.value = res.data.provider;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const createProvider = async (providerData: any) => {
        try {
            const res = await api({
                url: '/provider',
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + userStore.token,
                    'Content-Type': 'multipart/form-data'
                },
                data: providerData
            });
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const updateProvider = async (providerData: FormData, providerId: string) => {
        try {
            const res = await api({
                url: '/provider/' + providerId,
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + userStore.token,
                    'Content-Type': 'multipart/form-data'
                },
                data: providerData
            });

            console.log(res.data);
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const deleteProvider = async (providerId: string) => {
        try {
            const res = await api({
                url: '/provider/' + providerId,
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + userStore.token
                }
            });

            console.log(res.data);
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    return {
        allProviders,
        allProvidersId,
        oneProvider,
        getAllProviders,
        getAllProvidersId,
        getProviderById,
        createProvider,
        updateProvider,
        deleteProvider
    };
});
