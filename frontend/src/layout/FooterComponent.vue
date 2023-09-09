<script setup lang="ts"></script>

<template>
    <footer>
        <h2 class="slogan">¡Aprende, crece y Construye!</h2>
        <p>Todos los derechos reservados</p>
        <div class="socials">
            <a href="#">
                <img src="" alt="instagram" />
            </a>
            <a href="#">
                <img src="" alt="whatsapp" />
            </a>
            <a href="#">
                <img src="" alt="youtube" />
            </a>
        </div>
    </footer>
</template>

<style scoped lang="scss">
footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    background-color: var(--color-primary);
    color: #fff;
    padding: 0 4rem;
    margin: 0;
    height: 7vh;
    box-sizing: border-box;
    overflow: hidden;

    p {
        opacity: 0.5;
    }

    .slogan {
        color: var(--color-white);
        font-size: 1.25rem;
        margin: 0;
    }

    .socials {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 10rem;
    }
}
</style>
