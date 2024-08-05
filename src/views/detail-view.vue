<script lang="ts" setup>
    import VideoPlayer from '../components/video-player.vue';
    import { ref, Ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { DetailMovie, DetailShow } from '../types';
    import episodeComponent from '../components/episode-component.vue';

    var data: Ref<DetailMovie | DetailShow | null> = ref(null);
    const route = useRoute();
    const type = route.params.type as string;
    const videoPlayer = ref<typeof VideoPlayer | null>(null);
    // load all information about the selected entry
    switch (type) {
        case "0":
            data = ref<DetailMovie | null>(null)
            break;
        case "1":
            data = ref<DetailShow | null>(null)
            break;

    }
    fetch('http://localhost:8000/detail/' + route.params.entryID + "/" + route.params.type).then(res => res.json()).then(detail => data.value = detail)
    

    /**
     * fetches all available languages of given entry
     * @param entryID 
     * @param episodeID 
     */
    async function getAvailableLanguages(entryID: number, episodeID: number | null) {
        let res;
        switch (type) {
            case "0":
                res = await fetch(`http://localhost:8000/available-languages/${entryID}`);
                break;
            case "1":
                res = await fetch(`http://localhost:8000/available-languages/${entryID}/${episodeID}`)
                break;
                
        }

        const data = await res?.json();
        let langs = data.map((item: { language: string;}) => item.language);
        return langs;
    }

    /**
     * calls play function in the videoplayer component
     * @param entryID 
     * @param episodeID 
     */
    async function play(entryID: number, episodeID: number | null) {
        if (!videoPlayer.value) return;
        videoPlayer.value.play(
            parseInt(type),
             entryID,
              episodeID,
               data.value?.detail.movieID,
                await getAvailableLanguages(entryID, episodeID)
            );
    }

    /**
     * when the big play button is clicked
     * it plays the first episode of the first season 
     * or 
     * it plays the movie
     */
    function onMainPlayButton(){
        if (!data.value) return;
        switch (type) {
            case "0":   // movie                
                play(data.value.detail.entryID, null);
                break;
            case "1":   // show
                const showData = data.value as DetailShow
                
                const seasons = Object.values(showData.seasons)
                const firstSeason = seasons[0][0].episodeID
                play(data.value.detail.entryID, showData.seasons[firstSeason][0].episodeID);
                break;
        }
    }

    function onEpisodeStart(id: number){      
        if (!data.value) return;
        play(data.value.detail.entryID, id);
    }

</script>

<template>
    <div id="wrapper">
        <VideoPlayer ref="videoPlayer" id="video"/>
        <div id="details">
            <div id="header">
                <h1 id="title">{{ data?.detail.name }}</h1>
                <!-- <p id="duration">1:30h</p> -->
                <p id="description">{{ data?.detail.description }}</p>
            </div>
            <button id="play-btn" class="btn focusable" tabindex="0" @click="onMainPlayButton">Play</button>
            <div v-if="data?.detail.type == 1" id="seasons">
                <div class="season" v-for="(item, index) in (data as DetailShow).seasons" :key="index">
                    <h4 class="season-index">{{ index }}</h4>
                    <episodeComponent v-for="(episode, index) in item" :key="index" :name="episode.name" :description="episode.description" :episodeID="episode.episodeID" @startEpisode="onEpisodeStart" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* HUGE  */
    @media only screen and (min-width: 1100px){
        #wrapper{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            height: 100%;
        }

        #details{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex: 1;
            max-height: 100%;
        }

        #video{
            flex: 1;
        }
    }

    /* SMOL */
    @media not screen and (min-width: 1100px){
        #wrapper{
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            place-items: center;
            column-gap: 10px;
       }

       #details{
            width: 100%;
            padding-top: 20px;
            display: grid;
            place-items: center;
       }
    }

    #title{
        margin: 5px;
        margin-top: 15px;
        font-weight: 1000;
        font-size: 2.5rem;
    }

    #description{
        font-size: 1.8rem;
        font-weight: 100;
        color: lightgray;
    }

    #details{
        text-align: center;
    }
    #seasons::-webkit-scrollbar{
        width: 5px;
    }
    #seasons::-webkit-scrollbar-thumb{
        background-color: white;
        border-radius: 5px;
    }
    
    #seasons{
        width: 100%;

        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
        overflow-y: scroll;

        margin-top: 8px;
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

        width: 200px;
        border-style: none;
        border-radius: 5px;
        height: 30px;

        font-size: 18px;
        font-weight: 900;
    }
</style>