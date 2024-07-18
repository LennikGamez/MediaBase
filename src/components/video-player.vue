<script setup lang="ts">
    import { inject, onMounted, Ref, ref } from 'vue';
    import LanguagePop from './popover/language-popover.vue';
    import { useRoute } from 'vue-router';
    import InactivityTimer from '../inactivity-timer';

    var timelineDrag = false;
    var fullscreenState = false;

    let currentEntryID: number | null = null;
    let currentEpisodeID: number | null = null;
    let currentType: number | null = null;

    const preferredWatchLanguage = inject('preferredWatchLanguage') as Ref;
    const availableLanguages = ref <string[]>([]);

    const route = useRoute();
   
    const videoElement = ref<HTMLVideoElement | null>(null);
    const videoContainer = ref<HTMLDivElement | null>(null);
    const videoPlayerContainer = ref<HTMLDivElement | null>(null);

    const currentTimeSpan = ref<HTMLSpanElement | null>(null);
    const durationSpan = ref<HTMLSpanElement | null>(null);
    const timeline = ref<HTMLDivElement | null>(null);
    const videoSrc = ref(''); 
    const posterSrc = ref('');
    const poster = ref<HTMLImageElement | null>(null);

    const inactivityTimer = new InactivityTimer(()=>hideCursor(), ()=>showCursor(), 2000);

    const videoStepSize = 5;

    // events

    document.addEventListener('webkitfullscreenchange', ()=>{handleFullscreenChange()});
    document.addEventListener('mozfullscreenchange', ()=>{handleFullscreenChange()});
    document.addEventListener('msfullscreenchange', ()=>{handleFullscreenChange()});
    document.addEventListener('fullscreenchange', ()=>{handleFullscreenChange()});

    document.addEventListener('mouseup', (e)=>{
            inactivityTimer.restart();
            if(!timelineDrag) return;
            timelineDrag = false;
            videoElement.value?.play();
            setTimelineByMouseEvent(e);
        });
    document.addEventListener('touchend', (e)=>{
        inactivityTimer.restart();
        if(!timelineDrag) return;
        timelineDrag = false;
        videoElement.value?.play();
    });

    document.addEventListener('mousemove', (event)=>{
        inactivityTimer.restart();
        if(!timelineDrag) return;
        setTimelineByMouseEvent(event);
    });
    document.addEventListener('touchmove', (event)=>{
        inactivityTimer.restart();
        if(!timelineDrag) return;;
        setTimelineByMouseEvent(event.touches[0]);
    });

    document.addEventListener('keypress', (event) => {
        switch (event.key){
            case ' ':
            case 'k':
                togglePlayPause();
                break;
            case 'f': 
            case '0':
                toggleFullscreen();
                break;
        }
    });

    document.addEventListener('keydown', (event)=>{
        if (!videoElement.value) return;
        if (event.key === 'ArrowRight'){
            videoElement.value.currentTime += videoStepSize;
            updateTimeline();
            inactivityTimer.restart();
        }
        if (event.key === 'ArrowLeft'){
            videoElement.value.currentTime -= videoStepSize;;
            updateTimeline();
            inactivityTimer.restart();
        }
    });


    function formatTime(time: number){
        if (isNaN(time)) return formatTime(0);
        const date = new Date(time * 1000);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        
        if (hours === 0) return `${date.getUTCMinutes().toString().padStart(2, '0')}:${date.getUTCSeconds().toString().padStart(2, '0')}`
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    function hideCursor(){
        videoContainer.value?.classList.add('cursor-none');
    }

    function showCursor(){
        videoContainer.value?.classList.remove('cursor-none');
    }

    // play pause

    function togglePlayPause(){
        if (!videoElement.value) return;
        videoElement.value.paused ? videoElement.value.play() : videoElement.value.pause();
    }
    function onPlay(){
        if (!videoContainer.value) return;
        videoContainer.value.classList.remove("paused");
    }
    function onPause(){
        if (!videoContainer.value) return;
        videoContainer.value.classList.add("paused");
    }

    // timeline

    function startSeeking(){
        if (!timeline.value) return;
        timelineDrag = true;
        
        videoElement.value?.pause();
    }
    

    function setTimelineByMouseEvent(event: MouseEvent | Touch){
        if (!timeline.value || !videoElement.value) return;
        
        const rect = timeline.value.getBoundingClientRect();
        var x = event.clientX - rect.left;
        const timeToSeek = (x / rect.width) * videoElement.value.duration;
        videoElement.value.currentTime = timeToSeek;
        updateTimeline();
    }



    function updateTimeline(){
        if (!videoPlayerContainer.value || !videoElement.value) return;
        if (!currentTimeSpan.value || !durationSpan.value) return;
        const percent = (videoElement.value.currentTime / videoElement.value.duration);
        videoPlayerContainer.value.style.setProperty('--progress', percent.toString());

        currentTimeSpan.value.innerHTML = formatTime(videoElement.value.currentTime);
        durationSpan.value.innerHTML = formatTime(videoElement.value.duration);
    }

    // fullscreen
    function toggleFullscreen(){
        
        if(!videoSrc.value) return;
        fullscreenState = !fullscreenState;
        if (fullscreenState){
            videoContainer.value?.classList.add('fullscreen');
            videoPlayerContainer.value?.classList.add('fullscreen');
            if (videoPlayerContainer.value?.webkitRequestFullscreen) videoPlayerContainer.value?.webkitRequestFullscreen();
            else if(videoPlayerContainer.value?.requestFullscreen) videoPlayerContainer.value?.requestFullscreen();
            else if (videoPlayerContainer.value?.mozRequestFullScreen) videoPlayerContainer.value?.mozRequestFullScreen(); // Careful to the capital S
            else if (videoPlayerContainer.value?.msRequestFullscreen) videoPlayerContainer.value?.msRequestFullscreen();
            else if (videoPlayerContainer.value?.webkitEnterFullscreen) videoPlayerContainer.value?.webkitEnterFullscreen(); // Magic is here for iOS

        }else{
                if(document.exitFullscreen) document.exitFullscreen();
                else if (videoPlayerContainer.value?.webkitCancelFullscreen) videoPlayerContainer.value?.webkitCancelFullscreen();
                else if (videoPlayerContainer.value?.mozCancelFullScreen) videoPlayerContainer.value?.mozCancelFullScreen(); // Careful 
                else if (videoPlayerContainer.value?.msExitFullscreen) videoPlayerContainer.value?.msExitFullscreen();
                exitFullscreen();
        }
    }

    function exitFullscreen(){
        videoPlayerContainer.value?.classList.remove('fullscreen');
        videoContainer.value?.classList.remove('fullscreen');
        fullscreenState = false;
    }

    function handleFullscreenChange(){
        if(document.fullscreenElement) return;
        exitFullscreen();
    }

    /**
     * returns either the preferred language if available or the first language of the list
     * @param langs 
     */
    function selectPreferredOrAvailableLanguage(langs: string[]){
        if (langs.includes(preferredWatchLanguage.value)) return preferredWatchLanguage.value;
        return langs[0];
    }

    /**
     * generates the video src
     * @param type 
     * @param entryID 
     * @param episodeID 
     * @param languages 
     */
    function getVideoSrc(type: number, entryID: number, episodeID: number | null, languages: string[]): string{        
        switch (type){
            case 0: // movie
                return `http://localhost:8000/stream/${entryID}/${selectPreferredOrAvailableLanguage(languages)}`;
            case 1:
                return `http://localhost:8000/stream/show/${entryID}/episode/${episodeID}/${selectPreferredOrAvailableLanguage(languages)}`;
            
            default:
                return ''; 
        }
    }

    // generates the video src for given type, entryID, episodeID and languages and reloads the player and starts the video
    // the languages parameter is used to select the preferred language if available if not it defaults to the first language of the video
    function play(type: number, entryID: number, episodeID: number | null, languages: string[]){
        if (!videoElement.value) return;
        
        currentEntryID = entryID;
        currentEpisodeID = episodeID;
        currentType = type;
        availableLanguages.value = languages;
        
        updateLanguageBasedOnPreferredLanguage();                
        startVideo();

        poster.value?.classList.add('hidden');
    }
    function startVideo(){
        if (!videoElement.value) return;
        videoElement.value.load();
        videoElement.value.play();
    }
    function updateLanguageBasedOnPreferredLanguage(){        
        if (currentType === null || currentEntryID === null) return;
        videoSrc.value = getVideoSrc(currentType, currentEntryID, currentEpisodeID, availableLanguages.value);
        
    }

    function changeLanguage(lang: String){
        if (!videoElement.value) return;
        const playing = !videoElement.value?.paused;
        
        const currentTime = videoElement.value.currentTime;
        videoElement.value.pause();
        updateLanguageBasedOnPreferredLanguage();
        
        videoElement.value.load();
        videoElement.value.currentTime = currentTime;
        
        if (playing) videoElement.value.play();
        console.log("change language", lang);
    }

    defineExpose({play});

    onMounted(() => {
        posterSrc.value = `http://localhost:8000/poster/${route.params.entryID}`;
    })
</script>


<template>
    <div class="video-player" ref="videoPlayerContainer">
                <img :src="posterSrc" ref="poster">
                <div class="video-container paused" ref="videoContainer">
                    <div class="video-controls-container">
                        <div class="timeline-container" ref="timeline" @touchstart="startSeeking" @mousedown="startSeeking">
                            <div class="timeline">
                                <div class="thumb-indicator"></div>
                            </div>
                        </div>
                        <div class="controls">
                            <div class="left-controls">
                                <button class="control-element play-btn" @click="togglePlayPause">
                                    <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>
                                    <svg class="pause-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>
                                </button>
                                <div class="time-display">
                                    <span class="current-time" ref="currentTimeSpan">0:00</span>
                                    /
                                    <span class="total-time" ref="durationSpan">0:00</span>
                                </div>
                            </div>
                            <div class="right-controls">
                                <button class="control-element lang-btn popoverInvoker">
                                    <img src="../assets/control-icons/language.svg">
                                    <LanguagePop class="popover" id="language-select" :availableLangs="availableLanguages" @changeLanguage="changeLanguage"/> 
                                </button>
                                <button class="control-element sub"><img src="../assets/control-icons/subtitles.svg"></button>
                                <button class="control-element fullscreen-btn" @click="toggleFullscreen">
                                    <img src="../assets/control-icons/fullscreen.svg" id="fullscreen-icon">
                                    <img src="../assets/control-icons/fullscreen-exit.svg" id="fullscreen-exit-icon">
                                </button>
                            </div>
                        </div>
                    </div>

                    <video playsinline ref="videoElement" @play="onPlay" @pause="onPause" @timeupdate="updateTimeline">
                        <source id="source" :src="videoSrc">
                    </video>
                </div>
            </div>
</template>

<style lang="css" scoped>

            .hidden{
                display: none;
            }
            img:not(.hidden) ~ .video-container{
                display: none;
            }
            .popoverInvoker{
                position: relative;
            }

            .popoverInvoker:focus-within > .popover{
                display: block;
            }

            .popover{
                display: none;
            }

            .video-player{
                --hover-fade-time: .3s;
                --timeline-size: 2px;
                --video-control-inset: 8px;
                --timeline-drag-buffer: 32px;
                display: flex;
                position: relative;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                user-select: none;
            }

    	    .video-player,
            .video-container{
                width: 100%;
                height: fit-content;
                position: relative;
            }
            .video-container::before{
                transition: opacity var(--hover-fade-time) ease-in-out;
                content: '';
                position: absolute;
                bottom: -1px;
                background: linear-gradient(to top, rgba(0, 0, 0, .75), transparent);
                width: 100%;
                aspect-ratio: 6/1;
                opacity: 0;
                pointer-events:  none;
                z-index: 99;
            }

            .video-container.cursor-none{
                pointer-events: none;
            }
            .video-player:has(.video-container.cursor-none){
                cursor: none;
            }
            .fullscreen{
                display: flex;
                justify-content: center;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: black;
                z-index: 1000;
            }

            .video-container:not(.cursor-none) .video-controls-container,
            .video-container:not(.cursor-none).video-container::before{
                opacity: 1;
            }

            .video-container.paused .video-controls-container,
            .video-container.paused:before,
            .video-container.paused .video-container::before{
                /* if paused controls are always visible */
                opacity: 1;
            }
            .video-container .play-icon,
            .video-container.paused .pause-icon{
                 display:none
            }

            .video-container.paused .play-icon,
            .video-container .pause-icon{
                display: block;
            }

            .video-controls-container{
                transition: opacity var(--hover-fade-time) ease-in-out;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 100;
                opacity: 0;
                display: flex;
                flex-direction: column;
                gap: 5px;
                padding: var(--video-control-inset);

            }

            .controls{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .left-controls,
            right-controls{
                display: flex;
                gap: 5px;
                align-items: center;
            }
            .time-display{
                display: flex;
                align-items: center;
            }


            .control-element{
                background-color: transparent;
                border-style: none;
                outline: none;
                color: white;
                padding: 0px;        
            }
            .control-element:hover > img{
                cursor: pointer;
                opacity: .5;
            }

            .timeline-container{
                padding-bottom: 12px;
                padding-top: var(--timeline-drag-buffer);
            }

            .timeline{
                position: relative;
                left: 0;
                right: 0;
                height: var(--timeline-size);
                background-color: rgba(255, 255, 255, .5);
                z-index: 101;
                transition: opacity var(--hover-fade-time) ease-in-out;
            }

            .timeline::before{
                content: '';
                position: absolute;
                height: var(--timeline-size);
                left: 0;
                right: calc(100% - var(--progress) * 100%);
                background-color: red;
                z-index: 101;
            }

            .thumb-indicator{
                display: none;
                background-color: red;
                border-radius: 50%;
                position: absolute;
                bottom: 50%;
                transform: translateY(50%) translateX(-50%);
                left: calc(var(--progress) * 100%);
                width: 12px;
                aspect-ratio: 1;

            }

            .timeline-container:hover .thumb-indicator{
                display: block;
            }

            video{
                display: flex;
                max-width: 100%;
                width: 100%;
                object-fit: contain;
            }
            .video-container.fullscreen video{
                height: 100%;
                width: auto;
            }

            .video-container.fullscreen #fullscreen-icon,
            .video-container:not(.fullscreen) #fullscreen-exit-icon{
                display: none;
            }

            .video-container.fullscreen #fullscreen-exit-icon,
            .video-container:not(.fullscreen) #fullscreen-icon{
                display: block;
            }

            img{
                max-width: 100%;
                width: 100%;
            }
</style>