import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/HomePage.vue') },
            {
                path: 'escritorio',
                component: () => import('pages/DeskPage.vue'),
                meta: {
                    auth: true
                }
            },
            { path: 'estudiantes', component: () => import('pages/StudentPage.vue') },
            { path: 'profesionales', component: () => import('pages/ProfessionalPage.vue') },
            { path: 'emprendedores', component: () => import('pages/EntrepreneurPage.vue') },
            { path: 'login', component: () => import('pages/AuthPage.vue') }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
];

export default routes;
