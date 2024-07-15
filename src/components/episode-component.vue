<script setup lang="ts">
    import { defineProps } from 'vue';

    const props = defineProps({
        name: String,
        description: String
    })

</script>

<template>
    <div id="wrapper">
        <span id="name">{{ props.name }}</span>
        <span id="description">{{ props.description }}</span>
    </div>
</template>

<style scoped>
    #wrapper{

        width: 75%;
        color: black;
        display: grid;
        place-items: center;
        text-align: center;
        grid-template-columns: 0.1fr 1fr;
        grid-template-rows: 1fr 1fr;

        background-color: gray;
        border-radius: 8px;
        width: 75%;
        padding: 10px;
    }
</style>