<script setup lang="ts">

    const emit = defineEmits(['startChapter']);
    const props = defineProps({
        name: String,
        num: Number,
        id: Number
    });

    function onChapterClick(){        
        emit('startChapter', props.id);
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