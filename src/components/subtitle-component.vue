<script setup lang="ts">
    import { ref, watch } from 'vue';
    const props = defineProps({
        sub: {} as any
    })
    const sub = ref(props.sub);

    const blobSrc = ref('');
    const subLang = ref('');

    function fetchSubtitles(){
        loadSubtitle(sub.value);
    }

    function loadSubtitle(data: {[key: string]: string}) {
        let blob = new Blob([data["data"]], { type: 'text/vtt' });
        const url = URL.createObjectURL(blob);
        blobSrc.value = url;
        subLang.value = data["language"];
        console.log(blobSrc.value)
    }

    // Watch for changes to the subID prop and refetch subtitles if it changes
    watch(() => props.sub, (newSub, oldSub) => {
        if (newSub !== oldSub) {
            sub.value = newSub;
            fetchSubtitles();
        }
    },
    { immediate: true, deep: true} // Immediately run fetchSubtitles on mount
    );
</script>


<template>
    <track kind="subtitles" :src="blobSrc" :srclang="subLang">
</template>


<style scoped>

</style>
