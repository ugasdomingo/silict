<script setup lang="ts"></script>

<template>
    <section class="column about-section items-center text-center bg-primary text-accent">
        <h2>Sabemos lo costoso que puede ser educarse a nivel profesional</h2>
        <div class="video-big">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/kjN2Y24HLFY"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            ></iframe>
        </div>
        <div class="video-small">
            <iframe
                width="320"
                height="180"
                src="https://www.youtube.com/embed/kjN2Y24HLFY"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            ></iframe>
        </div>
        <h6>Reduce 5 años de estudio a 12 meses, ¡comienza tu camino al éxito hoy mismo!</h6>
        <q-btn
            label="¡Afiliarme Ahora por sólo 5 dólares al año!"
            to="afiliacion"
            class="bg-info text-secondary"
        />
    </section>
</template>

<style scoped lang="scss">
.about-section {
    width: 90%;
    min-height: 50vh;
    box-sizing: border-box;
    position: relative;
    border-radius: 10rem 0 0 10rem;
    padding: 2rem 1rem;
    margin: 4rem 0 4rem 10%;
}
.about-section h2 {
    width: 70%;
    font-weight: 600;
    font-size: 2.5rem;
    margin: 0 auto;
    color: $accent;
}
.about-section h6 {
    width: 70%;
    font-weight: 600;
}
.about-section p {
    width: 70%;
    font-weight: 300;
    font-size: 24px;
    color: $info;
}
.video-small {
    display: none;
}

@media screen and (max-width: 760px) {
    .about-section {
        width: 100%;
        margin: 4rem 0;
        border-radius: 10rem 0 0 0;
        h2 {
            width: 90%;
            padding: 1.5rem 0;

            font-size: 1.25rem;
            line-height: 1.5rem;
        }
        h6 {
            font-size: 1.25rem;
            width: 90%;
            margin: 1.5rem 0;
        }
    }
    .video-big {
        display: none;
    }
    .video-small {
        display: block;
    }
}
</style>
