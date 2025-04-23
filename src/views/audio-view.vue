<script lang="ts" setup>
    import { onMounted, ref, Ref } from 'vue';
    import { useRoute } from 'vue-router';
    import chapterComponent from '../components/chapter-component.vue';
    import { DetailAudio } from '../types';
    import { registerActionHandler, setMetaData } from '../helper/mediasession-manager';
    import useSleepTimer from '../helper/sleeptimer';
    
    const posterPath = ref('');
    const audioSrcBase = ref('http://192.168.178.120:8000/stream-audio/');
    const currentAudioID = ref('');
    const audioElement = ref<HTMLAudioElement | null>(null);
    const route = useRoute();

    const data: Ref<DetailAudio> = ref({detail: {}, audio: Array()} as DetailAudio);

    async function pause(){
        if (!audioElement.value) return;
        await audioElement.value.pause();
    }

    async function play(){
        if (!audioElement.value) return;
        await audioElement.value.play();
    }

    async function playNextChapter(){
        if(!audioElement.value) return
        if(parseInt(currentAudioID.value) == (data.value as DetailAudio).audio[data.value.audio.length - 1].audioID){
            return
        }
        let nextID = data.value.audio[data.value.audio.findIndex(item => item.audioID.toString() == currentAudioID.value) + 1].audioID.toString();;
        loadChapter(nextID);

    }

    async function playPreviousChapter(){
        if (!audioElement.value) return;
        if (parseInt(currentAudioID.value) == (data.value as DetailAudio).audio[0].audioID) return;

        let previousID = data.value.audio[data.value.audio.findIndex(item => item.audioID.toString() == currentAudioID.value) - 1].audioID.toString();
        loadChapter(previousID);
    }

    async function loadChapter(id: string){
        currentAudioID.value = id
        setMetaData(getTrackName(parseInt(currentAudioID.value)), "Marc Dieter", data.value.detail.name, [
            {
                src: posterPath.value,
                sizes: '',
                type: ''
            }
        ])

        if (!audioElement.value) return;
        // awaits are important to wait for the audio to load before playing it
        await pause();
        await audioElement.value.load();
        await play();
    }

    function getTrackName(id: number): string{
        if (!data.value) return "";
        const audioObject = data.value.audio.find(i => i.audioID == id);
        if (audioObject == undefined) return "";
        return audioObject.name;
    }

    function fetchData(){
        fetch('http://192.168.178.120:8000/detail/' + route.params.entryID + "/2").then(res => res.json())
        .then(d => data.value = d) // set data
        .then(() => loadChapter(data.value.audio[0].audioID.toString())); // set first chapter
    }

    onMounted(() =>{
        fetchData();
        // setup the MediaSession handlers
            registerActionHandler("nexttrack", playNextChapter);
            registerActionHandler("play", () => audioElement.value?.play())
            registerActionHandler("pause", ()=> audioElement.value?.pause())
            registerActionHandler("previoustrack", playPreviousChapter)
            registerActionHandler("seekto", (details)=> {
                if (!audioElement.value) return;
                if (!details.seekTime) return;
                 audioElement.value.currentTime = details.seekTime}
                )
        //
        posterPath.value = `http://192.168.178.120:8000/poster/${route.params.entryID}`

    })

</script>


<template>
    <div class="wrapper">
        <img
            id="album-art"
            :src="posterPath" />
        <h1>{{  data.detail.name }}</h1>
        <audio v-if="currentAudioID" :src="audioSrcBase + currentAudioID" controls
            @ended="playNextChapter"
            ref="audioElement"
        ></audio>
        <!-- Silent audio to enable pwa playback on ios devices-->
        <audio muted src="/silence.mp3" loop autoplay></audio>

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
