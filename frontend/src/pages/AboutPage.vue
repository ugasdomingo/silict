<template>
    <q-page class="about-page">
        <InternalHeroComponent :img="'img/bg-hexa1.jpg'" :title="'Empieza a estudiar ahora'" />
        <main>
            <h3>¿Qué es Silicit?</h3>
            <p>
                Somos una Startup en focada en que puedas formarte profesionalmente sea cual sea tu
                edad o situaión financiera. Para ello gestionamos acuerdos con Universidades y
                grandes plataformas de educación online para conseguir descuentos y becas.
            </p>
            <p>
                Además te ayudamos a comprar laptops, equipos de computación, entre otros, con
                nuestro servicio de ahorro, el cual también podrás usar para ahorrar para adquirir
                sucripciones a plataformas educativas o cursos y formaciones.
            </p>

            <h4>¿Qué beneficios obtienes de Silicit?</h4>
            <p>1. Acceso a becas y descuentos que no están disponibles fuera de Silicit.</p>
            <p>
                2. Plan de acción según tu capital (comenzando en $0,00) y carrera que deseas
                estudiar.
            </p>
            <p>3. Apoyo para ahorrar y lograr adquirir equipo para estudiar y trabajar online</p>
            <p>4. Apoyo para ahorrar y adquirir formaciones o suscripciones costosas</p>

            <h4>¿Cómo disfrutar de todos los beneficios?</h4>
            <p>
                Sólo necesitas pagar nuestra suscripción anual y listo. Disfruta Silicit por sólo
                $5,00 (USD)
            </p>
        </main>
    </q-page>
</template>

<script setup lang="ts">
import InternalHeroComponent from 'src/common/InternalHeroComponent.vue';
</script>

<style scoped lang="scss">
.about-page {
    box-sizing: border-box;
}
</style>
