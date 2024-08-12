<script setup lang="ts">
    const props = defineProps({
        name: String,
        num: Number,
        id: Number
    });
</script>


<template>
    <div id="wrapper">
        <span>{{ props.num }}</span>
        <span>{{ props.name }}</span>
    </div>
</template>


<style scoped>

</style>