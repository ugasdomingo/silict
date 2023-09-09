<script setup lang="ts">
import { PropType } from 'vue';
import { IServices } from '../interfaces/IService';

defineProps({
    services: {
        type: Array as PropType<IServices[]>,
        required: true
    },
    size: {
        type: Number,
        default: 150
    }
});

const getAffiliationType = (affiliationType: string) => {
    if (affiliationType === 'Gratis') {
        return 'background-accent';
    } else {
        return 'background-primary';
    }
};
</script>

<template>
    <div
        class="services-card"
        :style="{ width: size + 'px', height: size + 'px' }"
        v-for="service in services"
        :key="service._id"
    >
        <img :src="service.cover.secure_url" alt="service image" />

        <p class="services-card-text" :class="getAffiliationType(service.affiliationType)">
            {{ service.affiliationType }}
        </p>
    </div>
</template>

<style scoped lang="scss">
.services-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        border-radius: 0.5rem;
    }

    .services-card-text {
        font-size: 1rem;
        font-weight: 400;
        text-align: center;
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 0.25rem;
        margin: 0;
        color: var(--color-white);
        border-radius: 0 0.5rem 0 0.5rem;
    }
}
.background-accent {
    background: linear-gradient(
        90deg,
        rgba(0, 128, 0, 1) 4%,
        rgba(0, 128, 0, 0.7629) 87%,
        rgba(0, 128, 0, 0.258) 100%
    );
}
.background-primary {
    background: linear-gradient(
        90deg,
        rgba(76, 18, 100, 1) 4%,
        rgba(76, 18, 100, 0.7629) 87%,
        rgba(76, 18, 100, 0.258) 100%
    );
}
</style>
