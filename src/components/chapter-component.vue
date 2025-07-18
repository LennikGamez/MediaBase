<script setup lang="ts">

    const emit = defineEmits(['startChapter']);
    const props = defineProps({
        name: String,
        num: Number,
        path: String
    });

    function onChapterClick(){        
        emit('startChapter', props.path);
    }
</script>


<template>
    <div id="wrapper" @click="onChapterClick">
        <span>{{ props.num }}</span>
        <span>{{ props.name }}</span>
    </div>
</template>


<style scoped>

</style>
