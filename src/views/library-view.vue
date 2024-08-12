
<script setup lang="ts">
    import MediaComponent from "../components/media-component.vue";
    import { Media } from "../types";
    import { ref } from "vue";
    
    const media = ref(Array<Media>());

    function fetchMedia(){
        fetch('http://192.168.178.120:8000/media').then(res => res.json()).then(data => media.value = data)
    }

    fetchMedia();

</script>


<template>
    <nav>
        <h1>Library</h1>
        <input type="text" placeholder="Search.." />
    </nav>
    <div id="library-container">
        <MediaComponent v-for="m in media" :key="m.name" :data="m"/>
    </div>
</template>


<style scoped>
    #library-container{
        margin: 16px;

        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        place-items: center;
        height: auto;
        /* display: flex;
        gap: 16px;
        flex-wrap: wrap;
        justify-content: start; */
    }
</style>