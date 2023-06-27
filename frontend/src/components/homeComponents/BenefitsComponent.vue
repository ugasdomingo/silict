<script setup lang="ts">
import { silicitBenefits } from 'src/static/silicitBenefits';
</script>

<template>
    <h4 class="q-pl-md q-mb-xs">4 maneras de empezar:</h4>
    <main class="column items-center benefits-container">
        <q-card v-for="item in silicitBenefits" :key="item.id" :class="item.class">
            <q-card-section class="q-py-xs left-content">
                <h6 class="q-ma-none">
                    <span>{{ item.id }}.</span> {{ item.title }}
                </h6>
                <p>{{ item.description }}</p>
            </q-card-section>
            <q-btn :label="item.action2" class="btn" />
        </q-card>
        <div></div>
    </main>
</template>

<style scoped lang="scss">
.my-card {
    width: 330px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
}
.my-card p {
    opacity: 0.7;
    font-size: smaller;
}
.my-card h6 {
    font-size: small;
}
.left-content {
    width: 70%;
}
.btn {
    text-transform: capitalize;
    height: min-content;
    font-size: x-small;
    border-radius: 1px solid white;
    color: $accent;
}
@media screen and (min-width: 760px) {
    h3 {
        text-align: center;
    }
    main {
        width: 60%;
        flex-direction: row;
        gap: 2rem;
        justify-content: center;
        margin: 0 auto;
    }
}
</style>
