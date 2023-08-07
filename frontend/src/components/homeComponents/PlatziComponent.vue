<script setup lang="ts"></script>

<template>
    <section class="column bg-dark text-white text-center q-pb-xl platzi-container">
        <h2 class="text-accent">Estudia en Platzi a mitad de precio</h2>
        <p>
            En comunidad todo es posible, en Silicit formamos equipos de 4 estudiantes para comprar
            el plan Expert Family de Platzi. Así puedes obtener el Plan Expert a mitad del precio
            comparado con comprarlo por tu cuenta.
        </p>
        <h6 class="text-accent">Sólo 125$ o 4 cuotas de 32$</h6>
        <div class="row justify-center btns">
            <q-btn label="Usar el sistema de Ahorro" class="q-mx-xs btn-shadow-white" />
            <q-btn label="Unirme a Silicit Ahora" class="q-mx-xs text-accent btn-shadow-white" />
        </div>
    </section>
</template>

<style scoped lang="scss">
.platzi-container {
    padding: 2rem 0;
}
.platzi-container p {
    max-width: 70%;
    font-size: 1.5rem;
    margin: 0 auto;
}
@media screen and (max-width: 760px) {
    .btns {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
}
</style>
