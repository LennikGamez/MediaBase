<script setup lang="ts">
    const props = defineProps({
        episodeID: Number,
        name: String,
        description: String
    });
    const emit = defineEmits(['startEpisode']);

    function startEpisode(){
        emit('startEpisode', props.episodeID);
    }

</script>

<template>
    <div id="wrapper" @click="startEpisode">
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