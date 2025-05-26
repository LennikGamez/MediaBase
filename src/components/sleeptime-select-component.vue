<script lang='ts' setup>
    import useSleepTimer from '../helper/sleeptimer';

    const emit = defineEmits(['finished']);

    const { currentSleepTime, setSleepTimer, isActive } = useSleepTimer(15, () => emit('finished'));
 

</script>


<template>
    <button id="sleeptime-selctor" @click="setSleepTimer(currentSleepTime)">
        <img src="../assets/audio-icons/sleeptimer.svg">
    </button>

    <div id="overlay">
        <input type="number" min="0" max="60" step="5" v-model="currentSleepTime" :readonly="isActive().value"/> Minutes 
    </div>
</template>


<style>

</style>

