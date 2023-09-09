//Import tools
import { defineStore } from 'pinia';
import { api } from '../services/axios';
import { ref } from 'vue';

//Define store
export const useUserStore = defineStore('user', () => {
    const token = ref(null);
    const expiresIn = ref(0);
    const userRole = ref('');
    const userName = ref('');
    const rewardsPoints = ref(0);

    //Define actions
    const access = async (email: string, password: string) => {
        try {
            const res = await api.post('/login', {
                email,
                password
            });

            const expiresRefreshToken = 60 * 60 * 24 * 30;
            expiresIn.value = expiresRefreshToken;

            token.value = res.data.token;
            userRole.value = res.data.role;
            userName.value = res.data.name;
            rewardsPoints.value = res.data.rewardsPoints;

            localStorage.setItem('user', 'Algo');
            localStorage.setItem('token', res.data.refreshToken);
            setTime();
        } catch (error) {
            console.log(error);
        }
    };

    const register = async (name: string, email: string, password: string, role: string) => {
        try {
            const res = await api.post('/register', {
                name,
                email,
                password,
                role
            });

            const expiresRefreshToken = 60 * 60 * 24 * 30;
            expiresIn.value = expiresRefreshToken;

            token.value = res.data.token;
            userRole.value = res.data.role;
            userName.value = res.data.name;
            rewardsPoints.value = res.data.rewardsPoints;

            localStorage.setItem('user', 'Algo');
            localStorage.setItem('token', res.data.refreshToken);
            setTime();
        } catch (error) {
            console.log(error);
        }
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('token');
        try {
            const res = await api.post('/refresh', {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });

            const expiresRefreshToken = 60 * 60 * 24 * 30;
            expiresIn.value = expiresRefreshToken;

            token.value = res.data.token;
            userRole.value = res.data.role;
            userName.value = res.data.name;
            rewardsPoints.value = res.data.rewardsPoints;

            localStorage.setItem('user', 'Algo');
            localStorage.setItem('token', res.data.refreshToken);
            setTime();
        } catch (error) {
            console.log(error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    };

    //Define getters

    //Helpers funtions
    const setTime = () => {
        setTimeout(
            () => {
                console.log('se refrescó');
                refreshToken();
            },
            expiresIn.value * 1000 - 6000
        );
    };

    const logout = async () => {
        try {
            await api.get('/logout');

            token.value = null;
            userRole.value = '';
            userName.value = '';
            rewardsPoints.value = 0;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } catch (error) {
            console.log(error);
        }
    };

    return {
        token,
        userRole,
        userName,
        rewardsPoints,
        access,
        register,
        refreshToken,
        logout
    };
});
