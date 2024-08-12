<script lang="ts" setup>
    import { ref, Ref } from 'vue';
    import { useRoute } from 'vue-router';
    import chapterComponent from '../components/chapter-component.vue';
    import { DetailAudio } from '../types';
    
    const audioSrcBase = ref('http://localhost:8000/stream-audio/');
    const currentAudioID = ref('2');
    const route = useRoute();

    const data: Ref<DetailAudio> = ref({detail: {}, audio: Array()} as DetailAudio);

    function fetchData(){
        fetch('http://localhost:8000/detail/' + route.params.entryID + "/2").then(res => res.json())
        .then(d => data.value = d)
    }

    fetchData();
</script>


<template>
    <div class="wrapper">
        <img
            id="album-art"
            :src="data.detail.posterPath" />
        <h1>{{  data.detail.name }}</h1>
        <audio :src="audioSrcBase + currentAudioID" controls></audio>

    </div>

    <div class="chapters">
        <chapterComponent v-for="(item, index) in (data as DetailAudio).audio" :key="index"
            :num = "item.number"
            :name = "item.name"
            :id = "item.id"

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
    }
</style>