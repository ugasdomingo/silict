//Import tools
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useUserStore } from './user-store';

//Activate tools
const userStore = useUserStore();

export const useServiceStore = defineStore('service', () => {
    const allService = ref();
    const allServiceByCategory = ref();
    const allServiceByTags = ref();
    const allServiceByCategoryAndTags = ref();
    const oneService = ref();

    const getAllServices = async (showItems: number) => {
        try {
            const res = await api({
                url: '/services/all',
                method: 'GET'
            });

            if (showItems == 0) {
                allService.value = res.data;
            } else {
                //Get last 3 Posts
                const finalArray = res.data.reverse();

                finalArray.length = showItems;

                allService.value = finalArray;
            }
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const getAllServicesByCategory = async (showItems: number, category: string) => {
        try {
            const res = await api({
                url: '/services/all/' + category,
                method: 'GET'
            });

            if (showItems == 0) {
                allServiceByCategory.value = res.data;
            } else {
                //Get last 3 Posts
                const finalArray = res.data.reverse();

                finalArray.length = showItems;

                allServiceByCategory.value = finalArray;
            }
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const getAllServicesByTags = async (showItems: number, filterTag: string) => {
        try {
            await getAllServices(0);

            const finalArray = allService.value.filter((service: any) => {
                return service.tags[0].includes(filterTag);
            });

            if (showItems == 0) {
                allServiceByTags.value = finalArray;
            } else {
                //Get last 3 Posts
                finalArray.length = showItems;

                allServiceByTags.value = finalArray;
            }
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const getAllServicesByCategoryAndTags = async (
        showItems: number,
        category: string,
        filterTag: string
    ) => {
        try {
            const res = await api({
                url: '/services/all/' + category,
                method: 'GET'
            });

            const finalArray = res.data.filter((service: any) => {
                return service.tags[0].includes(filterTag);
            });

            console.log(finalArray);

            if (showItems == 0) {
                allServiceByCategoryAndTags.value = finalArray;
            } else {
                //Get last 3 Posts
                finalArray.length = showItems;

                allServiceByCategoryAndTags.value = finalArray;
            }
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const getOneService = async (serviceId: string) => {
        try {
            const res = await api({
                url: '/services/' + serviceId,
                method: 'GET'
            });

            oneService.value = res.data.service;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const createService = async (serviceData: any) => {
        try {
            const res = await api({
                url: '/services',
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + userStore.token,
                    'Content-Type': 'multipart/form-data'
                },
                data: serviceData
            });
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const updateService = async (serviceData: FormData, serviceId: string) => {
        try {
            await api({
                url: '/services/' + serviceId,
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + userStore.token,
                    'Content-Type': 'multipart/form-data'
                },
                data: serviceData
            });
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const deleteService = async (serviceId: string) => {
        try {
            await api({
                url: '/services/' + serviceId,
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + userStore.token
                }
            });
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    return {
        allService,
        allServiceByCategory,
        allServiceByTags,
        allServiceByCategoryAndTags,
        oneService,
        getAllServices,
        getAllServicesByCategory,
        getAllServicesByTags,
        getAllServicesByCategoryAndTags,
        getOneService,
        createService,
        updateService,
        deleteService
    };
});
