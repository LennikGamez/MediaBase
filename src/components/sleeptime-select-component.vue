<script lang='ts' setup>
    import sleepTimer from "../worker/sleeptimer?worker";

    const sleepTimerWorker = new sleepTimer();
    let currentSleepTime: any;
    let setSleepTimer = function(sl: any){console.log(sl)};
    let isActive = function(){return false};
    const emit = defineEmits(['finished']);

    sleepTimerWorker.onmessage = function(message: any){

    } 

    sleepTimerWorker.postMessage("startTimer")

</script>


<template>
    <button id="sleeptime-selctor" @click="setSleepTimer(currentSleepTime)">
        <img src="../assets/audio-icons/sleeptimer.svg">
    </button>

    <div id="overlay">
    {{currentSleepTime}}
        <input type="number" min="0" max="60" step="5" v-model="currentSleepTime" :readonly="isActive()"/> Minutes 
    </div>
</template>


<style>

</style>

