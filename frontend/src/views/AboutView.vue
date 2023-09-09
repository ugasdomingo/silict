<template>
    <section class="about-page-container">
        <h1>Cómo funciona Silicit</h1>
        <div class="about-explain-container">
            <div class="card">
                <h2>Comienza gratis</h2>
                <p>
                    Si quieres aprender programación, diseño o alguna carrera similiar y no sabes
                    como empezar, elige cualquiera de nuestros cursos gratuitos y prueba comenar a
                    estudiar. Si te gusta o si ya sabes en que carrera quieres ser profesional.
                    Hazte estudiante y comienza el aprendizaje intensivo.
                </p>
                <RouterLink to="/servicios" class="action-btn"> Comenzar gratis </RouterLink>
            </div>
            <div class="card">
                <h2>Sé Estudiante</h2>
                <p>
                    Si no tienes fondos para pagar los cursos profesionales, tienes 2 opciones, la
                    primera es postularte a nuestro programa de becas, la segunda es usar nuestro
                    Programa de Ahorro, donde te ayudamos acumular los fondos que necesites para
                    pagar tus cursos.
                </p>
                <RouterLink to="/registro" class="action-btn"> Afiliarme Ahora </RouterLink>
            </div>
            <div class="card">
                <h2>Sé Profesional</h2>
                <p>
                    A medida que vayas consolidando tus hailidades y portafolio, podrás afiliarte
                    como profesional, tendrás un espacio en nuestra cartelera de profesionales. Y si
                    quieres fundar una Startup también tenemos el espacio para que exibas tu
                    proyecto y consigas tu equipo o levantar capital.
                </p>
                <a href="#" class="deactivate-btn"> Próximamente </a>
            </div>
        </div>
        <p class="mission">
            ¿No sabes por donde empezar?
            <a href="https://wa.me/+34604822385" target="_blank">
                Asesoría Gratuita por WhatsApp
            </a>
        </p>
    </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.about-page-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem 4rem;
    box-sizing: border-box;
    height: 80vh;
    color: var(--color-white);

    h1 {
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 3rem;
    }

    .about-explain-container {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        color: var(--color-white);

        h2 {
            margin: 0;
            padding: 0;
            font-size: 1.75rem;
        }

        a {
            margin: 0;

            &:hover {
                background-color: var(--color-white);
            }
        }

        .card {
            background-color: #000000c2;
            padding: 1rem;
            border-radius: 0.5rem;
        }
    }
}
.deactivate-btn {
    color: var(--color-secondary);
    background-color: var(--color-gray);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 0.5s ease-in-out;
    cursor: not-allowed;
}
.mission {
    text-align: center;
    font-size: 1.25rem;
    margin: 0;
    padding: 0;

    a {
        color: var(--color-secondary);
    }

    a:hover {
        color: var(--color-accent);
    }
}
</style>
