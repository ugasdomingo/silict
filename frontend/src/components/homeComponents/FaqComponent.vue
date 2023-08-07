<script setup lang="ts">
import { faq } from 'src/static/faq';
</script>

<template>
    <section class="q-py-xl faq-container">
        <h2 class="text-center">Preguntas Frecuentes</h2>
        <q-list bordered class="rounded-borders list">
            <q-expansion-item
                v-for="item in faq"
                expand-separator
                :icon="item.icon"
                :label="item.question"
                :key="item.id"
            >
                <q-card>
                    <q-card-section>
                        <div v-html="item.answaer"></div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list>
    </section>
</template>

<style scoped lang="scss">
.faq-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 0;
}
.list {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
