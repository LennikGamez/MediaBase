<script lang="ts" setup>
    import VideoPlayer from '../components/video-player.vue';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { DetailMovie, DetailShow } from '../types';

    var data: any;
    const route = useRoute();
    const type = route.params.type;
    // load all information about the selected entry
    switch (type) {
        case "0":
            data = ref<DetailMovie | null>(null)
            break;
        case "1":
            data = ref<DetailMovie | null>(null)
            break;

    }
    // const data = ref<DetailShow | DetailMovie | null>(null)
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
                <div id="seasons" v-if="data?.detail.type == 1">
                    <h3 v-for="(item, index) in data?.seasons" :key="index">{{ item }}</h3>
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

    .player{
        width: 100%;
        height: 100%;
    }
</style>