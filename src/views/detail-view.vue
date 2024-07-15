<script lang="ts" setup>
    import VideoPlayer from '../components/video-player.vue';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { DetailMovie, DetailShow } from '../types';
    import episodeComponent from '../components/episode-component.vue';

    var data: any;
    const route = useRoute();
    const type = route.params.type;
    // load all information about the selected entry
    switch (type) {
        case "0":
            data = ref<DetailMovie | null>(null)
            break;
        case "1":
            data = ref<DetailShow | null>(null)
            break;

    }
    fetch('http://localhost:8000/detail/' + route.params.entryID).then(res => res.json()).then(detail => data.value = detail);

</script>

<template>
    <div id="wrapper">
        <VideoPlayer/>
        <div id="details">
            <h1 id="title">{{ data?.detail.name }}</h1>
            <p id="duration">1:30h</p>
            <p id="description">{{ data?.detail.description }}</p>
            <div id="buttons">
                <button id="play-btn" class="btn focusable" tabindex="0">Play</button>
                <div v-if="data?.detail.type == 1" id="seasons">
                    <div class="season" v-for="(item, index) in data.seasons" :key="index">
                        <h4 class="season-index">{{ index }}</h4>
                        <episodeComponent v-for="(episode, index) in item" :key="index" :name="episode.name" :description="episode.description" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #wrapper{
        @media only screen and (min-width: 1100px) {
            display: grid;
            height: 100%;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
            place-items: center;
            column-gap: 10px;
        }
    }

    #details{
        width: 100%;
        height: 100%;

        width: 95%;
        grid-column-start: 2;
        text-align: center;
        max-height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .player{
        width: 100%;
        height: 100%;
    }
    
    #seasons{
        width: 100%;

        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
    }

    .season{
        width: 75%;

        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
    }

    .season-index{
        align-self: start;
    }

    #play-btn{
        background-color: white;
        color: black;

        width: 75%;
    }
</style>