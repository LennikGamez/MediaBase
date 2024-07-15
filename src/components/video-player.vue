<script setup lang="ts">
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const videoSrc = ref("http://localhost:8000/stream/episode/" + route.params.entryID); 
</script>


<template>
    <div class="video-player">
                <div class="video-container hidden">
                    <div class="video-controls-container">
                        <div class="timeline-container">
                            <div class="timeline">
                                <div class="thumb-indicator"></div>
                            </div>
                        </div>
                        <div class="controls">
                            <div class="left-controls">
                                <button class="control-element play-btn">
                                    <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>
                                    <svg class="pause-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>
                                </button>
                                <div class="time-display">
                                    <span class="current-time">0:00</span>
                                    /
                                    <span class="total-time">0:00</span>
                                </div>
                            </div>
                            <div class="right-controls">
                                <button class="control-element sub"><img src="../assets/control-icons/subtitles.svg"></button>
                                <button class="control-element fullscreen-btn"><img src="../assets/control-icons/fullscreen.svg"></button>
                            </div>
                        </div>
                    </div>

                    <video autoplay playsinline>
                        <source id="source" :src="videoSrc">
                    </video>
                </div>
            </div>
</template>

<style lang="css" scoped>

</style>