<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import chapterComponent from '../components/chapter-component.vue';
    import { DetailAudio } from '../types';
    
    const audioSrc = ref('http://localhost:8000/stream-audio/2');
    const route = useRoute();

    const data = ref({});

    function fetchData(){
        fetch('http://localhost:8000/detail/+' + route.params.entryID + "/2").then(res => res.json())
        .then(d => data.value = d)
    }

    fetchData();
</script>


<template>
    <div class="wrapper">
        <img
            id="album-art"
            src="https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/d1/26/ba/d126ba99-37dd-cd18-3582-617ad8c21ca5/9783844919127.jpg/600x600bb.jpg" />
        <h1>Die Känguru Apokryphen</h1>
        <audio :src="audioSrc" controls></audio>

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