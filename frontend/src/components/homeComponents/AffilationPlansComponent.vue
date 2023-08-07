<script setup lang="ts">
import { silicitPlans } from 'src/static/silicitPlans';
</script>

<template>
    <main class="column items-center plans-container">
        <h2 class="q-pl-md q-mb-xs text-center">Estudia y Crece en Silicit</h2>
        <div class="row justify-evenly q-px-xs" style="width: 100%">
            <!-- //Plan estudiante -->
            <q-card :class="silicitPlans[0].class">
                <h4 class="q-ma-none">{{ silicitPlans[0].title }}</h4>
                <q-card-section class="q-py-xs left-content">
                    <p>{{ silicitPlans[0].description }}</p>
                    <q-list dark bordered class="rounded-borders">
                        <q-item v-for="benefit in silicitPlans[0].benefits" :key="benefit">
                            <q-item-section avatar>
                                <q-icon name="check" color="white" />
                            </q-item-section>
                            <q-item-section>{{ benefit }}</q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
                <q-btn :label="silicitPlans[0].action2" class="btn" />
            </q-card>

            <!-- //Plan Profesional -->
            <q-card :class="silicitPlans[1].class">
                <h4 class="q-ma-none">{{ silicitPlans[1].title }}</h4>
                <q-card-section class="q-py-xs left-content">
                    <p>{{ silicitPlans[1].description }}</p>
                    <q-list dark bordered class="rounded-borders">
                        <q-item v-for="benefit in silicitPlans[1].benefits" :key="benefit">
                            <q-item-section avatar>
                                <q-icon name="check" color="white" />
                            </q-item-section>
                            <q-item-section>{{ benefit }}</q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
                <q-btn :label="silicitPlans[1].action2" class="btn" disable />
            </q-card>

            <!-- //Plan Inversionista -->
            <q-card :class="silicitPlans[2].class">
                <h4 class="q-ma-none">{{ silicitPlans[2].title }}</h4>
                <q-card-section class="q-py-xs left-content">
                    <p>{{ silicitPlans[2].description }}</p>
                    <q-list dark bordered class="rounded-borders">
                        <q-item v-for="benefit in silicitPlans[2].benefits" :key="benefit">
                            <q-item-section avatar>
                                <q-icon name="check" color="white" />
                            </q-item-section>
                            <q-item-section>{{ benefit }}</q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
                <q-btn :label="silicitPlans[2].action2" class="btn" disable />
            </q-card>
        </div>
    </main>
</template>

<style scoped lang="scss">
.plans-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 4rem 0;
}
.my-card {
    width: 330px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 0.5rem 0;
    padding: 1rem 0;
}
.my-card p {
    opacity: 0.7;
    font-size: smaller;
}
.my-card h6 {
    font-size: small;
}
.left-content {
    width: 90%;
}
.btn {
    text-transform: capitalize;
    height: min-content;
    font-size: x-small;
    border-radius: 1px solid white;
    color: rgb(255, 212, 212);
    background-color: $accent;
}
@media screen and (min-width: 760px) {
    .plans-container {
        h2 {
            text-align: center;
        }
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
