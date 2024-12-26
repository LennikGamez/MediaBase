<script setup lang="ts">
    import { ref, watch } from 'vue';
    const props = defineProps({
        subID: Number
    })
    const subID = ref(props.subID);
    const baseURL = "http://192.168.178.120:8000/subtitle/"

    const blobSrc = ref('');
    const subLang = ref('');

    function fetchSubtitles(){
        if (!props.subID) return;
        fetch(baseURL + subID.value).then(res => res.json()).then(data => loadSubtitle(data))
    }

    function loadSubtitle(data: {[key: string]: string}) {
        console.log("load");
        if (!props.subID) return;
        let blob = new Blob([data["data"]], { type: 'text/vtt' });
        const url = URL.createObjectURL(blob);
        blobSrc.value = url;
        subLang.value = data["language"];
    }

    // Watch for changes to the subID prop and refetch subtitles if it changes
    watch(() => props.subID, (newSubID, oldSubID) => {
        if (newSubID !== oldSubID) {
            subID.value = newSubID;
            fetchSubtitles();
        }
    },
    { immediate: true } // Immediately run fetchSubtitles on mount
    );
</script>


<template>
    <track kind="subtitles" :src="blobSrc" :srclang="subLang">
</template>


<style scoped>

</style>