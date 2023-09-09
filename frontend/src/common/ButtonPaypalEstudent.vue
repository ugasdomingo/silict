<script setup lang="ts"></script>

<template>
    <a
        href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WS9T8HHDKVABJ"
        target="_blank"
    >
        10 USD / 1 Año
    </a>
</template>

<style scoped lang="scss">
a {
    display: inline-block;
    background-color: var(--color-accent);
    color: var(--color-white);
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
}

a:hover {
    background-color: var(--color-white);
    color: var(--color-primary);
}

@media (max-width: 768px) {
    a {
        font-size: 1rem;
    }
}
</style>
