<script setup lang="ts">
import { faq } from 'src/static/faq';
</script>

<template>
    <section class="q-py-xl faq-container">
        <h3>Preguntas Frecuentes</h3>
        <q-list bordered class="rounded-borders">
            <q-expansion-item
                v-for="item in faq"
                expand-separator
                :icon="item.icon"
                :label="item.question"
                :key="item.id"
            >
                <q-card>
                    <q-card-section>
                        {{ item.answaer }}
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list>
    </section>
</template>
