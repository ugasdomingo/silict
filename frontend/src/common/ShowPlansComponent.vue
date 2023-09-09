<script setup lang="ts">
//Import tools
import ButtonPaypalEstudent from './ButtonPaypalEstudent.vue';
</script>

<template>
    <section class="plans-container">
        <h2>Planes de Afiliación</h2>
        <div class="plans">
            <div class="plan" style="background-color: #000000c2">
                <h3>Plan Gratuito</h3>
                <p>Empieza a estudiar.</p>
                <ul>
                    <li>Cursos y orientación gratis</li>
                    <li class="null">Formaciones Pagas</li>
                    <li>Sistema de Puntos</li>
                    <li class="null">Postulación a Becas</li>
                    <li class="null">Postulación para descuentos</li>
                    <li class="null">Sistema de ahorro</li>
                </ul>
                <a href="/registro/user" class="normal-btn">Gratis por Siempre</a>
            </div>
            <div class="plan" style="background-color: #4c1264c2">
                <h3>Plan Estudiante</h3>
                <p>Estudia lo que quieras.</p>
                <ul>
                    <li>Cursos y orientación gratis</li>
                    <li>Formaciones Pagas</li>
                    <li>Sistema de Puntos</li>
                    <li>Postulación a Becas</li>
                    <li>Postulación para descuentos</li>
                    <li>Sistema de ahorro</li>
                </ul>
                <ButtonPaypalEstudent />
            </div>
            <div class="plan" style="background-color: #454545c2">
                <h3>Plan Profesional</h3>
                <p>Construye lo que quieras.</p>
                <ul>
                    <li>Incluye Plan Estudiante</li>
                    <li>Postularse a la Cartelera Profesionales</li>
                    <li>Mostrar tu Startup o Proyecto</li>
                </ul>
                <a href="#" class="deactivate-btn">Próximamente</a>
            </div>
            <div class="plan" style="background-color: #454545c2">
                <h3>Plan Inversionista</h3>
                <p>Participa en lo que quieras.</p>
                <ul>
                    <li>Incluye Plan Estudiante</li>
                    <li>Contactar Profesionales</li>
                    <li>Contactar a Founders</li>
                </ul>
                <a href="#" class="deactivate-btn">Próximamente</a>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.plans-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 4rem;
    margin: 0;
    color: var(--color-white);

    h2 {
        font-size: 2rem;
        font-weight: 500;
        margin: 0;
        text-align: center;
    }

    .plans {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;

        .plan {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1rem;
            width: 20%;
            padding: 1rem;
            border-radius: 0.5rem;

            h3 {
                font-size: 1.5rem;
                font-weight: 500;
                margin: 0;
            }

            p {
                font-size: 1rem;
                font-weight: 400;
                margin: 0 0 1rem;
                color: var(--color-secondary);
            }

            ul {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin: 0;
                padding: 0;

                li {
                    font-size: 1rem;
                    font-weight: 400;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
            }

            .deactivate-btn {
                display: inline-block;
                background-color: var(--color-gray);
                color: var(--color-white);
                padding: 1rem;
                border-radius: 0.5rem;
                font-size: 1rem;
                font-weight: 500;
                text-decoration: none;
                transition: all 0.3s ease;
                cursor: not-allowed;
                opacity: 0.8;
            }
        }
    }
}
.null {
    opacity: 0.5;
    cursor: not-allowed;
    text-decoration: line-through;
}
.normal-btn {
    display: inline-block;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    background-color: var(--color-secondary);

    &:hover {
        background-color: var(--color-white);
    }
}
</style>
