//Import tools
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/user-store';

//Import components
import HomeView from '../views/HomeView.vue';

//Create routes
const routes = [
    /* -----  Auth Routes ----- */
    {
        path: '/acceder',
        name: 'Login',
        component: () => import('../views/auth/LoginView.vue')
    },
    {
        path: '/registro/:plan',
        name: 'Register-Plan',
        component: () => import('../views/auth/RegisterView.vue')
    },

    /* -----  App Routes ----- */
    {
        path: '/registro',
        name: 'Register',
        component: () => import('../views/RegisterPlansView.vue')
    },
    {
        path: '/',
        name: 'Inicio',
        component: HomeView
    },
    {
        path: '/conocenos',
        name: 'Conócenos',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/servicios',
        name: 'Servicios',
        component: () => import('../views/ServicesView.vue')
    },
    {
        path: '/mi-escritorio',
        name: 'Escritorio',
        component: () => import('../views/DeskView.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('../views/NotFoundView.vue')
    }
];

//Create router
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const requiredAuth = to.meta.auth;
    const userStore = useUserStore();

    if (userStore.token) {
        return next();
    }

    if (requiredAuth || localStorage.getItem('user')) {
        try {
            await userStore.refreshToken();

            if (userStore.token) {
                return next();
            }
            return next('acceder');
        } catch (error) {
            return next({ name: 'Inicio' });
        }
    }

    return next();
});

//Export router
export default router;
