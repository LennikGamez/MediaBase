<script lang="ts" setup>
    import { Media } from '../types';
    import { ref } from 'vue';

    const props = defineProps({
        data: {
            type: Object as () => Media,
            required: true
        }
    });

    const posterLink = ref("http://localhost:8000/poster/" + props.data.entryID);

</script>

<template>
    <div>
        <img :src="posterLink">
        <h2>{{ props.data.name }}</h2>
    </div>
</template>

<style scoped>

</style>