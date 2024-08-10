<script lang="ts" setup>
    import { ref } from 'vue';
    
    const audioSrc = ref('http://localhost:8000/stream-audio');
</script>


<template>
    <div class="wrapper">
        <img
            id="album-art"
            src="https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/d1/26/ba/d126ba99-37dd-cd18-3582-617ad8c21ca5/9783844919127.jpg/600x600bb.jpg" />
        <h1>Die Känguru Apokryphen</h1>
        <audio :src="audioSrc" controls></audio>
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