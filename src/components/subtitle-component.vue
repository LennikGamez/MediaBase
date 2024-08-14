<script setup lang="ts">
    import { ref } from 'vue';
    const props = defineProps({
        subID: Number
    })

    const src = 'http://192.168.178.120:8000/subtitle/' + props.subID;

    const blobSrc = ref('');
    const subLang = ref('');

    function fetchSubtitles(){
        if (!props.subID) return;
        fetch(src).then(res => res.json()).then(data => loadSubtitle(data))
    }

    function loadSubtitle(data: {[key: string]: string}) {
        if (!props.subID) return;
        let blob = new Blob([data["data"]], { type: 'text/vtt' });
        const url = URL.createObjectURL(blob);
        blobSrc.value = url;
        subLang.value = data["language"];
    }

    fetchSubtitles();
</script>


<template>
    <track kind="subtitles" :src="blobSrc" :srclang="subLang">
</template>


<style scoped>

</style>