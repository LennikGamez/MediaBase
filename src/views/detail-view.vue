<script lang="ts" setup>
    import VideoPlayer from '../components/video-player.vue';
</script>

<template>
    <div id="wrapper">
        <VideoPlayer />
        <div id="details">
            <h1 id="title">S.W.A.T</h1>
            <p id="duration">1:30h</p>
            <p id="description">Description</p>
            <div id="buttons">
                <button id="play-btn" class="btn focusable" tabindex="0">Play</button>
                <select title="versions" id="version-btn" class="btn focusable" tabindex="0">
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #wrapper{
        @media only screen and (min-width: 1100px) {
            display: grid;
            height: 100%;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
            place-items: center;
            column-gap: 10px;
        }
    }

    .player{
        width: 100%;
        height: 100%;
    }
</style>