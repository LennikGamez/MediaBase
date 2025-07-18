<script lang="ts" setup>
    import { onMounted, ref, Ref } from 'vue';
    import { useRoute } from 'vue-router';
    import chapterComponent from '../components/chapter-component.vue';
    import { DetailAudio } from '../types';
    import APIConnector from '../helper/APIConnector';
    
    const posterPath = ref('');
    const audioSrcBase = ref(APIConnector.getAudioStreamEndpoint());
    const currentAudioID = ref('');
    const audioElement = ref<HTMLAudioElement | null>(null);
    const route = useRoute();

    const data: Ref<DetailAudio> = ref({detail: {}, audio: Array()} as DetailAudio);

    async function playNextChapter(){
        if(!audioElement.value) return
        if(parseInt(currentAudioID.value) == (data.value as DetailAudio).audio[data.value.audio.length - 1].audioID){
            return
        }
        currentAudioID.value = data.value.audio[data.value.audio.findIndex(item => item.audioID.toString() == currentAudioID.value) + 1].audioID.toString();;

        await audioElement.value.load();
        await audioElement.value.play();
    }

    async function loadChapter(id: string){
        currentAudioID.value = id

        await audioElement.value?.pause();
        await audioElement.value?.load();
        await audioElement.value?.play();
    }

    function fetchData(){
        APIConnector.getDetailOf(route.params.entryID as string, "2").then(d => data.value = d) // set data
        .then(() => currentAudioID.value = data.value.audio[0].audioID.toString()); // set first chapter
    }
    
    fetchData();

    onMounted(() =>{
        posterPath.value = APIConnector.getPosterPathByEntryID(route.params.entryID as string);
    })
</script>


<template>
    <div class="wrapper">
        <img
            id="album-art"
            :src="posterPath" />
        <h1>{{  data.detail.name }}</h1>
        <audio :src="audioSrcBase + currentAudioID" controls
            @ended="playNextChapter"
            ref="audioElement"
        ></audio>

    </div>

    <div class="chapters">
        <chapterComponent v-for="(item, index) in (data as DetailAudio).audio" :key="index"
            :num = "item.number"
            :name = "item.name"
            :id = "item.audioID"
            @startChapter="loadChapter"
        />
    </div>
</template>


<style scoped>
    .wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
        justify-content: center;
    }

    #album-art{
        width: 300px;
        border-radius: 16px;
    }
</style>
