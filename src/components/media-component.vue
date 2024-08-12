<script lang="ts" setup>
    import { useRouter } from 'vue-router';
    import { Media } from '../types';
    import { ref } from 'vue';

    const router = useRouter();
    const props = defineProps({
        data: {
            type: Object as () => Media,
            required: true
        }
    });

    const posterLink = ref("http://localhost:8000/poster/" + props.data.entryID);

    const wrapper = ref(HTMLDivElement)

    function rerouteToDetails(){
        console.log("reroute to details of " + props.data.name);
        switch (props.data.type) {
            case 0:
            case 1:
                router.push({path: "/detail/" + props.data.entryID + "/" + props.data.type});
                break;
            case 2:
                router.push({path: "/audio/" + props.data.entryID});
                break;

        }
    }

</script>

<template>
    <div class="media" ref="wrapper" @click="rerouteToDetails">
        <img :src="posterLink">
        <h4 class="title">{{ props.data.name }}</h4>
    </div>
</template>

<style scoped>
    .media{
        --hover-shadow: 0%;
        --default-shadow: 60%;
        --border-radius: 8px;
        --hover-speed: 0.5s;
        --resize: 30px;
        --size: 300px;

        width: var(--size);
        height: fit-content;
        position: relative;
        overflow-wrap: anywhere;

        transition: width var(--hover-speed), margin var(--hover-speed);
    }

    img{
        display: block;
        width: 100%;
        border-radius: var(--border-radius); 
    }

    .title{
        position: absolute;
        bottom: 0;
        max-width: var(--size);
        
        color: white;
        position: absolute;
        bottom: 0;
        padding: 5px;
        margin: 10px;
        font-size: 1.5rem;
        pointer-events: none;
        transition: font-size var(--hover-speed);
    }

    .media:hover{
        width: calc(var(--size) + var(--resize));

    }

    .media:hover .title{
        font-size: 1.85rem;
    }

    .media::before{
        content: '';
        border-radius: var(--border-radius);
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;

        background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) var(--default-shadow),rgba(0,0,0,1) 100%);
        background: linear-gradient(top, rgba(255, 255, 255, 0) var(--default-shadow),rgba(0,0,0,1) 10%);
        background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) var(--default-shadow),rgba(0,0,0,1) 100%);
        opacity: 0.8;

        transition: opacity 0.5s;
    }

    .media:hover::before{
        opacity: 1;
        background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) var(--hover-shadow),rgba(0,0,0,1) 100%);
        background: linear-gradient(top, rgba(255, 255, 255, 0) var(--hover-shadow),rgba(0,0,0,1) 10%);
        background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) var(--hover-shadow),rgba(0,0,0,1) 100%);
    }
</style>