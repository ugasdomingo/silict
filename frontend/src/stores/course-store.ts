//Import tools
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useUserStore } from './user-store';

//Activate tools
const userStore = useUserStore();

export const useCourseStore = defineStore('course', () => {
    const allCourse = ref();
    const allCourseByCategory = ref();
    const oneCourse = ref();

    const getAllCourse = async (showItems: number) => {
        try {
            const res = await api({
                url: '/courses/all',
                method: 'GET'
            });

            if (showItems == 0) {
                allCourse.value = res.data.courses;
            } else {
                //Get last Posts
                const finalArray = res.data.courses.reverse();

                finalArray.length = showItems;

                allCourse.value = finalArray;
            }
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const getAllCourseByCategory = async (category: string) => {
        try {
            const res = await api({
                url: `/courses/${category}`,
                method: 'GET'
            });

            allCourseByCategory.value = res.data.courses;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const createCourse = async (course: any) => {
        try {
            const res = await api({
                url: '/courses/create',
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + userStore.token,
                    'Content-Type': 'multipart/form-data'
                },
                data: course
            });

            return res.data;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const getOneCourse = async (courseId: string) => {
        try {
            const res = await api({
                url: `/courses/${courseId}`,
                method: 'GET'
            });

            oneCourse.value = res.data.course;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const updateCourse = async (id: string, course: any) => {
        await api({
            url: `/courses/${id}`,
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + userStore.token,
                'Content-Type': 'multipart/form-data'
            },
            data: course
        });
    };

    const deleteCourse = async (id: string) => {
        await api({
            url: `/courses/${id}`,
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + userStore.token,
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    return {
        allCourse,
        allCourseByCategory,
        oneCourse,
        getAllCourse,
        getAllCourseByCategory,
        createCourse,
        getOneCourse,
        updateCourse,
        deleteCourse
    };
});
