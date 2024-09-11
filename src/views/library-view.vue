
<script setup lang="ts">
    import MediaComponent from "../components/media-component.vue";
    import { Media } from "../types";
    import { ref } from "vue";
    
    const media = ref(Array<Media>());
    const searchInput = ref(""); 
    function fetchMedia(){
        fetch('http://192.168.178.120:8000/media').then(res => res.json()).then(data => media.value = data)
    }

    fetchMedia();


    function stringIncludes(a: string, b: string){
        // splits  string into array and checks if each word is included in the other string
        return a.split(" ").every(word => b.includes(word));
    }

</script>


<template>
    <div class="grid">
        <nav>
            <h1>Library</h1>
            <input id="searchbar" type="etxt" placeholder="Search.." v-model="searchInput"/>
        </nav>
        <div id="library-container">
            <MediaComponent v-for="m in media.filter(m => stringIncludes(searchInput.toLowerCase(), m.name.toLowerCase()))" :key="m.name" :data="m"/>
        </div>
    </div>
</template>


<style scoped>

    nav{
        z-index: 2;
        position: fixed;
        top: 0px;
        box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.943);
        width: 100%;
        height: 7rem;
        background-color: var(--bg-color);
    }

    #library-container{
        margin: 16px;
        margin-top: 10rem;

        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        place-items: center;
        height: auto;
        /* display: flex;
        gap: 16px;
        flex-wrap: wrap;
        justify-content: start; */
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    #library-container::-webkit-scrollbar{
        display: none;
    }
</style>